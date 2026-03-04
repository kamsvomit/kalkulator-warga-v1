import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator97: Calculator = {
  name: 'Pengubah Skala Resep',
  id: 'recipe-scaler',
  description: 'Ubah takaran bahan resep berdasarkan jumlah porsi yang diinginkan.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Porsi Asli', 'orig', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Porsi yang Diinginkan', 'new', 'number');
    const { wrapper: iWrap, input: iInput } = createInput('Jumlah Bahan', 'amt', 'number');
    
    const calcBtn = createButton('Ubah Skala');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(nWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const orig = parseFloat(oInput.value);
      const desired = parseFloat(nInput.value);
      const amt = parseFloat(iInput.value);
      
      if (orig > 0 && desired > 0 && amt > 0) {
        const res = (amt / orig) * desired;
        showResult(res.toFixed(2));
      } else {
        showError('Harap masukkan angka yang valid dan lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = ''; nInput.value = ''; iInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
