var activeId;


class Edit { //класс работы с таском
    constructor() {
    }

    openEdit(id) {
        document.location.href = '#edit';
        console.log(id);
        // console.log(id); // id редактируемого таска

    }

    saveTask(id) {
        console.log('сохранить таск');

        var headerTask = document.querySelector('.imputnametask');
        var dateTask = document.querySelector('.imputtimetask');
        var detailsTask = document.querySelector('.texttask');

        var now = new Date(); //текущая дата
        now = new Date(now).getTime(); // текущая дата в диавольком формате
        var newdate = dateTask.value * 24 *  60 * 60 * 1000 + now; // дата плюс кол-во дней



        // отправляем запрос на сохраниение
        savetask(id, headerTask.value, newdate, detailsTask.value, function (err) {
            console.log(err);
        }, function () {
            document.location.href = '#todo';
        });


    }

    closeEdit() {
        document.location.href = '#todo';
    }
}

class Modal {
    constructor() {
    }

    openModal(id, modal, task) {
        modal.classList.add('active');
        var modTitle = document.querySelector('.modal__title');
        var modDate = document.querySelector('.modal__date-date');
        var modText = document.querySelector('.modal__text');

        console.log(task);
        console.log(task.date);

        var getDatePlus = new Date(+task.date);



        //
        // var a = now;
        // var dt = new Date();
        // var hours = dt.getHours();
        // var minutes = dt.getMinutes();
        // var resultTime = (hours < 10 ? '0' + hours + 'ч:' : hours + 'ч:') + (minutes < 10 ? '0' + minutes + 'м' : minutes + 'м');




        modTitle.innerHTML = task.header;
        modDate.innerHTML = getDatePlus;
        modText.innerHTML = task.details;
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }
}

var opm = new Edit();
var mod = new Modal();

function reload2() {

    // var btnReg = document.querySelector('.btn-reg');
    // var btnOut = document.querySelector('.btn-out');
    // var btnLogin = document.querySelector('.btn-login');


    var modal = document.querySelector('.modal');
    // var modalBox = document.querySelector('.modal__box');
    var modalBoxCloseIcon = document.querySelector('.modal__box').firstElementChild;
    var modaBbtnClose = document.querySelector('.btn-close');
    var modaBbtnEdit = document.querySelector('.btn-edit');

    var taskPlase = document.querySelector('.todo__item-wrap'); //место для тасков


    //получаем таски
    var UserAurh = sessionStorage.getItem('userId');
    var tasksAll;

    gettask(UserAurh, function (err) {
        console.log(err);
    }, function (tasks) {
        tasksAll = JSON.parse(tasks);
        drawTask(tasksAll);
    });

    //выводим таски
    function drawTask(task) {
        for (n = 0; n < task.length; n++) {
            var taskNew = document.createElement('div');
            taskNew.id = task[n].id;
            taskNew.className = 'todo__item';
            var dravItem = `
                <div class="todo__item-left">
                    <div class="todo__item-header">${task[n].header}</div>
                    <div class="todo__item-text">${task[n].details}</div>
                </div>
                <div class="todo__item-btns">
                    <i class="mdi mdi-lead-pencil"></i>
                    <i class="mdi mdi-close"></i>
                </div>
            `;
            taskNew.innerHTML = dravItem;
            taskPlase.insertBefore(taskNew, taskPlase.firstChild);
        }
    }

    var editBtns = document.querySelectorAll('.mdi-lead-pencil');
    var addTask = document.querySelector('.addtask');
    var headerTask = document.querySelectorAll('.todo__item-header');


    //переход на стр добавления таска
    addTask.onclick = () => {
        opm.openEdit();
    };


    // просмотр таска (открытие модалки)
    headerTask.forEach((i) => {
        i.onclick = function () {
            activeId = this.parentElement.parentElement.id;

            getonetask(activeId, function (err) {
                console.log(err);
            }, function (targerTask) {
                targerTask = JSON.parse(targerTask);
                mod.openModal(activeId, modal, targerTask);
            });

        }
    });


    //закрытие модалки
    modal.onclick = (event) => {
        if (event.target == modal
            || event.target == modaBbtnClose
            || event.target == modalBoxCloseIcon) {
            mod.closeModal(modal);
        }
    };


    // //редактирование таска
    editBtns.forEach((i) => {
        i.onclick = function () {
            activeId = this.parentElement.parentElement.id;
            console.log(activeId);
            opm.openEdit(activeId);
        }
    });
    modaBbtnEdit.onclick = () => {
        mod.closeModal(modal);
        opm.openEdit(activeId);
    };


}

//редактирование таска или создание нового

function reload3() {
    var taskTitle = document.querySelector('.todo__title');
    var btnBack = document.querySelector('.btn__back');
    var btnSavetask = document.querySelector('.btn__savetask');
    btnBack.onclick = () => {
        activeId = -1;
        opm.closeEdit();
    };
    if (!activeId || activeId < 0) {
        taskTitle.innerHTML = 'Добавить новую задачу'
    }
    btnSavetask.onclick = () => {

        opm.saveTask(UserAurh);
    }
}
