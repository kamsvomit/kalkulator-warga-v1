import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator69: Calculator = {
  name: 'Kalkulator ft² ke m²',
  id: 'sqft-to-sqm',
  description: 'Konversi kaki persegi (ft²) ke meter persegi (m²).',
  category: 'Konversi',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Kaki persegi (ft²)', 'sqft', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sqft = parseFloat(fInput.value);
      if (!isNaN(sqft)) {
        const sqm = sqft / 10.7639;
        resDisplay.textContent = `${sqm.toFixed(2)} m²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
