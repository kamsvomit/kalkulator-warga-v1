import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator95: Calculator = {
  name: 'Unit Price Comparison',
  id: 'unit-compare',
  description: 'Compare two products to see which is cheaper per unit.',
  category: 'Shopping',
  render(container) {
    const { wrapper: p1Wrap, input: p1Input } = createInput('Product 1 Price ($)', 'p1', 'number');
    const { wrapper: q1Wrap, input: q1Input } = createInput('Product 1 Qty', 'q1', 'number');
    const { wrapper: p2Wrap, input: p2Input } = createInput('Product 2 Price ($)', 'p2', 'number');
    const { wrapper: q2Wrap, input: q2Input } = createInput('Product 2 Qty', 'q2', 'number');
    
    const calcBtn = createButton('Compare');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

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
        resDisplay.textContent = u1 < u2 ? 'Product 1 is cheaper' : (u1 > u2 ? 'Product 2 is cheaper' : 'Both are equal');
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      p1Input.value = ''; q1Input.value = ''; p2Input.value = ''; q2Input.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
