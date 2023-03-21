import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Handle, Position, NodeRemoveChange } from "reactflow";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateNodeLabel } from "../../redux/store/NodeSlice";

/**
 * 노드에 mindmap이라는 사용자 정의 유형을 사용
 * 사용자노드를 정의
 */
export default function MindMapNode({ id, data, hovered }) {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [label, setLabel] = useState(data.label);
  const dispatch = useDispatch();
  console.log("id", id);

  const style = {
    backgroundColor: hovered ? "red" : "white",
  };

  const onChangeHandler = (id, e) => {
    e.preventDefault();
    setLabel(e.target.value);
    dispatch(updateNodeLabel({ id, label: e.target.value }));
  };
  const HandlerDetail = (id) => {
    console.log("눌름");
    navigate(`/detail/${id}`);
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${label.length * 10}px`;
    }
  }, [label.length]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 100);
  }, []);

  return (
    <>
      <div className="inputWrapper" style={style}>
        <div className="dragHandle">
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <input
          value={label}
          onChange={(e) => onChangeHandler(id, e)}
          className="input"
          ref={inputRef}
        />
        <button className="btnbtn" onClick={() => HandlerDetail(id)}>
          Go
        </button>
      </div>

      {/* 엣지핸들을 위 아래에 두는거? 드래그앤 드롭 */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
