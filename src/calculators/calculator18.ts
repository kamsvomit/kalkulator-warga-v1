import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator18: Calculator = {
  name: 'Kalkulator Tip',
  id: 'tip-calc-id',
  description: 'Hitung tip dan total tagihan per orang.',
  category: 'Lain-lain',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Jumlah Tagihan', 'bill', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Persentase Tip (%)', 'tip', 'number', 'Contoh: 10');
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Orang', 'people', 'number', 'Contoh: 1');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(tWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bill = parseValue(bInput.value);
      const tipPercent = parseValue(tInput.value) || 10;
      const people = parseValue(pInput.value) || 1;
      
      if (bill > 0 && people > 0) {
        const tipAmount = bill * (tipPercent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;
        
        resDisplay.innerHTML = `
          <div>Total: ${formatCurrency(total)}</div>
          <div class="text-sm text-gray-500 mt-1">Per Orang: ${formatCurrency(perPerson)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; tInput.value = '10'; pInput.value = '1';
      resWrap.classList.add('hidden');
    };
  }
};
