import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator5: Calculator = {
  name: 'Kalkulator Diskon',
  id: 'discount-calc',
  description: 'Hitung harga akhir setelah diskon dan jumlah penghematan.',
  category: 'Belanja',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Asli', 'price', 'number', 'Contoh: 100.000');
    const { wrapper: dWrap, input: dInput } = createInput('Diskon (%)', 'discount', 'number', 'Contoh: 20');
    
    const calcBtn = createButton('Hitung Harga', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const discount = parseValue(dInput.value);
      if (price > 0 && discount >= 0) {
        const savings = price * (discount / 100);
        const finalPrice = price - savings;
        resDisplay.innerHTML = `
          <div>${formatCurrency(finalPrice)}</div>
          <div class="text-sm text-gray-500 mt-1">Hemat: ${formatCurrency(savings)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
