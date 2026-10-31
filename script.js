// Three comparable scenarios, one per position in the session.
// Sizes are the storage requirements listed on each game's Steam page.
// In every scenario task 2 adds a second game to install and one more game to keep.
const SCENARIOS = [
  {
    free: 40,
    games: [
      { id: 'bg3', name: "Baldur's Gate 3", size: 150, days: 2, last: '2 days ago' },
      { id: 'rdr2', name: 'Red Dead Redemption 2', size: 150, days: 550, last: '1.5 years ago' },
      { id: 'starfield', name: 'Starfield', size: 125, days: 180, last: '6 months ago' },
      { id: 'cs2', name: 'Counter-Strike 2', size: 85, days: 1, last: 'yesterday' },
      { id: 'eldenring', name: 'Elden Ring', size: 60, days: 330, last: '11 months ago' },
      { id: 'dota2', name: 'Dota 2', size: 60, days: 90, last: '3 months ago' },
      { id: 'witcher3', name: 'The Witcher 3: Wild Hunt', size: 60, days: 730, last: '2 years ago' },
      { id: 'hades', name: 'Hades', size: 15, days: 150, last: '5 months ago' },
      { id: 'hollowknight', name: 'Hollow Knight', size: 9, days: 120, last: '4 months ago' },
      { id: 'portal2', name: 'Portal 2', size: 8, days: 210, last: '7 months ago' },
      { id: 'stardew', name: 'Stardew Valley', size: 0.5, days: 21, last: '3 weeks ago' },
      { id: 'terraria', name: 'Terraria', size: 0.2, days: 7, last: '1 week ago' },
    ],
    tasks: [
      { install: [{ name: 'Black Myth: Wukong', size: 130 }], keep: ['bg3', 'cs2'] },
      { install: [{ name: 'Black Myth: Wukong', size: 130 }, { name: 'Cyberpunk 2077', size: 70 }], keep: ['bg3', 'cs2', 'rdr2'] },
    ],
  },
  {
    free: 30,
    games: [
      { id: 'msfs', name: 'Microsoft Flight Simulator (2020)', size: 150, days: 2, last: '2 days ago' },
      { id: 'helldivers2', name: 'Helldivers 2', size: 135, days: 550, last: '1.5 years ago' },
      { id: 'gta5', name: 'Grand Theft Auto V Legacy', size: 125, days: 180, last: '6 months ago' },
      { id: 'apex', name: 'Apex Legends', size: 75, days: 1, last: 'yesterday' },
      { id: 'ac6', name: 'Armored Core VI: Fires of Rubicon', size: 60, days: 330, last: '11 months ago' },
      { id: 'hitman', name: 'Hitman World of Assassination', size: 60, days: 90, last: '3 months ago' },
      { id: 'cities2', name: 'Cities: Skylines II', size: 60, days: 730, last: '2 years ago' },
      { id: 'tf2', name: 'Team Fortress 2', size: 15, days: 150, last: '5 months ago' },
      { id: 'hades2', name: 'Hades II', size: 11, days: 120, last: '4 months ago' },
      { id: 'silksong', name: 'Hollow Knight: Silksong', size: 8, days: 210, last: '7 months ago' },
      { id: 'deadcells', name: 'Dead Cells', size: 0.5, days: 21, last: '3 weeks ago' },
      { id: 'undertale', name: 'Undertale', size: 0.2, days: 7, last: '1 week ago' },
    ],
    tasks: [
      { install: [{ name: 'Indiana Jones and the Great Circle', size: 120 }], keep: ['msfs', 'apex'] },
      { install: [{ name: 'Indiana Jones and the Great Circle', size: 120 }, { name: 'God of War', size: 70 }], keep: ['msfs', 'apex', 'helldivers2'] },
    ],
  },
  {
    free: 70,
    games: [
      { id: 'ff16', name: 'Final Fantasy XVI', size: 170, days: 2, last: '2 days ago' },
      { id: 'warhammer3', name: 'Total War: Warhammer III', size: 120, days: 550, last: '1.5 years ago' },
      { id: 'forza5', name: 'Forza Horizon 5', size: 110, days: 180, last: '6 months ago' },
      { id: 'destiny2', name: 'Destiny 2', size: 105, days: 1, last: 'yesterday' },
      { id: 'mhw', name: 'Monster Hunter: World', size: 52, days: 330, last: '11 months ago' },
      { id: 'liesofp', name: 'Lies of P', size: 50, days: 90, last: '3 months ago' },
      { id: 'ittakestwo', name: 'It Takes Two', size: 50, days: 730, last: '2 years ago' },
      { id: 'ets2', name: 'Euro Truck Simulator 2', size: 25, days: 150, last: '5 months ago' },
      { id: 'subnautica', name: 'Subnautica', size: 20, days: 120, last: '4 months ago' },
      { id: 'cuphead', name: 'Cuphead', size: 4, days: 210, last: '7 months ago' },
      { id: 'celeste', name: 'Celeste', size: 1.2, days: 21, last: '3 weeks ago' },
      { id: 'valheim', name: 'Valheim', size: 1, days: 7, last: '1 week ago' },
    ],
    tasks: [
      { install: [{ name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl', size: 160 }], keep: ['ff16', 'destiny2'] },
      { install: [{ name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl', size: 160 }, { name: 'Ghost of Tsushima', size: 75 }], keep: ['ff16', 'destiny2', 'warhammer3'] },
    ],
  },
];

const VARIANTS = { A: 'Direct selection', B: 'Keep games first', C: 'Compare plans' };

const app = document.getElementById('app');

// Sizes are summed in tenths of a GB to avoid rounding errors.
const scenario = () => SCENARIOS[run.position - 1];
const game = id => scenario().games.find(g => g.id === id);
const tenths = id => Math.round(game(id).size * 10);
const sum = ids => ids.reduce((total, id) => total + tenths(id), 0);
const gb = x => +(x / 10).toFixed(1) + ' GB';
const names = ids => ids.map(id => game(id).name).join(', ');
const ordered = set => scenario().games.map(g => g.id).filter(id => set.has(id));
const installSize = task => task.install.reduce((total, g) => total + g.size, 0);

let run = null;

function savedPosition() {
  try {
    return Number(sessionStorage.getItem('position')) || 1;
  } catch {
    return 1;
  }
}

function savePosition(position) {
  try {
    sessionStorage.setItem('position', position);
  } catch {}
}

function start(variant, position) {
  run = {
    variant,
    position,
    task: 0,
    step: 1,
    selected: new Set(),
    kept: new Set(),
    pinned: new Set(),
    plan: null,
    results: [],
    startedAt: Date.now(),
  };
}

function needed() {
  return (installSize(scenario().tasks[run.task]) - scenario().free) * 10;
}

function plans() {
  const pool = scenario().games.filter(g => !run.pinned.has(g.id));
  const need = needed();

  const greedy = order => {
    const ids = [];
    let total = 0;
    for (const g of [...pool].sort(order)) {
      if (total >= need) break;
      ids.push(g.id);
      total += tenths(g.id);
    }
    return total >= need ? ids : null;
  };

  let closest = null;
  for (let mask = 1; mask < 1 << pool.length; mask++) {
    const ids = pool.filter((_, i) => mask & (1 << i)).map(g => g.id);
    const total = sum(ids);
    if (total >= need && (!closest || total < sum(closest))) closest = ids;
  }

  return [
    { id: 'largest', name: 'Largest games first', games: greedy((a, b) => b.size - a.size) },
    { id: 'oldest', name: 'Least recently played first', games: greedy((a, b) => b.days - a.days) },
    { id: 'closest', name: 'Closest to the space needed', games: closest },
  ];
}

function toRemove() {
  if (run.variant === 'C') {
    const plan = plans().find(p => p.id === run.plan);
    return plan ? plan.games : [];
  }
  return ordered(run.selected);
}

function finishTask() {
  const ids = toRemove();
  run.results.push({
    seconds: (Date.now() - run.startedAt) / 1000,
    selected: ids,
    freed: sum(ids),
    needed: needed(),
    broken: ids.filter(id => scenario().tasks[run.task].keep.includes(id)),
  });
  run.task++;
  run.step = 1;
  run.plan = null;
  run.startedAt = Date.now();
  if (run.task === scenario().tasks.length) savePosition(run.position % SCENARIOS.length + 1);
}

// --- Rendering ---

function table(games, set, label) {
  const rows = games.map(g => `
    <tr>
      <td><input type="checkbox" id="${set}-${g.id}" data-set="${set}" value="${g.id}"${run[set].has(g.id) ? ' checked' : ''}></td>
      <td><label for="${set}-${g.id}">${g.name}</label></td>
      <td>${g.size} GB</td>
      <td>${g.last}</td>
    </tr>`).join('');
  return `
    <table>
      <tr><th>${label}</th><th>Game</th><th>Size</th><th>Last played</th></tr>
      ${rows}
    </table>`;
}

function renderStart() {
  const position = savedPosition();
  const positions = SCENARIOS.map((_, i) => `
    <label><input type="radio" name="position" value="${i + 1}"${i + 1 === position ? ' checked' : ''}> ${i + 1}</label>`).join('');
  app.innerHTML = `
    <h1>Steam storage prototypes</h1>
    <p>A research prototype. It is not connected to Steam and does not delete anything.</p>
    <p class="positions">Position in session (sets the scenario): ${positions}</p>
    ${Object.entries(VARIANTS).map(([key, name]) =>
      `<p><button data-start="${key}">${key}: ${name}</button></p>`).join('')}
    <p><button data-open-final="1">Final</button></p>`;
}

function renderTask() {
  const { free, games, tasks } = scenario();
  const task = tasks[run.task];
  const need = needed();
  const freed = sum(toRemove());
  const confirmButton = label => `<button data-do="confirm"${freed < need ? ' disabled' : ''}>${label}</button>`;
  let body = '';
  let buttons = '';

  if (run.variant === 'A') {
    body = table(games, 'selected', 'Remove');
    buttons = confirmButton('Confirm selection');
  } else if (run.variant === 'B' && run.step === 1) {
    body = `<h2>Step 1: mark the games to keep</h2>${table(games, 'kept', 'Keep')}`;
    buttons = '<button data-do="next">Next</button>';
  } else if (run.variant === 'B') {
    const rest = games.filter(g => !run.kept.has(g.id));
    body = `<h2>Step 2: select the games to remove</h2>${table(rest, 'selected', 'Remove')}`;
    buttons = `<button data-do="back">Back</button> ${confirmButton('Confirm selection')}`;
  } else {
    const options = plans().map(p => `
      <div class="plan">
        ${p.games
          ? `<label><input type="radio" id="plan-${p.id}" name="plan" value="${p.id}"${run.plan === p.id ? ' checked' : ''}> <b>${p.name}</b></label>
             <ul>${p.games.map(id => `<li>${game(id).name}: ${game(id).size} GB, last played ${game(id).last}</li>`).join('')}</ul>
             <p>Frees ${gb(sum(p.games))}</p>`
          : `<b>${p.name}</b><p>Not enough space without the games you keep.</p>`}
      </div>`).join('');
    body = `
      <h2>Games to keep</h2>
      ${table(games, 'pinned', 'Keep')}
      <h2>Plans</h2>
      ${options}`;
    buttons = confirmButton('Confirm selected plan');
  }

  let changed = '';
  if (run.task > 0) {
    const before = tasks[run.task - 1];
    const added = task.install.filter(g => !before.install.some(b => b.name === g.name)).map(g => g.name);
    const kept = task.keep.filter(id => !before.keep.includes(id));
    changed = `<p class="note">The task has changed: you also want to install ${added.join(', ')}, and ${names(kept)} must also be kept.</p>`;
  }
  const install = task.install.map(g => `${g.name} (${g.size} GB)`).join(' and ');

  app.innerHTML = `
    <p class="muted">Variant ${run.variant}: ${VARIANTS[run.variant]} · Scenario ${run.position} · Task ${run.task + 1} of ${tasks.length}
    <button data-do="reload">Choose variant</button></p>
    ${changed}
    <p>Free up space to install ${install}. There is ${free} GB free.<br>
    Do not remove: ${names(task.keep)}.</p>
    ${body}
    <p>Selected: ${gb(freed)} of ${gb(need)} needed.</p>
    <p>${buttons}</p>`;
}

function renderDone() {
  const rows = run.results.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.seconds.toFixed(1)} s</td>
      <td>${names(r.selected)}</td>
      <td>${gb(r.freed)} of ${gb(r.needed)}</td>
      <td>${r.broken.length ? `Error: includes ${names(r.broken)}` : 'OK'}</td>
    </tr>`).join('');
  app.innerHTML = `
    <h1>Done</h1>
    <p>Variant ${run.variant}: ${VARIANTS[run.variant]} · Scenario ${run.position}</p>
    <table>
      <tr><th>Task</th><th>Time</th><th>Selected for removal</th><th>Frees</th><th>Result</th></tr>
      ${rows}
    </table>
    <p><button data-do="reload">Choose variant</button></p>`;
}

function render() {
  const focused = document.activeElement && document.activeElement.id;
  if (!run) renderStart();
  else if (run.task < scenario().tasks.length) renderTask();
  else renderDone();
  if (focused && document.getElementById(focused)) document.getElementById(focused).focus();
}

// --- Events ---

app.addEventListener('change', e => {
  const el = e.target;
  if (!run) return;
  if (el.dataset.set) {
    const set = run[el.dataset.set];
    if (el.checked) set.add(el.value); else set.delete(el.value);
    if (el.dataset.set === 'kept' && el.checked) run.selected.delete(el.value);
    if (el.dataset.set === 'pinned') run.plan = null;
  } else if (el.name === 'plan') {
    run.plan = el.value;
  }
  render();
});

app.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.do === 'reload') return location.reload();
  if (el.dataset.start) {
    const position = Number(app.querySelector('input[name="position"]:checked').value);
    savePosition(position);
    start(el.dataset.start, position);
  } else if (el.dataset.do === 'next') run.step = 2;
  else if (el.dataset.do === 'back') run.step = 1;
  else if (el.dataset.do === 'confirm') finishTask();
  else return;
  render();
  window.scrollTo(0, 0);
});

// --- Final variant ---

const FINAL_VERSION = 'Final v2, 2026-11-05';
const FINAL_FREE = 40;
const FINAL_GAMES = SCENARIOS[0].games;
const FINAL_BASE_KEEP = SCENARIOS[0].tasks[0].keep;
const FINAL_INSTALLS = { 130: SCENARIOS[0].tasks[0].install, 200: SCENARIOS[0].tasks[1].install };

const moderator = document.getElementById('moderator');

let finalRun = null;

function resetFinal() {
  finalRun = {
    total: 130,
    extraKeep: '',
    keep: new Set(),
    remove: new Set(),
    screen: 'select',
    confirmed: false,
    changed: false,
  };
}

const finalGame = id => FINAL_GAMES.find(g => g.id === id);
const finalIds = set => FINAL_GAMES.filter(g => set.has(g.id));

function finalFigures() {
  const recovered = finalIds(finalRun.remove).reduce((total, g) => total + Math.round(g.size * 10), 0);
  const required = finalRun.total * 10;
  const afterRemoval = FINAL_FREE * 10 + recovered;
  return {
    recovered,
    afterRemoval,
    stillNeeded: Math.max(0, required - afterRemoval),
    afterInstallation: afterRemoval - required,
  };
}

function finalCondition() {
  const install = FINAL_INSTALLS[finalRun.total].map(g => `${g.name} (${g.size} GB)`).join(', ');
  const keep = [...FINAL_BASE_KEEP, ...(finalRun.extraKeep ? [finalRun.extraKeep] : [])];
  return `
    <div class="condition">
      ${finalRun.changed ? '<p class="note">The task has changed.</p>' : ''}
      <p>Install: ${install}</p>
      <p>Total space required: ${finalRun.total} GB</p>
      <p>Free now: ${FINAL_FREE} GB</p>
      <p>Must stay installed: ${keep.map(id => finalGame(id).name).join(', ')}</p>
    </div>`;
}

function finalSummary() {
  const f = finalFigures();
  const installation = f.afterInstallation < 0
    ? `Installation will not fit: ${gb(-f.afterInstallation)} more needed.`
    : gb(f.afterInstallation);
  return `
    <p>Space recovered: <b>${gb(f.recovered)}</b></p>
    <p>Still needed: <b>${gb(f.stillNeeded)}</b></p>
    <p>Free space after removal, before installation: <b>${gb(f.afterRemoval)}</b></p>
    <p>Free space after installation: <b>${installation}</b></p>`;
}

function renderFinalSelect() {
  const rows = FINAL_GAMES.map(g => {
    const kept = finalRun.keep.has(g.id);
    return `
      <tr>
        <td>${g.name}</td>
        <td>${g.size} GB</td>
        <td>${g.last}</td>
        <td><button type="button" id="keep-${g.id}" data-keep="${g.id}" aria-pressed="${kept}" aria-label="Keep ${g.name}">${kept ? '✓ Keep' : 'Keep'}</button></td>
        <td>
          <label${kept ? ' class="off"' : ''}><input type="checkbox" id="remove-${g.id}" data-remove="${g.id}"${finalRun.remove.has(g.id) ? ' checked' : ''}${kept ? ' disabled' : ''}> Remove</label>
          ${kept ? 'Kept installed' : ''}
        </td>
      </tr>`;
  }).join('');
  return `
    ${finalCondition()}
    <table class="final-table">
      <tr><th>Game</th><th>Installed size</th><th>Last played</th><th>Keep installed</th><th>Remove</th></tr>
      ${rows}
    </table>
    <div class="figures">
      ${finalSummary()}
      <p><button data-final="review"${finalRun.remove.size ? '' : ' disabled'}>Review selection</button></p>
    </div>`;
}

function renderFinalReview() {
  const list = set => {
    const games = finalIds(set);
    return games.length
      ? `<ul>${games.map(g => `<li>${g.name}: ${g.size} GB</li>`).join('')}</ul>`
      : '<p>None</p>';
  };
  const enough = finalFigures().stillNeeded === 0;
  return `
    ${finalCondition()}
    <h2>Selected for removal</h2>
    ${list(finalRun.remove)}
    <h2>Kept installed</h2>
    ${list(finalRun.keep)}
    <div class="figures">
      ${finalSummary()}
      ${finalRun.confirmed ? '<p class="note">Selection confirmed. This is a plan: nothing has been deleted.</p>' : ''}
      <p>
        <button data-final="back">Back to selection</button>
        ${finalRun.confirmed ? '' : `<button data-final="confirm"${enough ? '' : ' disabled'}>Confirm selection</button>`}
      </p>
    </div>`;
}

function renderFinal() {
  const focused = document.activeElement && document.activeElement.id;
  app.innerHTML = finalRun.screen === 'review' ? renderFinalReview() : renderFinalSelect();
  if (focused && document.getElementById(focused)) document.getElementById(focused).focus();
}

function startFinal() {
  resetFinal();
  const options = FINAL_GAMES.filter(g => !FINAL_BASE_KEEP.includes(g.id))
    .map(g => `<option value="${g.id}">${g.name}</option>`).join('');
  moderator.innerHTML = `
    <summary>Moderator only (${FINAL_VERSION})</summary>
    <p><label>Total installation size:
      <select id="mod-total"><option value="130">130 GB</option><option value="200">200 GB</option></select>
    </label></p>
    <p><label>Additional game to keep:
      <select id="mod-keep"><option value="">None</option>${options}</select>
    </label></p>
    <p>
      <button id="mod-update">Update task</button>
      <button id="mod-reset">Reset</button>
      <a href="./">All variants</a>
    </p>`;
  moderator.hidden = false;
  app.classList.add('wide');
  renderFinal();
}

app.addEventListener('change', e => {
  const el = e.target;
  if (!finalRun || !el.dataset.remove) return;
  if (el.checked) finalRun.remove.add(el.dataset.remove); else finalRun.remove.delete(el.dataset.remove);
  renderFinal();
});

app.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.openFinal) {
    location.search = '?variant=final';
    return;
  }
  if (!finalRun) return;
  if (el.dataset.keep) {
    if (finalRun.keep.delete(el.dataset.keep) === false) {
      finalRun.keep.add(el.dataset.keep);
      finalRun.remove.delete(el.dataset.keep);
    }
    renderFinal();
    return;
  }
  if (!el.dataset.final) return;
  if (el.dataset.final === 'review') {
    finalRun.screen = 'review';
  } else if (el.dataset.final === 'back') {
    finalRun.screen = 'select';
    finalRun.confirmed = false;
  } else if (el.dataset.final === 'confirm') {
    finalRun.confirmed = true;
  }
  renderFinal();
  window.scrollTo(0, 0);
});

moderator.addEventListener('click', e => {
  if (e.target.id === 'mod-update') {
    finalRun.total = Number(document.getElementById('mod-total').value);
    finalRun.extraKeep = document.getElementById('mod-keep').value;
    finalRun.screen = 'select';
    finalRun.confirmed = false;
    finalRun.changed = true;
  } else if (e.target.id === 'mod-reset') {
    resetFinal();
    document.getElementById('mod-total').value = '130';
    document.getElementById('mod-keep').value = '';
  } else {
    return;
  }
  moderator.open = false;
  renderFinal();
  window.scrollTo(0, 0);
});

if (new URLSearchParams(location.search).get('variant') === 'final') startFinal();
else render();
