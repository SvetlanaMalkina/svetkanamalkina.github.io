'use strict'

const calc = document.querySelector('#calc');
let calcInput = document.querySelector('#calcResult');
const mr = document.querySelector('#mr');
const m = document.querySelector('#m');
const mc = document.querySelector('#mc');

let numResult = 0;
let num2 = 0;
let operation = '';
let check = false;
let memory = 0;

calc.addEventListener('click', function (event){
    let elem = event.target;
    if (!elem.classList.contains('item')) return;
    if (elem.classList.contains('operand')){
        if(Number(num2) !== 0 && operation !== ''){
            calculate(operation);
            operation = elem.dataset.oper;
            cleanResult();
            if (check){
                calcInput.value = 'НА 0 ДЕЛИТЬ НЕЛЬЗЯ';
            }
        } else {
            operation = elem.dataset.oper;
            cleanResult();
        }
    }
    if(elem.classList.contains('number')) {
        if(operation !== ''){
            num2 = calcInput.value += elem.innerText;
        } else{
            numResult = Number(calcInput.value += elem.innerText);
        }
    }

    if(elem.classList.contains('equal')){
        calcInput.value = calculate(operation);
        operation = '';
    }
    if(elem.classList.contains('clean')){
        cleanResult();
        numResult = 0;
        num2 = 0;
        operation = '';
    }
    if(elem === mr){
        memory = calcInput.value;
        memoryStyle();
    }
    if(elem === mc){
        memory = 0;
        memoryStyle();
    }
    if(elem === m){
        if(Number(numResult) !== 0 && operation !== ''){
            calcInput.value = num2 = memory;
        }
        else{
            calcInput.value = numResult = memory;
        }
    }

})


function calculate(operand){
    switch (operand) {
        case '+':
            numResult += Number(num2);
            break;
        case '-':
            numResult -= Number(num2);
            break;
        case '*':
            numResult *= Number(num2);
            break;
        case '/':
            if(Number(num2) !== 0) {
                numResult /= Number(num2);
            } else {
                check = true;
                numResult = 'НА 0 ДЕЛИТЬ НЕЛЬЗЯ';
            }
            break;
    }
    return numResult;
}



function cleanResult(){
    calcInput.value = '';
}

function memoryStyle(){
    if(memory !== 0){
        mr.style.opacity = '.5';
        mc.style.opacity = '1';
        m.style.opacity = '1';
    } else{
        mr.style.opacity = '1';
        mc.style.opacity = '.5';
        m.style.opacity = '.5';
    }
}
