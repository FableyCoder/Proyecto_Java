const students=[];

const valores = {}

document.getElementById("studentForm").addEventListener("submit",function (e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastName || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar los datos")
        return
    }

    const student={name,lastName,grade}
    students.push(student)
    console.log(students)
    addStudentToTable(student)
    calcularPromedio()

    this.reset();
});

const tableBody=document.querySelector("#studentTable tbody")
function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td> <button class='delete'>Eliminar</button> <button class='edit'>Editar</button> </td>
    `;

row.querySelector(".delete").addEventListener("click",function(){
    deleteEstudiante(student,row);
});

row.querySelector(".edit").addEventListener("click",function(){
    editEstudiante(student);
});

tableBody.appendChild(row)
}

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

const botonCambio = document.getElementById("botonG");

function editEstudiante(student){
    const index=students.indexOf(student);
    if(index > -1){
        botonCambio.textContent="Editar";
        valores = students[index];
        document.getElementById("name").value = valores.name;
        document.getElementById("lastName").value = valores.lastName;
        document.getElementById("grade").value = valores.grade;
    }
}

function updateEstudiante(student,index){
    valores.name = student.name
    valores.lastName = student.lastName
    valores.grade = student.grade
    students.splice(index,1,{valores})
    botonCambio.textContent="Guardar"
}

const promedio=document.getElementById("average")

function calcularPromedio(){
    if(students.length===0){
        promedio.textContent="Promedio General del Curso : N/A"
        return
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    promedio.textContent="Promedio General del Curso : "+prom.toFixed(2)
}