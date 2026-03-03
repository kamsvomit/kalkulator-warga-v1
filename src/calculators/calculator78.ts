import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator78: Calculator = {
  name: 'Kalkulator Detak Jantung Maksimal',
  id: 'max-hr',
  description: 'Estimasi detak jantung maksimal Anda berdasarkan usia.',
  category: 'Kebugaran',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Usia', 'age', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const age = parseFloat(aInput.value);
      if (age > 0) {
        const maxHr = 220 - age;
        resDisplay.textContent = `${maxHr} BPM (Detak per Menit)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
