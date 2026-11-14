import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ContentDocument } from "../../data/validation";

const ContentContext = createContext<ContentDocument | null>(null);
export function ContentProvider({
  content,
  children,
}: {
  content: ContentDocument;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent must be used within ContentProvider");
  return content;
}
