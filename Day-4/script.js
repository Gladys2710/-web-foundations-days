// ── Select all elements ───────────────────────────────────────────
const textarea     = document.getElementById('note-text');
const charCount    = document.getElementById('char-count');
const wordCount    = document.getElementById('word-count');
const clearBtn     = document.getElementById('clear-btn');
const themeToggle  = document.getElementById('theme-toggle');

const MAX   = 200;
const WARN  = 180;

// ── updateCounts: runs on every keystroke ─────────────────────────
function updateCounts() {
  const text  = textarea.value;
  const chars = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  // Update the text
  charCount.textContent = `${chars} / ${MAX} characters`;
  wordCount.textContent = `${words} word${words === 1 ? '' : 's'}`;

  // Remove both classes first, then apply the right one
  charCount.classList.remove('warning', 'over');
  if (chars > MAX) {
    charCount.classList.add('over');
  } else if (chars > WARN) {
    charCount.classList.add('warning');
  }
}

// ── Save draft to localStorage on every input ─────────────────────
function saveDraft() {
  localStorage.setItem('draft', textarea.value);
}

textarea.addEventListener('input', () => {
  updateCounts();
  saveDraft();
});

// ── Clear everything ───────────────────────────────────────────────
function clearAll() {
  textarea.value = '';
  localStorage.removeItem('draft');
  updateCounts();
}

clearBtn.addEventListener('click', clearAll);

// Escape key inside the textarea also clears
textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') clearAll();
});

// ── Theme toggle ───────────────────────────────────────────────────
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── Restore saved draft and theme on page load ─────────────────────
function restoreFromStorage() {
  // Restore draft
  const savedDraft = localStorage.getItem('draft');
  if (savedDraft) {
    textarea.value = savedDraft;
  }

  // Restore theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light mode';
  } else {
    themeToggle.textContent = 'Dark mode';
  }

  // Update counters to match the restored text
  updateCounts();
}

restoreFromStorage();