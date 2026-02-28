import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const profitJualan: Calculator = {
  id: 'profit-jualan',
  name: 'Profit Jualan',
  description: 'Hitung keuntungan bersih dari penjualan produk Anda.',
  category: 'Bisnis & Jualan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Jual', 'sell-price', 'number', 'Contoh: 50.000');
    const { wrapper: mWrap, input: mInput } = createInput('Modal (HPP)', 'cost-price', 'number', 'Contoh: 35.000');
    const { wrapper: oWrap, input: oInput } = createInput('Biaya Operasional (Opsional)', 'ops-cost', 'number', '0');
    
    const calcBtn = createButton('Hitung Profit');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(mWrap);
    container.appendChild(oWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sell = parseValue(hInput.value);
      const cost = parseValue(mInput.value);
      const ops = parseValue(oInput.value) || 0;
      
      if (sell > 0 && cost > 0) {
        const profit = sell - cost - ops;
        const margin = (profit / sell) * 100;
        
        resDisplay.innerHTML = `
          <div class="${profit >= 0 ? 'text-green-500' : 'text-red-500'}">${formatCurrency(profit)}</div>
          <div class="text-sm font-medium text-slate-500 mt-1">Margin: ${margin.toFixed(2)}%</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; mInput.value = ''; oInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default profitJualan;
