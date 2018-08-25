function basePostRequest(address, body, onError, onSuccesfull) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', "http://localhost:8000" + address, false);
    xhr2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr2.withCredentials = true;
    xhr2.send(JSON.stringify(body));

    if (xhr2.status == 200) {
        onSuccesfull(xhr2.responseText);
    }
    else {
        onError(xhr2.responseText);
    }
}

function basePuttRequest(address, body, onError, onSuccesfull) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('PUT', "http://localhost:8000" + address, false);
    xhr2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr2.withCredentials = true;
    xhr2.send(JSON.stringify(body));

    if (xhr2.status == 200) {
        onSuccesfull(xhr2.responseText);
    }
    else {
        onError(xhr2.responseText);
    }
}

function baseGetRequest(address, onError, onSuccesfull) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:8000' + address, false);
    xhr2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr2.withCredentials = true;
    xhr2.send();

    if (xhr2.status == 200) {
        onSuccesfull(xhr2.responseText);
    }
    else {
        onError(xhr2.responseText);
    }
}


function login(email, password, onError, onSuccesfull) {
    basePostRequest("/user/login", {"email": email, "password": password},
        onError, onSuccesfull);
}

function register(email, password, onError, onSuccesfull) {
    basePostRequest("/user/register", {"email": email, "password": password},
        onError, onSuccesfull);
}

//Получение всех тасков юзера
function gettask(userid, onError, onSuccesfull) {
    var uid = String(userid);
    basePostRequest("/task/all", {"user_id": uid},
        onError, onSuccesfull);
}

//Сохранение таска
function savetask(userid, headerTask, dateTask, detailsTask, onError, onSuccesfull) {
    var uid = String(userid);
    var date = String(dateTask);
    basePostRequest("/task/add", {"user_id": uid, header: headerTask, details: detailsTask, date: date},
        onError, onSuccesfull);
}

//Получение таска по ID
function getonetask(activeId, onError, onSuccesfull) {
    baseGetRequest("/task/one/" + activeId, onError, onSuccesfull);
}

//Сохранение измененного таска по ID
function saveedittask(taskInfo, onError, onSuccesfull) {
    var dateTask = String(taskInfo.date);

    basePuttRequest("/task/" + taskInfo.id, {
            user_id: taskInfo.userId,
            header: taskInfo.header,
            details: taskInfo.details,
            date: dateTask
        },
        onError, onSuccesfull);
}
