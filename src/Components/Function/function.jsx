export default function function_calculate(array)
{
   // Преобразуем строки с числами в числа и игнорируем элементы, которые не могут быть преобразованы
   const numbers = array.map(item => {
    const num = Number(item);
    return isNaN(num) ? null : num;
  }).filter(item => item !== null);

  // Получаем массив операторов и игнорируем элементы, которые не являются операторами
  const operators = array.filter(item => isNaN(Number(item)) && item !== null && ['+', '-', '*', '/', '(', ')', '^', 'sin', 'cos', 'tg', 'ctg'].includes(item));

  // Функция для вычисления выражения без скобок
  const calculateSimpleExpression = (nums, ops) => {
    // Первый проход: выполняем функции и степень
    let i = 0;
    while (i < ops.length) {
      const operator = ops[i];
      if (['sin', 'cos', 'tg', 'ctg', '^'].includes(operator)) {
        const leftNumber = nums[i];
        const result = (() => {
          switch (operator) {
            case 'sin':
              return Math.sin(leftNumber);
            case 'cos':
              return Math.cos(leftNumber);
            case 'tg':
              return Math.tan(leftNumber);
            case 'ctg':
              return 1 / Math.tan(leftNumber);
            case '^':
              return Math.pow(leftNumber, nums[i + 1]);
            default:
              throw new Error(`Неизвестный оператор: ${operator}`);
          }
        })();
        nums.splice(i, operator === '^' ? 2 : 1, result);
        ops.splice(i, 1);
      } else {
        i++;
      }
    }

    // Второй проход: выполняем умножение и деление
    i = 0;
    while (i < ops.length) {
      const operator = ops[i];
      if (operator === '*' || operator === '/') {
        const leftNumber = nums[i];
        const rightNumber = nums[i + 1];
        const result = operator === '*' ? leftNumber * rightNumber : leftNumber / rightNumber;
        nums.splice(i, 2, result);
        ops.splice(i, 1);
      } else {
        i++;
      }
    }

    // Третий проход: выполняем сложение и вычитание
    let finalResult = nums[0];
    for (let i = 0; i < ops.length; i++) {
      const operator = ops[i];
      const nextNumber = nums[i + 1];

      switch (operator) {
        case '+':
          finalResult += nextNumber;
          break;
        case '-':
          finalResult -= nextNumber;
          break;
        default:
          throw new Error(`Неизвестный оператор: ${operator}`);
      }
    }

    return finalResult;
  };

  // Функция для обработки скобок
  const handleBrackets = (arr) => {
    const stack = [];
    let currentExpression = [];

    for (let item of arr) {
      if (item === '(') {
        stack.push(currentExpression);
        currentExpression = [];
      } else if (item === ')') {
        const result = calculateSimpleExpression(currentExpression.filter(item => !isNaN(item)).map(Number), currentExpression.filter(item => isNaN(item)));
        currentExpression = stack.pop();
        currentExpression.push(result);
      } else {
        currentExpression.push(item);
      }
    }

    return currentExpression;
  };

  // Обрабатываем скобки
  const processedArray = handleBrackets(array);

  // Вычисляем результат для обработанного выражения
  const result = calculateSimpleExpression(processedArray.filter(item => !isNaN(item)).map(Number), processedArray.filter(item => isNaN(item)));

  try {
    if (!isNaN(result)) {
      return result;
    }
  } catch {
    return null;
  }
};