import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator12: Calculator = {
  name: 'Kalkulator Pajak Penghasilan (PPh)',
  id: 'pph-calc',
  description: 'Estimasi pajak penghasilan bulanan Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number');
    
    const calcBtn = createButton('Hitung Pajak', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      if (salary > 0) {
        // Simple estimation for demo
        let tax = 0;
        if (salary > 5000000) tax = (salary - 5000000) * 0.05;
        resDisplay.textContent = formatCurrency(tax);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
