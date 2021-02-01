import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios"; //Para poder enviar peticiones http al backend

function App() {
  const [notes, setNotes] = useState([]);

  //Cargo las notas cuando se carga la página
  useEffect(() => {
    Axios.get("http://localhost:4000/notes").then((res) => {
      setNotes(res.data);
    });
  });

  //Añado la nota con los datos generados en el CreateeArea
  function addNote(newNote) {
    Axios.post("http://localhost:4000/submit", {
      title: newNote.title,
      content: newNote.content,
    }).then((res) => console.log(res.data));
  }

  //Borro la nota según su id
  function deleteNote(id) {
    Axios.post("http://localhost:4000/delete", {
      id: id,
    }).then((res) => console.log(res.data));
  }

  return (
    <div>
      <Header />
      <CreateArea addClick={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            deleteClick={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
