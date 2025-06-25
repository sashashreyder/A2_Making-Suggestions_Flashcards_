const data = [
  {
    word: 'arranged',
    prompt: 'She has already ___ the meeting for Friday.',
    answer: 'arranged',
    hint: 'Past participle of “arrange”.'
  },
  {
    word: 'destination',
    prompt: 'They were heading to their ___ when the storm started.',
    answer: 'destination',
    hint: 'The place you are going to.'
  },
  {
    word: 'convenient',
    prompt: 'Online learning is more ___ than traditional classes.',
    answer: 'convenient',
    hint: 'Suitable and easy.'
  },
  {
    word: 'reservation',
    prompt: 'By the time we arrived, they had already made a ___.',
    answer: 'reservation',
    hint: 'A booking made in advance.'
  },
  {
    word: 'considered',
    prompt: 'I have ___ all the options and still can’t decide.',
    answer: 'considered',
    hint: 'Thought about carefully.'
  },
  {
    word: 'alone',
    prompt: 'He was sitting ___ in the park when I saw him.',
    answer: 'alone',
    hint: 'Without anyone else.'
  },
  {
    word: 'prior',
    prompt: 'She had no ___ experience before this job.',
    answer: 'prior',
    hint: 'Earlier or previous.'
  },
  {
    word: 'suitable',
    prompt: 'This room is more ___ for meetings than the hallway.',
    answer: 'suitable',
    hint: 'Right or appropriate.'
  },
  {
    word: 'cancelled',
    prompt: 'They have just ___ the trip because of the storm.',
    answer: 'cancelled',
    hint: 'Called off; past participle of “cancel”.'
  },
  {
    word: 'together',
    prompt: 'We were working ___ on the project when she called.',
    answer: 'together',
    hint: 'With each other.'
  }
];



let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













