import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator17: Calculator = {
  name: 'Kalkulator Harga Per Unit',
  id: 'unit-price-id',
  description: 'Bandingkan nilai barang dengan menghitung harga per unit atau berat.',
  category: 'Belanja',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Total Harga', 'price', 'number');
    const { wrapper: qWrap, input: qInput } = createInput('Jumlah/Berat', 'qty', 'number');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const qty = parseValue(qInput.value);
      if (price >= 0 && qty > 0) {
        const unitPrice = price / qty;
        resDisplay.textContent = `${unitPrice.toFixed(2)} per unit`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
