import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator86: Calculator = {
  name: 'Kalkulator Tip',
  id: 'tip-calc',
  description: 'Hitung tip dan total tagihan per orang.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Jumlah Tagihan (Rp)', 'bill', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Persentase Tip (%)', 'tip', 'number', '15');
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Orang', 'people', 'number', '1');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(tWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bill = parseFloat(bInput.value);
      const tipPercent = parseFloat(tInput.value) || 15;
      const people = parseFloat(pInput.value) || 1;
      
      if (bill > 0 && people > 0) {
        const tipAmount = bill * (tipPercent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;
        
        resDisplay.innerHTML = `
          <div>Total: ${formatCurrency(total)}</div>
          <div class="text-sm text-gray-500 mt-1">Per Orang: ${formatCurrency(perPerson)}</div>
          <div class="text-sm text-gray-500">Tip: ${formatCurrency(tipAmount)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; tInput.value = '15'; pInput.value = '1';
      resWrap.classList.add('hidden');
    };
  }
};
