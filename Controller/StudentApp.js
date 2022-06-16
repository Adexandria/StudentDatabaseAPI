//Import modules
//const Student = require('./Model/Student.js').Student;
const GetAllStudents = require('../Repository/StudentRepository').GetAllStudents;
const CreateStudent = require('../Repository/StudentRepository').CreateStudent;
const GetStudentById = require('../Repository/StudentRepository').GetStudentById;
const GetStudentsByName = require('../Repository/StudentRepository').GetStudentsByName;
const GetStudentsByState = require('../Repository/StudentRepository').GetStudentsByState;
const GetStudentsByGender = require('../Repository/StudentRepository').GetStudentsByGender;
const GetStudentsByClass = require('../Repository/StudentRepository').GetStudentsByClass;
const UpdateStudentById = require('../Repository/StudentRepository').UpdateStudentById;
const DeleteStudentById = require('../Repository/StudentRepository').DeleteStudentById;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.get('/api/students', (req, res) => {
    GetAllStudents((err,data)=>{
        if(err) return next(err);
        res.json(data);
    })
});

app.get('/api/students/:id', (req, res) => {
    var id = req.params.id;
    GetStudentById(id,(err,data)=>{
        if(err) return next(err);
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});
app.get('/api/students/names/filter', (req, res) => {
    var name = req.query.name;
    console.log(name);
    GetStudentsByName(name,(err,data)=>{
        if(err) return next(err);
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});
app.get('/api/students/states/filter', (req, res) => {
    var state = req.query.state;
    GetStudentsByState(state,(err,data)=>{
        if(err) return next(err);
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});
app.get('/api/students/genders/filter',(req,res)=>{
    var gender = req.query.gender;
    GetStudentsByGender(gender,(err,data)=>{
        if(err) return next(err);
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});

app.get('/api/students/classes/filter',(req,res)=>{
    var level = req.query.class;
    GetStudentsByClass(level,(err,data)=>{
        if(err) return next(err);
        if(!data) res.status(404).send('Not found');    
        res.json(data);
    });
});

app.post('/api/students',(req,res)=>{
    var student = req.body;
    CreateStudent(student,(err,data)=>{
        if(err) return next(err);
        res.send("Created successfully");
    });
});

app.put('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    var student = req.body;
    UpdateStudentById(id,student,(err,data)=>{
        if(err) return next(err);
        res.send("Updated successfully");
    });
});
app.delete('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    DeleteStudentById(id,(err,data)=>{
        if(err) return next(err);
        res.send("Deleted successfully");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});