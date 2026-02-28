import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator39: Calculator = {
  name: 'Kalkulator Harga Emas',
  id: 'gold-calc',
  description: 'Hitung nilai emas berdasarkan berat dan harga pasar.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Emas (gram)', 'weight', 'number');
    const { wrapper: pWrap, input: pInput } = createInput('Harga per Gram (Rp)', 'price', 'number', '1000000');
    
    const calcBtn = createButton('Hitung Nilai', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      const price = parseValue(pInput.value) || 1000000;
      if (weight > 0) {
        const total = weight * price;
        resDisplay.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; pInput.value = '1000000';
      resWrap.classList.add('hidden');
    };
  }
};
