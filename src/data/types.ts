export type BookCategoryId = 'canonicos' | 'pseudepigrafos' | 'gnosticos' | 'patristica' | 'kabbalah' | 'swedenborg';

export interface BookCategory {
  id: BookCategoryId;
  name: string;
  description: string;
  color?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  category: BookCategoryId;
  description: string;
  archiveUrl?: string;
  language?: string;
  date?: string;
  highlights?: string[];
}

export type ConnectionType =
  | 'confirms'         // Book A confirms what Book B says
  | 'expands'          // Book A expands/develops Book B's concepts
  | 'cites'            // Book A explicitly cites Book B
  | 'same_tradition'   // Books belong to same tradition
  | 'contradicts'      // Book A contradicts Book B
  | 'parallel'         // Parallel concepts without direct dependence
  | 'refutes';         // Book A refutes Book B's claims

export interface Evidence {
  type: 'quote' | 'verse' | 'reference' | 'analysis';
  source: string;
  text: string;
}

export interface Argument {
  claim: string;
  evidence: Evidence[];
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  title: string;
  summary: string;
  arguments: Argument[];
}

export interface AppNodeData {
  bookId: string;
  label: string;
  category: BookCategoryId;
}

export interface AppEdgeData {
  connectionId: string;
  label: string;
  type: ConnectionType;
}
