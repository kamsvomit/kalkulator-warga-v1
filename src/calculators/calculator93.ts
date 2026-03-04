import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator93: Calculator = {
  name: 'Kalkulator Kekayaan Bersih',
  id: 'net-worth',
  description: 'Hitung total kekayaan bersih Anda (Aset - Liabilitas).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Total Aset (Rp)', 'assets', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Total Liabilitas/Hutang (Rp)', 'liab', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const assets = parseFloat(aInput.value) || 0;
      const liab = parseFloat(lInput.value) || 0;
      const net = assets - liab;
      showResult(formatCurrency(net));
    };

    resetBtn.onclick = () => {
      aInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
