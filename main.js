let currentZone = null;
const btn = document.querySelector(".btn-1");
const modal = document.getElementById("add-modal");
const background = document.getElementById("bg");
const cancelBtn = document.getElementById("cancel");
const addBtn = document.getElementById("add-worker");

btn.addEventListener("click", () => {
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
const pic = document.getElementById("picture").value.trim()

addBtn.addEventListener("click", () => {
    const name = nameinput.value.trim();
    const role = roleinput.value.trim();
    const email = emailinput.value.trim();
    const phone = phoneinput.value.trim();

    if (!name || !email || !phone) {
        alert("please fill all the fields !!");
        return;
    }

    const employeeId = document.createElement("div");
    employeeId.classList.add("employeeId");
    employeeId.dataset.role = role;
    employeeId.dataset.name = name;
    employeeId.innerHTML = `
        <div class="worker-card">
            <img src = "${pic}">
            <h4>${name}</h4>
            <p>${role}</p>
            <p>${email}</p>
            <button class="remove">❌</button>
        </div>
    `;

    employeeslist.appendChild(employeeId);

    modal.style.display = "none";
    background.style.display = "none";
    nameinput.value = "";
    emailinput.value = "";
    phoneinput.value = "";

    const removeBtn = employeeId.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
        employeeId.remove();
    });

    const formal = document.getElementById("worker-formal");
    employeeId.addEventListener("click", () => {
        formal.innerHTML = `
            <div class="worker-card">
                <h4>${name}</h4>
                <p>${role}</p>
                <p>${email}</p>
            </div>
        `;
        const removebtn = document.createElement("button");
        removebtn.textContent = "❌";
        removebtn.style.marginLeft = "10px";
        removebtn.addEventListener("click", () => {
            formal.classList.add("assigned-employee");
            formal.style.display = "none";
            background.style.display = "none";
        });
        formal.appendChild(removebtn);
        formal.style.display = "block";
        background.style.display = "block";
    });
});

document.querySelectorAll(".assigned-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const zone = btn.parentElement;
        const zoneid = zone.dataset.zone;
        currentZone = zone;

        const employees = document.querySelectorAll(".employeeId");
        const available = Array.from(employees).filter(emp => !emp.dataset.zone && check(emp.dataset.role, zoneid));

        const popup = document.getElementById("employeepick");
        const theemppicker = document.getElementById("emmp");
        theemppicker.innerHTML = "";

        const defaultop = document.createElement("option");
        defaultop.value = "";
        defaultop.textContent = "Select a worker";
        defaultop.selected = true;
        defaultop.disabled = true;
        theemppicker.appendChild(defaultop);

        available.forEach(emp => {
            const option = document.createElement("option");
            option.value = emp.dataset.name;
            option.textContent = `${emp.dataset.name} (${emp.dataset.role})`;
            theemppicker.appendChild(option);
        });

        popup.style.display = "block";
        background.style.display = "block";

        theemppicker.onchange = () => {
            const selectedName = theemppicker.value;
            const selectedEmp = Array.from(employees).find(e => e.dataset.name === selectedName);
            if (selectedEmp) {
                const contzone = zone.querySelector(".assigned-employee");
                contzone.querySelector(".para")?.remove();
                selectedEmp.querySelector(".remove")?.remove();

                const wipebtn = document.createElement("button");
                wipebtn.textContent = "unasign";
                wipebtn.classList.add("remove");

                wipebtn.addEventListener("click", () => {
                    employeeslist.appendChild(selectedEmp);
                    delete selectedEmp.dataset.zone;
                    wipebtn.remove();
                });

                contzone.appendChild(selectedEmp);
                selectedEmp.appendChild(wipebtn);
                selectedEmp.dataset.zone = zoneid;

                popup.style.display = "none";
                background.style.display = "none";
            }
        };
    });
});

function check(role, zone) {
    if (role === "Janitor") return true;
    if (zone === "conference room" || zone === "staff room") return true;
    if (role === "Manager") return true;
    if (role === "Receptionist" && zone === "Reception") return true;
    if (role === "IT Technician" && zone === "Server room") return true;
    if (role === "Security" && zone === "Security room") return true;
    if (role === "Cleaning" && zone !== "Archives room") return true;
    return false;
}

document.getElementById("hide").addEventListener("click", () => {
    employeepick.style.display = "none";
    background.style.display = "none";
});
