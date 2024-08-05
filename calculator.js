// Selecting elements from the DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let operator = '';
let operand1 = '';
let operand2 = '';
let result = '';

// Function to update the display with current input
function updateDisplay() {
    display.textContent = currentInput;
}

// Function to handle numeric button clicks
function handleNumberClick(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = '';
    }
    currentInput += value;
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(value) {
    if (operator === '') {
        operand1 = currentInput;
        operator = value;
        currentInput = '0';
    } else {
        operand2 = currentInput;
        calculateResult();
        operand1 = result;
        operator = value;
        currentInput = '0';
    }
}

// Function to perform calculation based on the operator
function calculateResult() {
    let num1 = parseFloat(operand1);
    let num2 = parseFloat(operand2);
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    currentInput = result.toString();
    updateDisplay();
}

// Function to handle decimal point button click
function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Function to handle equals button click
function handleEqualsClick() {
    operand2 = currentInput;
    calculateResult();
    operand1 = '';
    operand2 = '';
    operator = '';
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
    updateDisplay();
}

// Event listeners for each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'zero':
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
                handleNumberClick(button.textContent);
                break;
            case 'decimal':
                handleDecimalClick();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperatorClick(button.textContent);
                break;
            case 'equals':
                handleEqualsClick();
                break;
            case 'clear':
                clearCalculator();
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    currentInput = '0';
                }
                updateDisplay();
                break;
        }
    });
});

// Initialize display
updateDisplay();
