import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator35: Calculator = {
  name: 'Kalkulator Zakat Fitrah',
  id: 'zakat-fitrah',
  description: 'Hitung jumlah zakat fitrah untuk keluarga Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Orang', 'people', 'number', '1');
    const { wrapper: hWrap, input: hInput } = createInput('Harga Beras (per kg)', 'price', 'number', '15000');
    
    const calcBtn = createButton('Hitung Zakat', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const people = parseValue(pInput.value) || 1;
      const price = parseValue(hInput.value) || 15000;
      const totalKg = people * 2.5;
      const totalMoney = totalKg * price;
      
      resDisplay.innerHTML = `
        <div>Rp ${totalMoney.toLocaleString('id-ID')}</div>
        <div class="text-sm text-gray-500 mt-1">Setara ${totalKg} kg Beras</div>
      `;
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      pInput.value = '1'; hInput.value = '15000';
      resWrap.classList.add('hidden');
    };
  }
};
