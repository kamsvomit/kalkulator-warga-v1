import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator59: Calculator = {
  name: 'Kalkulator Gram ke Ons',
  id: 'g-to-oz',
  description: 'Konversi gram ke ons (ounces).',
  category: 'Konversi',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gram', 'grams', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const g = parseFloat(gInput.value);
      if (!isNaN(g)) {
        const oz = g * 0.035274;
        resDisplay.textContent = `${oz.toFixed(2)} Ons (Oz)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
