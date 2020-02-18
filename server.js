const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");

const PORT = process.env.PORT || 8002;

app.use(express.static(path.join(__dirname, 'build')));

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'build/index.html'));  
    })
}

app.get('*', (req, res) => {
    app.sendFile(path.join(__dirname + 'public/index.html'));
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

const MAX_PARTICIPANTS = 30;

let participants = {};

//{clientId,content, thumbs up, thumsb down, comments, username, visible }}
let messages = [];

const enrollParticipant = (userName, headPortrait, clientId) => {

    if (Object.keys(participants).length < MAX_PARTICIPANTS && !clientIsParticipant(clientId)) {
        addParticipant(userName, headPortrait, clientId);
    }
    return {
        clientId,
        participants
    }
}

// Returns true if the given client is already in the participants object
const clientIsParticipant = clientId => Object.keys(participants).includes(clientId);

// Removes disconnected clients from the participants object
const cleanUpParticipants = () => {
    const connectedClients = Object.keys(io.sockets.connected);
    const participantIds = Object.keys(participants);
    for (participant of participantIds) {
        if (!connectedClients.includes(participant))
            delete participants[participant];
    }
}

// Adds a client to the participants object
const addParticipant = (userName, headPortrait, clientId) => {
    participants[clientId] = {
        userName: userName,
        headPortrait: headPortrait,
    }
    io.sockets.emit("participants updated", participants);
}

const removeParticipant = (clientId) => {
    delete participants[clientId];
    io.sockets.emit("participants updated", participants);

}

const addMessage = (content, userName, headPortrait, clientId) => {
    const length = messages.length;
    messages.push({
        messageId: length,
        clientId: clientId,
        content: content,
        userName: userName,
        headPortrait: headPortrait,
        thumbUps: [],
        thumbDowns: [],
        comments: [],
        visible: true,
    });
}

const hideMessage = (messageId) => {
    messages[messageId] = {
        ...messages[messageId],
        visible: false,
    }
}

const thumbUpMessage = (messageId, userName) => {
    let upArr = messages[messageId]['thumbUps'];
    let downArr = messages[messageId]['thumbDowns'];
    var upIndex = upArr.indexOf(userName);
    var downIndex = downArr.indexOf(userName);
    if (upIndex !== -1) {
        // cancel thumbs up
        upArr.splice(upIndex, 1);
        messages[messageId] = {
            ...messages[messageId],
            thumbUps: upArr,
        }
    }
    else if (downIndex === -1) {
        upArr.push(userName);
        messages[messageId] = {
            ...messages[messageId],
            thumbUps: upArr,
        }
    }
    else {
        downArr.splice(downIndex, 1);
        upArr.push(userName);
        messages[messageId] = {
            ...messages[messageId],
            thumbUps: upArr,
            thumbDowns: downArr,
        }
    }
}

const thumbDownMessage = (messageId, userName) => {
    let upArr = messages[messageId]['thumbUps'];
    let downArr = messages[messageId]['thumbDowns'];
    const upIndex = upArr.indexOf(userName);
    const downIndex = downArr.indexOf(userName);
    if (downIndex !== -1) {
        // cancel thumbs down
        downArr.splice(downIndex, 1);
        messages[messageId] = {
            ...messages[messageId],
            thumbDowns: downArr,
        }
    }
    else if (upIndex === -1) {
        downArr.push(userName);
        messages[messageId] = {
            ...messages[messageId],
            thumbDowns: downArr,
        }
    } else {
        upArr.splice(upIndex, 1);
        downArr.push(userName);
        messages[messageId] = {
            ...messages[messageId],
            thumbUps: upArr,
            thumbDowns: downArr,
        }
    }
}

const addCommentToMessage = (messageId, userName, comment) => {
    let arr = messages[messageId][comments];
    arr.push({ userName, comment });
    messages[messageId] = {
        ...messages[messageId],
        comments: arr
    }
}

io.on("connection", (client) => {
    io.sockets.emit("notification", client.id + " has connected to the server");

    client.on("request to join", (userInfo) => {
        cleanUpParticipants();
        client.emit("join result", enrollParticipant(userInfo.userName, userInfo.headPortrait, client.id));

        io.sockets.emit("messages updated", messages);
    })

    client.on("new message", (messageInfo) => {
        addMessage(messageInfo.content, messageInfo.userName, messageInfo.headPortrait, client.id);
        io.sockets.emit("messages updated", messages);
    })

    client.on("hide a message", (messageId, username) => {
        hideMessage(messageId, username);
        io.sockets.emit("messages updated", messages);
    })

    client.on("thumb up a message", (messageInfo) => {
        thumbUpMessage(messageInfo.messageId, messageInfo.userName);
        io.sockets.emit("messages updated", messages);
    })

    client.on("thumb down a message", (messageInfo) => {
        thumbDownMessage(messageInfo.messageId, messageInfo.userName);
        io.sockets.emit("messages updated", messages);
    })

    client.on("comment a message", (messageId, userName, comment) => {
        addCommentToMessage(messageId, userName, comment);
        io.sockets.emit("messages updated", messages);
    })

    client.on('leave the room', () => {
        removeParticipant(client.id);
    })
});