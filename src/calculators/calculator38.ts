import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator38: Calculator = {
  name: 'Kalkulator Kurs Mata Uang',
  id: 'currency-conv-id',
  description: 'Konversi mata uang sederhana (USD ke IDR).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: uWrap, input: uInput } = createInput('Jumlah USD', 'usd', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Kurs (1 USD = Rp)', 'rate', 'number', '16000');
    
    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(uWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const usd = parseValue(uInput.value);
      const rate = parseValue(rInput.value) || 16000;
      if (usd >= 0) {
        const idr = usd * rate;
        resDisplay.textContent = `Rp ${idr.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      uInput.value = ''; rInput.value = '16000';
      resWrap.classList.add('hidden');
    };
  }
};
