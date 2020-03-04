// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const data = require("./db/db.json")
// Sets up the Express App
// =============================================================
const app = express();
const PORT =  process.env.PORT  || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// array in db

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


// reads initial input in the JSON file and displays to client

app.get("/api/notes", function(req, res) {
//console.log("hit the GET for notes");

   
    //console.log(data)
    res.json(data)
});

// get a new notes and pushes it to newData array

app.post("/api/notes", function(req, res) {


    var newData = req.body;

    console.log(newData);

    // fs.readFile("./db/db.json","utf8",  (err, data) => {

    //     if (err) return console.log(err); //need to stop execution and keep server runing

        // return res.json(data);
        // creates a unique id
        const id = data[data.length-1].id +1 
        newData.id = id

        ///
        data.push(newData);
        //console.log(data);

        fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err=>{
            if (err) throw err
            console.log("..writing")
        })


    // });

  res.json(data);

});

app.get("/api/notes/:id",  function(req, res) {

    console.log("start delete process...")

    var deleId = req.params.id;

    console.log(deleId);

    fs.readFile("./db/db.json","utf8", (err, data) => {
        //loops through the array to see if there an entre with the id

        for (let i = 0; i < data.length; i++) {

            //console.log(i);
            if (deleId === data[i].id) {

                const slicedData = data.splice(data[i],1);
                
                console.log(slicedData);

                fs.writeFile("./db/db.json", JSON.stringify(slicedData), "utf-8", err=>{
                    if (err) throw err
                    console.log("data deleted!!")
                })
            }
        }
        return res.send("No notes with this id" + id + "found");
        if (err) throw err;

        console.log("..deleting");
    });
    res.json(data);
    console.log(data);
});





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
