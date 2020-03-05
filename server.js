// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const data = require("./db/db.json")
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// array in db.json

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
  
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {

  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// reads initial input in the JSON file and displays to client

app.get("/api/notes", function (req, res) {
  //console.log("hit the GET for notes");
  //console.log(data)
  data[0].id = 1;
  res.json(data)

  
});

// get a new notes and pushes it to newData array

app.post("/api/notes", function (req, res) {

  var newData = req.body;

  console.log(newData);

  // creates a unique id
  const id = data[data.length - 1].id + 1
  newData.id = id

  // adds the newdata with its unique id to the data array

  data.push(newData);

  //console.log(data);

  //adds the new data to the Json file after converting it to a string
  fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err => {
    if (err) throw err
    console.log("..writing")
  })

  res.json(data);

});

// deletes a note based on its id

app.delete("/api/notes/:id", function (req, res) {

  console.log("started the delete process...")

  var deleteId = parseInt(req.params.id);

  // console.log("id of entry to be deleted: " + deleteId);

  for (let i = 0; i < data.length; i++) {

    // console.log(data[i].id);

    if (deleteId === data[i].id) {

      //console.log("DATA BEFORE:", data);
      data.splice(i, 1);
      console.log("data deleted!!")
      //console.log("DATA AFTER:", data)

    }
    
  }

  res.json(data);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
