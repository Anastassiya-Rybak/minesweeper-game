let timerGo = {
  on: false,
  bombLocation: [],
  count: 0,
  timerSecCount: 0,
  callsStat: {},
  level: 1,
  openedCells: 0,

};

if (JSON.parse(localStorage.getItem('minerTimerGo'))) {
  timerGo = JSON.parse(localStorage.getItem('minerTimerGo'));
  localStorage.removeItem('minerTimerGo');
}

let bombsCount = 10;
if (localStorage.getItem('minerBombsCount')) {
  bombsCount = Number(localStorage.getItem('minerBombsCount'));
}

let timerInterval;
let level = 1;
if (localStorage.getItem('minerLevel')) {
  level = Number(localStorage.getItem('minerLevel'));
}
let scoreMemory;
if (JSON.parse(localStorage.getItem('scoreMemory'))){
  scoreMemory = JSON.parse(localStorage.getItem('scoreMemory'));
} else {
  scoreMemory = localStorage.setItem('scoreMemory', JSON.stringify([]));
}
let item = 'white';
if (localStorage.getItem('minerItem')) {
  item = localStorage.getItem('minerItem');
}
let result = {};

document.querySelector('body').classList.add(item);
const header = document.createElement('header');
header.className = 'header container'

const title = document.createElement('h1');
title.innerHTML = 'MINESWEEPER';
header.append(title);

const main = document.createElement('main');
main.className = 'main container';

const side = document.createElement('aside');
side.className = 'sidebar';

const levelWrap = document.createElement('select');
levelWrap.className = 'level-checkbox sidebar-item';
for (let i = 0; i < 3; i++) {
  levelWrap.append(document.createElement('option'));
}
if (timerGo.on) {Array.from(levelWrap.children).forEach(el => el.setAttribute('disabled', ''));}
levelWrap.children[level-1].setAttribute('selected', '');
levelWrap.children[0].innerHTML = '1 level';
levelWrap.children[1].innerHTML = '2 level';
levelWrap.children[2].innerHTML = '3 level';

const numOfBombWrap = document.createElement('span');
numOfBombWrap.className = 'bomb-number-wrap';
const numOfBomb = document.createElement('span');
numOfBomb.className = 'bomb-number-checkbox sidebar-item';
numOfBomb.innerHTML = bombsCount;

const plusNumOfBomb = document.createElement('span');
plusNumOfBomb.className = 'plus sidebar-item';
const minusNumOfBomb = document.createElement('span');
minusNumOfBomb.className = 'minus sidebar-item';
numOfBombWrap.append(minusNumOfBomb, numOfBomb, plusNumOfBomb);

const showAttantion = () => {
  const attMessage = document.createElement('div');
  attMessage.className = 'att';
  const attMessageText = document.createElement('p');
  attMessageText.innerHTML = 'The value cannot be changed during the game. Finish the game or restart to change the value.';
  attMessage.append(attMessageText);
  document.querySelector('body').append(attMessage);
  setTimeout(()=>{attMessage.remove()}, 3000);
}

numOfBombWrap.addEventListener('click', (e) => {
  if (timerGo.on) {
    showAttantion();
    return
  }
  if (e.target.classList.contains('plus')) {
    Number(numOfBomb.innerHTML) < 99 ? numOfBomb.innerHTML = Number(numOfBomb.innerHTML) + 1 : numOfBomb.innerHTML = 99;
  }
  if (e.target.classList.contains('minus')) {
    Number(numOfBomb.innerHTML) > 10 ? numOfBomb.innerHTML = Number(numOfBomb.innerHTML) - 1 : numOfBomb.innerHTML = 10;
  }
})

const timer = document.createElement('div');
timer.className = 'timer';
item === 'white' ? timer.classList.add('btn-white-item') : timer.classList.add('btn-dark-item');
const timer1Seconds = document.createElement('span');
timer1Seconds.innerHTML = '0';
timer1Seconds.className = 'seconds-item';
const timer2Seconds = document.createElement('span');
timer2Seconds.innerHTML = '0';
timer2Seconds.className = 'seconds-item';
const timer3Seconds = document.createElement('span');
timer3Seconds.innerHTML = '0';
timer3Seconds.className = 'seconds-item';

timer.append(timer1Seconds, timer2Seconds, timer3Seconds);

const timerOn = () => {
  timerGo.on = true;
  timerInterval = setInterval(function() {
    console.log(1);
    timerGo.timerSecCount += 1;
    if (timerGo.timerSecCount >= 0 && timerGo.timerSecCount <= 9) { timer3Seconds.innerHTML = timerGo.timerSecCount.toString(); }
    else if (timerGo.timerSecCount >= 10 && timerGo.timerSecCount <= 99) {
      timer2Seconds.innerHTML = timerGo.timerSecCount.toString().substring(0, 1);
      timer3Seconds.innerHTML = timerGo.timerSecCount.toString().substring(1);
    } if (timerGo.timerSecCount >= 100 && timerGo.timerSecCount <= 999) {
      timer1Seconds.innerHTML = timerGo.timerSecCount.toString().substring(0, 1);
      timer2Seconds.innerHTML = timerGo.timerSecCount.toString().substring(1, 2);
      timer3Seconds.innerHTML = timerGo.timerSecCount.toString().substring(2);
    }
  }, 1000);
}

if (timerGo.on) {
  timerOn();
}

const stopTimer = () => {
  timerGo.on = false;
  clearInterval(timerInterval);
}

const move = document.createElement('div');
move.className = 'move';
item === 'white' ? move.classList.add('btn-white-item') : move.classList.add('btn-dark-item');
const moveCount = document.createElement('span');
moveCount.className = 'move-item';
moveCount.innerHTML = timerGo.count;
move.append(moveCount);

const reset = document.createElement('div');
reset.className = 'reset';
item === 'white' ? reset.classList.add('btn-white-item') : reset.classList.add('btn-dark-item');
const restartBtn = document.createElement('span');
restartBtn.className = 'reset-btn sidebar-item';
restartBtn.innerHTML = 'RESTART';
reset.append(restartBtn);

const settingContainer = document.createElement('div');
settingContainer.className = 'setting-container';
item === 'white' ? settingContainer.classList.add('btn-white-item') : settingContainer.classList.add('btn-dark-item');
const itemBtn = document.createElement('span');
itemBtn.className = 'item sidebar-item';
const itemLight = document.createElement('img');
itemLight.className = 'light';
item === 'white' ? itemLight.classList.add('on') : itemLight.classList.add('no');
itemLight.src = './assets/image/light.png';
const itemDark = document.createElement('img');
itemDark.className = 'dark';
item === 'white' ? itemDark.classList.add('no') : itemDark.classList.add('on');
itemDark.src = './assets/image/dark.png';
itemBtn.append(itemLight, itemDark);

settingContainer.append(itemBtn, levelWrap, numOfBombWrap);

const sideRulesWrap = document.createElement('div');
sideRulesWrap.className = 'rules-container';
item === 'white' ? sideRulesWrap.classList.add('btn-white-item') : sideRulesWrap.classList.add('btn-dark-item');
const sideRules = document.createElement('span');
sideRules.className = 'side-rules sidebar-item';
sideRules.innerHTML = 'RULES';

const sideRulesList = document.createElement('ul');
for (let u = 0; u < 3; u++) {
  sideRulesList.append(document.createElement('li'));
}
sideRulesList.children[0].innerHTML = '- You can mark a suspicious cell by clicking the right mouse button.';
sideRulesList.children[1].innerHTML = '- The numbers that appear indicate the number of bombs in adjacent cells. Diagonally, horizontally, vertically.';

sideRulesWrap.append(sideRules, sideRulesList);

side.append(settingContainer, reset, sideRulesWrap);

sideRules.addEventListener('click', ()=>{
  sideRulesWrap.classList.toggle('open-rules');
})

const playground = document.createElement('section');
playground.className = 'playground size-1';

const counters = document.createElement('div');
counters.className = 'counters';
counters.append(move, timer);

const score = document.createElement('aside');
score.className = 'score';
scoreMemory = JSON.parse(localStorage.getItem('scoreMemory'));
const scoreTitle = document.createElement('h2');
scoreTitle.innerHTML = `SCORE`;
const scoreTable = document.createElement('div');
scoreTable.className = 'score-table';

score.append(counters, scoreTitle, scoreTable);

const fillScoreTable = () => {
  for (let i = 0; i < 10; i++) {
    scoreTable.append(document.createElement('div'));  
  }

  Array.from(scoreTable.children).forEach((elem, idx) => {
    elem.className = 'score-line';
    elem.append(document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span'));
  
    if (scoreMemory[idx]) {
      elem.children[0].className = 'date';
      elem.children[0].innerHTML = scoreMemory[idx].date;
      elem.children[1].className = 'level';
      elem.children[1].innerHTML = `${scoreMemory[idx].level} level`;
      elem.children[2].className = 'steps';
      elem.children[2].innerHTML = `${scoreMemory[idx].steps} steps`;
      elem.children[3].className = 'time';
      elem.children[3].innerHTML = `${scoreMemory[idx].time} s`;
    }
  })  
}
fillScoreTable();

scoreTitle.addEventListener('click', () => {
  scoreTable.classList.toggle('open-score');
})

main.append(side, playground, score);
document.querySelector('body').append(header, main);

const turnOnItem = (e) => {
  e.target.closest('span').children[0].classList.toggle('on');
  e.target.closest('span').children[1].classList.toggle('on');

  if ( document.querySelector('body').classList.contains('black') ) {
    item = 'white';
    document.querySelector('body').classList.replace('black', 'white');
    Array.from(counters.children).forEach(elem => elem.classList.remove('btn-dark-item'));
    Array.from(side.children).forEach(elem => elem.classList.remove('btn-dark-item'));
  } else {
    item = 'black';
    document.querySelector('body').classList.replace('white', 'black');
    Array.from(side.children).forEach(elem => elem.classList.add('btn-dark-item'));
    Array.from(counters.children).forEach(elem => elem.classList.add('btn-dark-item'));
  }
}
itemBtn.addEventListener('click', turnOnItem, false);

let curCells = 100;

const setBombs = (noone) => {
  bombsCount = Number(numOfBomb.innerHTML);
  switch (level) {
    case 1:
      curCells = 100;
      break;
    case 2:
      curCells = 225;
      break;
    case 3:
      curCells = 625;
      break;      
    default:
      break;
  }
  while (timerGo.bombLocation.length < bombsCount) {
    let random = Math.floor(Math.random() * curCells);
    if (!timerGo.bombLocation.includes(random) && random !== noone) {
      timerGo.bombLocation.push(random);
    }
  };
  Array.from(playground.children).forEach((el, idx) => {
    if (timerGo.bombLocation.includes(idx)) {
      el.children[0].className = 'set-bomb';
    }
  })

}

const finishGameMassege = (howEnd) => {
  const massegeModalWrapper = document.createElement('div');
  massegeModalWrapper.className = 'massege-modal-wrapper show-modal';
  massegeModalWrapper.classList.add(howEnd === 'failed' ? 'fail' : 'done');
  massegeModalWrapper.classList.add(item === 'white' ? 'white-modal' : 'dark-modal');
  const massegeModal = document.createElement('div');
  massegeModal.className = 'massege-modal';
  const massegeTitle = document.createElement('h2');
  massegeTitle.innerHTML = `Mission ${howEnd}!`;
  const gameTime = document.createElement('div');
  const gameTimeDetail = document.createElement('span');
  gameTimeDetail.innerHTML = `${timerGo.timerSecCount} s`;
  gameTime.append(gameTimeDetail);
  const gameSteps = document.createElement('span');
  gameSteps.innerHTML = `${timerGo.count} steps`;
  const resetBtn = document.createElement('button');
  resetBtn.innerHTML = howEnd === 'failed' ? 'Try again!' : 'Do it again!';
  resetBtn.addEventListener('click', toRepeat, false)

  howEnd === 'failed' ? massegeModal.append(massegeTitle, resetBtn) : massegeModal.append(massegeTitle, gameTime, gameSteps, resetBtn);
  massegeModalWrapper.append(massegeModal);
  main.append(massegeModalWrapper);
}

const saveResults = (how) => {
  if (how) {
    result.date = new Date().toLocaleString();
    result.level = level;
    result.steps = timerGo.count;
    result.time = timerGo.timerSecCount;

    scoreMemory = JSON.parse(localStorage.getItem('scoreMemory'));

    if (scoreMemory.length === 10) {
      scoreMemory.pop();
      scoreMemory.reverse().push(result);
    } else {
      scoreMemory.reverse().push(result);
    }
    localStorage.setItem('scoreMemory', JSON.stringify(scoreMemory.reverse()));
  }
}

const missionFsiled = () => {
  audioFail.play();
  for (let i = 0; i < bombsCount; i++) {
    setTimeout (()=>{
      playground.children[timerGo.bombLocation[i]].classList.add('checked');
      playground.children[timerGo.bombLocation[i]].children[0].classList.add('show');
    }, 500);
  }
  timerGo.openedCells = 0;

  saveResults(false);

  setTimeout(finishGameMassege, 2000, 'failed');
}

const missionCompleted = () => {
  audioWin.play();
  for (let i = 0; i < bombsCount; i++) {
    setTimeout (()=>{
      playground.children[timerGo.bombLocation[i]].classList.add('checked');
      playground.children[timerGo.bombLocation[i]].children[0].classList.add('show');
    }, 500);
  }

  timerGo.openedCells = 0;

  saveResults(true);
  
  setTimeout(finishGameMassege, 2000, 'completed');
}

const winTest = () => {
  if (timerGo.openedCells === playground.children.length - bombsCount) {
    missionCompleted();
    stopTimer();
    Array.from(scoreTable.children).forEach(elem => elem.remove());
    Array.from(levelWrap.children).forEach(el => el.removeAttribute('disabled')); 
    fillScoreTable();
  }
}

const restart = (whichRestart) => {
  if (whichRestart === 'btn') {
    for (let i = 0; i < playground.children.length; i++) {
      playground.children[i].classList.remove('checked');
      playground.children[i].classList.remove('amEmpty');
      playground.children[i].children[1].classList.remove('flag');
      playground.children[i].children[0].classList.remove('show');
      playground.children[i].children[0].classList.remove('set-bomb');
      for (let idx = 0; idx <= 8; idx++) {
        if(playground.children[i].classList.contains(`l${idx}`)) playground.children[i].classList.remove(`l${idx}`);
      }
    }
    timerGo.bombLocation = [];
    stopTimer();
    timerGo.count = 0;
    timerGo.openedCells = 0;
    timerGo.timerSecCount = 0;
    timer1Seconds.innerHTML = '0';
    timer2Seconds.innerHTML = '0';
    timer3Seconds.innerHTML = '0';
    Array.from(levelWrap.children).forEach(el => el.removeAttribute('disabled'));
  } 
  if (timerGo.timerSecCount >= 0 && timerGo.timerSecCount <= 9) { timer3Seconds.innerHTML = timerGo.timerSecCount.toString(); }
  else if (timerGo.timerSecCount >= 10 && timerGo.timerSecCount <= 99) {
    timer2Seconds.innerHTML = timerGo.timerSecCount.toString().substring(0, 1);
    timer3Seconds.innerHTML = timerGo.timerSecCount.toString().substring(1);
  } if (timerGo.timerSecCount >= 100 && timerGo.timerSecCount <= 999) {
    timer1Seconds.innerHTML = timerGo.timerSecCount.toString().substring(0, 1);
    timer2Seconds.innerHTML = timerGo.timerSecCount.toString().substring(1, 2);
    timer3Seconds.innerHTML = timerGo.timerSecCount.toString().substring(2);
  }

  moveCount.innerHTML = timerGo.count;
}

const toRepeat = (e) => {
  e.preventDefault();
  if (document.querySelector('.massege-modal-wrapper')) {document.querySelector('.massege-modal-wrapper').remove();}
  restart('btn');
}

const checkBombArea = (idx, bmbCheck) => {
  switch (level) {
    case 1:
      if (idx + 1 <= 99 && (idx-9) % 10 != 0 && playground.children[idx+1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 1 >= 0 && idx % 10 !== 0 && playground.children[idx-1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 10 <= 99 && playground.children[idx+10].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 11 <= 99 && (idx-9) % 10 !== 0 && playground.children[idx+11].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 9 <= 99 && idx % 10 !== 0 && playground.children[idx+9].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 9 >= 0 && (idx-9) % 10 != 0 && playground.children[idx-9].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 10 >= 0 && playground.children[idx-10].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 11 >= 0 && idx % 10 !== 0 && playground.children[idx-11].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }    
      break;
    case 2:
      if (idx + 1 <= 224 && (idx-14) % 15 != 0 && playground.children[idx+1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 1 >= 0 && idx % 15 !== 0 && playground.children[idx-1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 15 <= 224 && playground.children[idx+15].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 16 <= 224 && (idx-14) % 15 !== 0 && playground.children[idx+16].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 14 <= 224 && idx % 15 !== 0 && playground.children[idx+14].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 14 >= 0 && (idx-14) % 15 != 0 && playground.children[idx-14].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 15 >= 0 && playground.children[idx-15].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 16 >= 0 && idx % 15 !== 0 && playground.children[idx-16].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }    
      break;
    case 3:
      if (idx + 1 <= 624 && (idx-24) % 25 != 0 && playground.children[idx+1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 1 >= 0 && idx % 25 !== 0 && playground.children[idx-1].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 25 <= 624 && playground.children[idx+25].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 26 <= 624 && (idx-24) % 25 !== 0 && playground.children[idx+26].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx + 24 <= 624 && idx % 25 !== 0 && playground.children[idx+24].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 24 >= 0 && (idx-24) % 25 != 0 && playground.children[idx-24].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 25 >= 0 && playground.children[idx-25].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      if (idx - 26 >= 0 && idx % 25 !== 0 && playground.children[idx-26].children[0].classList.contains('set-bomb')) {
        bmbCheck++;
      }
      break;      
    default:
      break;
  }

  return bmbCheck;
}

const markBombArea = (i) => {
  switch (level) {
    case 1:
      if (i + 1 <= 99 && (i-9) % 10 != 0 && !playground.children[i+1].classList.contains('checked')) playground.children[i+1].classList.add('amEmpty');
      if (i - 1 >= 0 && i % 10 != 0 && !playground.children[i-1].classList.contains('checked')) playground.children[i-1].classList.add('amEmpty');
      if (i + 10 <= 99 && !playground.children[i+10].classList.contains('checked')) playground.children[i+10].classList.add('amEmpty');
      if (i + 11 <= 99 && (i-9) % 10 != 0 && !playground.children[i+11].classList.contains('checked')) playground.children[i+11].classList.add('amEmpty');
      if (i + 9 <= 99 && i % 10 != 0 && !playground.children[i+9].classList.contains('checked')) playground.children[i+9].classList.add('amEmpty');
      if (i - 9 >= 0 && (i-9) % 10 != 0 && !playground.children[i-9].classList.contains('checked')) playground.children[i-9].classList.add('amEmpty');
      if (i - 10 >= 0 && !playground.children[i-10].classList.contains('checked')) playground.children[i-10].classList.add('amEmpty');
      if (i - 11 >= 0 && i % 10 != 0 && !playground.children[i-11].classList.contains('checked')) playground.children[i-11].classList.add('amEmpty');
      break;
    case 2:
      if (i + 1 <= 224 && (i-14) % 15 != 0 && !playground.children[i+1].classList.contains('checked')) playground.children[i+1].classList.add('amEmpty');
      if (i - 1 >= 0 && i % 15 != 0 && !playground.children[i-1].classList.contains('checked')) playground.children[i-1].classList.add('amEmpty');
      if (i + 15 <= 224 && !playground.children[i+15].classList.contains('checked')) playground.children[i+15].classList.add('amEmpty');
      if (i + 16 <= 224 && (i-14) % 15 != 0 && !playground.children[i+16].classList.contains('checked')) playground.children[i+16].classList.add('amEmpty');
      if (i + 14 <= 224 && i % 15 != 0 && !playground.children[i+14].classList.contains('checked')) playground.children[i+14].classList.add('amEmpty');
      if (i - 14 >= 0 && (i-14) % 15 != 0 && !playground.children[i-14].classList.contains('checked')) playground.children[i-14].classList.add('amEmpty');
      if (i - 15 >= 0 && !playground.children[i-15].classList.contains('checked')) playground.children[i-15].classList.add('amEmpty');
      if (i - 16 >= 0 && i % 15 != 0 && !playground.children[i-16].classList.contains('checked')) playground.children[i-16].classList.add('amEmpty');
     break;
    case 3:
      if (i + 1 <= 624 && (i-24) % 25 != 0 && !playground.children[i+1].classList.contains('checked')) playground.children[i+1].classList.add('amEmpty');
      if (i - 1 >= 0 && i % 25 != 0 && !playground.children[i-1].classList.contains('checked')) playground.children[i-1].classList.add('amEmpty');
      if (i + 25 <= 624 && !playground.children[i+25].classList.contains('checked')) playground.children[i+25].classList.add('amEmpty');
      if (i + 26 <= 624 && (i-24) % 25 != 0 && !playground.children[i+26].classList.contains('checked')) playground.children[i+26].classList.add('amEmpty');
      if (i + 24 <= 624 && i % 25 != 0 && !playground.children[i+24].classList.contains('checked')) playground.children[i+24].classList.add('amEmpty');
      if (i - 24 >= 0 && (i-24) % 25 != 0 && !playground.children[i-24].classList.contains('checked')) playground.children[i-24].classList.add('amEmpty');
      if (i - 25 >= 0 && !playground.children[i-25].classList.contains('checked')) playground.children[i-25].classList.add('amEmpty');
      if (i - 26 >= 0 && i % 25 != 0 && !playground.children[i-26].classList.contains('checked')) playground.children[i-26].classList.add('amEmpty');
      break;  
    default:
      break;
  }
}

const filterMark = () => {
  let whereArr = [];
  Array.from(playground.children).forEach((element,index) => { if (element.classList.contains('amEmpty')) { whereArr.push(index); }; });
  whereArr.forEach(where => {
    playground.children[where].classList.remove('amEmpty');
    let filterCheck = checkBombArea(where, 0);
    if (filterCheck === 0){
      playground.children[where].classList.add(`l0`);
      if (!playground.children[where].classList.contains('checked')) {
        timerGo.openedCells++;
        playground.children[where].classList.add('checked');
      } 
      playground.children[where].classList.remove('flag');
      markBombArea(where);
      filterMark();
    } else {
      playground.children[where].classList.add(`l${filterCheck}`);
      if (!playground.children[where].classList.contains('checked')) {
        timerGo.openedCells++;
        playground.children[where].classList.add('checked');
      } 
      playground.children[where].classList.remove('flag');
    }
  });
  winTest();
  audio.play();
  whereArr = [];
}

const changeLevel = (e) => {
  let clevel;
  if (!e.target) {
    if (timerGo.on) {
      clevel = timerGo.level;
    } else {
      clevel = level;
    }
    restart();
  } else {
    clevel = Number(e.target.value.substring(0,1));
    restart('btn');
  }
  Array.from(playground.children).forEach(el => {el.remove();})
  if (clevel === 1 ) {
    level = 1;
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('span');
      playground.classList.remove('size-2');
      playground.classList.remove('size-3');
      playground.classList.add('size-1');
      playground.append(cell);
      const img = document.createElement('img');
      img.src = './assets/image/6028618.png';
      img.className = 'cell-img';
      const cellIn = document.createElement('span');
      cellIn.className = 'cell-inner';
      cell.append(img, cellIn);
    }
  } else if (clevel === 2) {
    level = 2;
    for (let i = 0; i < 225; i++) {
      const cell = document.createElement('span');
      playground.classList.remove('size-1');
      playground.classList.remove('size-3');
      playground.classList.add('size-2');
      playground.append(cell);
      const img = document.createElement('img');
      img.src = './assets/image/6028618.png';
      img.className = 'cell-img';
      const cellIn = document.createElement('span');
      cellIn.className = 'cell-inner';
      cell.append(img, cellIn);
    }
  } else if (clevel === 3) {
    level = 3;
    for (let i = 0; i < 625; i++) {
      const cell = document.createElement('span');
      playground.classList.remove('size-2');
      playground.classList.remove('size-1');
      playground.classList.add('size-3');
      playground.append(cell);
      const img = document.createElement('img');
      img.src = './assets/image/6028618.png';
      img.className = 'cell-img';
      const cellIn = document.createElement('span');
      cellIn.className = 'cell-inner';
      cell.append(img, cellIn);
    }
  }
  if (timerGo.on) {
    Array.from(playground.children).forEach((el, idx) => {
      el.className = timerGo.callsStat[idx][0];
      el.children[0].className = timerGo.callsStat[idx][1];
      el.children[1].className = timerGo.callsStat[idx][2];
    })
    setBombs();
  } else {
    Array.from(playground.children).forEach(el => { el.className = 'cell'; })
  }
}
levelWrap.addEventListener('change', changeLevel);
changeLevel('first');

levelWrap.addEventListener('click', () => {
  if (timerGo.on) {showAttantion();}
})

const audio = document.createElement('audio');
const source = document.createElement('source');
source.src = './assets/music/inoplanetnyiy-neponyatnyiy-signal.mp3';
source.type = 'audio/mpeg';
audio.append(source);
const audioAlert = document.createElement('audio');
const sourceAlert = document.createElement('source');
sourceAlert.src = './assets/music/preduprejdayuschiy-gromkiy-pronzitelnyiy-zvon.mp3';
sourceAlert.type = 'audio/mpeg';
audioAlert.append(sourceAlert);
const audioWin = document.createElement('audio');
const sourceWin = document.createElement('source');
sourceWin.src = './assets/music/achievement_get.mp3';
sourceWin.type = 'audio/mpeg';
audioWin.append(sourceWin);
const audioFail = document.createElement('audio');
const sourceFail = document.createElement('source');
sourceFail.src = './assets/music/sfx00047.mp3';
sourceFail.type = 'audio/mpeg';
audioFail.append(sourceFail);
document.querySelector('body').append(audio, audioAlert, audioWin, audioFail);

const toStartGame = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.closest('span') && e.button === 2) {
    e.target.closest('.cell').children[1].classList.toggle('flag');
    audioAlert.currentTime = 0;
    audioAlert.play();
    return
  }

  if (!e.target.closest('span') || e.target.closest('.cell').children[1].classList.contains('flag')) return;

  audio.currentTime = 0;
  audio.play();
  timerGo.count++;
  moveCount.innerHTML = timerGo.count;

  if (timerGo.count === 1){
    setBombs(Array.from(playground.children).indexOf(e.target));
    timerOn();
    timerGo.level = level;
    Array.from(levelWrap.children).forEach(el => el.setAttribute('disabled', ''));
  }

  e.target.closest('span').classList.add('checked');
  timerGo.openedCells++;
  winTest();

  let index = 0;
  if (e.target.closest('.cell').children[0].classList.contains('set-bomb')) {
    e.target.closest('.cell').children[0].classList.add('show');
    stopTimer();
    missionFsiled();
  } else {
    let bombsCheck = 0;
    index = Array.from(playground.children).indexOf(e.target);
    bombsCheck = checkBombArea(index, bombsCheck);
    e.target.closest('span').classList.add(`l${bombsCheck}`);

    if (bombsCheck === 0){
      markBombArea(index);
      filterMark();
    }
  }
}
playground.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
playground.addEventListener('mousedown', toStartGame, false);
restartBtn.addEventListener('click', toRepeat, false);

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  localStorage.setItem('minerLevel', level.toString());
  localStorage.setItem('minerItem', item);
  bombsCount = Number(numOfBomb.innerHTML);
  localStorage.setItem('minerBombsCount', bombsCount.toString());

  if (timerGo.on) {
    timerGo.callsStat = {};
    Array.from(playground.children).forEach((el, idx) => {
      timerGo.callsStat[idx] = [el.classList.value, el.children[0].classList.value, el.children[1].classList.value];
    })
    localStorage.setItem('minerTimerGo', JSON.stringify(timerGo));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const deform = () => {
    if (window.innerWidth <= 690) {
      counters.prepend(settingContainer);
      main.prepend(counters);
    }
    if (window.innerWidth > 690) {
      side.prepend(settingContainer);
      score.prepend(counters);
    }
  }
  deform();

  window.addEventListener('resize', deform, false);
});