export interface BookText {
  id: string;
  sourceFile: string;
  totalPages: number;
  pages: { num: number; text: string }[];
}

// Lazy-import each JSON as a separate chunk — Vite code-splits on dynamic import.meta.glob
const textFiles = import.meta.glob('./*.json', { eager: false });

export async function getBookText(bookId: string): Promise<BookText | null> {
  const path = `./${bookId}.json`;
  if (!(path in textFiles)) return null;
  try {
    const mod = await textFiles[path]();
    return (mod as any).default || null;
  } catch {
    return null;
  }
}

export function hasTextFile(bookId: string): boolean {
  return `./${bookId}.json` in textFiles;
}
