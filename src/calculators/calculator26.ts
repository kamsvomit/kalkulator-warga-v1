import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator26: Calculator = {
  name: 'Rasio',
  id: 'ratio-calc',
  description: 'Hitung perbandingan atau rasio antara dua angka.',
  category: 'Matematika',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Angka A', 'a', 'number');
    const { wrapper: bWrap, input: bInput } = createInput('Angka B', 'b', 'number');
    
    const calcBtn = createButton('Hitung Rasio', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    calcBtn.onclick = () => {
      const a = parseInt(aInput.value);
      const b = parseInt(bInput.value);
      if (a > 0 && b > 0) {
        const common = gcd(a, b);
        resDisplay.textContent = `${a / common} : ${b / common}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
