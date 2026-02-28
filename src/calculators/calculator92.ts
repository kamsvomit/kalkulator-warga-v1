import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator92: Calculator = {
  name: 'Credit Card Payoff Calculator',
  id: 'cc-payoff',
  description: 'Calculate how many months to pay off credit card debt.',
  category: 'Finance',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Balance ($)', 'balance', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Interest Rate (%)', 'rate', 'number', '18');
    const { wrapper: mWrap, input: mInput } = createInput('Monthly Payment ($)', 'monthly', 'number');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const b = parseFloat(bInput.value);
      const r = (parseFloat(rInput.value) || 18) / 100 / 12;
      const m = parseFloat(mInput.value);
      
      if (b > 0 && m > b * r) {
        const months = -Math.log(1 - (b * r) / m) / Math.log(1 + r);
        resDisplay.textContent = `${Math.ceil(months)} Months`;
        resWrap.classList.remove('hidden');
      } else if (m <= b * r) {
        resDisplay.textContent = 'Payment too low to cover interest';
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
