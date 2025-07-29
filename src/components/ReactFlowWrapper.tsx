import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "reactflow"
import "reactflow/dist/style.css"

import { useCallback, useState } from "react"

let id = 0
const getId = () => `node_${id++}`

export default function ReactFlowWrapper() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const addNode = () => {
    const label = prompt("Enter node label")
    if (!label) return

    const newNode: Node = {
      id: getId(),
      data: { label },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      type: "default",
    }

    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div className="w-full h-screen relative">
      {/* Add Node button outside ReactFlow, but inside relative container */}
      <button
        onClick={addNode}
        className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-50 transition-all"
      >
        + Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
