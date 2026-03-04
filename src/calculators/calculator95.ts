import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator95: Calculator = {
  name: 'Perbandingan Harga Satuan',
  id: 'unit-compare',
  description: 'Bandingkan dua produk untuk melihat mana yang lebih murah per satuannya.',
  category: 'Belanja',
  render(container) {
    const { wrapper: p1Wrap, input: p1Input } = createInput('Harga Produk 1 (Rp)', 'p1', 'number');
    const { wrapper: q1Wrap, input: q1Input } = createInput('Jumlah/Qty Produk 1', 'q1', 'number');
    const { wrapper: p2Wrap, input: p2Input } = createInput('Harga Produk 2 (Rp)', 'p2', 'number');
    const { wrapper: q2Wrap, input: q2Input } = createInput('Jumlah/Qty Produk 2', 'q2', 'number');
    
    const calcBtn = createButton('Bandingkan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(p1Wrap);
    container.appendChild(q1Wrap);
    container.appendChild(p2Wrap);
    container.appendChild(q2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p1 = parseFloat(p1Input.value);
      const q1 = parseFloat(q1Input.value);
      const p2 = parseFloat(p2Input.value);
      const q2 = parseFloat(q2Input.value);
      
      if (q1 > 0 && q2 > 0) {
        const u1 = p1 / q1;
        const u2 = p2 / q2;
        const resultText = u1 < u2 ? 'Produk 1 lebih murah' : (u1 > u2 ? 'Produk 2 lebih murah' : 'Keduanya sama');
        showResult(resultText);
      } else {
        showError('Harap masukkan jumlah yang valid (lebih dari 0).');
      }
    };

    resetBtn.onclick = () => {
      p1Input.value = ''; q1Input.value = ''; p2Input.value = ''; q2Input.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
