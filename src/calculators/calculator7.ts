import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator7: Calculator = {
  name: 'Kalkulator Pajak',
  id: 'tax-calc',
  description: 'Hitung jumlah pajak dan harga total setelah pajak.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Sebelum Pajak', 'price', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tarif Pajak (%)', 'tax', 'number', 'Contoh: 11');
    
    const calcBtn = createButton('Hitung Total', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const taxRate = parseValue(tInput.value);
      if (price > 0 && taxRate >= 0) {
        const taxAmount = price * (taxRate / 100);
        const total = price + taxAmount;
        resDisplay.innerHTML = `
          <div>${formatCurrency(total)}</div>
          <div class="text-sm text-gray-500 mt-1">Pajak: ${formatCurrency(taxAmount)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
