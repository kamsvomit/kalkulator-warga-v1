import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator75: Calculator = {
  name: 'Body Fat Calculator',
  id: 'body-fat',
  description: 'Estimate body fat percentage using the US Navy Method.',
  category: 'Fitness',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Waist (cm)', 'waist', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Neck (cm)', 'neck', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Height (cm)', 'height', 'number');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(nWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const n = parseFloat(nInput.value);
      const h = parseFloat(hInput.value);
      
      if (w > 0 && n > 0 && h > 0) {
        // Simple formula for males
        const bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
        resDisplay.textContent = `${bf.toFixed(1)}% Body Fat`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; nInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
