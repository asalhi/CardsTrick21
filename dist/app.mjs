import { shuffle, dealRows, collectRows, makePlayingDeck } from './game.mjs';

const copy = {
  en: {
    how:'How to play',eyebrow:'A LITTLE MIND MAGIC',headline1:'Your card.',headline2:'Our little secret.',
    description:'21 cards. Three turns. One impossible little reveal.<br>Think of a card, and let a little magic find it.',
    'no-signup':'No sign-up. Just wonder.',time:'Takes about a minute','hero-note':'a little ✦ extraordinary',
    classic:'Playing cards',fantasy:'Fantasy friends',new:'NEW',restart:'Start over',ready:'I’ve got my card',
    'game-footer':'A classic trick. A curious mind. A moment of magic.',
    'step1-title':'Make it a secret','step1-copy':'Choose a card in your mind.',
    'step2-title':'Point us in a direction','step2-copy':'Tell us its row, three times.',
    'step3-title':'Meet a little magic','step3-copy':'Watch your card find its way back.',
    footer:'Made for your inner “how did that happen?”','footer-love':'A little wonder goes a long way.',
    'dialog-title':'A secret worth keeping.','dialog-intro':'No tapping your card. No telling us its name. Just a little imagination.',
    'dialog-step1':'Choose any of the 21 cards and remember it. Press “I’ve got my card” when you’re ready.',
    'dialog-step2':'Find your card and choose its row. The cards will move, so look carefully each time.',
    'dialog-step3':'Choose its row three times in total. Then let us reveal your card!',
    'dialog-tip':'Try Fantasy friends for a whole new world of characters. You can switch languages at any time.',
    'lets-play':'Let’s make some magic',
    classicEyebrow:'THE CLASSIC, WITH A TWIST',fantasyEyebrow:'A WHOLE WORLD OF WONDER',
    rememberTitle:'Keep one card in mind.',rememberFantasy:'Pick your fantasy friend.',
    rememberDesc:'Pick any card below. Remember it, but don’t tell us just yet.',
    rememberFantasyDesc:'Choose a character in your mind. Keep your little friend a secret.',
    roundTitle:'Which row is your card in?',roundFantasyTitle:'Where is your fantasy friend?',
    roundDesc:'Find the same card and choose its row below. Keep its name a secret.',
    roundFantasyDesc:'Find the same character and choose its row. They move each round!',
    shuffleTitle:'A little shuffle, a little magic…',shuffleDesc:'Keep your card in mind. It’s finding a new place.',
    revealTitle:'A little wonder. Just for you.',revealDesc:'Three turns later, your secret has found its way here.',
    row:'ROW',rowNames:['First row','Second row','Third row'],chooseRow:'It’s in this row',
    waiting:'Your secret is safe',rememberHint:'Keep it a secret. The magic works best that way.',
    roundHint:'The cards move. Your secret stays the same.',round:'Round',of:'of',
    revealKicker:'YOU WERE THINKING OF…',revealNote:'A little maths. A little mystery. A lot of wonder.',
    again:'Let’s do it again',tryFantasy:'Meet the fantasy friends instead',tryClassic:'Try the classic playing cards',
    soundOn:'Turn sound on',soundOff:'Turn sound off',close:'Close',world:'Card world',board:'Three rows of seven cards',
    fresh:'A fresh deck. A brand-new little mystery.',classicToast:'Back to the classics. Pick a new card.',fantasyToast:'Welcome to a world of wonder. Pick a friend.',
    suits:{spades:'Spades',hearts:'Hearts',clubs:'Clubs',diamonds:'Diamonds'},ranks:{A:'Ace',J:'Jack',Q:'Queen',K:'King'}
  },
  ar: {
    how:'طريقة اللعب',eyebrow:'قليل من سحر الأفكار',headline1:'بطاقتك.',headline2:'سرّ صغير بيننا.',
    description:'٢١ بطاقة. ثلاث جولات. ومفاجأة مدهشة.<br>اختر بطاقة في ذهنك، ودع السحر يجدها.',
    'no-signup':'بلا تسجيل. فقط استمتع بالدهشة.',time:'دقيقة واحدة من المرح','hero-note':'لحظة ✦ من الخيال',
    classic:'أوراق اللعب',fantasy:'أصدقاء الخيال',new:'جديد',restart:'ابدأ من جديد',ready:'حفظت بطاقتي',
    'game-footer':'خدعة كلاسيكية. عقل فضولي. ولحظة من السحر.',
    'step1-title':'احتفظ بسرّك','step1-copy':'اختر بطاقة في ذهنك وتذكّرها.',
    'step2-title':'أعطنا إشارة','step2-copy':'حدّد صفّها، ثلاث مرات.',
    'step3-title':'استمتع بالدهشة','step3-copy':'شاهد بطاقتك تعود إليك.',
    footer:'للحظة التي تقول فيها: «كيف حدث ذلك؟»','footer-love':'قليل من الدهشة يصنع الكثير.',
    'dialog-title':'سرّ يستحق أن تحتفظ به.','dialog-intro':'لا تضغط على بطاقتك ولا تخبرنا باسمها. فقط تذكّرها في ذهنك.',
    'dialog-step1':'اختر واحدة من البطاقات الـ٢١ وتذكّرها. ثم اضغط «حفظت بطاقتي».',
    'dialog-step2':'ابحث عن بطاقتك وحدّد الصف الذي تظهر فيه. ستتغيّر أماكن البطاقات، فانتبه في كل جولة.',
    'dialog-step3':'حدّد صفّ بطاقتك ثلاث مرات فقط. وبعدها سنكشف لك بطاقتك!',
    'dialog-tip':'جرّب أصدقاء الخيال لتكتشف عالمًا من الشخصيات اللطيفة. يمكنك تغيير اللغة في أي وقت.',
    'lets-play':'لنبدأ السحر',
    classicEyebrow:'الخدعة الكلاسيكية بلمسة جديدة',fantasyEyebrow:'عالم كامل من الدهشة',
    rememberTitle:'اختر بطاقة في ذهنك.',rememberFantasy:'اختر صديقك الخيالي.',
    rememberDesc:'اختر أي بطاقة أدناه. تذكّرها، واحتفظ باسمها سرًّا.',
    rememberFantasyDesc:'اختر شخصية في ذهنك وتذكّرها. احتفظ بصديقك الصغير سرًّا.',
    roundTitle:'في أي صف تظهر بطاقتك؟',roundFantasyTitle:'أين صديقك الخيالي؟',
    roundDesc:'ابحث عن البطاقة نفسها وحدّد صفّها أدناه. احتفظ باسمها سرًّا.',
    roundFantasyDesc:'ابحث عن الشخصية نفسها وحدّد صفّها. مكانها يتغيّر كل جولة!',
    shuffleTitle:'نخلط البطاقات… ونضيف قليلًا من السحر.',shuffleDesc:'تذكّر بطاقتك. إنها تختار مكانًا جديدًا.',
    revealTitle:'لحظة دهشة، من أجلك.',revealDesc:'بعد ثلاث جولات، ها هو سرّك الصغير أمامك.',
    row:'الصف',rowNames:['الصف الأول','الصف الثاني','الصف الثالث'],chooseRow:'بطاقتي في هذا الصف',
    waiting:'سرّك في أمان',rememberHint:'احتفظ بسرّك. هكذا يصبح السحر أجمل.',
    roundHint:'أماكن البطاقات تتغيّر، لكن بطاقتك تبقى نفسها.',round:'الجولة',of:'من',
    revealKicker:'كنت تفكّر في…',revealNote:'قليل من الرياضيات. قليل من الغموض. وكثير من الدهشة.',
    again:'لنجرّب مرة أخرى',tryFantasy:'اكتشف أصدقاء الخيال',tryClassic:'جرّب أوراق اللعب الكلاسيكية',
    soundOn:'تشغيل الصوت',soundOff:'كتم الصوت',close:'إغلاق',world:'نوع البطاقات',board:'ثلاثة صفوف، في كل صف سبع بطاقات',
    fresh:'بطاقات جديدة، وسرّ صغير جديد.',classicToast:'عدنا إلى أوراق اللعب. اختر بطاقة جديدة.',fantasyToast:'أهلًا بك في عالم الخيال. اختر صديقًا.',
    suits:{spades:'البستوني',hearts:'الكبة',clubs:'السباتي',diamonds:'الديناري'},ranks:{A:'آس',J:'الشاب',Q:'الملكة',K:'الملك'}
  }
};

const characters = [
  ['dragon','Little dragon','التنين الصغير'],['unicorn','Unicorn','وحيد القرن'],['phoenix','Phoenix','العنقاء'],
  ['wizard','Star wizard','ساحر النجوم'],['fairy','Forest fairy','جنيّة الغابة'],['mermaid','Mermaid','حورية البحر'],['griffin','Griffin','الغريفين'],
  ['mushroom','Mushroom sprite','روح الفطر'],['golem','Stone golem','عملاق الحجر'],['kitsune','Kitsune','كيتسوني'],
  ['yeti','Snow yeti','يتي الثلجي'],['rabbit','Moon rabbit','أرنب القمر'],['slime','Jelly friend','الصديق الهلامي'],['pegasus','Pegasus','الحصان المجنّح'],
  ['kraken','Baby kraken','كراكن الصغير'],['tree','Tree spirit','روح الشجرة'],['genie','Genie','الجني'],
  ['fox','Crystal fox','ثعلب الكريستال'],['jackalope','Jackalope','الأرنب ذو القرون'],['turtle','Sea turtle','سلحفاة البحر'],['owl','Owl mage','البومة الساحرة']
].map(([id,en,ar],index) => ({id:`fantasy-${id}`,en,ar,index}));

const $ = selector => document.querySelector(selector);
const symbols = {spades:'♠',hearts:'♥',clubs:'♣',diamonds:'♦'};
let language = 'en';
try { language = localStorage.getItem('twentyone-language') === 'ar' ? 'ar' : 'en'; } catch {}
let mode = 'classic';
let phase = 'remember';
let round = 1;
let deck = [];
let busy = false;
let generation = 0;
let sound = false;
let audioContext;
let toastTimeout;
const t = key => copy[language][key];
const number = value => new Intl.NumberFormat(language === 'ar' ? 'ar-EG-u-nu-arab' : 'en').format(value);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pipLayouts = {
  '2':[[50,5],[50,95]],'3':[[50,5],[50,50],[50,95]],
  '4':[[16,5],[84,5],[16,95],[84,95]],'5':[[16,5],[84,5],[50,50],[16,95],[84,95]],
  '6':[[16,5],[84,5],[16,50],[84,50],[16,95],[84,95]],
  '7':[[16,5],[84,5],[50,27],[16,50],[84,50],[16,95],[84,95]],
  '8':[[16,5],[84,5],[50,27],[16,50],[84,50],[50,73],[16,95],[84,95]],
  '9':[[16,5],[84,5],[16,35],[84,35],[50,50],[16,65],[84,65],[16,95],[84,95]],
  '10':[[16,5],[84,5],[50,20],[16,35],[84,35],[16,65],[84,65],[50,80],[16,95],[84,95]]
};

function cardName(card) {
  if (card.id.startsWith('fantasy-')) return card[language];
  const rank = t('ranks')[card.rank] || number(Number(card.rank));
  return language === 'ar' ? `${rank} ${t('suits')[card.suit]}` : `${rank} of ${t('suits')[card.suit]}`;
}

function cardHTML(card, index = 0) {
  if (card.id.startsWith('fantasy-')) {
    const x = (card.index % 7) / 6 * 100;
    const y = Math.floor(card.index / 7) / 2 * 100;
    return `<div class="fantasy-card" style="--index:${index}" role="img" aria-label="${cardName(card)}" data-card-id="${card.id}"><div class="fantasy-portrait" style="background-position:${x}% ${y}%" aria-hidden="true"></div><span class="fantasy-name" aria-hidden="true">${card[language]}</span></div>`;
  }
  const suit = symbols[card.suit];
  let center;
  if (card.rank === 'A') center = `<span class="ace-pip">${suit}</span>`;
  else if (['J','Q','K'].includes(card.rank)) center = `<div class="face-art"><span class="face-crown">${card.rank === 'Q' ? '♛' : '♚'}</span><span class="face-letter">${card.rank}</span><span class="face-suit">${suit}</span></div>`;
  else center = pipLayouts[card.rank].map(([x,y]) => `<span class="pip ${y > 50 ? 'upside-down' : ''}" style="left:${x}%;top:${y}%">${suit}</span>`).join('');
  return `<div class="playing-card ${card.suit}" style="--index:${index}" role="img" aria-label="${cardName(card)}" data-card-id="${card.id}"><span class="card-corner" aria-hidden="true">${card.rank}<small>${suit}</small></span><div class="card-pips" aria-hidden="true">${center}</div><span class="card-corner bottom" aria-hidden="true">${card.rank}<small>${suit}</small></span></div>`;
}

function updateSoundButton() {
  $('#sound-button').innerHTML = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 5-6 4H2v6h3l6 4V5Z"/>${sound ? '<path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>' : '<path d="m16 9 5 6m0-6-5 6"/>'}</svg>`;
  $('#sound-button').setAttribute('aria-label',t(sound ? 'soundOff' : 'soundOn'));
  $('#sound-button').setAttribute('title',t(sound ? 'soundOff' : 'soundOn'));
  $('#sound-button').setAttribute('aria-pressed',String(sound));
}

function applyLanguage() {
  clearTimeout(toastTimeout);
  $('#toast').classList.remove('visible');
  $('#toast').textContent = '';
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = language === 'ar' ? 'توينتي ون — قليل من سحر الأفكار' : 'Twenty One — A little mind magic';
  document.querySelectorAll('[data-i18n]').forEach(element => {element.innerHTML = t(element.dataset.i18n);});
  $('.footer-love').innerHTML = `${t('footer-love')} <span>✦</span>`;
  $('#language-button span').textContent = language === 'en' ? 'العربية' : 'English';
  $('#language-button').setAttribute('aria-label',language === 'en' ? 'Switch to Arabic' : 'Switch to English');
  $('#close-dialog').setAttribute('aria-label',t('close'));
  $('.world-switch').setAttribute('aria-label',t('world'));
  $('#board').setAttribute('aria-label',t('board'));
  $('.game-shell').setAttribute('aria-label',language === 'ar' ? 'لعبة البطاقات الـ٢١' : '21-card game');
  $('.steps-strip').setAttribute('aria-label',language === 'ar' ? 'كيف تعمل الخدعة' : 'How the magic works');
  $('.brand').setAttribute('aria-label',language === 'ar' ? 'توينتي ون — الرئيسية' : 'Twenty One home');
  document.querySelectorAll('.step-number').forEach((element,index) => {element.textContent = language === 'ar' ? number(index+1) : `0${index+1}`;});
  updateSoundButton();
  render();
}

function startGame(notify = false) {
  generation++;
  busy = false;
  round = 1;
  phase = 'remember';
  deck = mode === 'classic' ? shuffle(makePlayingDeck()).slice(0,21) : shuffle(characters);
  $('#reveal').replaceChildren();
  $('#confetti').replaceChildren();
  render();
  if (notify) toast(t('fresh'));
}

function render() {
  const fantasy = mode === 'fantasy';
  const remembering = phase === 'remember';
  const revealing = phase === 'reveal';
  $('.game-shell').classList.toggle('is-fantasy',fantasy);
  $('#classic-mode').classList.toggle('active',!fantasy);
  $('#fantasy-mode').classList.toggle('active',fantasy);
  $('#classic-mode').setAttribute('aria-pressed',String(!fantasy));
  $('#fantasy-mode').setAttribute('aria-pressed',String(fantasy));
  $('#section-eyebrow').textContent = t(fantasy ? 'fantasyEyebrow' : 'classicEyebrow');
  let titleKey = remembering ? (fantasy ? 'rememberFantasy' : 'rememberTitle') : (fantasy ? 'roundFantasyTitle' : 'roundTitle');
  let descKey = remembering ? (fantasy ? 'rememberFantasyDesc' : 'rememberDesc') : (fantasy ? 'roundFantasyDesc' : 'roundDesc');
  if (busy) {titleKey='shuffleTitle';descKey='shuffleDesc';}
  if (revealing) {titleKey='revealTitle';descKey='revealDesc';}
  $('#game-title').textContent = t(titleKey);
  $('#game-description').textContent = t(descKey);
  $('#progress').setAttribute('aria-label',`${t('round')} ${number(revealing ? 3 : remembering ? 0 : round)} ${t('of')} ${number(3)}`);
  document.querySelectorAll('.progress-step').forEach(element => {
    const step = Number(element.dataset.step);
    const done = revealing || (!remembering && step < round);
    element.classList.toggle('done',done);
    element.classList.toggle('current',!remembering && !revealing && step === round);
    element.textContent = done ? '✓' : number(step);
  });
  $('#board-wrap').hidden = revealing;
  $('#reveal').hidden = !revealing;
  $('#game-bottom').hidden = revealing;
  $('#ready-button').hidden = !remembering;
  $('#round-pill').hidden = remembering;
  $('#round-pill').textContent = `${t('round')} ${number(round)} ${t('of')} ${number(3)}`;
  $('#bottom-hint').textContent = t(remembering ? 'rememberHint' : 'roundHint');
  if (revealing) renderReveal();
  else {
    $('#board').classList.remove('is-shuffling');
    $('#board').innerHTML = dealRows(deck).map((cards,row) => `<div class="card-row"><div class="row-marker" aria-hidden="true"><small>${t('row')}</small><strong>${number(row+1).padStart(language === 'ar' ? 1 : 2,'0')}</strong></div><div class="row-cards">${cards.map((card,index) => cardHTML(card,index)).join('')}</div>${remembering ? `<div class="waiting-label"><span>✧</span><span>${t('waiting')}</span></div>` : `<button class="choose-row" data-row="${row}" aria-label="${t('chooseRow')}: ${t('rowNames')[row]}" ${busy ? 'disabled' : ''}><span>${t('chooseRow')}</span><span class="row-arrow" aria-hidden="true">→</span></button>`}</div>`).join('');
  }
}

function renderReveal() {
  const card = deck[10];
  $('#reveal').innerHTML = `<div class="reveal-orbit"></div><span class="reveal-spark" aria-hidden="true">✦</span><span class="reveal-spark second" aria-hidden="true">✧</span><div class="reveal-card-wrap">${cardHTML(card)}</div><span class="reveal-kicker">${t('revealKicker')}</span><h3>${cardName(card)}</h3><p>${t('revealNote')}</p><button class="primary-button" id="play-again"><span>${t('again')}</span><span class="button-arrow" aria-hidden="true">↗</span></button><button class="reveal-another" id="try-other-world">${t(mode === 'classic' ? 'tryFantasy' : 'tryClassic')}</button>`;
}

function tone(kind = 'choose') {
  if (!sound) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext ??= new Context();
    audioContext.resume();
    const notes = kind === 'reveal' ? [523.25,659.25,783.99,1046.5] : kind === 'start' ? [523.25,783.99] : [659.25];
    notes.forEach((frequency,index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const time = audioContext.currentTime + index * .11;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0,time);
      gain.gain.linearRampToValueAtTime(.055,time+.015);
      gain.gain.exponentialRampToValueAtTime(.001,time+.45);
      oscillator.connect(gain);gain.connect(audioContext.destination);
      oscillator.start(time);oscillator.stop(time+.5);
    });
  } catch { /* Sound is optional; the game works when browser audio is unavailable. */ }
}

function toast(message) {
  clearTimeout(toastTimeout);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'),3000);
}

function announce(message) {
  $('#toast').textContent = '';
  requestAnimationFrame(() => {$('#toast').textContent = message;});
}

function celebrate() {
  if (reducedMotion()) return;
  const colors = ['#a087d4','#def297','#e8a584','#94c3aa','#f4c45f','#c6b3e9'];
  $('#confetti').innerHTML = Array.from({length:45},() => `<i class="confetti-bit" style="--x:${Math.random()*100}%;--size:${5+Math.random()*6}px;--color:${colors[Math.floor(Math.random()*colors.length)]};--duration:${2.4+Math.random()*1.5}s;--delay:${Math.random()*.6}s;--drift:${(Math.random()-.5)*180}px"></i>`).join('');
  const currentGeneration = generation;
  setTimeout(() => {if(currentGeneration === generation) $('#confetti').replaceChildren();},4800);
}

async function chooseRow(row) {
  if (phase !== 'round' || busy || ![0,1,2].includes(row)) return;
  busy = true;
  const currentGeneration = generation;
  const collected = collectRows(dealRows(deck),row);
  tone();
  document.querySelectorAll('.choose-row').forEach(button => {button.disabled = true;});
  $('#game-title').textContent = t('shuffleTitle');
  $('#game-description').textContent = t('shuffleDesc');
  $('#board').classList.add('is-shuffling');
  await new Promise(resolve => setTimeout(resolve,reducedMotion() ? 80 : 560));
  if (currentGeneration !== generation) return;
  deck = collected;
  busy = false;
  if (round === 3) {
    phase = 'reveal';
    render();tone('reveal');celebrate();
    announce(`${t('revealKicker')} ${cardName(deck[10])}`);
    $('#reveal h3').tabIndex = -1;
    $('#reveal h3').focus({preventScroll:true});
  } else {
    round++;
    render();
    announce(`${t('round')} ${number(round)} ${t('of')} ${number(3)}. ${t(mode === 'classic' ? 'roundTitle' : 'roundFantasyTitle')}`);
    // The replaced row buttons should leave keyboard focus on the next available action.
    document.querySelector('.choose-row')?.focus({preventScroll:true});
  }
}

function changeMode(nextMode) {
  if (mode === nextMode) return;
  mode = nextMode;
  startGame();
  toast(t(mode === 'classic' ? 'classicToast' : 'fantasyToast'));
}

$('#ready-button').addEventListener('click',() => {
  if (phase !== 'remember') return;
  phase='round';tone('start');render();
  $('.game-shell').scrollIntoView({behavior:reducedMotion() ? 'instant' : 'smooth',block:'start'});
  announce(`${t('round')} ${number(1)} ${t('of')} ${number(3)}. ${t(mode === 'classic' ? 'roundTitle' : 'roundFantasyTitle')}`);
  document.querySelector('.choose-row')?.focus({preventScroll:true});
});
$('#board').addEventListener('click',event => {
  const button = event.target.closest('[data-row]');
  if (button) chooseRow(Number(button.dataset.row));
});
$('#classic-mode').addEventListener('click',() => changeMode('classic'));
$('#fantasy-mode').addEventListener('click',() => changeMode('fantasy'));
$('#restart-button').addEventListener('click',() => startGame(true));
$('#language-button').addEventListener('click',() => {
  language = language === 'en' ? 'ar' : 'en';
  try {localStorage.setItem('twentyone-language',language);} catch {}
  applyLanguage();
});
$('#sound-button').addEventListener('click',() => {sound=!sound;updateSoundButton();if(sound)tone('start');});
$('#reveal').addEventListener('click',event => {
  if (event.target.closest('#play-again')) {startGame();$('#ready-button').focus({preventScroll:true});}
  if (event.target.closest('#try-other-world')) {changeMode(mode === 'classic' ? 'fantasy' : 'classic');$('#ready-button').focus({preventScroll:true});}
});
$('#how-button').addEventListener('click',() => $('#how-dialog').showModal());
$('#close-dialog').addEventListener('click',() => $('#how-dialog').close());
$('#dialog-play').addEventListener('click',() => $('#how-dialog').close());
$('#how-dialog').addEventListener('click',event => {if(event.target === $('#how-dialog')) {const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});

startGame();
applyLanguage();
