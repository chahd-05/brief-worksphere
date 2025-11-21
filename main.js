const btn = document.querySelector(".btn-1");
const modal = document.getElementById("add-modal");
const background = document.getElementById("bg");
const cancelBtn = document.getElementById("cancel");
const addBtn = document.getElementById("add-worker");

btn.addEventListener("click",() => {
    modal.style.display = "block";
    background.style.display = "block";

});

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    background.style.display = "none";
});


const nameinput = document.getElementById("worker-name");
const roleinput = document.getElementById("worker-role");
const emailinput = document.getElementById("worker-email");
const phoneinput = document.getElementById("worker-phone");

const employeeslist = document.getElementById("employees"); 

addBtn.addEventListener("click", ()=> {

    const name = nameinput.value.trim();
    const role = roleinput.value.trim();
    const email = emailinput.value.trim();
    const phone = phoneinput.value.trim();
    
    if (!name || !email || !phone){
        alert ("please fill all the fields !!");
    return;
    }

    const employeeId = document.createElement("div");
    employeeId.classList.add("employeeId");
    
    employeeId.innerHTML = 
   ` <div class="worker-card">
    <h4>${name}</h4>
    <p>${role}</p>
    <p>${email}</p>
    <button class="remove">❌</button>
    </div>`

    employeeslist.appendChild(employeeId);

    modal.style.display = "none";
    background.style.display = "none";

    nameinput.value = "";
    emailinput.value = "";
    phoneinput.value = "";

    const removeBtn = employeeId.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
        employeeId.remove();
    })
    const formal = document.getElementById("worker-formal");
    employeeId.addEventListener("click", () =>{
    formal.innerHTML = 
   ` <div class="worker-card">
    <h4>${name}</h4>
    <p>${role}</p>
    <p>${email}</p>
    </div>`
    const removebtn = document.createElement("button");
    removebtn.textContent = "❌";
    removebtn.style.marginleft = "10px";
    removebtn.addEventListener("click",() =>{
    formal.classList.add("assigned-employee");
    formal.style.display = "none";
    background.style.display = "none";
   
    })
    formal.appendChild(removebtn);
    formal.style.display = "block";
    background.style.display = "block";
        
    }) 
})

const assignbutton = document.querySelectorAll(".assigned-btn");

function createAssignedEmployee(name, role) {
    const div = document.createElement("div");
    div.classList.add("assigned-employee");
    div.textContent = `${name} (${role})`;

    const removebtn = document.createElement("button");
    removebtn.textContent = "❌";
    removebtn.style.marginleft = "10px";
    removebtn.addEventListener("click",() =>{
        div.remove();
    });

    div.appendChild(removebtn);
    return div;
}

assignbutton.forEach(btn => {
    btn.addEventListener("click",() => {
        const firstemployee = employeeslist.querySelector(".employeeId");
        if (!firstemployee) {
            alert("no employee to assign !!");
            return;
        }

        const name = firstemployee.querySelectorAll(".roles").textContent;
        const role = firstemployee.querySelectorAll(".para").textContent;

        const assigndiv = createAssignedEmployee(name, role);

        const assigncontainer = btn.nextElementSibling;

        const emptytext =assigncontainer.querySelector(".para");
        if (emptytext) emptytext.remove();

        assigncontainer.appendChild(assigndiv);
    });
});
