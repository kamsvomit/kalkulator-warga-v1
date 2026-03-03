import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator71: Calculator = {
  name: 'Kalkulator Hektar ke Akre',
  id: 'ha-to-acre',
  description: 'Konversi hektar ke akre.',
  category: 'Konversi',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Hektar', 'ha', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ha = parseFloat(hInput.value);
      if (!isNaN(ha)) {
        const acre = ha / 0.404686;
        resDisplay.textContent = `${acre.toFixed(2)} Akre`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
