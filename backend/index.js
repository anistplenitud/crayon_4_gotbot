const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

const app = express();
const employees = require("./model");
const router = express.Router();
var cors = require('cors');

const port = 4000;

var uri = "mongodb://localhost:27017/details";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use("/", router);

router.route("/insertdata").post(function(req, res) {
    var data = req.body;
      employees.create(data, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log("doc created!")
          res.send(result);
        }
      });
});

router.route("/fetchdata").get(function(req, res) {
    employees.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.route("/updatedata").post(function(req, res) {
    
    var record = req.body;
    console.log(record);
    var id = mongoose.Types.ObjectId(record.doc_id);

    employees.findOne({_id : id}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        if (result) {
            result.mobile = record.mobile;
            result.name = record.name;
            result.save(function(err,record){
                if (!err) {
                    res.send(record)
                    console.log("Record updated!");
                }
                else{
                    res.send("Error updating record");
                }
            });
        }
        else {
            res.send("No record found");
        }  
       
      }
    });
  });

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});