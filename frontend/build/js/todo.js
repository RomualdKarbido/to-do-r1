var activeId;

class Edit { //класс работы с таском
    constructor() {
    }

    openEdit(id) {
        document.location.href = '#edit';
    }

    saveTask(id) {
        var headerTask = document.querySelector('.imputnametask');
        var dateTask = document.querySelector('.imputtimetask');
        var detailsTask = document.querySelector('.texttask');
        var btnSavetask = document.querySelector('.btn__savetask');

        // отправляем запрос на сохраниение
        btnSavetask.onclick = () => {
            var newdate = dateTask.value * 24 * 60 * 60 * 1000 + new Date().getTime(); // дата плюс кол-во дней
            savetask(id, headerTask.value, newdate, detailsTask.value, function (err) {
                console.log(err);
            }, function () {
                document.location.href = '#todo';
            });
        };
    }

    closeEdits() {
        document.location.href = '#todo';
    }

    editEdit(id) {
        var headerTask = document.querySelector('.imputnametask');
        var dateTask = document.querySelector('.imputtimetask');
        var detailsTask = document.querySelector('.texttask');
        var btnSavetask = document.querySelector('.btn__savetask');

        getonetask(id, function (err) { //получаем таск по id и выводим зн. в поля
            console.log(err);
        }, function (targerTask) {
            targerTask = JSON.parse(targerTask);
            var now = new Date().getTime();
            var days = (targerTask.date - now) / (24 * 60 * 60 * 1000);
            days = Math.ceil((days) * 10) / 10;

            headerTask.value = targerTask.header;
            dateTask.value = days;
            detailsTask.value = targerTask.details;
        });
        btnSavetask.onclick = () => this.savereEdits(id, headerTask.value, dateTask.value, detailsTask.value);

    }

    savereEdits(id, header, date, details) { //сохраняем модефицированный таск

        var userid = sessionStorage.getItem('userId');
        var now = new Date(); //текущая дата
        now = new Date(now).getTime(); // текущая дата в диавольком формате
        var newdate = date * 24 * 60 * 60 * 1000 + now; // дата плюс кол-во дней


        var taskInfo = {
            id: id,
            userId: userid,
            header: header,
            date: newdate,
            details: details,
        };
        saveedittask(taskInfo, function (err) { //запрос на сохранение
            console.log(err);
        }, function () {
            document.location.href = '#todo';
        });
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
        var modallert = document.querySelector('.modal__date-alert');
        var now = new Date().getTime();

        var now = new Date().getTime();
        var days = (task.date - now) / (24 * 60 * 60 * 1000);
        days = Math.ceil((days) * 10) / 10;

        if (task.date < now) {
            modDate.classList.add('red');
            modDate.classList.remove('green');
            modallert.innerHTML = '<span>Просрочено на ' + days + ' дн.</span>';
        }
        else {

            modDate.classList.remove('red');
            modDate.classList.add('green');
            modallert.innerHTML = '<span class="green">Осталось: ' + days + ' дн.</span>';
        }
        var getDate = new Date(+task.date);
        //выводим данные в модалку
        modTitle.innerHTML = task.header;
        modDate.innerHTML = formatDate(getDate);
        modText.innerHTML = task.details;
    }

    closeModal(modal) {
        modal.classList.remove('active');

    }
}

var opm = new Edit();
var mod = new Modal();

// страница просмотра тасков
function reload2() {

    var modal = document.querySelector('.modal');
    var modalBoxCloseIcon = document.querySelector('.modal__box').firstElementChild;
    var modaBbtnClose = document.querySelector('.btn-close');
    var modaBbtnEdit = document.querySelector('.btn-edit');
    var taskPlase = document.querySelector('.todo__item-wrap'); //место для тасков
    var wrap = document.querySelector('.todo__wrap');
    var headtext = document.querySelector('.todo__title-wrap');
    //получаем таски
    var UserAurh = sessionStorage.getItem('userId');
    var tasksAll;

    var BtnList = document.querySelector('.todo__list');
    var BtnTiles = document.querySelector('.todo__tiles');
    var ContentBlock = document.querySelector('.todo');


    BtnList.onclick = () => {
        ContentBlock.classList.remove('tiles');
        BtnTiles.classList.remove('active');
        BtnList.classList.add('active');

    }
    BtnTiles.onclick = () => {
        ContentBlock.classList.add('tiles');
        BtnList.classList.remove('active');
        BtnTiles.classList.add('active');
    }






    gettask(UserAurh, function (err) {
        console.log(err);
    }, function (tasks) {
        tasksAll = JSON.parse(tasks);
        drawTask(tasksAll);
    });

    // выводим таски
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


    // переход на стр добавления таска
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

    // закрытие модалки
    modal.onclick = (event) => {
        if (event.target == modal
            || event.target == modaBbtnClose
            || event.target == modalBoxCloseIcon) {
            mod.closeModal(modal);
            activeId = -1;
        }
    };

    //редактирование таска обход
    editBtns.forEach((i) => {
        i.onclick = function () {
            activeId = this.parentElement.parentElement.id;
            opm.openEdit(activeId);
        }
    });
    modaBbtnEdit.onclick = () => {
        mod.closeModal(modal);
        opm.openEdit(activeId);
    };

    //условие для кнопки
    wrap.onscroll = function () {
        var positionY = headtext.getBoundingClientRect().top;
        if (positionY <= 40) addTask.classList.add('top');
        else addTask.classList.remove('top');
    };
}

//редактирование таска или создание нового
function reload3() {
    var taskTitle = document.querySelector('.todo__title');
    var btnBack = document.querySelector('.btn__back');
    var btnSavetask = document.querySelector('.btn__savetask'); //кнопка сохранить
    var btnClear = document.querySelector('.btn__clear'); //кнопка очистить
    var inputBlock = document.querySelector('.todo__item_edit');
    var headerTask = document.querySelector('.imputnametask');
    var dateTask = document.querySelector('.imputtimetask');
    var detailsTask = document.querySelector('.texttask');

    btnBack.onclick = () => {
        activeId = -1;
        opm.closeEdits();
    };

    //если нет id задачи
    if (!activeId || activeId < 0) {
        taskTitle.innerHTML = 'Добавить новую задачу';
        validmini();
        opm.saveTask(UserAurh);
        activeId = -1;
    }
    //если есть id задачи
    else {
        validmini();
        opm.editEdit(activeId);
        activeId = -1;
    }

    function validmini() {
        inputBlock.onmousemove = function () {
            if (headerTask.value <= 0 || detailsTask.value <= 0 || dateTask.value == 0) {
                btnSavetask.setAttribute('disabled', 'disabled');
            }
            else {
                btnSavetask.removeAttribute('disabled', 'disabled');
            }
        }
    }
    btnClear.onclick = () => {
        headerTask.value = '';
        dateTask.value = '';
        detailsTask.value = '';
    }
}




