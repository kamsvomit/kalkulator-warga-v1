import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator46: Calculator = {
  name: 'Estimasi Biaya Bensin',
  id: 'fuel-calc',
  description: 'Hitung estimasi biaya bensin untuk perjalanan Anda.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak Tempuh (km)', 'dist', 'number', 'Contoh: 100');
    const { wrapper: cWrap, input: cInput } = createInput('Konsumsi BBM (km/liter)', 'cons', 'number', 'Contoh: 15');
    const { wrapper: pWrap, input: pInput } = createInput('Harga BBM per Liter (Rp)', 'price', 'number', '12.500');
    
    const calcBtn = createButton('Hitung Biaya', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(cWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseValue(dInput.value);
      const cons = parseValue(cInput.value);
      const price = parseValue(pInput.value) || 12500;
      if (dist > 0 && cons > 0) {
        const liters = dist / cons;
        const total = liters * price;
        resDisplay.innerHTML = `
          <div>${formatCurrency(total)}</div>
          <div class="text-xs text-gray-500 mt-1">Butuh sekitar ${liters.toFixed(1)} Liter</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; cInput.value = ''; pInput.value = '12.500';
      resWrap.classList.add('hidden');
    };
  }
};
