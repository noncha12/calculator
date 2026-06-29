const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');
let currentExpression = '';

function updateDisplay() {
    resultElement.innerText = currentExpression || '0';
}

function appendValue(value) {
    if (currentExpression === 'Error') currentExpression = '';
    currentExpression += value;
    updateDisplay();
}

function clearDisplay() {
    currentExpression = '';
    historyElement.innerText = '';
    updateDisplay();
}

function deleteLast() {
    if (currentExpression === 'Error') {
        clearDisplay();
        return;
    }
    currentExpression = currentExpression.toString().slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (!currentExpression) return;
    
    try {
        historyElement.innerText = currentExpression + ' =';
        // ใช้ math.js เพื่อความแม่นยำสูง
        let result = math.evaluate(currentExpression);
        
        // จัดรูปแบบทศนิยมไม่ให้ยาวเกินไปถ้าไม่จำเป็น
        result = math.format(result, { precision: 14 });
        
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        currentExpression = 'Error';
        updateDisplay();
    }
}