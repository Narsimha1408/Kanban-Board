let addButton = document.querySelector(".add-btn");
let modalContainer = document.querySelector(".modal-cont")
let mainContainer=document.querySelector(".main-cont");
let textAreaContainer=document.querySelector(".modal-description");
let modalcolorElements=document.querySelectorAll(".priority-color")
let selectedPriorityColor="green"

modalFlag = false;
addButton.addEventListener("click", function () {
    modalFlag = !modalFlag;
    if (modalFlag == true) {
        modalContainer.style.display = "flex";
    }
    else {
        modalContainer.style.display = "none";
    }
})

modalContainer.addEventListener("keydown", function (e) {
    if (e.key === "Shift") {
        createTicket(textAreaContainer.value, selectedPriorityColor)
        modalContainer.style.display = "none";
    }

})

//here iam making the color active when u select color on modal colors
//passing the selected color to ticket while adding the ticket
modalcolorElements.forEach(function(eachColorElem){
    eachColorElem.addEventListener("click",function(){
        modalcolorElements.forEach(function(colorElem){
            colorElem.classList.remove("active-color")
        })
        eachColorElem.classList.add("active-color")
        selectedPriorityColor = eachColorElem.classList[0]
        console.log(selectedPriorityColor)
    })
})


function createTicket(textAreaContainer_val, selectedPriorityColor) {
    
    let ticketContainer = document.createElement("div")
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `
            <div class="ticket-color ${selectedPriorityColor}"></div>
            <div class="ticket-id" > ticket 1</div>
            <div class="ticket-description">${textAreaContainer_val}</div>
            <div class="lock-unlock">
                <i class="fa-solid fa-lock"></i>
            </div>
            `
    console.log(ticketContainer.classList)
    mainContainer.appendChild(ticketContainer);
}

