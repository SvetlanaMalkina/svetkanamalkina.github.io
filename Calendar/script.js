'use strict'
// Фоны для каждого месяца календаря
// const janBackground = 'url("images/1.январь.jpg")';
// const febBackground = 'url("images/2.февраль.jpg")';
// const marBackground = 'url("images/3.март.jpg")';
// const aprBackground = 'url("images/4.апрель.jpg")';
// const mayBackground = 'url("images/5.май.jpg")';
// const junBackground = 'url("images/6.июнь.jpg")';
// const julBackground = 'url("images/7.июль.jpg")';
// const augBackground = 'url("images/8.август.jpg")';
// const septBackground = 'url("images/9.сентябрь.jpg")';
// const octBackground = 'url("images/10.октябрь.jpg")';
// const novBackground = 'url("images/11.ноябрь.jpg")';
// const desBackground = 'url("images/12.декабрь.jpg")';
const janBackground = 'images/1.январь.jpg';
const febBackground = 'images/2.февраль.jpg';
const marBackground = 'images/3.март.jpg';
const aprBackground = 'images/4.апрель.jpg';
const mayBackground = 'images/5.май.jpg';
const junBackground = 'images/6.июнь.jpg';
const julBackground = 'images/7.июль.jpg';
const augBackground = 'images/8.август.jpg';
const septBackground = 'images/9.сентябрь.jpg';
const octBackground = 'images/10.октябрь.jpg';
const novBackground = 'images/11.ноябрь.jpg';
const desBackground = 'images/12.декабрь.jpg';
const monthBackground = [janBackground,febBackground,marBackground,aprBackground,mayBackground,junBackground,
    julBackground,augBackground,septBackground,octBackground,novBackground,desBackground];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let cells = document.querySelectorAll('.cell');
const monthAdd = document.querySelector('#month');
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const body = document.querySelector('body');
let monthName = document.querySelector('#monthName'); // название текущего месяца календаря
const monthsNameRush = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ',
    'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ']; //названия месяцев, которые выводятся как выбранный месяц в календаре


//Функция, определяющая количество дней в месяце
let numberOfDaysInMonth = function (){
    let date1 = new Date(year, month, 1);
    let date2 = new Date(year, month + 1, 1);
    return Math.round((date2 - date1) / 1000 / 3600 / 24);
}

// Функция, определяющая день недели первого числа месяца
let dayOfTheWeekFirstDay = function (){
    let date = new Date(year, month, 1);
    return date.getDay();
}

 // Функция отображения бэкграунда в зависимости от месяца
function addBackgroundMonth (){
    let bgImage = new Image();
    bgImage.onload=()=>{
        document.body.style.backgroundImage = `url(${bgImage.src})`;
    }
    bgImage.src = monthBackground[month];
    // body.style.backgroundImage = monthBackground[month];

}
addBackgroundMonth();

//Функция, отвечающая за отображение на экране названия выбранного месяца
function displayingTheCurrentMonth (){
    monthName.innerText = `${monthsNameRush[month]} ${year}`
}
displayingTheCurrentMonth();

// Функция очистки ячеек календаря
function cellsClean(){
    cells.forEach((item, index)=>{
        cells[index].innerText = '';
        if(cells[index].classList.contains('cell-today')){
            cells[index].classList.remove('cell-today');
        }
    })
}

// Переход по месяцам по клику на стрелки (вперёд-назад)
monthAdd.addEventListener('click', (event)=>{
    let elem = event.target;
    if(!elem){
        return;
    }
    else if (elem === btnLeft){
        month = --month;
        if (month < 0){
            year = --year;
            month = 11;
        }
    }
    else if(elem === btnRight){
        month = ++month;
        if (month > 11){
            year = ++year;
            month = 0;
        }
    }
    cellsClean();
    displayingTheCurrentMonth();
    addBackgroundMonth();
    addNumbers();
    if(date.getFullYear()===year && date.getMonth()===month) {
        todayHighlight();
    }
})


// Функция добавления чисел в ячейки
function addNumbers(){
    let num;
    let i = 1;
    if(dayOfTheWeekFirstDay() === 0){
        num = 6;
    } else{
        num = dayOfTheWeekFirstDay() - 1;
    }
    for(num; num < cells.length; num++){
        cells[num].innerText = i;
        i++;
        if(i > numberOfDaysInMonth()){
            return;
        }
    }

}
addNumbers();

// Функция подсветки текущего дня
function todayHighlight(){
        cells.forEach((item) =>{
            if(Number(item.innerText) === new Date().getDate()){
                item.classList.add('cell-today');
            }
        })
}
todayHighlight();
