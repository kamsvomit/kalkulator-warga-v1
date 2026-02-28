import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator49: Calculator = {
  name: 'Kalkulator Selisih Gaji',
  id: 'salary-diff',
  description: 'Bandingkan dua penawaran gaji (Gross vs Net).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Gaji A (Gross)', 'a', 'number', 'Contoh: 10.000.000');
    const { wrapper: bWrap, input: bInput } = createInput('Gaji B (Net)', 'b', 'number', 'Contoh: 9.500.000');
    
    const calcBtn = createButton('Bandingkan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const a = parseValue(aInput.value);
      const b = parseValue(bInput.value);
      if (a > 0 && b > 0) {
        const aNet = a * 0.9; // Estimasi kasar potong pajak/bpjs
        const diff = b - aNet;
        resDisplay.innerHTML = `
          <div class="${diff > 0 ? 'text-green-400' : 'text-red-400'}">${formatCurrency(Math.abs(diff))}</div>
          <div class="text-xs text-gray-500 mt-1">${diff > 0 ? 'Gaji B lebih tinggi' : 'Gaji A (estimasi net) lebih tinggi'}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
