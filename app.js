import mapping from './data.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

const $in = document.getElementById('in');
const $out = document.getElementById('out');
const $clr = document.getElementById('clr');
const $tbody = document.querySelector('#table tbody');

function hex4(str) {
  return (str || '').trim().toUpperCase().replace(/[^0-9A-F]/g, '').slice(0,4);
}

function lookup(key) {
  if (!key || key.length !== 4) {
    $out.innerHTML = '—';
    return;
  }
  const ans = mapping[key];
  if (ans) {
    $out.innerHTML = `<span class="ok">Answer: ${ans}</span>`;
  } else {
    $out.innerHTML = `<span class="bad">找不到對應值</span>`;
  }
}

$in.addEventListener('input', () => {
  $in.value = hex4($in.value);
  lookup($in.value);
});

$clr.addEventListener('click', () => {
  $in.value = '';
  $in.focus();
  lookup('');
});

function renderTable() {
  const keys = Object.keys(mapping).sort((a,b)=>parseInt(a,16)-parseInt(b,16));
  $tbody.innerHTML = keys.map(k => `<tr><td>${k}</td><td>${mapping[k]}</td></tr>`).join('');
}
renderTable();
