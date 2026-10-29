import { useEffect } from "react";

import { SITE_NAME, SITE_TITLE } from "@/lib/site";

export function usePageMeta({ title, noindex = false }: { title?: string; noindex?: boolean }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_TITLE;

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = noindex ? "noindex" : "index, follow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, [title, noindex]);
}
