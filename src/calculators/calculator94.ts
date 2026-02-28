import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator94: Calculator = {
  name: 'Inflation Calculator',
  id: 'inflation-calc',
  description: 'Calculate future value of money based on inflation rate.',
  category: 'Finance',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Current Amount ($)', 'amount', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Inflation Rate (%)', 'rate', 'number', '3');
    const { wrapper: yWrap, input: yInput } = createInput('Years', 'years', 'number');
    
    const calcBtn = createButton('Calculate Future Value');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(yWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const amount = parseFloat(aInput.value);
      const rate = (parseFloat(rInput.value) || 3) / 100;
      const years = parseFloat(yInput.value);
      
      if (amount > 0 && years > 0) {
        const future = amount * Math.pow(1 + rate, years);
        resDisplay.textContent = `Future Value: ${formatCurrency(future)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; yInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
