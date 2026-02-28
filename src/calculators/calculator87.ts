import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator87: Calculator = {
  name: 'Fuel Cost Calculator',
  id: 'fuel-cost',
  description: 'Calculate the cost of fuel for a trip.',
  category: 'Misc',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Distance (km)', 'dist', 'number');
    const { wrapper: fWrap, input: fInput } = createInput('Fuel Efficiency (L/100km)', 'eff', 'number', '8');
    const { wrapper: pWrap, input: pInput } = createInput('Fuel Price ($ per Liter)', 'price', 'number');
    
    const calcBtn = createButton('Calculate Cost');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(fWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseFloat(dInput.value);
      const eff = parseFloat(fInput.value) || 8;
      const price = parseFloat(pInput.value);
      
      if (dist > 0 && price > 0) {
        const liters = (dist / 100) * eff;
        const cost = liters * price;
        resDisplay.textContent = `Cost: ${formatCurrency(cost)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; fInput.value = '8'; pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
