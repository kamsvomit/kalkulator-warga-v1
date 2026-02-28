import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator45: Calculator = {
  name: 'Estimasi Tagihan Listrik PLN',
  id: 'pln-calc',
  description: 'Hitung estimasi tagihan listrik bulanan berdasarkan pemakaian kWh.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Pemakaian (kWh)', 'kwh', 'number', 'Contoh: 200');
    const { wrapper: rWrap, input: rInput } = createInput('Tarif per kWh (Rp)', 'rate', 'number', '1.444');
    
    const calcBtn = createButton('Hitung Tagihan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kwh = parseValue(kInput.value);
      const rate = parseValue(rInput.value) || 1444;
      if (kwh > 0) {
        const total = kwh * rate;
        const ppj = total * 0.03; // Asumsi PPJ 3%
        resDisplay.innerHTML = `
          <div>${formatCurrency(total + ppj)}</div>
          <div class="text-xs text-gray-500 mt-1">Termasuk estimasi PPJ 3%</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = ''; rInput.value = '1.444';
      resWrap.classList.add('hidden');
    };
  }
};
