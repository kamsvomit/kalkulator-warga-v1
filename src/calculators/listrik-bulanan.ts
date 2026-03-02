import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const listrikBulanan: Calculator = {
  id: 'listrik-bulanan',
  name: 'Biaya Listrik Bulanan',
  description: 'Estimasi tagihan listrik bulanan berdasarkan pemakaian kWh.',
  category: 'Rumah',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Pemakaian (kWh)', 'kwh', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tarif per kWh (Rp)', 'rate', 'number', '1444');
    
    const calcBtn = createButton('Hitung Tagihan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kwh = parseValue(kInput.value);
      const rate = parseValue(tInput.value) || 1444;
      
      if (!kInput.value) {
        showError('Harap masukkan jumlah pemakaian kWh.');
        return;
      }

      if (kwh >= 0) {
        const total = kwh * rate;
        showResult(formatCurrency(total));
      } else {
        showError('Pemakaian tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = ''; tInput.value = '1.444';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default listrikBulanan;
