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
});

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

  });

router.route('/users/:username')
  .get((req, res) => {
    connection.query(`SELECT * FROM sellrequest WHERE username = "${req.params.username}"`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })

  });

router.route('/sellrequest/:username/:VIN')
  .get((req, res) => {
    connection.query(`INSERT INTO sellrequest VALUES(${req.params.VIN},${req.params.username},${req.body.ap},${req.body.dur})`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })
  .post((req, res) => {
    connection.query(`UPDATE sellrequest SET AskingPrice = ${req.body.askingprice}, RequestDuration = ${req.body.duration} WHERE VIN = "${req.params.VIN}" AND username = "${req.params.username} "`, (err, rows, fields) => {
      if (err) throw err;
      res.status(200).send("updated scccesfully");
    })

  });

//given dealership find salesrep with highest hours worked
//give raise to them (10%)
router.route('/dealership/:CompanyName')
  .get((req, res) => {
    connection.query(`SELECT MAX(Hours), Salary, PhoneNumber FROM (SELECT * FROM (SELECT Email, CompanyName FROM (SELECT * FROM dealership NATURAL JOIN adminaccount ) AS Company) AS hello NATURAL JOIN salesrep AS Contact WHERE CompanyName = "${req.params.CompanyName}") AS high`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })
router.route('/salesrep/:raise/:phonenumber')
  .get((req, res) => {
    connection.query(`UPDATE salesrep SET salary = salary * ${1 + (req.params.raise / 100)} WHERE phonenumber = ${req.params.phonenumber}`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })

//search buyers younger than 20, edit age
//get all transaction numbers of these buyers
router.route('/useraccount')
  .get((req, res) => {
    connection.query(`SELECT Email, MIN(SalesReps) FROM (SELECT Email, COUNT(Username) AS SalesReps FROM (SELECT * FROM SalesRep NATURAL JOIN AdminAccount) AS Emails GROUP BY Username HAVING COUNT(Username) > 1) AS reps`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })
router.route('/salesrep')
  .post((req, res) => {
    connection.query(`INSERT INTO SalesRep VALUES ("${req.body.pn}", "${req.body.name}", ${req.body.age}, "${req.body.gender}", ${req.body.salary}, ${req.body.hours}, "${req.body.email}")`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })

//delete transaction number from id
router.route('/transaction/')
  .get((req, res) => {
    connection.query(`SELECT * FROM transactioninfo`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })

router.route('/transaction/:id')
  .delete((req, res) => {
    connection.query(`DELETE FROM transactioninfo WHERE TransactionNum = ${req.params.id}`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })

//add sell request
router.route('/sellrequest')
  .get((req, res) => {
    connection.query(`SELECT * FROM sellrequest`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    })
  })




app.use("/api", router)

app.listen(port, () => { console.log(`listening on port ${port}...`) });