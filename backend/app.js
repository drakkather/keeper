const port = 4000;
express = require("express");
bodyParser = require("body-parser");
mongoose = require("mongoose");
const cors = require("cors"); //Para acceder a la base de datos desde otro puerto (desde React)

// Iniciamos la app con express
const app = express();

// // // // // // // // // // // // // // // // // // /
// CONFIGURACION DE LA APP DE EXPRESS
// // // // // // // // // // // // // // // // // /

app.use(cors());
app.use(
  bodyParser.urlencoded({
    // Para usar bodyParser y poder recoger variables de formulario con req.body
    extended: true,
  })
);
app.use(bodyParser.json()); //Requiero tambien el json para recibir los datos de Axios desde React

// Conectamos a la BD con mongoose
mongoose.connect("mongodb://localhost:27017/noteDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.set("useCreateIndex", true); // Con esto quitamos un deprecation que sale con passportLocalMongoose

// Creo el schema de Note
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Note = new mongoose.model("note", noteSchema);

// // // // //
// RUTAS//
// // // // /

// BORRAR NOTA

app.post("/delete", function (req, res) {
  Note.findByIdAndDelete(req.body.id, (e) => {
    if (e) {
      console.log(e);
    } else {
      res.send("Nota eliminada");
    }
  });
});

//MOSTRAR NOTAS

app.get("/notes", function (req, res) {
  Note.find({}, (e, notes) => {
    if (e) {
      console.log(e);
    } else {
      res.send(notes);
    }
  });
});

//CREAR NOTAS

app.post("/submit", function async(req, res) {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save();
  res.send("Nota creada");
});

// ESCUCHA DEL PUERTO

app.listen(port, function () {
  console.log("Corriendo en el puerto " + port);
});
