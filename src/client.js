const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
let host = process.env.NODE_ENV === 'production' ?
    "micro-chat-room.herokuapp.com" : "localhost:8002"   
// let host =  "localhost:8002";
let socket = socketIOClient.connect(host, { secure: true });

console.log("connected to " + host);

socket.on("notification", message => {
    console.log(message);
});

socket.on("participants updated", participants => {
    document.dispatchEvent(new CustomEvent("participantsupdated", { detail: participants }));
});

socket.on("messages updated", messages => {
    document.dispatchEvent(new CustomEvent("messagesupdated", { detail: messages }));
})

export const joinGame = (userName, headPortrait,callbackFunc) => {
    console.log("joining");
    socket.emit("request to join", {userName: userName, headPortrait:headPortrait});

    socket.on("join result", result => {
        callbackFunc(result);
    })
}

export const newMessage = (message, userName, headPortrait) =>{ 
    socket.emit("new message",{content:message, userName:userName, headPortrait:headPortrait})};
export const hideMessage = (messageId, userName) => socket.emit("hide a message", {messageId:messageId, userName:userName});
export const thumbUpMessage = (messageId, userName) => socket.emit("thumb up a message", {messageId:messageId, userName:userName});
export const thumbDownMessage = (messageId, userName) => socket.emit("thumb down a message",  {messageId:messageId, userName:userName});
export const addCommentToMessage = (messageId, userName, comment) => socket.emit("comment a message", {messageId:messageId, userName:userName, comment:comment});
export const leaveRoom=()=>{socket.emit("leave the room")};