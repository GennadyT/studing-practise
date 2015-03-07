/**
 * Created by Gennady on 03.03.2015.
 */
function run() {
    var appContainer = document.getElementsByClassName('wrapper')[0];

    appContainer.addEventListener('click', delegateEvent);
}

function delegateEvent(evtObj) {
    if(evtObj.type === 'click' && evtObj.target.classList.contains('sign-button')) {
        onSignClick(evtObj);
    }
    if(evtObj.type === 'click' && evtObj.target.classList.contains('send-button')) {
        onMessageSend(evtObj);
    }
}

function onSignClick(evtObj) {
    var signName = document.getElementById('sign-name');
    var userName = document.getElementById('user-name');
    var signButton = evtObj.target;
    if(signButton.id == 'sign-in') {
        onSignInClick(signName, userName);
    }
    if(signButton.id == 'sign-edit') {
        onSignEditClick(signName, userName);
    }
    if(signButton.id == 'sign-confirm') {
        onSignConfirmClick(signName, userName);
    }
    if(signButton.id == 'sign-out') {
        onSignOutClick(signName, userName);
    }
}

function sendActivator(activate) {
    var sendMessage = document.getElementsByClassName('send-message')[0];
    var messageText = sendMessage.firstElementChild;
    messageText.disabled = !activate;
    if(activate == true) {
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
        messageText.value = '';
    }
    else {
        messageText.focus();
    }
}

function createMessage(text) {
    var messageItem = document.createElement('div');
    var senderName = document.getElementById('user-name');
    messageItem.setAttribute('class', 'add-message');
    var date = new Date();
    var senderHeader = '(' + date.getHours() + ':' + date.getMinutes() + ') ' + senderName.innerHTML;
    messageItem.firstElementChild.innerHTML = senderHeader;
    messageItem.lastElementChild.innerHTML = text;
    return messageItem;
}