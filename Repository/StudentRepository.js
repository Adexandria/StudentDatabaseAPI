const Student = require('../Model/Student.js').Student;

const GetAllStudents = (done)=>
{
    Student.find((err,data)=>
    {
        if(err) return console.error(err);
         done(null,data);
    });
};
const CreateStudent = (newstudent,done)=>{

    Student.create(newstudent,(err,data)=>
    {
        if(err) return console.error(err);
         done(null,data);
    });
};
const GetStudentById=(id,done)=>{

    Student.findById(id,(err,data)=>
    {
        if(err) return console.error(err);
         done(null,data);
    });
};
const GetStudentsByName=(name,done)=>{
    Student.find({firstname:name},(err,data)=>{
        if(err) return console.error(err);
         done(null,data);
    });
};
const GetStudentsByState=(state,done)=>{
    Student.find({state:state},(err,data)=>{
        if(err) return console.error(err);
         done(null,data);
    });
};

const GetStudentsByGender=(gender,done)=>{
    Student.find({gender:gender},(err,data)=>{
        if(err) return console.error(err);
         done(null,data);
    });
};
const GetStudentsByClass=(year,done)=>{

    Student.find({class:year},(err,data)=>{
        if(err) return console.error(err);
        done(null,data);
    });
};
const UpdateStudentById=(id,student,done)=>{

    Student.updateOne({ _id:id},{ $set : student},(err,data)=>{
        if(err) return console.error(err);
            done(null,data);
    });
};
const DeleteStudentById=(id,done)=>{
    Student.findByIdAndRemove(id,(err,data)=>{
        if(err) return console.error(err);
        done(null,data);
    });
};

exports.GetAllStudents = GetAllStudents;
exports.CreateStudent = CreateStudent;
exports.GetStudentById = GetStudentById;
exports.GetStudentsByName = GetStudentsByName;
exports.GetStudentsByState = GetStudentsByState;
exports.GetStudentsByGender = GetStudentsByGender;
exports.GetStudentsByClass = GetStudentsByClass;
exports.UpdateStudentById = UpdateStudentById;
exports.DeleteStudentById = DeleteStudentById;
