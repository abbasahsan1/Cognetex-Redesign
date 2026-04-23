import React from 'react';

interface SEOFormFieldsProps {
  seoTitle: string;
  seoDescription: string;
  onChange: (field: 'seoTitle' | 'seoDescription', value: string) => void;
}

export const SEOFormFields: React.FC<SEOFormFieldsProps> = ({
  seoTitle,
  seoDescription,
  onChange,
}) => {
  return (
    <div className="space-y-4 border-t border-border pt-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-signal">SEO Optimization</h3>
        <span className="text-[10px] font-mono text-muted uppercase">Search Engine Discovery</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-muted uppercase">SEO Title</label>
          <span className={`text-[10px] font-mono ${seoTitle.length > 60 ? 'text-red-500' : 'text-muted'}`}>
            {seoTitle.length}/60
          </span>
        </div>
        <input
          className="w-full bg-paper border border-border px-4 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
          placeholder="SEO Title (leave empty for default)"
          value={seoTitle}
          onChange={(e) => onChange('seoTitle', e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-muted uppercase">SEO Description</label>
          <span className={`text-[10px] font-mono ${seoDescription.length > 160 ? 'text-red-500' : 'text-muted'}`}>
            {seoDescription.length}/160
          </span>
        </div>
        <textarea
          className="w-full bg-paper border border-border px-4 py-2 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
          rows={3}
          placeholder="SEO Description (leave empty for default)"
          value={seoDescription}
          onChange={(e) => onChange('seoDescription', e.target.value)}
        />
      </div>
    </div>
  );
};
