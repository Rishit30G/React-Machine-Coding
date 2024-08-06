import React, { useState } from "react";

const Folder = ({ handleInsertNode,explorer}) => {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false, 
        isFolder: null
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        });
    }

    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value){
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({...showInput, visible: false});
        }
    }

    if(explorer.isFolder){
        return (
            <div>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span> 📁 {explorer.name}</span>
                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>
                <div style={{display: expand ? 'block': 'none', paddingLeft: '25px'}}>
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>{showInput.isFolder ? '📁' :'📄'} </span>
                                <input autoFocus onBlur={() => setShowInput({...showInput,visible: false})}   className="inputcontainer__input" type="text" onKeyDown={onAddFolder}/>
                            </div>

                        )
                    }
                    {explorer.items.map((exp, index) => {
                        return (
                            <Folder handleInsertNode={handleInsertNode} key={index} explorer={exp} />
                        )
                    })}
                </div>
            </div>
        );
    }else{
        return (
            <div>
                <div className="file">
                <span> 📄 {explorer.name}</span>
                </div>
            </div>
        );
    }
}

export default Folder;