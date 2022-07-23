const socket = io()
let userName;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.chat_body')

do{
   userName = prompt("please enter your name")
}while(!userName)


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: userName,
        message: message.trim()
    }

    //Append
    appendMessage(msg, "right")
    textarea.value = ''

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

//Receive messages

socket.on('message', (msg)=>{
    appendMessage(msg,'left')
})