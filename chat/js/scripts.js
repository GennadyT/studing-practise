/**
 * Created by Gennady on 03.03.2015.
 */

'use strict';

var getId = function() {
    var currentDate = Date.now();
    var random = Math.random() * Math.random();
    return Math.floor(currentDate * random).toString();
};

var theMessage = function(sender, message, id) {
    return {
        id: id || getId(),
        senderName: sender,
        messageText: message
    };
};

var chatState = {
    chatUrl : 'http://localhost:999/chat',
    currentUser : null,
    messageList : [],
    token : 'TN11EN'
};

function run() {
    var appContainer = document.getElementsByClassName('wrapper')[0];
    appContainer.addEventListener('click', delegateEvent);
    appContainer.addEventListener('keydown', delegateEvent);
    var currentUser = restoreCurrentUser();
    setCurrentUser(currentUser);
    restoreMessages();
}

function setCurrentUser(user) {
    if (user != null) {
        var userName = document.getElementById('sign-name');
        userName.value = user;
        onSignInClick();
    }
}

function createAllMessages(messages) {
    if (messages != null) {
        for (var i = 0; i < messages.length; i++) {
            addMessage(messages[i]);
        }
    }
}

function updateAllMessages() {
    var chatBox = document.getElementsByClassName('chat-box')[0];
    for (var i = 0; i < chatState.messageList.length; i++) {
        updateMessage(chatBox.children[i], chatState.messageList[i]);
    }
}

function delegateEvent(evtObj) {
    if (evtObj.type === 'click') {
        if (evtObj.target.classList.contains('sign-button')) {
            onSignClick(evtObj.target);
        }
        if (evtObj.target.classList.contains('send-button')) {
            onMessageSend();
        }
        if (evtObj.target.classList.contains('tools-button')) {
            onMessageEdit(evtObj.target);
        }
    }
    if(evtObj.type === 'keydown' && evtObj.ctrlKey && evtObj.keyCode == 13) {
        if (evtObj.target.classList.contains('send-message')) {
            onMessageSend();
        }
        if (evtObj.target.classList.contains('message-edit-text')) {
            onMessageEdit(evtObj.target);
        }
    }
}

function onSignClick(button) {
    if (button.id == 'sign-in' || button.id == 'sign-confirm') {
        onSignInClick();
    }
    if (button.id == 'sign-edit') {
        onSignEditClick();
    }
    if (button.id == 'sign-out') {
        onSignOutClick();
    }
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
        htmlAsText = '<xmp id="user-name">' + chatState.currentUser + '</xmp>'
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
        chatState.currentUser = name.value;
        storeCurrentUser(chatState.currentUser);
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
    name.value = chatState.currentUser;
    name.focus();
    sendActivator(false);
}

function onSignOutClick() {
    createSignStructure('out');
    chatState.currentUser = null;
    localStorage.removeItem("Current user");
    updateAllMessages();
    sendActivator(false);
}

function onMessageSend() {
    var messageText = document.getElementById('message-text');
    if (inputChecker(messageText.value) == true) {
        var message = theMessage(chatState.currentUser, messageText.value.trim().replace(new RegExp("\n", 'g'), "\\n"));
        postRequest(chatState.chatUrl, JSON.stringify(message), function () {
            restoreMessages();
        });
        messageText.value = '';
    }
    else {
        messageText.focus();
    }
}

function scrollDown() {
    var chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(message) {
    var item = createMessage(message);
    var chatBox = document.getElementsByClassName('chat-box')[0];
    chatState.messageList.push(message);
    chatBox.appendChild(item);
    scrollDown();
}

function createMessage(message) {
    var item = document.createElement('div');
    var sendDate = '(' + message.sendDate + ')';
    item.innerHTML = '<div class="message sender-name">' + sendDate + ' ' + message.senderName + '</div>'
    + '<xmp class="message message-item">' + message.messageText + '</xmp>';
    item.setAttribute('class', 'message');
    item.setAttribute('id', message.id);
    updateMessage(item, message);
    return item;
}

function updateMessage(divMessage, message) {
    //var messageText = divMessage.getElementsByClassName('message-item')[0];
    if (message.isDeleted == 'true') {
        setDelete(divMessage, message);
        return;
    }
    if(message.modifyDate != 'not modified') {
        setModify(divMessage, message);
    }
    if (chatState.currentUser != undefined && message.senderName.toLowerCase() == chatState.currentUser.toLowerCase()) {
        addTool(divMessage);
    }
    else {
        removeTool(divMessage);
    }
}

function setDelete(divMessage, message) {
    divMessage.innerHTML = '<div class="message sender-name">' + message.sendDate + ' '
    + message.senderName + '</div>' + '<p class="modify">deleted</p>';
}

function setModify(divMessage, message) {
    var modify = divMessage.getElementsByClassName('modify')[0];
    if (modify === undefined) {
        modify = document.createElement('p');
        modify.setAttribute('class', 'modify');
        modify.setAttribute('id', 'modify-edit');
        divMessage.appendChild(modify);
    }
    modify.innerHTML = 'Message was modified on ' + message.modifyDate;
}

function addTool(divMessage) {
    var tools = divMessage.getElementsByClassName('tools')[0];
    if (tools === undefined) {
        var positionAfter = divMessage.getElementsByClassName('message-item')[0];
        var item = document.createElement('div');
        item.innerHTML = '<button id="message-delete" class="message tools-button">delete</button>'
        + '<button id="message-edit" class="message tools-button">edit</button>';
        item.setAttribute('class', 'message tools');
        divMessage.insertBefore(item, positionAfter);
    }
}

function removeTool(divMessage) {
    var tools = divMessage.getElementsByClassName('tools')[0];
    if (tools != undefined) {
        divMessage.removeChild(tools);
    }
}

function onMessageEdit(item) {
    if (item.id == 'tools-confirm') {
        onMessageConfirmClick(item.parentElement);
    }
    if(item.classList.contains('message-edit-text')) {
        var editTool = item.parentElement.getElementsByClassName('tools')[0];
        onMessageConfirmClick(editTool);
    }
    if (item.id == 'message-edit') {
        onMessageEditClick(item.parentElement);
    }
    if (item.id == 'message-delete') {
        onMessageDelete(item.parentElement.parentElement);
    }
}

function makeToEdit(divMessage, type) {
    var message;
    var item;
    var text;
    if (type == 'edit') {
        message = divMessage.getElementsByClassName('message-item')[0];
        item = document.createElement('textarea');
        item.setAttribute('class', 'message message-edit-text');
        text = message.innerHTML.trim();
        item.value = text;
    }
    if (type == 'read') {
        message = divMessage.getElementsByClassName('message-edit-text')[0];
        item = document.createElement('xmp');
        item.setAttribute('class', 'message message-item');
        text = message.value.trim();
        item.innerHTML = text;
        item.focus();
    }
    divMessage.replaceChild(item, message);
    item.focus();
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
    for (var i = 0; i < chatState.messageList.length; i++) {
        if (chatState.messageList[i].id != id) {
            continue;
        }
        var editedMessage = theMessage(chatState.messageList[i].senderName, text, id);
        putRequest(chatState.chatUrl, JSON.stringify(editedMessage), function() {
            updateDataMessage(i, divMessage);
        });
        return;
    }
}

function onMessageDelete(divMessage) {
    var id = divMessage.attributes['id'].value;
    for (var i = 0; i < chatState.messageList.length; i++) {
        if (chatState.messageList[i].id != id) {
            continue;
        }
        deleteRequest(chatState.chatUrl, JSON.stringify(chatState.messageList[i]), function () {
            updateDataMessage(i, divMessage);
        });
        return;
    }
}

function updateDataMessage(index, divMessage, continueWith) {
    var url = chatState.chatUrl + '?token=TN' + (index * 8 + 11) + 'EN';
    getRequest(url, function (responseText) {
        var response = JSON.parse(responseText);
        var messageToUpdate = response.messages[0];
        chatState.token = response.token;
        chatState.messageList[index] = messageToUpdate;
        updateMessage(divMessage, messageToUpdate);
        continueWith && continueWith();
    });
}

function storeCurrentUser(user) {
    localStorage.removeItem("Current user");
    localStorage.setItem("Current user", JSON.stringify(user));
}

function restoreCurrentUser() {
    var currentUser = localStorage.getItem("Current user");
    return currentUser && JSON.parse(currentUser);
}

function restoreMessages(continueWith) {
    var url = chatState.chatUrl + '?token=' + chatState.token;
    getRequest(url, function(responseText) {
        var response = JSON.parse(responseText);
        chatState.token = response.token;
        createAllMessages(response.messages);
        continueWith && continueWith();
    });
}

function getRequest(url, continueWith) {
    ajax('GET', url, null, continueWith);
}

function postRequest(url, data, continueWith) {
    ajax('POST', url, data, continueWith);
}

function deleteRequest(url, data, continueWith) {
    ajax('DELETE', url, data, continueWith);
}

function putRequest(url, data, continueWith) {
    ajax('PUT', url, data, continueWith);
}

function ajax(method, url, data, continueWith, continueWithError) {
    var xhr = new XMLHttpRequest();
    
    //continueWithError = continueWithError /*|| defaultErrorHandler*/;
    xhr.open(method || 'GET', url, true);

    xhr.onload = function () {
        if (xhr.readyState !== 4)
            return;

        if(xhr.status != 200) {
            continueWithError('Error on the server side, response ' + xhr.status);
            return;
        }

        //if(isError(xhr.responseText)) {
        //    continueWithError('Error on the server side, response ' + xhr.responseText);
        //    return;
        //}

        continueWith(xhr.responseText);
    };/*

    xhr.ontimeout = function () {
        ontinueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
        var errMsg = 'Server connection error !\n'+
            '\n' +
            'Check if \n'+
            '- server is active\n'+
            '- server sends header "Access-Control-Allow-Origin:*"';

        continueWithError(errMsg);
    };*/

    xhr.send(data);
}