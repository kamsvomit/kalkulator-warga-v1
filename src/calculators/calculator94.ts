import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator94: Calculator = {
  name: 'Kalkulator Inflasi',
  id: 'inflation-calc',
  description: 'Hitung nilai masa depan uang berdasarkan tingkat inflasi.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Jumlah Sekarang (Rp)', 'amount', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Tingkat Inflasi (%)', 'rate', 'number', '3');
    const { wrapper: yWrap, input: yInput } = createInput('Tahun', 'years', 'number');
    
    const calcBtn = createButton('Hitung Nilai Masa Depan');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(yWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const amount = parseFloat(aInput.value);
      const rate = (parseFloat(rInput.value) || 3) / 100;
      const years = parseFloat(yInput.value);
      
      if (amount > 0 && years > 0) {
        const future = amount * Math.pow(1 + rate, years);
        resDisplay.textContent = `Nilai Masa Depan: ${formatCurrency(future)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; yInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
