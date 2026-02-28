export function createInput(label: string, id: string, type: string = 'number', placeholder: string = ''): { wrapper: HTMLElement, input: HTMLInputElement } {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-4';
  
  const labelEl = document.createElement('label');
  labelEl.className = 'block text-[11px] font-bold text-indigo-300 uppercase tracking-widest mb-2 px-1';
  labelEl.textContent = label;
  labelEl.setAttribute('for', id);
  
  const input = document.createElement('input');
  input.id = id;
  input.type = type === 'number' ? 'text' : type;
  input.placeholder = placeholder;
  input.className = 'w-full px-3 py-2 input-macos rounded-md text-sm transition-all';
  
  if (type === 'number') {
    input.inputMode = 'numeric';
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      let val = target.value.replace(/\D/g, '');
      if (val !== '') {
        target.value = Number(val).toLocaleString('id-ID');
      } else {
        target.value = '';
      }
    });
  }

  wrapper.appendChild(labelEl);
  wrapper.appendChild(input);
  
  return { wrapper, input };
}

export function createButton(text: string, className: string = 'btn-macos'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = `px-4 py-2 rounded-md font-medium transition-all active:scale-95 text-sm inline-flex items-center justify-center ${className}`;
  return btn;
}

export function createResultDisplay(): { wrapper: HTMLElement, display: HTMLElement } {
  const wrapper = document.createElement('div');
  wrapper.className = 'mt-6 p-5 result-macos rounded-lg hidden animate-fade-in';
  
  const title = document.createElement('h3');
  title.className = 'text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-2';
  title.textContent = 'Hasil Perhitungan';
  
  const display = document.createElement('div');
  display.className = 'text-2xl font-bold text-slate-900 dark:text-white tracking-tight';
  
  wrapper.appendChild(title);
  wrapper.appendChild(display);
  
  return { wrapper, display };
}

export function parseValue(val: string): number {
  return parseFloat(val.replace(/\./g, '').replace(/,/g, '.'));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
