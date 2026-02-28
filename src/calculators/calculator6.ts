import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator6: Calculator = {
  name: 'Kalkulator ROI',
  id: 'roi-calc',
  description: 'Hitung Return on Investment (ROI) untuk investasi Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Investasi Awal', 'invested', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Nilai Akhir', 'returned', 'number');
    
    const calcBtn = createButton('Hitung ROI', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const invested = parseValue(iInput.value);
      const returned = parseValue(rInput.value);
      if (invested > 0) {
        const roi = ((returned - invested) / invested) * 100;
        resDisplay.textContent = `${roi.toFixed(2)}%`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = ''; rInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
