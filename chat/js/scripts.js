/**
 * Created by Gennady on 03.03.2015.
 */
var getId = function() {
    var currentDate = Date.now();
    var random = Math.random() * Math.random();
    return Math.floor(currentDate * random).toString();
};

var theMessage = function(date, sender, message) {
    return {
        date: date,
        senderName: sender,
        messageText: message,
        id: getId()
    };
};

var messageList = [];

var currentUser;

function run() {
    var appContainer = document.getElementsByClassName('wrapper')[0];
    appContainer.addEventListener('click', delegateEvent);
    var currentUser = restoreCurrentUser();
    setCurrentUser(currentUser);
    var messages = restoreMessages();
    createAllMessages(messages);
}

function setCurrentUser(user) {
    if (user == null) {
        return;
    }
    var userName = document.getElementById('sign-name');
    userName.value = user;
    onSignInClick();
}

function createAllMessages(messages) {
    if (messages == null) {
        return;
    }
    for (var i = 0; i < messages.length; i++) {
        addMessage(messages[i]);
    }
}

function updateAllMessages() {
    var chatBox = document.getElementsByClassName('chat-box')[0];
    for (var i = 0; i < messageList.length; i++) {
        updateMessage(chatBox.children[i], messageList[i]);
    }
}

function delegateEvent(evtObj) {
    if (evtObj.type === 'click') {
        if (evtObj.target.classList.contains('sign-button')) {
            onSignClick(evtObj);
        }
        if (evtObj.target.classList.contains('send-button')) {
            onMessageSend();
        }
        if (evtObj.target.classList.contains('message')) {
            onMessageEdit(evtObj.target);
        }
    }
}

function onSignClick(evtObj) {
    var signButton = evtObj.target;
    if (signButton.id == 'sign-in') {
        onSignInClick();
        return true;
    }
    if (signButton.id == 'sign-edit') {
        onSignEditClick();
        return true;
    }
    if (signButton.id == 'sign-confirm') {
        onSignInClick();
        return true;
    }
    if (signButton.id == 'sign-out') {
        onSignOutClick();
        return true;
    }
    return false;
}

function sendActivator(activate) {
    var sendMessage = document.getElementsByClassName('send-message')[0];
    var messageText = sendMessage.firstElementChild;
    messageText.disabled = !activate;
    if (activate == true) {
        messageText.value = '';
    }
    else {
        messageText.value = 'You should to sign in!';
    }
    sendMessage.lastElementChild.disabled = !activate;
}

function inputChecker(text) {
    if (text == '' || text.trim() == '') {
        alert("Check your input!");
        return false;
    }
    return true;
}

function createSignStructure(type) {
    var sign = document.getElementsByClassName('sign')[0];
    var htmlAsText;
    if (type == 'read') {
        htmlAsText = '<xmp id="user-name">' + currentUser + '</xmp>'
        + '<button id="sign-edit" class="sign-button">Edit</button>'
        + '<button id="sign-out" class="sign-button">Sign Out</button>';
    }
    if (type == 'modify') {
        htmlAsText = '<input id="sign-name" type="text" maxlength="25">'
        + '<button id="sign-confirm" class="sign-button">Confirm</button>'
        + '<button id="sign-out" class="sign-button">Sign Out</button>';
    }
    if (type == 'out') {
        htmlAsText = '<input id="sign-name" type="text" maxlength="25">'
        + '<button id="sign-in" class="sign-button">Sign in</button>';
    }
    sign.innerHTML = htmlAsText;
}

function onSignInClick() {
    var name = document.getElementById('sign-name');
    if (inputChecker(name.value) == true) {
        currentUser = name.value;
        storeCurrentUser(currentUser);
        createSignStructure('read');
        sendActivator(true);
        updateAllMessages();
    }
    else {
        name.focus();
    }
}

function onSignEditClick() {
    createSignStructure('modify');
    var name = document.getElementById('sign-name');
    name.value = currentUser;
    sendActivator(false);
}

function onSignOutClick() {
    createSignStructure('out');
    currentUser = null;
    if (storageAccessibleCheck()) {
        localStorage.removeItem("Current user");
    }
    updateAllMessages();
    sendActivator(false);
}

function onMessageSend() {
    var messageText = document.getElementById('message-text');
    if (inputChecker(messageText.value) == true) {
        var item = theMessage('(' + timeFormat() + ')', currentUser, messageText.value);
        var messageItem = addMessage(item);
        storeMessages(messageList);
        messageText.value = '';
    }
    else {
        messageText.focus();
    }
}

function timeFormat() {
    var date = new Date();
    return date.toLocaleString();
}

function addMessage(message) {
    var item = createMessage(message);
    var chatBox = document.getElementsByClassName('chat-box')[0];
    messageList.push(message);
    chatBox.appendChild(item);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function createMessage(message) {
    var item = document.createElement('div');
    var htmlAsText = '<div class="message sender-name">' + message.date + ' ' + message.senderName + '</div>'
        + '<xmp class="message message-item">' + message.messageText + '</xmp>';
    item.innerHTML = htmlAsText;
    item.setAttribute('class', 'message');
    item.setAttribute('id', message.id);
    updateMessage(item, message);
    return item;
}

function updateMessage(divMessage, message) {
    var tools = divMessage.getElementsByClassName('tools')[0];
    if (currentUser != undefined && message.senderName.toLowerCase() == currentUser.toLowerCase()) {
        if (tools === undefined) {
            var item = document.createElement('div');
            var htmlAsText = '<button id="message-delete" class="message tools-button">delete</button>'
                + '<button id="message-edit" class="message tools-button">edit</button>';
            item.innerHTML = htmlAsText;
            item.setAttribute('class', 'message tools');
            divMessage.insertBefore(item, divMessage.lastChild);
        }
    }
    else {
        if (tools != undefined) {
            divMessage.removeChild(tools);
        }
    }
}

function onMessageEdit(tool) {
    switch (tool.id) {
        case 'tools-confirm':
            onMessageConfirmClick(tool.parentElement);
            break;
        case 'message-edit':
            onMessageEditClick(tool.parentElement);
            break;
        case 'message-delete':
            onMessageDelete(tool.parentElement.parentElement);
            break;
    }
}

function makeToEdit(divMessage, type) {
    var message = divMessage.lastElementChild;
    var item;
    var text;
    if (type == 'edit') {
        item = document.createElement('textarea');
        item.setAttribute('class', 'message message-edit-text');
        text = message.innerHTML;
        item.value = text;
    }
    if (type == 'read') {
        item = document.createElement('xmp');
        item.setAttribute('class', 'message message-item');
        text = message.value;
        item.innerHTML = text
    }
    divMessage.removeChild(message);
    divMessage.appendChild(item);
    return text;
}

function toolsButtonsChange(type) {
    var button = document.createElement('button');
    button.setAttribute('class', 'message tools-button');
    if (type == 'edit') {
        button.setAttribute('id', 'message-edit');
        button.innerHTML = 'edit';
    }
    if (type == 'confirm') {
        button.setAttribute('id', 'tools-confirm');
        button.innerHTML = 'OK';
    }
    return button;
}

function onMessageEditClick(tools) {
    var divMessage = tools.parentElement;
    makeToEdit(divMessage, 'edit');
    tools.removeChild(tools.lastChild);
    tools.appendChild(toolsButtonsChange('confirm'));
}

function onMessageConfirmClick(tools) {
    var divMessage = tools.parentElement;
    var text = makeToEdit(divMessage, 'read');
    tools.removeChild(tools.lastChild);
    tools.appendChild(toolsButtonsChange('edit'));
    var id = divMessage.attributes['id'].value;
    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].id != id) {
            continue;
        }
        messageList[i].messageText = text;
        storeMessages(messageList);
        return;
    }
}

function onMessageDelete(divMessage) {
    var id = divMessage.attributes['id'].value;
    var chatBox = divMessage.parentElement;
    chatBox.removeChild(divMessage);
    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].id != id) {
            continue;
        }
        messageList.splice(i, 1);
        storeMessages(messageList);
        return;
    }
}

function storageAccessibleCheck() {
    if (typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return false;
    }
    return true;
}

function storeCurrentUser(user) {
    if (storageAccessibleCheck()) {
        localStorage.removeItem("Current user");
        localStorage.setItem("Current user", JSON.stringify(user));
    }
}

function storeMessages(messagesToSave) {
    if (storageAccessibleCheck()) {
        localStorage.setItem("Chat messages", JSON.stringify(messagesToSave));
    }
}

function restoreCurrentUser() {
    if (storageAccessibleCheck()) {
        var currentUser = localStorage.getItem("Current user");
        return currentUser && JSON.parse(currentUser);
    }
}

function restoreMessages() {
    if (storageAccessibleCheck()) {
        var messages = localStorage.getItem("Chat messages");
        return messages && JSON.parse(messages)
    }
}