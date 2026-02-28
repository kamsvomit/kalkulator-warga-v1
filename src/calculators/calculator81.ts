import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator81: Calculator = {
  name: 'Flooring Calculator',
  id: 'flooring-calc',
  description: 'Calculate the amount of flooring material needed for a room.',
  category: 'Home',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Room Length (m)', 'length', 'number');
    const { wrapper: wWrap, input: wInput } = createInput('Room Width (m)', 'width', 'number');
    const { wrapper: w2Wrap, input: w2Input } = createInput('Wastage (%)', 'waste', 'number', '10');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(wWrap);
    container.appendChild(w2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      const w = parseFloat(wInput.value);
      const waste = parseFloat(w2Input.value) || 10;
      
      if (l > 0 && w > 0) {
        const area = l * w;
        const total = area * (1 + waste / 100);
        resDisplay.textContent = `${total.toFixed(2)} Sq M`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; wInput.value = ''; w2Input.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
