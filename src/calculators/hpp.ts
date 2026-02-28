import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const hpp: Calculator = {
  id: 'hpp',
  name: 'Harga Pokok Produksi (HPP)',
  description: 'Hitung total biaya modal untuk satu unit produk.',
  category: 'Bisnis & Jualan',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Biaya Bahan Baku', 'raw-mat', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Biaya Tenaga Kerja', 'labor', 'number');
    const { wrapper: oWrap, input: oInput } = createInput('Biaya Overhead', 'overhead', 'number');
    const { wrapper: qWrap, input: qInput } = createInput('Jumlah Produksi (Unit)', 'qty', 'number', '1');
    
    const calcBtn = createButton('Hitung HPP');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(tWrap);
    container.appendChild(oWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const raw = parseValue(bInput.value) || 0;
      const labor = parseValue(tInput.value) || 0;
      const overhead = parseValue(oInput.value) || 0;
      const qty = parseValue(qInput.value) || 1;
      
      const total = raw + labor + overhead;
      const perUnit = total / qty;
      
      resDisplay.innerHTML = `
        <div>${formatCurrency(perUnit)} <span class="text-sm font-normal text-slate-500">/ unit</span></div>
        <div class="text-sm font-medium text-slate-500 mt-1">Total Biaya: ${formatCurrency(total)}</div>
      `;
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      bInput.value = ''; tInput.value = ''; oInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default hpp;
