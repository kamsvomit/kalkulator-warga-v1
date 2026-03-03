import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator64: Calculator = {
  name: 'Kalkulator Liter ke Galon',
  id: 'l-to-gal',
  description: 'Konversi liter ke galon (US).',
  category: 'Konversi',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Liter', 'liters', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      if (!isNaN(l)) {
        const gal = l * 0.264172;
        resDisplay.textContent = `${gal.toFixed(2)} Galon`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
