import { useState } from 'react';
import './calculator.css';
import function_calculate from '../Function/function';

export default function Calculatt() {
    const regex = /([0-9]+\.[0-9]+|[0-9]+|[+\-*/()^]|sin|cos|tg|ctg)/g;

    const [expression, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (element) => {
        setInput(prevInput => prevInput + element);
    }

    const handleCalculate = () => {
        const tokens = expression.match(regex);
        let res = function_calculate(tokens);
        if (res != null) {
            setInput(res.toString());
        } else {
            setInput('Error');
        }
    }

    const handleClear = () => {
        setInput('');
    }

    return (
        <div className="calculator">
            <div className="display">{expression}</div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('/')} data-operation>/</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('*')} data-operation>*</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('-')} data-operation>-</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('(')}>(</button>
                <button onClick={() => handleButtonClick(')')}>)</button>
                <button onClick={() => handleButtonClick('+')} data-operation>+</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={() => handleButtonClick('sin(')}>sin</button>
                <button onClick={() => handleButtonClick('cos(')}>cos</button>
                <button onClick={() => handleButtonClick('tg(')}>tg</button>
                <button onClick={() => handleButtonClick('ctg(')}>ctg</button>
                <button onClick={() => handleButtonClick('^')} data-operation>^</button>
                <button onClick={handleClear} data-clear>C</button>
                <button onClick={handleCalculate} data-equals>=</button>
            </div>
        </div>
    );
}