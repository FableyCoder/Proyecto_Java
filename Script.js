const students=[];

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
    totalEstudiantes()
    calcularExamen()
    calcularAprobado()

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
    //editEstudiante(student);
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
    // Esta Funcion no funciona 
    const index=students.indexOf(student);
    if(index > -1){
        botonCambio.textContent="Editar";
        const valores = students[index];
        document.getElementById("name").value = valores.name;
        document.getElementById("lastName").value = valores.lastName;
        document.getElementById("grade").value = valores.grade;
        botonCambio.addEventListener("input",function(e){
            e.preventDefault()

            const Nname=document.getElementById("name").value.trim();
            const NlastName=document.getElementById("lastName").value.trim();
            const Ngrade=parseFloat(document.getElementById("grade").value);
    
            if(!Nname || !NlastName || isNaN(Ngrade) || Ngrade<1 || Ngrade>7){
                alert("Error al ingresar los datos")
                return
            }
    
            valores.name = Nname
            valores.lastName = NlastName
            valores.grade = Ngrade
            students.splice(index,1,valores[0])
            botonCambio.textContent="Guardar"
    
            this.reset()
        });
    }
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

const studentTotal=document.getElementById("total")

const studentExamen=document.getElementById("examen")

const studentEximido=document.getElementById("eximido")

function totalEstudiantes(){
    if(students.length===0){
        studentTotal.textContent="Hay 0 Estudiantes En Total"
        return
    }
    if(students.length===1){
        studentTotal.textContent="Hay 1 Estudiante En Total"
        return
    }

    const cantidad=students.length;
    studentTotal.textContent="Hay "+cantidad+" Estudiantes En Total"
}

function calcularExamen(){
    if(students.length===0){
        studentExamen.textContent="Estudiantes Que Deben Examen : N/A"
        return
    }

    const notadeficiente = students.filter((student)=>student.grade<=5.0,0);
    const Dexamen = notadeficiente.length;
    studentExamen.textContent="Estudiantes Que Deben Examen : "+Dexamen
}

function calcularAprobado(){
    if(students.length===0){
        studentEximido.textContent="Estudiantes Eximidos : N/A"
        return
    }

    const notaAprobada = students.filter((student)=>student.grade>5.0,0);
    const eximido = notaAprobada.length;
    studentEximido.textContent="Estudiantes Eximidos : "+eximido
}