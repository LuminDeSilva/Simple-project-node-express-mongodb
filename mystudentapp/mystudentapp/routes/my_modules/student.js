let students=[
    {'id':'IT1001','name':'Peter','course':'IT','age':23,'skills':['C++','JS','PhP']},
    {'id':'IT1002','name':'Gemini','course':'IT','age':24,'skills':['Java','JS','Python','MySQL']},
    {'id':'IT1003','name':'Anne','course':'IT','age':26,'skills':['MySQL','Python','Java']},
    {'id':'ASB2001','name':'Paul','course':'Bio','age':25,'skills':['water treatment','soil test']},
    {'id':'ASB2002','name':'Maaran','course':'Bio','age':23,'skills':['GIS','Plantology','Eco tourism']}
]

function getAllStudent() {
    return students;
}

function getStudentById(id){
    return students.find((student)=>student.id === id)
}

function getStudentByCourse(course){
    return students.find((student)=>student.course === course)
}

function addStudent(student){
    students.push(student);
}

function updateStudent(id,newData){
    const index = students.findIndex((student)=>student.id === id);
    if (index !== -1) {
        //console.log(students[index]);
        students[index]={...students[index],...newData};
        return students[index];
    }
    return null;
}
//delete
function deleteStudent(id) {
    const index = students.findIndex((student)=>student.id === id);
    if (index !== -1) {
        return students.splice(index,1);
    }
    return null;
}

function filterStudents(course,age,action){
    let out=[]
    students.map((student)=>{
        if (action === 'lt') {
            if (student.course === course && student.age < age) {
                out.push(student)
            }
        } else {
            if (student.course === course && student.age > age) {
                out.push(student)
            }
        }  
    })
    return out;
}

 //shows the skills of given student id
 function findSkillsById(id){
    return students.find((student)=>student.id === id).skills
}
//search the students by a skill
function searchBySkill(skill) {
    return students.filter((student)=> student.skills.includes(skill))
}
module.exports={
    getAllStudent,
    getStudentById,
    getStudentByCourse,
    addStudent,
    updateStudent,
    deleteStudent,
    filterStudents,
    findSkillsById,
    searchBySkill
}