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
    return (b != 0) ? a/b : "Only Chuck Norris May Divide by 0"
}

function operate(list){
    const operator = list[1];
    if (operator == '+') {add(list[0],list[2])}
    else if (operator == '-') {subtract(list[0],list[2])}
    else if (operator == 'x') {multiply(list[0],list[2])}
    else if (operator == '/') {divide(list[0],list[2])}
}