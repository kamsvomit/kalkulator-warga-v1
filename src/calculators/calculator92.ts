import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator92: Calculator = {
  name: 'Kalkulator Pelunasan Kartu Kredit',
  id: 'cc-payoff',
  description: 'Hitung berapa bulan untuk melunasi hutang kartu kredit.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Saldo Hutang (Rp)', 'balance', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '18');
    const { wrapper: mWrap, input: mInput } = createInput('Pembayaran Bulanan (Rp)', 'monthly', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const b = parseFloat(bInput.value);
      const r = (parseFloat(rInput.value) || 18) / 100 / 12;
      const m = parseFloat(mInput.value);
      
      if (b > 0 && m > b * r) {
        const months = -Math.log(1 - (b * r) / m) / Math.log(1 + r);
        showResult(`${Math.ceil(months)} Bulan`);
      } else if (m <= b * r && b > 0) {
        showError('Pembayaran terlalu rendah untuk menutupi bunga.');
      } else {
        showError('Harap masukkan saldo dan pembayaran yang valid.');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; mInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
