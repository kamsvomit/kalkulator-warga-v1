import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator91: Calculator = {
  name: 'Car Loan Calculator',
  id: 'car-loan',
  description: 'Calculate monthly payments for a car loan.',
  category: 'Finance',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Car Price ($)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Down Payment ($)', 'down', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Trade-in Value ($)', 'trade', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Interest Rate (%)', 'rate', 'number', '5');
    const { wrapper: mWrap, input: mInput } = createInput('Term (Months)', 'term', 'number', '60');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const trade = parseFloat(tInput.value) || 0;
      const p = price - down - trade;
      const r = (parseFloat(rInput.value) || 5) / 100 / 12;
      const n = parseFloat(mInput.value) || 60;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `Monthly Payment: ${formatCurrency(monthly)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
