import { useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type NodeProps,
  type Edge,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { books, getCategory } from '../data/books';
import { connections } from '../data/connections';
import ConnectionDetail from './ConnectionDetail';
import type { BookCategoryId } from '../data/types';

const CATEGORY_COLORS: Record<BookCategoryId, string> = {
  canonicos: '#8b6945',
  pseudepigrafos: '#6b4f30',
  gnosticos: '#4a3820',
  patristica: '#a88860',
  kabbalah: '#c4a070',
  swedenborg: '#d4b888',
};

function BookNode({ data }: NodeProps) {
  const cat = getCategory(data.category);
  const color = CATEGORY_COLORS[data.category as BookCategoryId] || '#a88860';
  return (
    <div className="react-flow__node-bookNode" style={{ borderColor: color }}>
      <Handle type="target" position={Position.Left} style={{ background: color }} />
      <h3>{data.label}</h3>
      {cat && (
        <span
          className="inline-block text-[10px] px-2 py-0.5 rounded-full mt-1"
          style={{ backgroundColor: '#e8d4a8', color: color }}
        >
          {cat.name}
        </span>
      )}
      <Handle type="source" position={Position.Right} style={{ background: color }} />
    </div>
  );
}

const nodeTypes = { bookNode: BookNode };

export default function MindMap() {
  const navigate = useNavigate();
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  const initialNodes: Node[] = useMemo(() => {
    return books.map((b) => {
      const catIdx = Object.keys(CATEGORY_COLORS).indexOf(b.category);
      const catBooks = books.filter(x => x.category === b.category);
      const posInCat = catBooks.findIndex(x => x.id === b.id);
      return {
        id: b.id,
        type: 'bookNode',
        position: {
          x: catIdx * 220 + 50,
          y: posInCat * 100 + 50,
        },
        data: {
          bookId: b.id,
          label: b.title.length > 30 ? b.title.substring(0, 28) + '…' : b.title,
          category: b.category,
        },
      };
    });
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    return connections.map((c) => ({
      id: c.id,
      source: c.sourceId,
      target: c.targetId,
      label: c.type,
      type: 'smoothstep' as const,
      animated: true,
      style: { stroke: '#a88860', strokeWidth: 2 },
      labelStyle: { fontSize: 10, fill: '#6b4f30', fontFamily: 'Georgia, serif' },
      labelBgStyle: { fill: '#f5e6c8', borderRadius: 4 },
      labelBgPadding: [4, 2] as [number, number],
      labelBgBorderRadius: 4,
      data: { connectionId: c.id },
    }));
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    navigate(`/libro/${node.id}`);
  }, [navigate]);

  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setSelectedConnection(edge.id);
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.5}
        maxZoom={2}
      >
        <Controls />
        <MiniMap
          nodeStrokeColor="#a88860"
          nodeColor="#f5e6c8"
          maskColor="rgba(0,0,0,0.1)"
          style={{ border: '1px solid #c4a070', borderRadius: 8 }}
        />
        <Background color="#c4a070" gap={20} size={1} />
      </ReactFlow>

      {selectedConnection && (
        <ConnectionDetail
          connectionId={selectedConnection}
          onClose={() => setSelectedConnection(null)}
        />
      )}
    </div>
  );
}
