const buttons = document.querySelectorAll('button');
const calcDisplay = document.getElementById('calcDisplay');
let operandFlag = false;
let clearFlag = false;
let newCalc = false;
let numberStorage = {0: '', 1: '', 2: ''};
// --------------------------------------------------------------------------//

function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b; 
}

function divide(a,b){
    return (b != 0) ? a/b : "Only Chuck Norris May Divide by 0";
}

function operate(list){
    const operator = list[1];
    if (operator == '+') {return add(Number(list[0]),Number(list[2]));}
    else if (operator == '-') {return subtract(list[0],list[2]);}
    else if (operator == 'x') {return multiply(list[0],list[2]);}
    else if (operator == '/') {return divide(list[0],list[2]);}
}

function updateDisplay(){
    if(this.textContent.match(/[\*x\/+-]/gm) && this.textContent != '+/-'){
        operandFlag = clearFlag = true;
        if(newCalc){
            newCalc = false;
            numberStorage = {0: calcDisplay.textContent, 1: '', 2: ''};
        }
        numberStorage[1] = this.textContent;
    }
    else if (!isNaN(parseInt(this.textContent)) || this.textContent == '.'){ 
        let temp = (operandFlag) ? 2 : 0;
        if (clearFlag){
            calcDisplay.textContent = '';
            clearFlag = false;
        }
        if (newCalc){
            numberStorage = {0: '', 1: '', 2: ''};
            newCalc = false;
        }
        numberStorage[temp] += this.textContent;
        calcDisplay.textContent += this.textContent;
    }
    else if(this.textContent == '='){
        calcDisplay.textContent = operate(numberStorage);
        clearFlag = newCalc = true;
    }
    else if(this.textContent == 'AC'){
        calcDisplay.textContent = '';
        numberStorage = {0: '', 1: '', 2: ''};
        clearFlag = newCalc = operandFlag = false;
    }
    else if(this.textContent == '+/-'){
        let temp = (operandFlag) ? 2 : 0;
        numberStorage[temp] *= -1;
        calcDisplay.textContent = numberStorage[temp];
    }
    else if(this.textContent == '%') {
        let temp = (operandFlag) ? 2 : 0;
        numberStorage[temp] /= 100;
        calcDisplay.textContent = numberStorage[temp];
    }
}

// --------------------------------------------------------------------------//

buttons.forEach(button => button.addEventListener('click', updateDisplay))