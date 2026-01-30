-- Create cache table for AI formatting results
CREATE TABLE public.formatting_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  input_hash TEXT NOT NULL UNIQUE,
  formatted_content TEXT NOT NULL,
  formatting_rules JSONB NOT NULL,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days')
);

-- Create index for fast hash lookups
CREATE INDEX idx_formatting_cache_hash ON public.formatting_cache(input_hash);

-- Create index for cleanup of expired entries
CREATE INDEX idx_formatting_cache_expires ON public.formatting_cache(expires_at);

-- Enable RLS (allow public read/write since this is a cache)
ALTER TABLE public.formatting_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cached results
CREATE POLICY "Anyone can read cache"
ON public.formatting_cache
FOR SELECT
USING (true);

-- Allow anyone to insert cache entries
CREATE POLICY "Anyone can insert cache"
ON public.formatting_cache
FOR INSERT
WITH CHECK (true);

-- Create function to clean up expired cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.formatting_cache WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;