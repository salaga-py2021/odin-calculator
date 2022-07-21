const buttons = document.querySelectorAll('button');
const calcDisplay = document.getElementById('calcDisplay');
let isSecondNumber = false;
let clearScreen = false;
let newCalc = false;
let numberStorage = ['', '', ''];
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
    return (b != 0) ? a/b : alert("Only Chuck Norris can Divide by 0");
}

function operate(arr){
    const operator = arr[1];
    if (operator == '+') {return add(Number(arr[0]),Number(arr[2]));}
    else if (operator == '-') {return subtract(arr[0],arr[2]);}
    else if (operator == 'x') {return multiply(arr[0],arr[2]);}
    else if (operator == '/') {return divide(arr[0],arr[2]);}
}

function updateDisplay(userInput){ 
    let currentIndex = (isSecondNumber) ? 2 : 0;

    if(this.textContent.match(/[\*x\/+-]/gm) && this.textContent != '+/-'){
        isSecondNumber = clearScreen = true;
        if(newCalc){
            // Operation is being contiued after pressing '='. ie: 1+1=2+...
            numberStorage = [calcDisplay.textContent, '', ''];
            newCalc = false;
        } else if (!isNaN(parseInt(numberStorage[2]))){
            // Operation is being continued without pressing '='. ie: 1+1+1
            calcDisplay.textContent = operate(numberStorage);
            numberStorage = [calcDisplay.textContent, this.textContent, '']
        }
        numberStorage[1] = this.textContent;
    }
    else if (!isNaN(parseInt(this.textContent))){ 
        if (clearScreen){
            calcDisplay.textContent = '';
            clearScreen = false;
        }
        if (newCalc){
            numberStorage = ['','',''];
            newCalc = false;
        }
        numberStorage[currentIndex] += this.textContent;
        calcDisplay.textContent += this.textContent;
    }
    else if(this.textContent == '='){
        result = operate(numberStorage);
        calcDisplay.textContent = result.toString().includes('.') 
                                  ? result.toFixed(6) : result;
        // indicate that current calculation has ended and newCalc is ready
        clearScreen = newCalc = true;
    }
    else if (this.textContent == '.'){
        if (calcDisplay.textContent.indexOf('.') == -1){
            // ensure that user is not entering more than one '.'
            calcDisplay.textContent += '.'
            numberStorage[currentIndex] += '' + this.textContent;
        }
    }
    else if(this.textContent == 'AC'){
        calcDisplay.textContent = '';
        numberStorage = {0: '', 1: '', 2: ''};
        clearScreen = newCalc = isSecondNumber = false;
    }
    else if(this.textContent == '+/-'){
        numberStorage[currentIndex] *= -1;
        calcDisplay.textContent = numberStorage[currentIndex];
    }
    else if(this.textContent == '%') {
        numberStorage[currentIndex] /= 100;
        calcDisplay.textContent = numberStorage[currentIndex];
    }

}

// --------------------------------------------------------------------------//

buttons.forEach(button => button.addEventListener('click', updateDisplay));