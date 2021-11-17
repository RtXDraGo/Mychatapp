const socket = io('http://localhost:8000')
const form=document.getElementById('sendcon')
const msg=document.getElementById('content')
const cont=document.querySelector('.container')
var audio=new Audio('ting.mp3')

const append=(message,position)=>{
    const msgelement=document.createElement('div')
    msgelement.innerText=message
    msgelement.classList.add('box');
    msgelement.classList.add(position);
    cont.append(msgelement);
    if(position=='left')
    audio.play();
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=msg.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message)
    msg.value='';
})
const namee = prompt("Enterv your name");
socket.emit('new-user-joined',namee)
socket.on('user-joined',namee=>{
    append(`${namee} joined the chat`,'right');
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on('left',namee=>{
    append(`${namee} left the chat`,'left');
})