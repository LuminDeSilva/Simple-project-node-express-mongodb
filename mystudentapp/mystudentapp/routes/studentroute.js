const express=require('express')
const router = express.Router()
const studentModules = require('./my_modules/student')

router.get('/',(req,res)=>{
    res.json(studentModules.getAllStudent())
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    res.json(studentModules.getStudentById(id))
})

//add a student
router.post('/',(req,res)=>{
    const {id,name,course,age}=req.body;
    if (!id || !name || !course || !age) {
        res.status(400).send("Please provide the required fields");
    }
    else{
        const student = {id,name,course,age};
        studentModules.addStudent(student);
        res.status(200).json(student);
    }
})
// update the student
router.put('/:id',(req,res)=>{
    const id=req.params.id;
    const newData = req.body;
    const result = studentModules.updateStudent(id,newData);
    if( result !== null){
        res.status(200).json(result);
    }
    else{
        res.status(404).send("Student Not Found");
    }
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    const result = studentModules.deleteStudent(id);
    if( result !== null){
        res.status(200).json(result);
    }
    else{
        res.status(404).send("Student Not Found");
    }
})

//create a function to filter the students based on their degree and age
//IT ,less or more, 25

router.get('/:course/:age/:act',(req,res)=>{
    const course= req.params.course
    const age = req.params.age
    const act= req.params.act
    res.json(studentModules.filterStudents(course,age,act))
})

router.get('/:id/skills',(req,res)=>{
    const id=req.params.id
    res.json(studentModules.findSkillsById(id))
})

router.get('/skills/:sk',(req,res)=>{
    const sk=req.params.sk
    res.json(studentModules.searchBySkill(sk))
})

//1 authentication user name, password - verify it 
//2 JWT authentication - self reference
module.exports = router