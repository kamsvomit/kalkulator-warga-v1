import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator60: Calculator = {
  name: 'Kalkulator Ons ke Gram',
  id: 'oz-to-g',
  description: 'Konversi ons (ounces) ke gram.',
  category: 'Konversi',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Ons (Oz)', 'ounces', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const oz = parseFloat(oInput.value);
      if (!isNaN(oz)) {
        const g = oz / 0.035274;
        resDisplay.textContent = `${g.toFixed(2)} Gram`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
