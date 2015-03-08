/**
 * Created by Gennady on 03.03.2015.
 */
function run() {
    var appContainer = document.getElementsByClassName('wrapper')[0];

    appContainer.addEventListener('click', delegateEvent);
}

function delegateEvent(evtObj) {
    if (evtObj.type === 'click') {
        if (evtObj.target.classList.contains('sign-button')) {
            onSignClick(evtObj);
        }
        if (evtObj.target.classList.contains('send-button')) {
            onMessageSend(evtObj);
        }
        if (evtObj.target.classList.contains('tools-button')) {
            onMessageEdit(evtObj);
        }
    }
}

function onSignClick(evtObj) {
    var signName = document.getElementById('sign-name');
    var userName = document.getElementById('user-name');
    var signButton = evtObj.target;
    if (signButton.id == 'sign-in') {
        onSignInClick(signName, userName);
        return true;
    }
    if (signButton.id == 'sign-edit') {
        onSignEditClick(signName, userName);
        return true;
    }
    if (signButton.id == 'sign-confirm') {
        onSignConfirmClick(signName, userName);
        return true;
    }
    if (signButton.id == 'sign-out') {
        onSignOutClick(signName, userName);
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

function onSignInClick(signName, userName) {
    if (inputChecker(signName.value) == true) {
        signName.style.display = 'none';
        userName.style.display = 'inline';
        userName.innerHTML = signName.value;
        document.getElementById('sign-in').style.display = 'none';
        document.getElementById('sign-edit').style.display = 'inline';
        document.getElementById('sign-out').style.display = 'inline';
        sendActivator(true);
    }
    else {
        signName.focus();
    }
}

function onSignEditClick(signName, userName) {
    userName.style.display = 'none';
    signName.style.display = 'inline';
    signName.focus();
    document.getElementById('sign-edit').style.display = 'none';
    document.getElementById('sign-confirm').style.display = 'inline';
    sendActivator(false);
}

function onSignConfirmClick(signName, userName) {
    signName.style.display = 'none';
    userName.style.display = 'inline';
    userName.innerHTML = signName.value;
    document.getElementById('sign-confirm').style.display = 'none';
    document.getElementById('sign-edit').style.display = 'inline';
    sendActivator(true);
}

function onSignOutClick(signName, userName) {
    userName.style.display = 'none';
    userName.innerHTML = '';
    signName.value = '';
    signName.style.display = 'inline';
    document.getElementById('sign-out').style.display = 'none';
    document.getElementById('sign-edit').style.display = 'none';
    document.getElementById('sign-edit').style.display = 'none';
    document.getElementById('sign-in').style.display = 'inline';
    sendActivator(false);
}

function onMessageSend() {
    var messageText = document.getElementById('message-text');
    if (inputChecker(messageText.value) == true) {
        var messageItem = createMessage(messageText.value);
        var chatBox = document.getElementsByClassName('chat-box')[0];
        chatBox.appendChild(messageItem);
        chatBox.scrollTop = chatBox.scrollHeight;
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

function createMessage(text) {
    var senderName = document.getElementById('user-name');
    var messageTemplate = document.getElementsByClassName('message')[0];
    var messageItem = messageTemplate.cloneNode(true);
    var formattingDate = '(' + timeFormat() + ') ';
    var messageElements = messageItem.children;
    messageElements[0].innerHTML = formattingDate + senderName.innerHTML;
    messageElements[1].style.display = 'inline';
    messageElements[2].value = text;
    messageElements[3].innerHTML = text;
    return messageItem;
}

function onMessageEdit(evtObj) {
    var message = evtObj.target.parentNode.parentElement;
    switch (evtObj.target.id) {
        case 'tools-confirm':
            onMessageConfirmClick(message);
            break;
        case 'message-edit':
            onMessageEditClick(message);
            break;
        case 'message-delete':
            message.remove();
            break;
    }
}

function onMessageEditClick(message) {
    var messageElements = message.children;
    var tools = messageElements[1].children;
    messageElements[3].style.display = 'none';
    tools[1].style.display = 'none';
    messageElements[2].style.display = 'inline';
    tools[2].style.display = 'inline';
}

function onMessageConfirmClick(message) {
    var messageElements = message.children;
    var tools = messageElements[1].children;
    messageElements[2].style.display = 'none';
    tools[2].style.display = 'none';
    messageElements[3].innerHTML = messageElements[2].value;
    messageElements[3].style.display = '';
    tools[1].style.display = 'inline';
}