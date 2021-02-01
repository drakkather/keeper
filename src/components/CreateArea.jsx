import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isFocus, setIsFocus] = useState(false);

  //Recojo los datos del input y textarea
  function handleChange(event) {
    const { name, value } = event.target;
    setNewNote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }

  return (
    <div>
      <form className="create-note">
        {isFocus && (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Titulo"
            value={newNote.title}
          />
        )}

        <textarea
          onChange={handleChange}
          onFocus={() => {
            setIsFocus(true);
          }}
          name="content"
          placeholder="Escribe una nota"
          rows={isFocus ? "3" : "1"}
          value={newNote.content}
        />
        <Zoom in={isFocus ? true : false}>
          <Fab
            onClick={(event) => {
              props.addClick(newNote);
              setNewNote({ title: "", content: "" });
              event.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
