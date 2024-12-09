let addButton = document.querySelector(".add-btn");
let modalContainer = document.querySelector(".modal-cont")
let mainContainer=document.querySelector(".main-cont");
let textAreaContainer=document.querySelector(".modal-description");
let modalcolorElements=document.querySelectorAll(".priority-color");
let deleteButtonElement=document.querySelector(".min-btn");
let selectedPriorityColor="green";
let deleteButtonActive=false;


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
            <div class="ticket-color-cont ${selectedPriorityColor}"></div>
            <div class="ticket-id" > ticket 1</div>
            <div class="ticket-description">${textAreaContainer_val}</div>
            <div class="lock-unlock">
                <i class="fa-solid fa-lock"></i>
            </div>
            `
    console.log(ticketContainer.classList)
    mainContainer.appendChild(ticketContainer);
    lockUnlock(ticketContainer)
    handleDelete(ticketContainer)
    changePriorityColor(ticketContainer)
}


function lockUnlock(ticketContainer){
    let lockUnlockElement = ticketContainer.querySelector(".lock-unlock").children[0]
    let ticketContainerTaskDescriptionArea=ticketContainer.querySelector(".ticket-description")
    lockUnlockElement.addEventListener("click",function(){
        if(lockUnlockElement.classList.contains("fa-lock")){
            lockUnlockElement.classList.remove("fa-lock")
            lockUnlockElement.classList.add("fa-unlock")
            ticketContainerTaskDescriptionArea.setAttribute("contenteditable","true");
        }
        else{
            lockUnlockElement.classList.remove("fa-unlock")
            lockUnlockElement.classList.add("fa-lock")
            ticketContainerTaskDescriptionArea.setAttribute("contenteditable","false");
        }
    })
}

deleteButtonElement.addEventListener("click",function(){
    deleteButtonActive = !deleteButtonActive
    if(deleteButtonActive === true){
        deleteButtonElement.style.color="red";
    }
    else{
        deleteButtonElement.style.color="black";
    }
})

function handleDelete(ticketContainer){
    ticketContainer.addEventListener("click",function(){
        if(deleteButtonActive === true){
            ticketContainer.remove()
        }
        else{
            return
        }
    })
}

function changePriorityColor(ticketContainer){

    
    let currentColorBand=ticketContainer.querySelector(".ticket-color-cont")
    currentColorBand.addEventListener("click",function(){
        defaultColors=["green","yellow","blue","red"];
        let currentColor=currentColorBand.classList[1]
        let currentColorIdx=defaultColors.findIndex(function(color){
            return currentColor === color
        })
        //to get the next color from array, when you click on color band of ticket 
        //to be in the range of 4 we are using modulo
        currentColorIdx= (currentColorIdx+1)%(defaultColors.length)
        newColor=defaultColors[currentColorIdx]
        currentColorBand.classList.remove(currentColor)
        currentColorBand.classList.add(newColor)


    })
    
    
}



