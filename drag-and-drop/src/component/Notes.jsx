import React, { useEffect, useRef, createRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  useEffect(() => {
    // localstorage logic
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determinePosition();
        return {
          ...note,
          position,
        };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const noteRefs = useRef([]);

  const handleDragStart = (note, e) => {
    const {id} = note; 
    const noteRef = noteRefs.current[id].current; 
    const rect = noteRef.getBoundingClientRect(); 
    console.log(rect);
    const offsetX = e.clientX - rect.left; 
    const offsetY = e.clientY - rect.top; 

    const startPos = note.position; 

    const handleMouseMove = (e) => {
        const newX = e.clientX - offsetX; 
        const newY = e.clientY - offsetY; 

        noteRef.style.left = `${newX}px`; 
        noteRef.style.top = `${newY}px`; 
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const finalRect = noteRef.getBoundingClientRect(); 
        const newPosition = {
            x: finalRect.left, 
            y: finalRect.top, 
        }; 

        if(checkForOverlap(id)){
            noteRef.style.left = `${startPos.x}px`; 
            noteRef.style.top = `${startPos.y}px`; 
        }else{
            updatedNotePosition(id, newPosition);
        }
    }

    const updatedNotePosition = (id, newPosition) => {
        const updatedNotes = notes.map((note) => 
            note.id === id ? {...note, position: newPosition} : note
        ); 

        setNotes(updatedNotes); 
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const checkForOverlap = (id) => {
        const currentNoteRef = noteRefs.current[id].current; 
        const currentRect = currentNoteRef.getBoundingClientRect(); 

        return notes.some((note) => {
            if(note.id === id) return false; 
            const otherNoteRef = noteRefs.current[note.id].current; 
            const otherRect = otherNoteRef.getBoundingClientRect(); 
            const overlap = !(
                currentRect.right < otherRect.left || 
                currentRect.left > otherRect.right || 
                currentRect.bottom < otherRect.top || 
                currentRect.top > otherRect.bottom
            ); 

            return overlap; 
        })
        
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

  const determinePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    return { x, y };
  };

  return (
    <div>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            initialPosition={note.position}
            content={note.text}
            ref={
              noteRefs.current[note.id]
                ? noteRefs.current[note.id]
                : (noteRefs.current[note.id] = createRef())
            }
            onMouseDown={(e) => handleDragStart(note, e)}
          ></Note>
        );
      })}
    </div>
  );
};

export default Notes;
