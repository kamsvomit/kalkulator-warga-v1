import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator45: Calculator = {
  id: 'pbb-calc',
  name: 'Pajak Bumi Bangunan (PBB)',
  description: 'Estimasi pajak bumi dan bangunan (PBB) tahunan Anda.',
  category: 'Rumah',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Nilai Jual Tanah (NJOP)', 'land', 'number', 'Contoh: 500.000.000');
    const { wrapper: bWrap, input: bInput } = createInput('Nilai Jual Bangunan (NJOP)', 'building', 'number', 'Contoh: 300.000.000');
    const { wrapper: nWrap, input: nInput } = createInput('NJOP Tidak Kena Pajak (NJOPTKP)', 'njoptkp', 'number', '12.000.000');
    
    const calcBtn = createButton('Hitung Estimasi PBB');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(bWrap);
    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const land = parseValue(lInput.value) || 0;
      const building = parseValue(bInput.value) || 0;
      const njoptkp = parseValue(nInput.value) || 12000000;
      
      const totalNjop = land + building;
      const njopKenaPajak = totalNjop - njoptkp;
      
      if (njopKenaPajak > 0) {
        // Simple PBB calculation: 0.5% * 20% * NJOPKP (for NJOP < 1M)
        // or 0.5% * 40% * NJOPKP (for NJOP >= 1M)
        const njkpRate = totalNjop >= 1000000000 ? 0.4 : 0.2;
        const pbb = 0.005 * njkpRate * njopKenaPajak;
        
        showResult(formatCurrency(pbb));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Estimasi PBB tahunan berdasarkan NJOP.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showResult('Rp 0');
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `NJOP di bawah batas minimal kena pajak.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; bInput.value = ''; nInput.value = '12.000.000';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator45;
