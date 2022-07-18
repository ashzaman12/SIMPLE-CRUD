const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeesystem',
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const address = req.body.address;
    const position = req.body.position;

    db.query(
        'INSERT INTO employees (firstname, lastname, age, address, position) VALUES (?,?,?,?,?)',
        [firstname, lastname, age, address, position],
        (err, result)=> {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/employees", (req,res) => {
    db.query("SELECT * FROM employees",(err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});  

app.put("/update", (req, res) => {
    const personid = req.body.personid;
    const age = req.body.age;
    db.query(
        "UPDATE employees SET age = ? WHERE personid = ?", 
        [age, personid], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.delete("/delete/:personid", (req, res) => {
    const personid = req.params.personid;
    db.query(
        "DELETE FROM employees WHERE personid = ?", 
        personid, 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }    
    );
});

app.listen(3001, ()=> {
    console.log("server is running on port 3001")
});