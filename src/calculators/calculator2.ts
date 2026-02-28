import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator2: Calculator = {
  name: 'Kalkulator Tabungan',
  id: 'savings-calc',
  description: 'Hitung pertumbuhan tabungan Anda dengan bunga majemuk.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Setoran Awal', 'initial', 'number', 'Contoh: 1.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Setoran Bulanan', 'monthly', 'number', 'Contoh: 500.000');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number', 'Contoh: 6');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu (Tahun)', 'years', 'number', 'Contoh: 5');
    
    const calcBtn = createButton('Hitung Pertumbuhan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(mWrap);
    container.appendChild(rWrap);
    container.appendChild(yWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      let balance = parseValue(iInput.value) || 0;
      const monthly = parseValue(mInput.value) || 0;
      const rate = (parseValue(rInput.value) || 0) / 100 / 12;
      const months = (parseValue(yInput.value) || 0) * 12;
      
      for (let i = 0; i < months; i++) {
        balance = (balance + monthly) * (1 + rate);
      }
      
      resDisplay.textContent = formatCurrency(balance);
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      iInput.value = ''; mInput.value = ''; rInput.value = ''; yInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
