import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator34: Calculator = {
  name: 'Kalkulator Pajak Mobil (PKB)',
  id: 'pkb-calc',
  description: 'Estimasi pajak kendaraan bermotor tahunan (PKB).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: nWrap, input: nInput } = createInput('Nilai Jual Kendaraan (NJKB)', 'njkb', 'number');
    
    const calcBtn = createButton('Hitung Estimasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const njkb = parseValue(nInput.value);
      if (njkb > 0) {
        const pkb = njkb * 0.02; // 2% for first car
        resDisplay.textContent = `Estimasi: Rp ${pkb.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
