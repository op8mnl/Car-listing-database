import express from 'express';
const app = express();
const router = express.Router();
import mysql from 'mysql';

//Assigning Constants
const port = process.env.PORT || 3000;
const host = 'localhost';
const usr = 'root';
const pswd = 'Password';
const db = 'sys';

app.use(express.json());

//connect to mysql db
const connection = mysql.createConnection({
  host: `${host}`,
  user: `${usr}`,
  password: `${pswd}`,
  database: `${db}`
})

connection.connect(function (err) {
  if (err) { throw err }
  else { console.log("Connected to MySQL DB") }
});


/** Connection example:
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
**/

//using express to load front end files from static
app.use('/', express.static('static'));

//middleware for logging 
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next();
});

//get possible users
//get VIN associated with the users
//select VIN and edit sell request
router.route('/users')
  .get((req, res) => {
    connection.query(`SELECT username FROM useraccount `, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })

  })

router.route('/users/:username')
  .get((req, res) => {
    connection.query(`SELECT * FROM sellrequest WHERE username = "${req.params.username}"`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })

  })

router.route('/sellrequest/:username/:VIN')
  .post((req, res) => {
    connection.query(`UPDATE sellrequest SET AskingPrice = ${req.body.askingprice}, RequestDuration = ${req.body.duration} WHERE VIN = "${req.params.VIN}" AND username = "${req.params.username} "`, (err, rows, fields) => {
      if (err) throw err;
      res.status(200).send("updated scccesfully");
    })

  })
//








app.use("/api", router)

app.listen(port, () => { console.log(`listening on port ${port}...`) });