import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator96: Calculator = {
  name: 'Konversi Satuan Masak',
  id: 'cook-convert',
  description: 'Konversi antara satuan masak umum (Sdt, Sdm, Cup).',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    [{id: 'Tsp', name: 'Sdt (Sendok Teh)'}, {id: 'Tbsp', name: 'Sdm (Sendok Makan)'}, {id: 'Cup', name: 'Cup'}].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id; opt.textContent = u.name;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    [{id: 'Tsp', name: 'Sdt (Sendok Teh)'}, {id: 'Tbsp', name: 'Sdm (Sendok Makan)'}, {id: 'Cup', name: 'Cup'}].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id; opt.textContent = u.name;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

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
        const unitName = to === 'Tsp' ? 'Sdt' : (to === 'Tbsp' ? 'Sdm' : 'Cup');
        showResult(`${res.toFixed(2)} ${unitName}`);
      } else {
        showError('Harap masukkan angka yang valid.');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
