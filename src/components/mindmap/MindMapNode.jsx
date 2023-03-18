import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

/**
 * 노드에 mindmap이라는 사용자 정의 유형을 사용
 * 사용자노드를 정의
 */
export default function MindMapNode({ id, data }) {
  return (
    <>
      <input defaultValue={data.label} />

      {/* 엣지핸들을 위 아래에 두는거? 드래그앤 드롭 */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
