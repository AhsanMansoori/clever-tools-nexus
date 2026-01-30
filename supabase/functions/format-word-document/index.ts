/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormattingRequest {
  documentContent: string;
  formattingInstructions?: string;
  requirementContent?: string;
  tocEnabled: boolean;
  tocPosition: 'beginning' | 'after-title' | 'custom';
  tocCustomPage?: number;
  tocHeadingLevels: number[];
}

interface FormattingRules {
  fontFamily: string;
  fontSize: string;
  headingStyles: {
    h1: { fontSize: string; fontWeight: string; alignment: string };
    h2: { fontSize: string; fontWeight: string; alignment: string };
    h3: { fontSize: string; fontWeight: string; alignment: string };
    h4: { fontSize: string; fontWeight: string; alignment: string };
  };
  paragraphSpacing: string;
  lineSpacing: string;
  alignment: string;
  margins: { top: string; right: string; bottom: string; left: string };
  indentation: string;
  citationStyle?: string;
}

// Simple hash function for cache key generation
async function generateHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: FormattingRequest = await req.json();
    const { 
      documentContent, 
      formattingInstructions, 
      requirementContent,
      tocEnabled,
      tocPosition,
      tocCustomPage,
      tocHeadingLevels 
    } = body;

    if (!documentContent) {
      return new Response(
        JSON.stringify({ error: 'Document content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing document formatting request');
    console.log('TOC enabled:', tocEnabled);
    console.log('Has formatting instructions:', !!formattingInstructions);
    console.log('Has requirement file:', !!requirementContent);

    // Generate cache key from input parameters
    const cacheInput = JSON.stringify({
      documentContent,
      formattingInstructions: formattingInstructions || '',
      requirementContent: requirementContent || '',
      tocEnabled,
      tocPosition,
      tocHeadingLevels,
    });
    const inputHash = await generateHash(cacheInput);
    console.log('Cache key hash:', inputHash.substring(0, 12) + '...');

    // Check cache first
    const { data: cachedResult, error: cacheError } = await supabase
      .from('formatting_cache')
      .select('*')
      .eq('input_hash', inputHash)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (cachedResult && !cacheError) {
      console.log('Cache HIT - returning cached result');
      return new Response(
        JSON.stringify({
          success: true,
          cached: true,
          formattingRules: cachedResult.formatting_rules,
          formattedContent: cachedResult.formatted_content,
          summary: cachedResult.summary + ' (cached)',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Cache MISS - calling AI');

    // Build the AI prompt
    let formattingSource = '';
    if (requirementContent) {
      formattingSource = `
The user has provided a formatting requirement document with these specifications:
"""
${requirementContent}
"""

Analyze these requirements and extract the formatting rules.`;
    } else if (formattingInstructions) {
      formattingSource = `
The user has provided these formatting instructions:
"""
${formattingInstructions}
"""

Interpret these instructions and create appropriate formatting rules.`;
    } else {
      formattingSource = `
No specific formatting instructions were provided. Apply professional academic standards:
- Font: Times New Roman, 12pt
- Line spacing: 1.5 or double
- Margins: 1 inch all around
- Headings: Bold, appropriately sized
- Paragraphs: Justified alignment
- First-line indentation: 0.5 inch`;
    }

    const tocInstructions = tocEnabled ? `
Generate a Table of Contents with the following settings:
- Include heading levels: ${tocHeadingLevels.join(', ')}
- Position: ${tocPosition === 'beginning' ? 'At the very beginning of the document' : 
              tocPosition === 'after-title' ? 'After the title page' : 
              `At page ${tocCustomPage}`}
- Use dot leaders between titles and page numbers
- Make entries clickable/linked to their sections
` : 'Do not include a Table of Contents.';

    const prompt = `You are a professional document formatter. Your task is to format a Word document according to specific requirements.

${formattingSource}

${tocInstructions}

Here is the document content to format (in HTML format from the original Word document):
"""
${documentContent}
"""

Please provide:
1. A JSON object containing the extracted/interpreted formatting rules
2. The fully formatted document content as clean, well-structured HTML

Your response MUST be valid JSON with this exact structure:
{
  "formattingRules": {
    "fontFamily": "string",
    "fontSize": "string (e.g., '12pt')",
    "headingStyles": {
      "h1": { "fontSize": "string", "fontWeight": "string", "alignment": "string" },
      "h2": { "fontSize": "string", "fontWeight": "string", "alignment": "string" },
      "h3": { "fontSize": "string", "fontWeight": "string", "alignment": "string" },
      "h4": { "fontSize": "string", "fontWeight": "string", "alignment": "string" }
    },
    "paragraphSpacing": "string",
    "lineSpacing": "string (e.g., '1.5' or '2')",
    "alignment": "string (left, center, right, justify)",
    "margins": { "top": "string", "right": "string", "bottom": "string", "left": "string" },
    "indentation": "string",
    "citationStyle": "string or null (e.g., 'APA', 'MLA', 'Chicago')"
  },
  "tableOfContents": "HTML string of the TOC or null if disabled",
  "formattedContent": "The complete formatted document as clean HTML with inline styles applied",
  "summary": "Brief description of formatting changes applied"
}

Important:
- Apply all formatting as inline CSS styles in the HTML
- Ensure proper heading hierarchy (h1 > h2 > h3 > h4)
- Preserve all original content, only change formatting
- Make the output professional and publication-ready
- If generating TOC, create proper anchor links`;

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a professional document formatter. Always respond with valid JSON only, no markdown code blocks.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 16000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const aiResult = await response.json();
    const aiContent = aiResult.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No response from AI');
    }

    console.log('AI response received, parsing...');

    // Parse the AI response - handle potential markdown code blocks
    let cleanedContent = aiContent.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    let formattedResult;
    try {
      formattedResult = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedContent.substring(0, 500));
      throw new Error('Failed to parse formatting response');
    }

    console.log('Document formatted successfully');

    // Store result in cache (background task)
    EdgeRuntime.waitUntil((async () => {
      try {
        const { error: insertError } = await supabase
          .from('formatting_cache')
          .upsert({
            input_hash: inputHash,
            formatted_content: formattedResult.formattedContent || '',
            formatting_rules: formattedResult.formattingRules || {},
            summary: formattedResult.summary || '',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          }, {
            onConflict: 'input_hash',
          });

        if (insertError) {
          console.error('Failed to cache result:', insertError);
        } else {
          console.log('Result cached successfully');
        }
      } catch (cacheWriteError) {
        console.error('Cache write error:', cacheWriteError);
      }
    })());

    return new Response(
      JSON.stringify({
        success: true,
        cached: false,
        ...formattedResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: unknown) {
    console.error('Error in format-word-document:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to format document';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
