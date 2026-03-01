import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const gajiBersih: Calculator = {
  id: 'gaji-bersih',
  name: 'Gaji Bersih',
  description: 'Hitung gaji bersih setelah potongan (BPJS, Pajak, dll).',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Kotor (Gross)', 'gross', 'number');
    const { wrapper: pWrap, input: pInput } = createInput('Total Potongan', 'deductions', 'number', '0');
    
    const calcBtn = createButton('Hitung Gaji Bersih');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const gross = parseValue(gInput.value);
      const deductions = parseValue(pInput.value) || 0;
      
      if (gross > 0) {
        const net = gross - deductions;
        resDisplay.textContent = formatCurrency(net);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default gajiBersih;
