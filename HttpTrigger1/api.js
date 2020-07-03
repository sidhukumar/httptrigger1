
const express = require('express');
const app = express();
const Storage = require("./storage");


const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const fs = require("fs");
const nodemailer = require('nodemailer');


//Cookie secret
app.use(cookieSession({
  secret: "adjsoaiuhdiaphfisdhfiosdahfisadhifhasdifhasdpiufhasoih"
}));
app.use(bodyParser.json())
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mattiasdxcspam@gmail.com',
    pass: 'x8ZVcFB2ebtH'
  }
});


const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

module.exports = async function (context, req) {
  let DB2;
  try {
      DB2 = await readFileAsync('./HttpTrigger1/data.json');
      
  } catch (err) {
      context.log.error('ERROR', err);
      // This rethrown exception will be handled by the Functions Runtime and will only fail the individual invocation
      throw err;
  }  
  DB2 = new Storage.Database(JSON.parse(DB2));

/*let DB;
fs.readFile('./azure/HttpTrigger1/data.json', (err, data) => {
  if (err) throw err;
  DB = new Storage.Database(JSON.parse(data));
});


/*fs.readFile('./api/projects.json', (err, data) => {
  if (err) throw err;
  DB = new Storage.Database(JSON.parse(data));
});*/


app.get("/getDepartmentById/:id", (req, res) => {
  res.send(DB.getDepartmentById(req.params.id));
});

app.get("/getPersonsWithArrayOfIds/:array", (req, res) => {
  let arr = JSON.parse(req.params.array);
  res.send(DB.getPersonsWithArrayOfIds(arr));
});

app.get("/getTeamById/:id", (req, res) => {
  res.send(DB.getTeamById(req.params.id));
});

app.get("/getTeamByPersonId/:id", (req, res) => {
  res.send(DB.getTeamByPersonId(req.params.id));
});

app.get("/getPersonById/:id", (req, res) => {
  res.send(DB.getPersonById(req.params.id));
});
app.get("/getPersonTechnologiesByPersonId/:id", (req, res) => {
  res.send(DB.getPersonTechnologiesByPersonId(req.params.id));
});

app.get("/getPersonsByTechnology/:technology", (req, res) => {
    res.send(DB.getPersonsByTechnology(req.params.technology));
});
app.get("/getPersonsByProjectId/:id", (req, res) => {
  res.send(DB.getPersonsByProjectId(req.params.id));
});

app.get("/getAllDepartments", (req, res) => {
  res.send(DB.getAllDepartments());
});

//Project api

app.get("/getProjectsByPersonId/:id", (req, res) => {
  res.send(DB.getProjectsByPersonId(req.params.id));
});

app.get("/getProjectById/:id", (req, res) => {
  res.send(DB.getProjectById(req.params.id));
});
app.get("/getAllProjects", (req, res) => {
  res.send(DB.getAllProjects());
});
app.get("/getFirstXProjects/:X", (req, res) => {
  res.send(DB.getFirstXProjects(req.params.X));
});
app.get("/getAllTeams", (req, res) => {
  res.send(DB.getAllTeams());
});
app.get("/getTechnologyById/:id", (req, res) => {
  res.send(DB.getTechnologyById(req.params.id));
})
app.get("/getPersonRolebyPersonId:id",(req,res) => {
  res.send(DB.getPersonRolebyPersonId(req.params.id));
})

app.get("/Search/:query", (req, res) => {
  res.send(DB.search(req.params.query));
});
app.get("/Search", (req, res) => {
  res.send([]);
});
app.post("/sendMail",(req, res) => {

  var mailOptions = {
    from: 'mattiasdxcspam@gmail.com',
    to: 'mattiasdxcspam@gmail.com',
    subject: 'Book a visit',
    text: `${req.body.name} Wants to book a visit for DTC Galway!
    Phone Number: ${req.body.phone} 
    Mail: ${req.body.mail}`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

//Config things
const port = 8000;

app.listen(port, () => {
  console.log("listining on port " + port + ", http://localhost:" + port);
});
