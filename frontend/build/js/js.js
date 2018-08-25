var topmenu = document.querySelector('.header__menu');
var topmenuBtn1 = topmenu.querySelector('.btn-reg');
var topmenuBtn2 = topmenu.querySelector('.btn-out');
var topmenuBtn3 = topmenu.querySelector('.btn-login');
var topmenuBtn4 = topmenu.querySelector('.header__menu-todo');
var UserAurh;


//страница входа
function reload() {

    var email = document.getElementById('log');
    var pass = document.getElementById('pass');
    var btnSubmin = document.getElementById('btn-submit');
    var allert = document.querySelector('.login__box-allert');

    btnSubmin.onclick = function () {
        var valid = validateEmail(email);
        if (valid == false) {
            email.classList.add('invalid');
            return;
        }
        else {
            email.classList.remove('invalid');
            var validpass = validatePass(pass);
            if (validpass == false) {
                pass.classList.add('invalid');
            }
            else {
                login(email.value, pass.value, function (err) {
                    console.log(err);
                }, function (userId) {
                    sessionStorage.setItem('userId', userId);
                    pass.classList.remove('invalid');
                    authorizedUser();
                    allert.classList.remove('close');
                    setTimeout(function () {
                        allert.classList.add('close');
                        document.location.href = '#todo';
                    }, 1500);
                });
            }
        }
    }
}


//страница регистрации
function reload4() {
    var BASE_URL = 'http://localhost:8000/user/login';
    var btnSubmit = document.querySelector('.btn-submit');
    var btnLogin = document.querySelector('.btn-gologin');

    var email = document.querySelector('.regEmail');
    var pass = document.querySelector('.regPass');
    var repass = document.querySelector('.regPassRepeat');

    var allert = document.querySelector('.login__box-allert');

    btnLogin.onclick = function () {
        document.location.href = '#login';
    };


    btnSubmit.onclick = function () {

        var valid = validateEmail(email);
        if (valid == false) {
            email.classList.add('invalid');
            return;
        }
        else {
            email.classList.remove('invalid');

            var validpass = validatePass(pass.value);
            var validpassRep = validatePass(repass.value);

            if (pass.value != repass.value
                || validpass == 'false'
                || validpassRep == 'false') {
                repass.classList.add('invalid');
                return;
            }
            else {
                repass.classList.remove('invalid');
                register(email.value, pass.value, function (err) {
                    console.log(err);
                    allert.classList.remove('close');
                    allert.innerHTML = 'Это E-mail уже зарегистрирован в системе';
                    setTimeout(function () {
                        allert.classList.add('close');
                    }, 3000);

                }, function () {
                    allert.classList.remove('close');
                    allert.innerHTML = 'Вы успешно зарегистрированы!';
                    setTimeout(function () {
                        allert.classList.add('close');
                        document.location.href = '#login';
                    }, 1500);

                });
            }
        }
    }
}

//страница Home
function reload5() {
    var btnsBig = document.querySelector('.home__btns_unreg');
    var btnsBigReg = document.querySelector('.home__btns_reg');
    var text = document.querySelector('.home__subtext');
    var UserAurh = sessionStorage.getItem('userId');

    if (!UserAurh) { //не зарегистрированный пользователь
        btnsBigReg.classList.add('close');
        btnsBig.classList.remove('close');
        text.innerHTML = 'Что бы начать пользоваться приложением небходимо войти в ситсему \n' +
            'или зарегистрироватья';
    }
    else { //пользователь зарегистрирован
        btnsBigReg.classList.remove('close');
        btnsBig.classList.add('close');
        text.innerHTML = 'Это стартовая страница, но вы можете перейти к списку задач  \n' +
            'или выйти из ситсемы';

        btnsBigReg.lastElementChild.onclick = function () {
            exit();
        }

    }
}

//конвертим дату в нужный вид
function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    if (mm == 1) {
        mm = 'января'
    }
    else if (mm == 2) mm = ' февраля'
    else if (mm == 3) mm = ' марта'
    else if (mm == 4) mm = ' апреля'
    else if (mm == 5) mm = ' мая'
    else if (mm == 6) mm = ' июня'
    else if (mm == 7) mm = ' июля'
    else if (mm == 8) mm = ' августа'
    else if (mm == 9) mm = ' сентября'
    else if (mm == 10) mm = ' октября'
    else if (mm == 11) mm = ' ноября'
    else if (mm == 12) mm = ' декабря'
    var yy = date.getFullYear();
    return dd + ' ' + mm + ' ' + yy;
}

function validateEmail(email) {
    var reg = /^\w+@\w+\.\w{2,4}$/i;
    var address = email.value;
    if (reg.test(address) === false) {
        return false;
    }
}

function validatePass(pass) {
    var reg = /\w{2,}/g;
    if (reg.test(pass) === false) {
        return 'false';
    }
    else {
        return 'true';
    }
}

function authorizedUser() {
    UserAurh = sessionStorage.getItem('userId');
    if (!UserAurh) {
        topmenuBtn2.classList.add('close');
        topmenuBtn4.classList.add('close');
        topmenuBtn1.classList.remove('close');
        topmenuBtn3.classList.remove('close');
    }
    else {
        topmenuBtn1.classList.add('close');
        topmenuBtn3.classList.add('close');
        topmenuBtn2.classList.remove('close');
        topmenuBtn4.classList.remove('close');
    }
}

authorizedUser();

//выход обманка
function exit() {
    sessionStorage.removeItem('userId');
    authorizedUser();
}

topmenuBtn2.onclick = function () {
    exit();
};
