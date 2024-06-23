//the line
/*
const start_1 = document.getElementById('start-1');
const start_2 = document.getElementById('start-2');
const end = document.getElementById('end');
new LeaderLine(start_1, start_2, { path: 'grid', color: '#eee' });
new LeaderLine(start_2, end, { path: 'grid', color: '#eee' });
*/
//the calculation
const input = document.querySelectorAll('.player__input');
const win = document.querySelector('.winner');
const container = document.querySelector('.container');
const scoreContainer = [
  document.querySelector('.score-1'),
  document.querySelector('.score-2'),
];
const score = [0, 0];
let won = false;
input.forEach((input) => input.addEventListener('keypress', scoreAdding));

function scoreAdding(e) {
  //guard close
  if (e.key !== 'Enter' || !this.value || +this.value === 0) return;
  let player = e.target.id === '0' ? 0 : 1;
  //if score is 0
  if (score[player] === 0 && !won && score[player] + +this.value < 100) {
    //create 1 box
    console.log('first');
    score[player] += +this.value;
    renderScoreBox(score[player], player);
  }
  //if score isn't 0 so already we have a box we show the small box
  else if (score[player] > 0 && (score[player] + +this.value < 100) & !won) {
    score[player] += +this.value;
    renderScoreBox(score[player], player, this.value, false);
    const finalBox = document.querySelectorAll(`.final-${player}`);
    const addBox = document.querySelectorAll(`.added-${player}`);
    line(
      finalBox[finalBox.length - 2].closest('.score_box'),
      addBox[addBox.length - 1].closest(`.score_box_added`)
    );
    line(
      addBox[addBox.length - 1].closest('.score_box_added'),
      finalBox[finalBox.length - 1].closest('.score_box')
    );
  } else if (score[player] + +this.value >= 100) {
    win.classList.remove('hidden');
    container.classList.remove('hidden');
    win.textContent = `Player-${player + 1} Wins`;
    won = true;
    this.value = '';
    return;
  }
  localStorage.setItem('score', JSON.stringify(score));
  this.value = '';
}

function renderScoreBox(score, player, v = 0, first = true) {
  let good = score >= 50 && score < 100 ? `+${score - 50}` : score;
  const markUp = first
    ? `<div class="score_box"><span class="final-${player}">${good}</span></div>`
    : `<div class="score_box_added"><span class="added-${player}">${v}</span></div>
       <div class="score_box"><span class="final-${player}">${good}</span></div>`;
  scoreContainer[player].insertAdjacentHTML('beforeend', markUp);
}

function line(sEle, eEle) {
  new LeaderLine(sEle, eEle, { path: 'grid', color: '#eee' });
}
document.querySelector('.btn').addEventListener('click', (e) => {
  score[0] = 0;
  score[1] = 0;
  won = false;
  scoreContainer.forEach((con) => (con.innerHTML = ''));
  document.querySelectorAll('.leader-line').forEach((l) => l.remove());
  win.classList.add('hidden');
  container.classList.add('hidden');
});
// storage

window.addEventListener('load', (e) => {
  const data = JSON.parse(localStorage.getItem('score'));
  if (!data) return;
  console.log(data);
  data.forEach((sc, i) => {
    if (sc === 0) return;
    score[i] = sc;
    renderScoreBox(sc, i);
  });
});
