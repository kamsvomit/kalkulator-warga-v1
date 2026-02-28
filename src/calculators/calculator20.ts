import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator20: Calculator = {
  name: 'Konversi Berat',
  id: 'weight-conv',
  description: 'Konversi antara Kilogram, Gram, Pound, dan Ounce.',
  category: 'Konversi',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    ['KG', 'Gram', 'Lbs', 'Oz'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    ['KG', 'Gram', 'Lbs', 'Oz'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const factors: any = { 'KG': 1, 'Gram': 0.001, 'Lbs': 0.453592, 'Oz': 0.0283495 };

    calcBtn.onclick = () => {
      const val = parseValue(vInput.value);
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
