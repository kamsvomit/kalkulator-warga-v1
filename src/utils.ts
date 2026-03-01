export function playSound(type: 'success' | 'error') {
  const sounds = {
    success: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.4;
  audio.play().catch(() => {}); // Ignore errors if browser blocks autoplay
}

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
  input.className = 'w-full px-4 py-3 input-3d rounded-xl text-sm font-medium text-white transition-all outline-none';
  
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

export function createButton(text: string, className: string = 'btn-3d'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = `px-6 py-3 rounded-xl font-bold transition-all active:scale-95 text-xs uppercase tracking-widest inline-flex items-center justify-center ${className}`;
  return btn;
}

export function createResultDisplay(): { wrapper: HTMLElement, display: HTMLElement } {
  const wrapper = document.createElement('div');
  wrapper.className = 'mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl hidden animate-fade-in shadow-inner relative group';
  
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-3';

  const title = document.createElement('h3');
  title.className = 'text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]';
  title.textContent = 'Hasil Perhitungan';
  
  const shareBtn = document.createElement('button');
  shareBtn.className = 'btn-share p-2 rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity';
  shareBtn.innerHTML = `
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
    </svg>
  `;
  shareBtn.title = 'Bagikan Hasil';

  shareBtn.onclick = (e) => {
    e.stopPropagation();
    const resultText = display.innerText;
    const shareData = {
      title: 'Hasil Perhitungan Kalkulator Warga',
      text: `Hasil perhitungan saya: ${resultText}\n\nHitung punyamu di Kalkulator Warga!`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
        const originalHTML = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span class="text-[8px] font-bold">Copied!</span>';
        setTimeout(() => shareBtn.innerHTML = originalHTML, 2000);
      });
    }
  };

  header.appendChild(title);
  header.appendChild(shareBtn);
  
  const display = document.createElement('div');
  display.className = 'text-xl sm:text-2xl font-black text-white tracking-tight';
  
  wrapper.appendChild(header);
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
