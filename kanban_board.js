let addButton = document.querySelector(".add-btn");
let modalContainer = document.querySelector(".modal-cont")
let mainContainer=document.querySelector(".main-cont");
let textAreaContainer=document.querySelector(".modal-description");
let modalcolorElements=document.querySelectorAll(".priority-color");
let deleteButtonElement=document.querySelector(".min-btn");
let filterColorBoxes=document.querySelectorAll(".color-box")
let selectedPriorityColor="green";
let deleteButtonActive=false;
let ticketsStorageArray = []; 
if (localStorage.getItem("tickets")) { 
    let parsedTickets = JSON.parse(localStorage.getItem("tickets")); 
    if (Array.isArray(parsedTickets)) { 
        ticketsStorageArray = parsedTickets; 
        ticketsStorageArray.forEach(function(ticket) { 
            createTicket(ticket.textAreaContainer_val, ticket.selectedPriorityColor, ticket.uniqueId); 
        }); 
    } else { 
        console.error("Tickets data is not an array", parsedTickets); 
    }
}
// let ticketsStorageArray=[];

// if(localStorage.getItem("tickets")){
//     ticketsStorageArray=JSON.parse(localStorage.getItem("tickets"))
//     ticketsStorageArray.forEach(function(ticket){
//         createTicket(ticket.textAreaContainer_val, ticket.selectedPriorityColor, ticket.uniqueId)
//     })
// }


modalFlag = false;
addButton.addEventListener("click", function () {
    if(deleteButtonActive === true){
        deleteButtonActive=!deleteButtonActive;
        deleteButtonElement.style.color="black";
    }
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
        if(textAreaContainer.value!=""){
            createTicket(textAreaContainer.value, selectedPriorityColor)
            modalContainer.style.display = "none";
        }
        else{
            alert("You cannot create an empty ticket")
        }
        textAreaContainer.value=""
        
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


function createTicket(textAreaContainer_val, selectedPriorityColor, uniqueId) {
    let Id=uniqueId || shortid();
    let ticketContainer = document.createElement("div")
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `
            <div class="ticket-color-cont ${selectedPriorityColor}"></div>
            <div class="ticket-id" > ${Id}</div>
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
    if(!uniqueId){
        ticketsStorageArray.push({selectedPriorityColor, uniqueId:Id, textAreaContainer_val})
        localStorage.setItem("tickets",JSON.stringify(ticketsStorageArray))
    }
    
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

            //updating the updated description in the local storage 
            ExistedLocalStorageArray=JSON.parse(localStorage.getItem("tickets"))
            console.log(ExistedLocalStorageArray)
            descriptionchangedForticketID=ticketContainer.querySelector(".ticket-id").innerText;
            for(let i=0;i<ExistedLocalStorageArray.length;i++){
                if(ExistedLocalStorageArray[i].uniqueId === descriptionchangedForticketID){
                    ExistedLocalStorageArray[i].textAreaContainer_val=ticketContainerTaskDescriptionArea.innerText;
                    break;
                }
            }
            localStorage.setItem('tickets', JSON.stringify(ExistedLocalStorageArray))

            
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
            //removing the ticket from Local storage
            deletedTicketId=ticketContainer.querySelector(".ticket-id").innerText
            ExistedLocalStorageArray=JSON.parse(localStorage.getItem("tickets"))
            
            ExistedLocalStorageArray = ExistedLocalStorageArray.filter(function(ticket) { 
                return ticket.uniqueId !== deletedTicketId;
            })
            localStorage.setItem('tickets',JSON.stringify(ExistedLocalStorageArray))
            //removing from html dom
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
        //getting the element for which color has been updated
        //and updating the same in the local storage
        ExistedLocalStorageArray=JSON.parse(localStorage.getItem("tickets"))
        ColorchangedForticketID=ticketContainer.querySelector(".ticket-id").innerText;
        for(let i=0;i<ExistedLocalStorageArray.length;i++){
            if(ExistedLocalStorageArray[i].uniqueId === ColorchangedForticketID){
                ExistedLocalStorageArray[i].selectedPriorityColor=newColor;
                break;
            }
        }
        localStorage.setItem('tickets', JSON.stringify(ExistedLocalStorageArray))
    }
    )
}

//adding the event listener to every color box for filtering process
//after clicking the color box, we are deleting every ticket and getting back the tickets from stored array
for(let i=0; i<filterColorBoxes.length; i++){
    //single click to fliter according to the color which was clicked
    filterColorBoxes[i].addEventListener("click",function(){
        
        allTicketsCreated=document.querySelectorAll(".ticket-cont")
        for(let j=0; j<allTicketsCreated.length;j++){
            allTicketsCreated[j].remove()
        }
        
        let selectedColorBox = filterColorBoxes[i].classList[1]
        ticketsStorageArray=JSON.parse(localStorage.getItem("tickets"))
        let filteredTickets=ticketsStorageArray.filter(function(ticket){
            return selectedColorBox === ticket.selectedPriorityColor
        })
        filteredTickets.forEach(function(filteredTicket){
            createTicket(filteredTicket.textAreaContainer_val, filteredTicket.selectedPriorityColor, filteredTicket.uniqueId)
        })
    })
     
    //double click to render all the ticket which stored in the local storage
    filterColorBoxes[i].addEventListener("dblclick",function(){
        let allTicketsCreated = document.querySelectorAll(".ticket-cont"); 
        allTicketsCreated.forEach(function(ticket) { 
            ticket.remove(); 
        }); 
        // Render all tickets stored from ExistedLocalStorageArray 
        ExistedLocalStorageArray=JSON.parse(localStorage.getItem("tickets"))
        ExistedLocalStorageArray.forEach(function(ticket) { 
            createTicket(ticket.textAreaContainer_val, ticket.selectedPriorityColor, ticket.uniqueId); 
        });

    })



}



