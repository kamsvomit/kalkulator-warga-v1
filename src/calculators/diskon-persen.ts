import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const diskonPersen: Calculator = {
  id: 'diskon-persen',
  name: 'Diskon Persen',
  description: 'Hitung potongan harga dalam bentuk persentase.',
  category: 'Belanja & Diskon',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Awal', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Diskon (%)', 'discount', 'number');
    
    const calcBtn = createButton('Hitung Diskon');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const discount = parseValue(dInput.value);
      
      if (price > 0 && discount >= 0) {
        const amount = (discount / 100) * price;
        const final = price - amount;
        
        resDisplay.innerHTML = `
          <div>${formatCurrency(final)}</div>
          <div class="text-sm font-medium text-slate-500 mt-1">Hemat: ${formatCurrency(amount)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default diskonPersen;
