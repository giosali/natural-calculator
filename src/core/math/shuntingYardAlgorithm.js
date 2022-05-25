import Queue from '../collections/queue';
import Stack from '../collections/stack';
import { isOperator, getPrecedence, isLeftAssociative } from './operator';

function factorial(n) {
  if (n < 0) {
    return Number.NaN;
  }

  if (n === 0) {
    return 1;
  }

  if (n > 170) {
    return Number.POSITIVE_INFINITY;
  }

  let c = 1;
  for (let i = n; i > 0; i--) {
    c *= i;
  }

  return c;
}

function tryParsePostfixExpression(expression) {
  const nums = new Stack();
  const subs = expression.split(' ');
  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    const num = parseFloat(sub);
    if (!Number.isNaN(Number(sub))) {
      nums.push(num);
    } else {
      const [rightSuccess, right] = nums.tryPop();
      if (!rightSuccess) {
        return [false, '...'];
      }

      // eslint-disable-next-line prefer-const
      let [leftSuccess, left] = nums.tryPop();
      if (!leftSuccess) {
        left = 0;
      }

      switch (sub) {
        case '-':
        case '−':
          nums.push(left - right);
          break;
        case '+':
          nums.push(left + right);
          break;
        case '/':
        case '÷':
          if (right === 0) {
            let n;
            if (left > 0) {
              n = Number.POSITIVE_INFINITY;
            } else if (left < 0) {
              n = Number.NEGATIVE_INFINITY;
            } else {
              n = Number.NaN;
            }

            nums.push(n);
            break;
          }

          nums.push(left / right);
          break;
        case '*':
          nums.push(left * right);
          break;
        case '^':
          nums.push(left ** right);
          break;
        case '!':
          if (leftSuccess) {
            nums.push(left);
          }

          nums.push(factorial(right));
          break;
        default:
          break;
      }
    }
  }

  return [true, Math.round((nums.pop() + Number.EPSILON) * 1000000000) / 1000000000];
}

function tryParseInfixExpression(expression) {
  const ellipsis = '...';

  // Returns false if the first character isn't a number
  // and isn't one of the following:
  //  -- the subtraction operator
  //  -- the left parenthesis
  //  -- the decimal point
  const fch = expression[0];
  if (Number.isNaN(fch) && fch !== '-' && fch !== '−' && fch !== '(' && fch !== '.') {
    return [false, null];
  }

  const output = new Queue();
  const operators = new Stack();
  let buffer = '';
  let prevToken = '\0';
  let parenthesisCount = 0;

  const flushBuffer = () => {
    if (buffer.length > 0) {
      output.enqueue(buffer);
      buffer = '';
    }
  };

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];
    switch (token) {
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        // Exits if the previous token is an exponentiation operator
        // and if the current token is a decimal point
        // or if the previous token
        // and the current token are both the decimal point.
        if ((prevToken === '^' && token === '.') || (prevToken === '.' && token === '.')) {
          return [false, ellipsis];
        }

        buffer += token;
        break;
      case '(':
        // Handles multiplication by parentheses (parentheses as operators).
        if (prevToken === ')' || !Number.isNaN(Number(prevToken))) {
          operators.push('*');
        }

        flushBuffer();
        operators.push(token);
        parenthesisCount++;
        break;
      case ')': {
        // Exits if a right parenthesis is encountered and the current
        // parenthesis count is 0, meaning there's a mismatched parenthesis
        if (parenthesisCount === 0) {
          return [false, ellipsis];
        }

        flushBuffer();

        let [s, operator] = operators.tryPop();
        while (s && operator !== '(') {
          output.enqueue(operator);
          [s, operator] = operators.tryPop();
        }

        parenthesisCount--;
        break;
      }
      case '^':
      case '*':
      case '/':
      case '÷':
      case '+':
      case '-':
      case '−': {
        // Exits if the previous token is an operator
        // or an exponentiation operator
        // and if the current token isn't a subtraction operator.
        if ((isOperator(prevToken) || prevToken === '^') && token !== '-' && token !== '−') {
          return [false, ellipsis];
        }

        // Exits if the current token is a decimal point
        // and the previous token isn't a number
        // and we're at the end of the expression.
        if (token === '.' && !Number.isNaN(Number(prevToken)) && i === expression.length - 1) {
          return [false, ellipsis];
        }

        flushBuffer();

        // Handles negative numbers.
        if ((token === '-' || token === '−') && token === prevToken) {
          output.enqueue('-1');
          operators.push('*');
          break;
        }

        // Pops operators from the stack and enqueues them
        // while the stack contains operators and the operators aren't the left parenthesis
        // and have a higher precedence than the new operator
        // or have the same precedence and the new operator is left-associative.
        let [s, operator] = operators.tryPeek();
        while (s && operator !== '(') {
          const [stackP, newP] = [getPrecedence(operator), getPrecedence(token)];
          if (stackP > newP || (stackP === newP && isLeftAssociative(token))) {
            output.enqueue(operators.pop());
            [s, operator] = operators.tryPeek();
          } else {
            break;
          }
        }

        operators.push(token);
        break;
      }
      case '!': {
        // Exits if there is an exclamation mark but no number preceding it.
        if (Number.isNaN(Number(prevToken))) {
          return [false, null];
        }

        // Exits if there is a factorial containing a decimal.
        if (buffer.includes('.') || prevToken === '^') {
          return [false, ellipsis];
        }

        flushBuffer();
        output.enqueue(token);
        break;
      }
      default:
        return [false, ellipsis];
    }

    prevToken = token;
  }

  // Exits if there are unmatched parentheses
  // or if there's an incomplete exponent.
  if (parenthesisCount !== 0 || isOperator(prevToken)) {
    return [false, ellipsis];
  }

  flushBuffer();
  let [s, operator] = operators.tryPop();
  while (s) {
    output.enqueue(operator);
    [s, operator] = operators.tryPop();
  }

  return [true, output.toArray().join(' ')];
}

function tryParse(expression) {
  // Returns false if the expression is null or empty.
  if (expression === null || expression === '') {
    return [false, null];
  }

  const [success, postFixExpression] = tryParseInfixExpression(expression.replaceAll(' ', ''));
  if (!success && postFixExpression === null) {
    return [success, null];
  }

  if (postFixExpression === '...') {
    return [false, postFixExpression];
  }

  return tryParsePostfixExpression(postFixExpression);
}

export default tryParse;
