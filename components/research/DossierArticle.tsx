"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DossierSection } from "@/lib/types";

interface Props { sections: DossierSection[]; }

export default function DossierArticle({ sections }: Props) {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <section key={i} className="border-t border-border-color pt-8">
          <h3 className="font-display text-[21px] font-semibold mb-4 text-text-main">
            {i + 1}. {section.title}
          </h3>
          <div className="prose prose-sm max-w-none font-sans text-[15px] text-text-main leading-relaxed
            [&>p]:mb-4 [&>ul]:mb-4 [&>ul>li]:mb-1 [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2
            [&>blockquote]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:italic [&>blockquote]:text-text-muted">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
          </div>
        </section>
      ))}
    </div>
  );
}
