import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator87: Calculator = {
  name: 'Kalkulator Biaya Bensin',
  id: 'fuel-cost',
  description: 'Hitung biaya bahan bakar untuk sebuah perjalanan.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: fWrap, input: fInput } = createInput('Konsumsi BBM (L/100km)', 'eff', 'number', '8');
    const { wrapper: pWrap, input: pInput } = createInput('Harga BBM (Rp per Liter)', 'price', 'number');
    
    const calcBtn = createButton('Hitung Biaya');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(fWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseFloat(dInput.value);
      const eff = parseFloat(fInput.value) || 8;
      const price = parseFloat(pInput.value);
      
      if (dist > 0 && price > 0) {
        const liters = (dist / 100) * eff;
        const cost = liters * price;
        resDisplay.textContent = `Biaya: ${formatCurrency(cost)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; fInput.value = '8'; pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
