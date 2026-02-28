import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator11: Calculator = {
  name: 'Kalkulator Zakat Mal',
  id: 'zakat-mal',
  description: 'Hitung kewajiban zakat mal (2.5%) dari total harta Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Total Harta ($)', 'harta', 'number', 'Contoh: 100000000');
    const { wrapper: nWrap, input: nInput } = createInput('Harga Emas Saat Ini (per gram)', 'emas', 'number', 'Contoh: 1000000');
    
    const calcBtn = createButton('Hitung Zakat', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const harta = parseValue(hInput.value);
      const emas = parseValue(nInput.value);
      const nishab = 85 * emas;
      
      if (harta >= nishab) {
        const zakat = harta * 0.025;
        resDisplay.innerHTML = `
          <div>${formatCurrency(zakat)}</div>
          <div class="text-sm text-green-600 mt-1">Wajib Zakat (Harta mencapai nishab)</div>
        `;
      } else {
        resDisplay.innerHTML = `
          <div class="text-lg text-gray-500">Belum Wajib Zakat</div>
          <div class="text-sm text-gray-400 mt-1">Harta di bawah nishab (${formatCurrency(nishab)})</div>
        `;
      }
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      hInput.value = ''; nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
