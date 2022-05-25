export const isOperator = (ch) => {
  switch (ch) {
    case '^':
    case '*':
    case '/':
    case '÷':
    case '+':
    case '-':
    case '−':
      return true;
    default:
      return false;
  }
};

export const getPrecedence = (ch) => {
  switch (ch) {
    case '^':
      return 2;
    case '*':
    case '/':
    case '÷':
      return 1;
    case '+':
    case '-':
    case '−':
      return 0;
    default:
      return -1;
  }
};

export const isLeftAssociative = (ch) => {
  switch (ch) {
    case '*':
    case '/':
    case '÷':
    case '+':
    case '-':
    case '−':
      return true;
    default:
      return false;
  }
};
