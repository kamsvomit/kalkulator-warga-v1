import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator41: Calculator = {
  name: 'Estimasi Iuran BPJS Kesehatan',
  id: 'bpjs-kes',
  description: 'Hitung estimasi iuran BPJS Kesehatan untuk Pekerja Penerima Upah (PPU).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Pokok + Tunjangan Tetap', 'salary', 'number', 'Contoh: 5.000.000');
    
    const calcBtn = createButton('Hitung Iuran', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      if (salary > 0) {
        // PPU: 5% total (4% pemberi kerja, 1% pekerja)
        // Batas bawah UMK, batas atas 12jt
        const cappedSalary = Math.min(Math.max(salary, 0), 12000000);
        const pekerja = cappedSalary * 0.01;
        const perusahaan = cappedSalary * 0.04;
        resDisplay.innerHTML = `
          <div>${formatCurrency(pekerja)} <span class="text-xs text-gray-500">(Potong Gaji)</span></div>
          <div class="text-sm text-gray-500 mt-1">Total: ${formatCurrency(pekerja + perusahaan)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
