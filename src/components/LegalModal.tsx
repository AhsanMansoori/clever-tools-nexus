"use client";

import { X } from "lucide-react";
import React from "react";

interface LegalModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode; // ✅ This line is what fixes your error
}

const LegalModal: React.FC<LegalModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative animate-in fade-in-50 zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Content */}
        <div className="text-muted-foreground space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
