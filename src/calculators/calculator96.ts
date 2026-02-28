import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator96: Calculator = {
  name: 'Cooking Unit Converter',
  id: 'cook-convert',
  description: 'Convert between common cooking units (Tbsp, Tsp, Cup).',
  category: 'Daily Life',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Value', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    ['Tsp', 'Tbsp', 'Cup'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    ['Tsp', 'Tbsp', 'Cup'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const factors: any = { 'Tsp': 1, 'Tbsp': 3, 'Cup': 48 };

    calcBtn.onclick = () => {
      const val = parseFloat(vInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
      if (!isNaN(val)) {
        const res = (val * factors[from]) / factors[to];
        resDisplay.textContent = `${res.toFixed(2)} ${to}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
