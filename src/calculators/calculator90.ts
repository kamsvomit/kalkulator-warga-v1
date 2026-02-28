import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator90: Calculator = {
  name: 'Mortgage Calculator',
  id: 'mortgage-calc',
  description: 'Calculate monthly mortgage payments including taxes and insurance.',
  category: 'Finance',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Home Price ($)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Down Payment ($)', 'down', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Interest Rate (%)', 'rate', 'number', '6');
    const { wrapper: tWrap, input: tInput } = createInput('Loan Term (Years)', 'term', 'number', '30');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const p = price - down;
      const r = (parseFloat(rInput.value) || 6) / 100 / 12;
      const n = (parseFloat(tInput.value) || 30) * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `Monthly Payment: ${formatCurrency(monthly)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
