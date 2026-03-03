import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator70: Calculator = {
  name: 'Kalkulator Akre ke Hektar',
  id: 'acre-to-ha',
  description: 'Konversi akre ke hektar.',
  category: 'Konversi',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Akre', 'acres', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const acre = parseFloat(aInput.value);
      if (!isNaN(acre)) {
        const ha = acre * 0.404686;
        resDisplay.textContent = `${ha.toFixed(2)} Hektar`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
