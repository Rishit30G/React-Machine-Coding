import React from "react";
import { useState, useEffect, useRef } from "react";
import DownArrow from "../assets/down-arrow.svg";
import UpArrow from "../assets/up-arrow.svg";
import Action from "./action";

const Comment = ({
  comments,
  handleDeleteNode,
  handleEditNode,
  handleInsertNode,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comments.id, inputRef.current.innerText);
      setEditMode(false);
      return;
    } else {
      setExpand(true);
      handleInsertNode(comments.id, input);
      setShowInput(false);
      setInput("");
    }
  };

  const handleDelete = () => {
    handleDeleteNode(comments.id);
  }

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  return (
    <div>
      <div
        className={comments.id === 1 ? "inputContainer" : "commentContainer"}
      >
        {comments.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              placeholder="type..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              className="reply comment"
              type="Comment"
              handleClick={onAddComment}
            ></Action>
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
              ref={inputRef}
            >
              {comments.name}
            </span>
            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if(inputRef.current){
                        inputRef.current.innerText = comments.name;
                      }
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <img
                            src={UpArrow}
                            alt="up arrow"
                            height={10}
                            width={10}
                          />
                        ) : (
                          <img
                            src={DownArrow}
                            alt="down arrow"
                            height={10}
                            width={10}
                          />
                        )}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action className="reply" type="DELETE" 
                    handleClick={handleDelete}
                  
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              className="reply"
              type="REPLY"
              handleClick={onAddComment}
            ></Action>
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false)
                if(!comments?.items?.length) setExpand(false);
              }}
            ></Action>
          </div>
        )}
        {comments?.items?.map((cmt) => {
          return (
            <Comment
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleEditNode={handleEditNode}
              comments={cmt}
              key={cmt.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
