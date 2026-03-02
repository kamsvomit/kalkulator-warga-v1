import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

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
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const gross = parseValue(gInput.value);
      const deductions = parseValue(pInput.value) || 0;
      
      if (!gInput.value) {
        showError('Harap masukkan nominal gaji kotor Anda.');
        return;
      }

      if (gross >= 0) {
        const net = gross - deductions;
        showResult(formatCurrency(net));
      } else {
        showError('Gaji kotor tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; pInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default gajiBersih;
