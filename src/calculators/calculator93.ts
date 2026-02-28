import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator93: Calculator = {
  name: 'Net Worth Calculator',
  id: 'net-worth',
  description: 'Calculate your total net worth (Assets - Liabilities).',
  category: 'Finance',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Total Assets ($)', 'assets', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Total Liabilities ($)', 'liab', 'number');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const assets = parseFloat(aInput.value) || 0;
      const liab = parseFloat(lInput.value) || 0;
      const net = assets - liab;
      resDisplay.textContent = `Net Worth: ${formatCurrency(net)}`;
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      aInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
