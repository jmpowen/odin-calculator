const buttons = document.querySelectorAll('button');
const input = document.getElementById('input');

let solved = false;

for (let button of buttons) {
  button.addEventListener('click', (event) => {
    if (solved) {
      input.value = "";
      solved = false;
    }
    let val = event.currentTarget.textContent;
    switch (val) {
      case 'AC':
        input.value = "";
        break;
      case '=': 
        solve();
        break;
      default:
        input.value += val;
    }
  })
}

function solve() {
  let numbers = input.value.split(/[-+*/]/);
  let operands = input.value.split(/\d/g).filter(item => item !== '');
  let value = 0;
  let operand = -1;
  while (operands.length !== 0) {
    operand = operands.indexOf('*') >= 0 
      ? operands.indexOf('*') 
      : operands.indexOf('/') >= 0 
      ? operands.indexOf('/')
      : operands.indexOf('+') >= 0
      ? operands.indexOf('+')
      : operands.indexOf('-') >= 0
      ? operands.indexOf('-')
      : -1;
    if (operand >= 0) {
      switch (operands[operand]) {
        case '*':
          value = +numbers[operand] * +numbers[operand+1];
          operands.splice(operand, 1);
          numbers[operand] = value;
          numbers.splice(operand+1, 1);
          break;
        case '/':
          value = +numbers[operand] / +numbers[operand+1];
          operands.splice(operand, 1);
          numbers[operand] = value;
          numbers.splice(operand+1, 1);
          break;
        case '+':
          value = +numbers[operand] + +numbers[operand+1];
          operands.splice(operand, 1);
          numbers[operand] = value;
          numbers.splice(operand+1, 1);
          break;
        case '-':
          value = +numbers[operand] - +numbers[operand+1];
          operands.splice(operand, 1);
          numbers[operand] = value;
          numbers.splice(operand+1, 1);
          break;
        default:
          console.log('switch uhoh')
      }
    } else {
      console.log('uhoh')
    }
  }
  input.value = value;
  solved = true;
}