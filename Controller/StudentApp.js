//Import modules
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
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * components:
 *  schemas:
 *    Parent:
 *      type: object
 *      required:
 *        - name
 *        - phonenumber
 *        - address
 *      properties:
 *        id:
 *          type: integer
 *          description: The Auto-generated id of a parent
 *        name:
 *          type: string
 *          description: name of the parent
 *        phonenumber:
 *          type: string
 *          description: phonenumber of the parent
 *        address: 
 *          type: string
 *          description: address of the parent   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstname
 *         - middlename
 *         - lastname
 *         - dateofbirth
 *         - state
 *         - parent
 *         - class
 *         - gender
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a student
 *         firstname:
 *           type: string
 *           description: first name of the student
 *         middlename:
 *           type: string
 *           description: middle name of the student
 *         lastname:
 *           type: string
 *           description: last name of the student
 *         dateofbirth:
 *           type: date
 *           description: date of birth of the student
 *         state:
 *           type: string
 *           description: state of the student
 *         parent:
 *           type: schema
 *           description: parent of the student
 *         class:
 *           type: string
 *           description: class of the student
 *         gender: 
 *           type: string
 *           description: gender of the student
 *       example:
 *         firstname : Adeola
 *         middlename: Wuraola
 *         lastname : Aderibigbe
 *         dateofbirth : 1999-12-11
 *         state: Lagos
 *         class: SS2
 *         parent : {
 *             name : Adenike Aderibigbe
 *             address:No 1 jojs
 *             phone:08129812808
 *           }
 *         gender: Female 
 *
 */

/**
 * @swagger
 * tags:
 *  name: Students
 *  description: Secondary School Students
 */

/**
 * @swagger
 * /api/students:
 *  get:
 *     summary: Returns all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */   
router.get('/api/students', (req, res) => {
    GetAllStudents((err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        res.json(data);
    })
});

/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *     summary: Returns a student by id
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: student not found
 *       500:
 *         description: Some server error
 */   
router.get('/api/students/:id', (req, res) => {
    var id = req.params.id;
    GetStudentById(id,(err,data)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});

/**
 * @swagger
 * /api/students/filter/name:
 *  get:
 *     summary: Returns students by name
 *     parameters:
 *       - in : query
 *         name: name
 *         description: name of student
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: the student
 *       500:
 *         description: Some server error
 */ 
router.get('/api/students/filter/name', (req, res) => {
    var name = req.query.name;
    GetStudentsByName(name,(err,data)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});

/**
 * @swagger
 * /api/students/filter/state:
 *  get:
 *     summary: Returns students by state
 *     parameters:
 *       - in : query
 *         name: state
 *         description: state of student
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Not found
 *       500:
 *         description: Some server error
 */ 
router.get('/api/students/filter/state', (req, res) => {
    var state = req.query.state;
    GetStudentsByState(state,(err,data)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});
/**
 * @swagger
 * /api/students/filter/gender:
 *  get:
 *     summary: Returns students by gender
 *     parameters:
 *       - in : query
 *         name: gender
 *         description: gender of student
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Not found
 *       500:
 *         description: Some server error
 */ 
router.get('/api/students/filter/gender',(req,res)=>{
    var gender = req.query.gender;
    GetStudentsByGender(gender,(err,data)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});

/**
 * @swagger
 * /api/students/filter/class:
 *  get:
 *     summary: Returns students by class
 *     parameters:
 *       - in : query
 *         name: class
 *         description: class of student
 *         schema:
 *           type: string
 *         required: true
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Not found
 *       500:
 *         description: Some server error
 */ 
router.get('/api/students/filter/class',(req,res)=>{
    var level = req.query.class;
    GetStudentsByClass(level,(err,data)=>{
        if(err)  
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');    
        res.json(data);
    });
});

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Created successfully
 *       500:
 *         description: Some server error
 */

router.post('/api/students',(req,res)=>{
    var student = req.body;
    CreateStudent(student,(err)=>{
        if(err)  
        {
            res.status(500).send(err);
        }
        res.send("Created successfully");
    });
});

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       500:
 *         description: Some server error
 */

router.put('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    var student = req.body;
    UpdateStudentById(id,student,(err)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        res.send("Updated successfully");
    });
});

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete an existing student
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       500:
 *         description: Some server error
 */
router.delete('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    DeleteStudentById(id,(err)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        res.send("Deleted successfully");
    });
});
exports.router = router;