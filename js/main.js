// =========================================================================
// 1. ROBLOX MATH PREFIXES UP TO 1e303 (Centillion)
// =========================================================================
function buildRobloxSuffixTable() {
  const baseOnes = ['', 'U', 'D', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'Oc', 'No'];
  const tensGroups = [
    { expBase: 33,  root: 'De' },
    { expBase: 63,  root: 'Vt' },
    { expBase: 93,  root: 'Tg' },
    { expBase: 123, root: 'qg' },
    { expBase: 153, root: 'Qg' },
    { expBase: 183, root: 'sg' },
    { expBase: 213, root: 'Sg' },
    { expBase: 243, root: 'Og' },
    { expBase: 273, root: 'Ng' }
  ];

  const table = [
    { exp: 3,  suf: 'K' },
    { exp: 6,  suf: 'M' },
    { exp: 9,  suf: 'B' },
    { exp: 12, suf: 'T' },
    { exp: 15, suf: 'Qd' },
    { exp: 18, suf: 'Qn' },
    { exp: 21, suf: 'Sx' },
    { exp: 24, suf: 'Sp' },
    { exp: 27, suf: 'Oc' },
    { exp: 30, suf: 'No' }
  ];

  tensGroups.forEach(group => {
    baseOnes.forEach((prefix, idx) => {
      table.push({
        exp: group.expBase + idx * 3,
        suf: prefix + group.root
      });
    });
  });

  table.push({ exp: 303, suf: 'Ce' });
  return table;
}

const SUFFIX_TABLE = buildRobloxSuffixTable();

const SUFFIX_EXACT_MAP = {};
const SUFFIX_LOWER_MAP = {};
SUFFIX_TABLE.forEach(item => {
  SUFFIX_EXACT_MAP[item.suf] = item.exp;
  if (SUFFIX_LOWER_MAP[item.suf.toLowerCase()] === undefined) {
    SUFFIX_LOWER_MAP[item.suf.toLowerCase()] = item.exp;
  }
});

const ALIAS_ROOTS = [
  { expBase: 123, root: 'qdg' },
  { expBase: 153, root: 'qng' },
  { expBase: 183, root: 'sxg' },
  { expBase: 213, root: 'spg' },
  { expBase: 243, root: 'ocg' },
  { expBase: 273, root: 'nog' }
];
const lowerOnes = ['', 'u', 'd', 't', 'qd', 'qn', 'sx', 'sp', 'oc', 'no'];
ALIAS_ROOTS.forEach(group => {
  lowerOnes.forEach((p, idx) => {
    SUFFIX_LOWER_MAP[p + group.root] = group.expBase + idx * 3;
  });
});
SUFFIX_LOWER_MAP['ct'] = 303;
SUFFIX_LOWER_MAP['cent'] = 303;
SUFFIX_LOWER_MAP['n'] = 30;

function parseGameNumber(str, fallback = 1) {
  if (typeof str === 'number') return isFinite(str) && str > 0 ? str : fallback;
  if (!str) return fallback;
  const clean = String(str).trim().replace(/,/g, '');
  if (!clean) return fallback;

  if (/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(clean)) {
    const val = Number(clean);
    return isFinite(val) && val >= 0 ? val : fallback;
  }

  const match = clean.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*([a-zA-Z]+)$/);
  if (match) {
    const mantissa = parseFloat(match[1]);
    const rawSuf = match[2];
    const exp = SUFFIX_EXACT_MAP[rawSuf] !== undefined
      ? SUFFIX_EXACT_MAP[rawSuf]
      : SUFFIX_LOWER_MAP[rawSuf.toLowerCase()];
    if (exp !== undefined) {
      const val = mantissa * Math.pow(10, exp);
      return isFinite(val) && val >= 0 ? val : fallback;
    }
  }
  const parsed = parseFloat(clean);
  return isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function stripDecimalZeros(numStr) {
  return numStr.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
}

function formatGameNumber(num, decimals = 2) {
  if (!isFinite(num) || isNaN(num)) return 'Ce+';
  if (num === 0) return '0';
  const abs = Math.abs(num);
  if (abs < 1000) {
    if (abs >= 100 || Number.isInteger(num)) {
      return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
    }
    return stripDecimalZeros(num.toFixed(decimals));
  }
  const exp = Math.floor(Math.log10(abs));
  const tierIndex = Math.min(SUFFIX_TABLE.length - 1, Math.floor(exp / 3) - 1);
  if (tierIndex >= 0 && tierIndex < SUFFIX_TABLE.length) {
    const item = SUFFIX_TABLE[tierIndex];
    const scaled = num / Math.pow(10, item.exp);
    return `${stripDecimalZeros(scaled.toFixed(decimals))}${item.suf}`;
  }
  return num.toFixed(decimals);
}

function formatEta(seconds) {
  if (!isFinite(seconds) || seconds < 0) return 'Forever';
  if (seconds === 0) return '0s';

  const MONTH_SEC = 30 * 86400; 
  const TWO_MONTHS = 2 * MONTH_SEC;

  if (seconds >= TWO_MONTHS) {
    return 'Forever';
  }

  const months = Math.floor(seconds / MONTH_SEC);
  let rem = seconds % MONTH_SEC;
  const weeks = Math.floor(rem / 604800);
  rem %= 604800;
  const days = Math.floor(rem / 86400);
  rem %= 86400;
  const hours = Math.floor(rem / 3600);
  rem %= 3600;
  const minutes = Math.floor(rem / 60);
  const secs = rem % 60;

  const parts = [];
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (weeks > 0) parts.push(`${weeks}w`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 && months === 0 && weeks === 0 && days === 0 && hours === 0) {
    parts.push(`${secs < 10 && secs > 0 ? stripDecimalZeros(secs.toFixed(1)) : Math.floor(secs)}s`);
  }
  if (parts.length === 0) {
    if (seconds < 1) return `${stripDecimalZeros(seconds.toFixed(2))}s`;
    return `${Math.floor(seconds)}s`;
  }
  return parts.slice(0, 2).join(' ');
}

function formatFullSacrificeTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '∞ (Forever)';
  if (seconds === 0) return '0s';
  if (seconds < 0.5) return `Instant (${stripDecimalZeros(seconds.toFixed(3))}s)`;

  const YEAR_SEC = 365 * 86400;
  const MONTH_SEC = 30 * 86400;
  if (seconds >= YEAR_SEC * 100) {
    return `${formatGameNumber(seconds / YEAR_SEC, 2)} years`;
  }

  const years = Math.floor(seconds / YEAR_SEC);
  let rem = seconds % YEAR_SEC;
  const months = Math.floor(rem / MONTH_SEC);
  rem %= MONTH_SEC;
  const days = Math.floor(rem / 86400);
  rem %= 86400;
  const hours = Math.floor(rem / 3600);
  rem %= 3600;
  const minutes = Math.floor(rem / 60);
  const secs = rem % 60;

  const parts = [];
  if (years > 0) parts.push(`${years}y`);
  if (months > 0) parts.push(`${months}mo`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 && years === 0 && months === 0 && days === 0) {
    parts.push(`${secs < 10 ? stripDecimalZeros(secs.toFixed(1)) : Math.floor(secs)}s`);
  }
  return parts.slice(0, 3).join(' ') || '< 1s';
}

// =========================================================================
// 3. STATE
// =========================================================================
const state = {
  realm: 'Realm 1',
  pack: 'Basic',
  etaMode: 'math',
  autoOpenTimer: null,
  isAutoOpening: false,
  forceLuckOne: false,
  sacrificeRune: 'Chronos Core',
  rpsProfiles: {
    'Normal RPS': { bulk: '1', luck: '1', speed: '0.05' },
    'Football RPS': { bulk: '1', luck: '1', speed: '0.05' },
    'Halloween RPS': { bulk: '1', luck: '1', speed: '0.05' },
    'Prism RPS': { bulk: '1', luck: '1', speed: '0.05' }
  },
  sim: {
    runesOpened: 0,
    timeElapsed: 0,
    noobinialsPulled: 0,
    rarestDropName: null,
    rarestDropBaseOdds: 0,
    inventory: {}
  }
};

function getRpsCategory(packName) {
  if (packName === 'Football') return 'Football RPS';
  if (packName === 'Spooky' || packName === 'Pumpkin' || packName === 'Witch') return 'Halloween RPS';
  if (packName === 'Cosmic Prism' || packName === 'Sunstorm Prism' || packName === 'Aquatic Prism') return 'Prism RPS';
  return 'Normal RPS';
}

function getCategoryPrefix(packName) {
  const cat = getRpsCategory(packName);
  return cat.replace(' RPS', '');
}

function applyRpsProfileForCurrentPack() {
  const cat = getRpsCategory(state.pack);
  const profile = state.rpsProfiles[cat] || { bulk: '1', luck: '1', speed: '0.05' };
  document.getElementById('runeBulkInput').value = profile.bulk !== undefined ? profile.bulk : '1';
  document.getElementById('runeLuckInput').value = profile.luck !== undefined ? profile.luck : '1';
  document.getElementById('runeSpeedInput').value = profile.speed !== undefined ? profile.speed : '0.05';
}

function syncCurrentInputsToRpsProfile() {
  const cat = getRpsCategory(state.pack);
  state.rpsProfiles[cat] = {
    bulk: document.getElementById('runeBulkInput').value,
    luck: document.getElementById('runeLuckInput').value,
    speed: document.getElementById('runeSpeedInput').value
  };
}

// =========================================================================
// LOCALSTORAGE PERSISTENCE FUNCTIONS
// =========================================================================
function saveSettings() {
  try {
    syncCurrentInputsToRpsProfile();
    const settings = {
      realm: state.realm,
      pack: state.pack,
      forceLuckOne: state.forceLuckOne,
      rpsProfiles: state.rpsProfiles
    };
    localStorage.setItem('noob_rune_sim_settings', JSON.stringify(settings));
  } catch (e) {}
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('noob_rune_sim_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.realm && RUNE_DATABASE[settings.realm]) {
        state.realm = settings.realm;
      }
      if (settings.pack && RUNE_DATABASE[state.realm].packs[settings.pack]) {
        state.pack = settings.pack;
      }
      if (settings.forceLuckOne !== undefined) state.forceLuckOne = Boolean(settings.forceLuckOne);
      if (settings.rpsProfiles && typeof settings.rpsProfiles === 'object') {
        ['Normal RPS', 'Football RPS', 'Halloween RPS', 'Prism RPS'].forEach(cat => {
          if (settings.rpsProfiles[cat]) {
            const p = settings.rpsProfiles[cat];
            state.rpsProfiles[cat] = {
              bulk: p.bulk !== undefined ? String(p.bulk) : '1',
              luck: p.luck !== undefined ? String(p.luck) : '1',
              speed: p.speed !== undefined ? String(p.speed) : '0.05'
            };
          }
        });
      }
      applyRpsProfileForCurrentPack();
    }
  } catch (e) {}
}

// =========================================================================
// 4. RUNE CHANCE CALCULATION (Noobinials ignore luck, 1.5x when Luck == 1)
// =========================================================================
function getPlayerStats() {
  const isNormalRps = getRpsCategory(state.pack) === 'Normal RPS';
  const rawLuck = Math.max(0.0001, parseGameNumber(document.getElementById('runeLuckInput').value, 1));
  const luck = (isNormalRps && state.forceLuckOne) ? 1 : rawLuck;
  const bulk = Math.max(1, Math.floor(parseGameNumber(document.getElementById('runeBulkInput').value, 1)));
  const speed = Math.max(0.001, parseFloat(document.getElementById('runeSpeedInput').value) || 0.05);
  return { luck, bulk, speed };
}

function computeRuneChance(drop, luck) {
  const baseOdds = parseGameNumber(drop.odds, 1);
  const isNoobinial = drop.type === 'NOOBINIAL';
  const multiplier = isNoobinial ? 1.0 : luck;
  const rawChance = baseOdds / multiplier;
  const capped = rawChance <= 1.0;
  const chance = Math.max(1.0, rawChance);
  return {
    baseOdds,
    chance,
    capped,
    isNoobinial
  };
}

// =========================================================================
// 5. STOCHASTIC SIMULATOR ENGINE
// =========================================================================
function randomStandardNormal() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function sampleBinomialOrPoisson(trials, prob) {
  if (trials <= 0 || prob <= 0) return 0;
  if (prob >= 1) return trials;

  const lambda = trials * prob;
  if (!isFinite(lambda)) return trials * prob;

  if (lambda < 0.05) {
    const pAtLeastOne = -Math.expm1(-lambda);
    if (Math.random() < pAtLeastOne) {
      if (lambda > 0.001 && Math.random() < lambda * 0.5) return 2;
      return 1;
    }
    return 0;
  }

  if (lambda < 45) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return Math.min(trials, k - 1);
  }

  const std = Math.sqrt(lambda * Math.max(0, 1 - prob));
  const sample = Math.round(lambda + std * randomStandardNormal());
  return Math.max(0, Math.min(trials, sample));
}

function executeSimulatedBatches(batchCount) {
  if (batchCount <= 0) return;
  const { luck, bulk, speed } = getPlayerStats();
  const packObj = RUNE_DATABASE[state.realm].packs[state.pack];

  const runesOpenedThisStep = batchCount * bulk;
  state.sim.runesOpened += runesOpenedThisStep;
  state.sim.timeElapsed += batchCount * speed;

  const isLuckOne = Math.abs(luck - 1) < 1e-9;
  packObj.drops.forEach(drop => {
    const info = computeRuneChance(drop, luck);
    const simChance = (info.isNoobinial && isLuckOne) ? Math.max(1.0, info.baseOdds / 1.5) : info.chance;
    const prob = 1.0 / simChance;
    const hits = sampleBinomialOrPoisson(runesOpenedThisStep, prob);
    if (hits > 0) {
      state.sim.inventory[drop.name] = (state.sim.inventory[drop.name] || 0) + hits;

      if (drop.type === 'NOOBINIAL') {
        state.sim.noobinialsPulled += hits;
      }

      if (info.baseOdds > state.sim.rarestDropBaseOdds) {
        state.sim.rarestDropBaseOdds = info.baseOdds;
        state.sim.rarestDropName = `${drop.name} (1/${formatGameNumber(info.baseOdds)})`;
      }
    }
  });

  renderAll();
}

// =========================================================================
// 6. UI RENDERING
// =========================================================================
function populateRealmAndPackDropdowns() {
  const realmSelect = document.getElementById('realmSelect');
  realmSelect.innerHTML = '';
  Object.keys(RUNE_DATABASE).forEach(rName => {
    const opt = document.createElement('option');
    opt.value = rName;
    opt.textContent = rName;
    if (rName === state.realm) opt.selected = true;
    realmSelect.appendChild(opt);
  });
  populatePackDropdown();
}

function populatePackDropdown() {
  const packSelect = document.getElementById('runePackSelect');
  const packs = RUNE_DATABASE[state.realm].packs;
  packSelect.innerHTML = '';
  const packNames = Object.keys(packs);
  if (!packs[state.pack]) {
    state.pack = packNames[0];
  }
  packNames.forEach(pName => {
    const opt = document.createElement('option');
    opt.value = pName;
    opt.textContent = pName;
    if (pName === state.pack) opt.selected = true;
    packSelect.appendChild(opt);
  });
}

// Probability percentiles: P(1) Lucky, P(50) Median, P(99) Unlucky
// Using k = -ln(1 - p) * chance (with 2x chance pity cap for Noobinials)
const P1_FACTOR = -Math.log(1 - 0.01);   // ~0.01005x
const P50_FACTOR = -Math.log(1 - 0.50);  // ~0.69315x
const P99_FACTOR = -Math.log(1 - 0.99);  // ~4.60517x

function renderRuneRow(drop, luck, runesPerSec) {
  const info = computeRuneChance(drop, luck);
  const isNoob = info.isNoobinial;
  const etaSeconds = runesPerSec > 0 ? info.chance / runesPerSec : Infinity;
  const etaText = etaSeconds < 0.5 ? 'Instant' : formatEta(etaSeconds);

  let etaColorClass = 'text-emerald-400';
  if (etaSeconds < 3600) {
    etaColorClass = 'text-emerald-400';
  } else if (etaSeconds < 86400) {
    etaColorClass = 'text-amber-300';
  } else if (etaSeconds < 604800) {
    etaColorClass = 'text-orange-400';
  } else {
    etaColorClass = 'text-red-400';
  }
  if (etaSeconds < 0.5) {
    etaColorClass = 'text-emerald-400';
  }

  const isLuckMode = state.etaMode === 'luck';
  const gridTemplate = isLuckMode
    ? 'minmax(0, 1.2fr) minmax(0, 0.75fr) minmax(0, 0.9fr) minmax(0, 2.35fr) minmax(0, 0.95fr)'
    : 'minmax(0, 1.45fr) minmax(0, 1fr) minmax(0, 1.25fr) minmax(0, 1.05fr) minmax(0, 1.1fr)';

  let etaCellHtml = '';
  if (!isLuckMode) {
    etaCellHtml = `
      <div class="text-center font-mono text-xs font-medium ${etaColorClass} truncate tabular-nums" title="${etaText}">
        ${etaText}
      </div>
    `;
  } else {
    // Noobinials ONLY have a pity of double the chance (2.0x cap)
    const p1Mult = isNoob ? Math.min(2.0, P1_FACTOR) : P1_FACTOR;
    const p50Mult = isNoob ? Math.min(2.0, P50_FACTOR) : P50_FACTOR;
    const p99Mult = isNoob ? Math.min(2.0, P99_FACTOR) : P99_FACTOR;

    const p1Sec = etaSeconds * p1Mult;
    const p50Sec = etaSeconds * p50Mult;
    const p99Sec = etaSeconds * p99Mult;

    const p1Text = p1Sec < 0.5 ? 'Instant' : formatEta(p1Sec);
    const p50Text = p50Sec < 0.5 ? 'Instant' : formatEta(p50Sec);
    const p99Text = p99Sec < 0.5 ? 'Instant' : formatEta(p99Sec);

    etaCellHtml = `
      <div class="grid grid-cols-3 gap-1 text-center font-mono">
        <div class="rounded bg-[#101114] border border-[#282b33] px-1.5 py-0.5 min-w-0 flex flex-col items-center justify-center text-center" title="1% Lucky: ${p1Text}">
          <div class="text-[9px] text-[#6b7280] font-sans leading-tight">1%</div>
          <div class="text-[11px] font-medium text-emerald-400 whitespace-nowrap">${p1Text}</div>
        </div>
        <div class="rounded bg-[#101114] border border-[#282b33] px-1.5 py-0.5 min-w-0 flex flex-col items-center justify-center text-center" title="50% Median: ${p50Text}">
          <div class="text-[9px] text-[#6b7280] font-sans leading-tight">50%</div>
          <div class="text-[11px] font-medium text-amber-300 whitespace-nowrap">${p50Text}</div>
        </div>
        <div class="rounded bg-[#101114] border border-[#282b33] px-1.5 py-0.5 min-w-0 flex flex-col items-center justify-center text-center" title="99% Unlucky: ${p99Text}${isNoob ? ' (2× Pity Cap)' : ''}">
          <div class="text-[9px] text-[#6b7280] font-sans leading-tight">99%</div>
          <div class="text-[11px] font-medium text-red-400 whitespace-nowrap">${p99Text}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="grid items-center px-2.5 py-2 gap-2 text-center ${isNoob ? 'noobinial-row' : 'hover:bg-[#1b1d24]'} transition" style="grid-template-columns: ${gridTemplate}">
      <div class="flex items-center justify-center min-w-0 text-center">
        <span class="text-xs font-medium ${isNoob ? 'noobinial-text font-semibold' : 'text-[#e6e8ec]'} truncate text-center" title="${drop.name}">${drop.name}</span>
      </div>
      <div class="text-center font-mono text-xs ${isNoob ? 'text-amber-200/70' : 'text-[#6b7280]'} truncate tabular-nums" title="1/${formatGameNumber(info.baseOdds)}">
        1/${formatGameNumber(info.baseOdds)}
      </div>
      <div class="flex items-center justify-center gap-1 font-mono text-xs min-w-0 tabular-nums text-center" title="1/${formatGameNumber(info.chance)}${info.capped ? ' [CAP]' : ''}">
        <span class="truncate ${isNoob ? 'noobinial-text font-semibold' : 'text-[#d1d5db]'}">1/${formatGameNumber(info.chance)}</span>
        ${info.capped ? '<span class="text-[9px] font-medium px-1 rounded bg-[#252830] text-[#9ca3af] border border-[#323640] shrink-0">CAP</span>' : ''}
      </div>
      ${etaCellHtml}
      <div class="text-center font-mono text-xs min-w-0 tabular-nums" title="${(runesPerSec / info.chance) >= 1 ? `${formatGameNumber(runesPerSec / info.chance)} /s` : 'Less than 1/s'}">
        ${(runesPerSec / info.chance) >= 1
          ? `<span class="text-[#d1d5db]">${formatGameNumber(runesPerSec / info.chance)}/s</span>`
          : `<span class="text-[#6b7280]/50 select-none">—</span>`
        }
      </div>
    </div>
  `;
}

// Chance Calculator logic
function updateChanceCalculator() {
  const rps = parseGameNumber(document.getElementById('chanceCalcRps').value, 0);
  const odds = parseGameNumber(document.getElementById('chanceCalcOdds').value, 0);
  const result = document.getElementById('chanceCalcResult');
  const details = document.getElementById('chanceCalcDetails');

  if (!(rps > 0) || !(odds > 0)) {
    result.textContent = 'Enter valid values';
    details.textContent = 'Both RPS and rune chance must be greater than zero.';
    return;
  }

  const seconds = odds / rps;
  result.textContent = seconds < 0.5 ? 'Instant' : formatEta(seconds);
  details.textContent = `1/${formatGameNumber(odds)} chance at ${formatGameNumber(rps)} RPS`;
}


function populateSacrificeRuneDropdown() {
  const selectEl = document.getElementById('sacrificeRuneSelect');
  if (!selectEl) return;
  selectEl.innerHTML = '';
  Object.keys(SACRIFICE_RUNE_DATABASE).forEach(runeKey => {
    const entry = SACRIFICE_RUNE_DATABASE[runeKey];
    const opt = document.createElement('option');
    opt.value = runeKey;
    opt.textContent = entry.name;
    if (runeKey === state.sacrificeRune) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

function syncSacrificeMinLevelOnRuneChange(prevRuneKey, nextRuneKey) {
  const prevEntry = SACRIFICE_RUNE_DATABASE[prevRuneKey];
  const nextEntry = SACRIFICE_RUNE_DATABASE[nextRuneKey];
  if (!nextEntry) return;
  const prevMin = prevEntry && prevEntry.minLevel !== undefined ? prevEntry.minLevel : 1;
  const nextMin = nextEntry && nextEntry.minLevel !== undefined ? nextEntry.minLevel : 1;
  const currInput = document.getElementById('sacrificeCurrentLvl');
  if (!currInput) return;
  const rawCurr = parseInt(currInput.value, 10);
  if (rawCurr === prevMin || rawCurr < nextMin) {
    currInput.value = String(nextMin);
  }
}

function updateRuneSacrificeCalculator() {
  const entry = SACRIFICE_RUNE_DATABASE[state.sacrificeRune] || SACRIFICE_RUNE_DATABASE['Chronos Core'];
  if (!entry) return;

  // Sync current Player Stats inputs to state.rpsProfiles first
  syncCurrentInputsToRpsProfile();

  const minAllowed = entry.minLevel !== undefined ? entry.minLevel : 1;
  const maxAllowed = entry.maxLevel || 100;
  const currInput = document.getElementById('sacrificeCurrentLvl');
  const wantInput = document.getElementById('sacrificeWantedLvl');
  currInput.min = String(minAllowed);
  wantInput.min = String(minAllowed);

  document.getElementById('sacrificeCurrLvlLabel').textContent = `Current Level (${minAllowed}–${maxAllowed})`;
  document.getElementById('sacrificeWantLvlLabel').textContent = `Wanted Level (${minAllowed}–${maxAllowed})`;
  document.getElementById('sacrificeLevelCapBadge').textContent = `Lvl ${minAllowed}–${maxAllowed}`;

  // Determine whether this sacrifice rune uses Prism RPS or Normal RPS
  const sacRpsCategory = getRpsCategory(entry.pack);
  const isPrismRune = sacRpsCategory === 'Prism RPS';

  document.getElementById('sacrificePrismWarning').classList.toggle('hidden', !isPrismRune);

  // Use Prism RPS from state.rpsProfiles['Prism RPS'] if it's a prism rune, otherwise active Player Stats RPS
  const sacProfile = state.rpsProfiles[sacRpsCategory] || { bulk: '1', luck: '1', speed: '0.05' };
  const bulk = Math.max(1, Math.floor(parseGameNumber(sacProfile.bulk, 1)));
  const speed = Math.max(0.001, parseFloat(sacProfile.speed) || 0.05);
  const rawLuck = Math.max(0.0001, parseGameNumber(sacProfile.luck, 1));
  const luck = (sacRpsCategory === 'Normal RPS' && state.forceLuckOne) ? 1 : rawLuck;
  const activeRps = (1.0 / speed) * bulk;

  // Compute Rune Chance for this sacrifice rune
  const dropInfo = computeRuneChance({ name: entry.dropName, odds: entry.odds, type: entry.type }, luck);
  const runeChance = dropInfo.chance;

  document.getElementById('sacrificeRuneHeaderLabel').textContent = entry.name;
  document.getElementById('sacrificeRuneOddsBadge').textContent = `1/${formatGameNumber(runeChance)}`;

  const rawCurr = parseInt(currInput.value, 10);
  const rawWant = parseInt(wantInput.value, 10);

  const etaTitleEl = document.getElementById('sacrificeEtaTitle');
  const etaResultEl = document.getElementById('sacrificeEtaResult');
  const etaExactSubEl = document.getElementById('sacrificeEtaExactSub');
  const etaDetailsEl = document.getElementById('sacrificeEtaDetails');

  if (isNaN(rawCurr) || isNaN(rawWant)) {
    etaTitleEl.textContent = '';
    etaResultEl.textContent = 'Enter a valid level number';
    etaExactSubEl.textContent = '';
    etaDetailsEl.textContent = '';
    return;
  }

  // Check if either level exceeds the rune's max possible level (200 for Chronos Core & Oblivion Sigil, 100 for all others)
  if (rawCurr > maxAllowed || rawWant > maxAllowed) {
    const overLvl = Math.max(rawCurr, rawWant);
    etaTitleEl.textContent = '';
    etaResultEl.textContent = `Hold on, let me open Roblox Studio and code Lvl ${overLvl} into the game first (Max is Lvl ${maxAllowed})`;
    etaExactSubEl.textContent = '';
    etaDetailsEl.textContent = '';
    return;
  }

  // Check if wanted level is lower than current level (or < minAllowed)
  if (rawWant < rawCurr || rawCurr < minAllowed || rawWant < minAllowed) {
    etaTitleEl.textContent = '';
    etaResultEl.textContent = 'Travel back in time to achieve that';
    etaExactSubEl.textContent = '';
    etaDetailsEl.textContent = '';
    return;
  }

  const currentLvl = rawCurr;
  const wantedLvl = rawWant;

  if (wantedLvl === currentLvl) {
    etaTitleEl.textContent = `Level ${currentLvl} → Level ${wantedLvl}`;
    etaResultEl.textContent = '0s (Already Reached)';
    etaExactSubEl.textContent = `You are already at Lvl ${currentLvl}.`;
    etaDetailsEl.textContent = '';
    return;
  }

  // Each entry.levels[lvl - minAllowed] is the exact requirement to upgrade from Level lvl to Level (lvl + 1)
  let cumulativeRunes = 0;
  for (let lvl = currentLvl; lvl < wantedLvl; lvl++) {
    const reqStr = entry.levels[lvl - minAllowed] || '0';
    cumulativeRunes += parseGameNumber(reqStr, 0);
  }

  const totalRollsNeeded = cumulativeRunes * runeChance;
  const totalSeconds = activeRps > 0 ? totalRollsNeeded / activeRps : Infinity;
  const primaryEtaText = totalSeconds < 0.5 ? 'Instant' : formatEta(totalSeconds);
  const exactTimeText = formatFullSacrificeTime(totalSeconds);
  const rangeDesc = `Lvl ${currentLvl} → Lvl ${wantedLvl}`;

  etaTitleEl.textContent = `Average Time (${rangeDesc})`;
  etaResultEl.textContent = primaryEtaText === 'Forever' ? `Forever (${exactTimeText})` : primaryEtaText;
  etaExactSubEl.textContent = `Exact ETA: ${exactTimeText} • Needs ${formatGameNumber(cumulativeRunes)} ${entry.name} runes`;
  etaDetailsEl.textContent = `${rangeDesc} • 1/${formatGameNumber(runeChance)} chance at ${formatGameNumber(activeRps)} ${sacRpsCategory}`;
}

function renderAll() {
  const { luck, bulk, speed } = getPlayerStats();
  const packObj = RUNE_DATABASE[state.realm].packs[state.pack];

  const batchesPerSec = 1.0 / speed;
  const runesPerSec = batchesPerSec * bulk;

  document.getElementById('parsedLuckLabel').textContent = `${formatGameNumber(luck)}×`;
  document.getElementById('btnBulkLabel').textContent = formatGameNumber(bulk, 0);

  const rpsCategory = getRpsCategory(state.pack);
  const catPrefix = getCategoryPrefix(state.pack);
  const isNormalRps = rpsCategory === 'Normal RPS';
  const rpsCatLabelEl = document.getElementById('statRpsCategoryLabel');
  if (rpsCatLabelEl) {
    rpsCatLabelEl.textContent = rpsCategory;
  }
  const labelBulkEl = document.getElementById('labelRuneBulk');
  const labelLuckEl = document.getElementById('labelRuneLuck');
  const labelSpeedEl = document.getElementById('labelRuneSpeed');
  if (labelBulkEl) labelBulkEl.textContent = `${catPrefix} Rune Bulk`;
  if (labelLuckEl) labelLuckEl.textContent = `${catPrefix} Rune Luck (×)`;
  if (labelSpeedEl) labelSpeedEl.textContent = `${catPrefix} Rune Speed (s)`;
  const runeLuckRowEl = document.getElementById('runeLuckRow');
  const btnForceLuckOneEl = document.getElementById('btnForceLuckOne');
  if (runeLuckRowEl && btnForceLuckOneEl) {
    if (isNormalRps) {
      runeLuckRowEl.className = 'w-full flex flex-col gap-1.5';
      btnForceLuckOneEl.classList.remove('hidden');
      if (state.forceLuckOne) {
        btnForceLuckOneEl.textContent = 'Luck = 1: ON';
        btnForceLuckOneEl.className = 'w-full px-2 py-1 text-[11px] font-mono font-semibold btn-primary text-center';
      } else {
        btnForceLuckOneEl.textContent = 'Luck = 1: OFF';
        btnForceLuckOneEl.className = 'w-full px-2 py-1 text-[11px] font-mono font-medium btn-secondary text-[#9ca3af] text-center';
      }
    } else {
      runeLuckRowEl.className = 'w-full flex flex-col';
      btnForceLuckOneEl.classList.add('hidden');
    }
  }
  document.getElementById('statRunesPerSec').textContent = `${formatGameNumber(runesPerSec)} /s`;
  document.getElementById('statBasicLuckMulti').textContent = `${formatGameNumber(luck)}×`;

  document.getElementById('simRunesOpened').textContent = formatGameNumber(state.sim.runesOpened, 0);
  document.getElementById('simTimeElapsed').textContent = formatEta(state.sim.timeElapsed);
  document.getElementById('simNoobinialsPulled').textContent = formatGameNumber(state.sim.noobinialsPulled, 0);
  const noobLuckNoteEl = document.getElementById('simNoobinialLuckNote');
  if (noobLuckNoteEl) {
    noobLuckNoteEl.classList.toggle('hidden', Math.abs(luck - 1) >= 1e-9);
  }
  document.getElementById('simRarestDrop').textContent = state.sim.rarestDropName || 'None yet';

  // Build cumulative rolled runes list across all rolls in the session
  const allRolledRunes = packObj.drops
    .filter(drop => (state.sim.inventory[drop.name] || 0) > 0)
    .map(drop => {
      const info = computeRuneChance(drop, luck);
      return {
        name: drop.name,
        count: state.sim.inventory[drop.name],
        type: drop.type,
        chance: info.chance,
        capped: info.capped
      };
    });

  const showcase = document.getElementById('latestDropsShowcase');
  if (allRolledRunes.length > 0) {
    document.getElementById('lastBatchSummary').textContent =
      `${allRolledRunes.length} / ${packObj.drops.length} runes unlocked`;
    showcase.innerHTML = allRolledRunes.map(d => {
      const isNoob = d.type === 'NOOBINIAL';
      return `
        <div class="p-2 rounded border flex flex-col items-center justify-center text-center gap-0.5 ${
          isNoob
            ? 'bg-amber-950/20 border-amber-500/40'
            : 'bg-[#181a1f] border-[#282b33]'
        }">
          <span class="text-xs font-medium ${isNoob ? 'noobinial-text font-semibold' : 'text-[#e6e8ec]'} truncate max-w-full text-center" title="${d.name}">${d.name}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#252830] text-[#d1d5db] text-center">+${formatGameNumber(d.count, 0)}</span>
          <div class="text-[10px] font-mono text-[#6b7280] text-center">
            1/${formatGameNumber(d.chance)} ${d.capped ? '[CAP]' : ''}
          </div>
        </div>
      `;
    }).join('');
  } else {
    document.getElementById('lastBatchSummary').textContent = 'Ready to roll';
    showcase.innerHTML = `
      <div class="col-span-full flex items-center justify-center text-center text-xs text-[#6b7280] py-3 border border-dashed border-[#282b33] rounded">
        No rolls recorded in this session
      </div>
    `;
  }

  document.getElementById('packHeaderLabel').textContent = `${state.pack} Rune`;
  const basicDrops = packObj.drops.filter(d => d.type !== 'NOOBINIAL');
  const noobinialDrops = packObj.drops.filter(d => d.type === 'NOOBINIAL');
  const orderedDrops = [...basicDrops, ...noobinialDrops];

  const isLuckMode = state.etaMode === 'luck';
  const headerEl = document.getElementById('runeTableHeaders');
  if (headerEl) {
    headerEl.style.gridTemplateColumns = isLuckMode
      ? 'minmax(0, 1.2fr) minmax(0, 0.75fr) minmax(0, 0.9fr) minmax(0, 2.35fr) minmax(0, 0.95fr)'
      : 'minmax(0, 1.45fr) minmax(0, 1fr) minmax(0, 1.25fr) minmax(0, 1.05fr) minmax(0, 1.1fr)';
  }
  const modeTextEl = document.getElementById('etaModeBtnText');
  if (modeTextEl) {
    modeTextEl.textContent = isLuckMode ? 'Luck' : 'Math';
  }

  const combinedListEl = document.getElementById('combinedRunesList');
  combinedListEl.innerHTML = orderedDrops.map(d => renderRuneRow(d, luck, runesPerSec)).join('');
  
  updateRuneSacrificeCalculator();
  saveSettings(); // Automatically save settings on state change/render
}

// =========================================================================
// 7. AUTO-OPEN & CONTROLS
// =========================================================================
function stopAutoOpen() {
  if (state.autoOpenTimer) {
    clearInterval(state.autoOpenTimer);
    state.autoOpenTimer = null;
  }
  state.isAutoOpening = false;
  document.getElementById('autoBtnText').textContent = 'Start Auto-Open';
  const pill = document.getElementById('simStatusPill');
  pill.textContent = 'IDLE';
  pill.className = 'text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#101114] text-[#9ca3af] border border-[#282b33] text-center';
}

function startAutoOpen() {
  stopAutoOpen();
  state.isAutoOpening = true;
  document.getElementById('autoBtnText').textContent = 'Stop Auto-Open';
  const pill = document.getElementById('simStatusPill');
  pill.textContent = 'RUNNING';
  pill.className = 'text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 text-center';

  let remainderBatches = 0;
  state.autoOpenTimer = setInterval(() => {
    const { speed } = getPlayerStats();
    const batchesThisTick = (0.1 / speed) + remainderBatches;
    const wholeBatches = Math.floor(batchesThisTick);
    remainderBatches = batchesThisTick - wholeBatches;
    if (wholeBatches >= 1) {
      executeSimulatedBatches(wholeBatches);
    }
  }, 100);
}

function resetSession() {
  stopAutoOpen();
  state.sim = {
    runesOpened: 0,
    timeElapsed: 0,
    noobinialsPulled: 0,
    rarestDropName: null,
    rarestDropBaseOdds: 0,
    inventory: {}
  };
  renderAll();
}

window.addEventListener('DOMContentLoaded', () => {
  loadSettings(); // Load cached data before initializing UI
  
  populateRealmAndPackDropdowns();
  populateSacrificeRuneDropdown();
  
  // Ensure UI selection matches loaded state
  document.getElementById('realmSelect').value = state.realm;
  populatePackDropdown();
  document.getElementById('runePackSelect').value = state.pack;

  renderAll();

  ['chanceCalcRps', 'chanceCalcOdds'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateChanceCalculator);
  });
  updateChanceCalculator();

  document.getElementById('realmSelect').addEventListener('change', (e) => {
    state.realm = e.target.value;
    populatePackDropdown();
    state.pack = document.getElementById('runePackSelect').value;
    if (PACK_TO_SACRIFICE_RUNE[state.pack]) {
      const prevSac = state.sacrificeRune;
      state.sacrificeRune = PACK_TO_SACRIFICE_RUNE[state.pack];
      const sacSel = document.getElementById('sacrificeRuneSelect');
      if (sacSel) sacSel.value = state.sacrificeRune;
      syncSacrificeMinLevelOnRuneChange(prevSac, state.sacrificeRune);
    }
    applyRpsProfileForCurrentPack();
    resetSession();
  });

  document.getElementById('runePackSelect').addEventListener('change', (e) => {
    state.pack = e.target.value;
    if (PACK_TO_SACRIFICE_RUNE[state.pack]) {
      const prevSac = state.sacrificeRune;
      state.sacrificeRune = PACK_TO_SACRIFICE_RUNE[state.pack];
      const sacSel = document.getElementById('sacrificeRuneSelect');
      if (sacSel) sacSel.value = state.sacrificeRune;
      syncSacrificeMinLevelOnRuneChange(prevSac, state.sacrificeRune);
    }
    applyRpsProfileForCurrentPack();
    resetSession();
  });

  ['runeLuckInput', 'runeBulkInput', 'runeSpeedInput'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderAll);
  });

  document.getElementById('btnForceLuckOne').addEventListener('click', () => {
    state.forceLuckOne = !state.forceLuckOne;
    renderAll();
  });

  document.getElementById('btnOpenSingle').addEventListener('click', () => {
    executeSimulatedBatches(1);
  });

  document.getElementById('btnToggleAuto').addEventListener('click', () => {
    if (state.isAutoOpening) stopAutoOpen();
    else startAutoOpen();
  });

  document.querySelectorAll('.warp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = parseFloat(btn.getAttribute('data-warp-sec')) || 60;
      const { speed } = getPlayerStats();
      const batches = Math.max(1, Math.floor(sec / speed));
      executeSimulatedBatches(batches);
    });
  });

  document.getElementById('btnResetSim').addEventListener('click', resetSession);

  document.getElementById('etaModeToggleBtn').addEventListener('click', () => {
    state.etaMode = state.etaMode === 'math' ? 'luck' : 'math';
    renderAll();
  });

  document.getElementById('sacrificeRuneSelect').addEventListener('change', (e) => {
    const prevSac = state.sacrificeRune;
    state.sacrificeRune = e.target.value;
    syncSacrificeMinLevelOnRuneChange(prevSac, state.sacrificeRune);
    updateRuneSacrificeCalculator();
  });

  ['sacrificeCurrentLvl', 'sacrificeWantedLvl'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateRuneSacrificeCalculator);
  });

  // =====================================================================
  // 8. PRISM MODE LOGIC & EVENT LISTENERS
  // =====================================================================
  const runeModeGrid = document.getElementById('runeModeGrid');
  const prismModeGrid = document.getElementById('prismModeGrid');
  const btnModeRune = document.getElementById('btnModeRune');
  const btnModePrism = document.getElementById('btnModePrism');

  function parsePrismNumberAllowZero(str, fallback = 0) {
    if (typeof str === 'number') return isFinite(str) && str >= 0 ? str : fallback;
    if (str === null || str === undefined) return fallback;
    const clean = String(str).trim().replace(/,/g, '');
    if (!clean) return fallback;
    if (Number(clean) === 0) return 0;
    return parseGameNumber(clean, fallback);
  }

  // Supports s, m, h, d, w and combined strings like "2d 4h" (= 52hrs), "1w 2d", "1h 30m 15s"
  function parsePrismTimeInput(str) {
    if (typeof str === 'number') return isFinite(str) && str >= 0 ? str : 0;
    if (!str) return 0;
    const clean = String(str).trim();
    if (!clean) return 0;

    if (/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(clean)) {
      const val = parseFloat(clean);
      return isFinite(val) && val >= 0 ? val : 0;
    }

    const unitMultipliers = {
      s: 1, sec: 1, secs: 1, second: 1, seconds: 1,
      m: 60, min: 60, mins: 60, minute: 60, minutes: 60,
      h: 3600, hr: 3600, hrs: 3600, hour: 3600, hours: 3600,
      d: 86400, day: 86400, days: 86400,
      w: 604800, wk: 604800, wks: 604800, week: 604800, weeks: 604800
    };

    const regex = /([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*([a-zA-Z]+)?/g;
    let match;
    let totalSeconds = 0;
    let matchedAny = false;

    while ((match = regex.exec(clean)) !== null) {
      const val = parseFloat(match[1]);
      if (!isFinite(val) || val < 0) continue;
      const unitRaw = (match[2] || 's').toLowerCase();
      const mult = unitMultipliers[unitRaw];
      if (mult !== undefined) {
        totalSeconds += val * mult;
        matchedAny = true;
      }
    }

    return matchedAny ? totalSeconds : 0;
  }

  function formatParsedTimeLabel(seconds) {
    if (!isFinite(seconds) || seconds <= 0) return '0s';
    if (seconds >= 3600) {
      return `${formatGameNumber(seconds / 3600, 2)}hrs`;
    }
    if (seconds >= 60) {
      return `${formatGameNumber(seconds / 60, 2)}m`;
    }
    return `${formatGameNumber(seconds, 2)}s`;
  }

  function formatPrismDuration(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '∞';
    if (seconds === 0) return '0s';
    if (seconds < 60) {
      return `${seconds < 10 ? stripDecimalZeros(seconds.toFixed(2)) : stripDecimalZeros(seconds.toFixed(1))}s`;
    }
    const weeks = Math.floor(seconds / 604800);
    let rem = seconds % 604800;
    const days = Math.floor(rem / 86400);
    rem %= 86400;
    const hours = Math.floor(rem / 3600);
    rem %= 3600;
    const minutes = Math.floor(rem / 60);
    const secs = Math.floor(rem % 60);

    const parts = [];
    if (weeks > 0) parts.push(`${formatGameNumber(weeks, 0)}w`);
    if (days > 0) parts.push(`${formatGameNumber(days, 0)}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 && weeks === 0 && days === 0) parts.push(`${secs}s`);
    return parts.slice(0, 3).join(' ');
  }

  function switchAppMode(mode) {
    if (mode === 'prism') {
      runeModeGrid.classList.add('hidden');
      prismModeGrid.classList.remove('hidden');
      btnModePrism.className = 'px-3 py-1 rounded text-xs font-medium text-center transition btn-primary';
      btnModeRune.className = 'px-3 py-1 rounded text-xs font-medium text-center transition text-[#9ca3af] hover:text-white';
    } else {
      prismModeGrid.classList.add('hidden');
      runeModeGrid.classList.remove('hidden');
      btnModeRune.className = 'px-3 py-1 rounded text-xs font-medium text-center transition btn-primary';
      btnModePrism.className = 'px-3 py-1 rounded text-xs font-medium text-center transition text-[#9ca3af] hover:text-white';
    }
    try {
      localStorage.setItem('noob_rune_sim_active_mode', mode);
    } catch (e) {}
  }

  function updatePrismModeCalculators() {
    const prismPerCycle = parsePrismNumberAllowZero(document.getElementById('prismPerCycleInput').value, 0);
    const rawCycleLen = parseFloat(document.getElementById('prismCycleLengthInput').value);
    const cycleLength = isFinite(rawCycleLen) && rawCycleLen > 0 ? rawCycleLen : 1;

    const prismPerSec = prismPerCycle / cycleLength;

    // Update Box 1: Player Stats labels
    document.getElementById('statPrismPerSec').textContent = `${formatGameNumber(prismPerSec)} /s`;
    document.getElementById('statPrismCycle').textContent = `${cycleLength}s`;

    // Update Box 2: Capsule Opening Calculator
    const capsuleCost = parsePrismNumberAllowZero(document.getElementById('capsuleCostInput').value, 0);
    const capsuleBulk = Math.max(1, Math.floor(parseGameNumber(document.getElementById('capsuleBulkInput').value, 1)));
    const reservePrism = parsePrismNumberAllowZero(document.getElementById('reservePrismInput').value, 0);
    const hasGamepass = document.getElementById('minionMasterCheckbox').checked;

    const openInterval = hasGamepass ? 0.9 : 1.0;
    const costPerOpenBatch = capsuleCost * capsuleBulk;
    const costPerSec = costPerOpenBatch / openInterval;
    const netDrainPerSec = costPerSec - prismPerSec;

    document.getElementById('capsuleOpenSpeedPill').textContent = `${openInterval.toFixed(1)}s / open`;
    const badgeEl = document.getElementById('gamepassBadge');
    if (hasGamepass) {
      badgeEl.textContent = 'ON (0.9s)';
      badgeEl.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40 text-center';
    } else {
      badgeEl.textContent = 'OFF (1.0s)';
      badgeEl.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-[#181a1f] text-[#9ca3af] border border-[#282b33] text-center';
    }

    document.getElementById('capsuleCostPerSecStat').textContent = `${formatGameNumber(costPerSec)} /s`;
    document.getElementById('capsuleGainPerSecStat').textContent = `${formatGameNumber(prismPerSec)} /s`;

    const resultEl = document.getElementById('capsuleCalcResult');
    const subtextEl = document.getElementById('capsuleCalcSubtext');
    const totalOpenedEl = document.getElementById('capsuleTotalOpenedStat');

    if (costPerSec <= 0 || prismPerSec >= costPerSec) {
      resultEl.textContent = 'You can open for ∞';
      const netSurplus = prismPerSec - costPerSec;
      subtextEl.textContent = `Passive gain (${formatGameNumber(prismPerSec)}/s) ≥ capsule cost (${formatGameNumber(costPerSec)}/s) • +${formatGameNumber(netSurplus)}/s net gain`;
      totalOpenedEl.textContent = '∞';
    } else {
      const secondsLasted = reservePrism / netDrainPerSec;
      const totalCapsules = Math.floor((secondsLasted / openInterval) * capsuleBulk);
      resultEl.textContent = formatPrismDuration(secondsLasted);
      subtextEl.textContent = `Net drain: ${formatGameNumber(netDrainPerSec)} Prism/s • Lasts ${formatGameNumber(secondsLasted)}s from ${formatGameNumber(reservePrism)} Reserve Prism`;
      totalOpenedEl.textContent = formatGameNumber(totalCapsules, 0);
    }

    // Update Box 3: Prism Calculator
    const rawTimeStr = document.getElementById('prismCalcTimeInput').value;
    const totalSeconds = parsePrismTimeInput(rawTimeStr);

    document.getElementById('parsedPrismTimeLabel').textContent = formatParsedTimeLabel(totalSeconds);

    const totalCycles = totalSeconds / cycleLength;
    const totalPrismGenerated = prismPerSec * totalSeconds;
    const totalWithReserve = totalPrismGenerated + reservePrism;

    document.getElementById('prismCalcGeneratedResult').textContent = `${formatGameNumber(totalPrismGenerated)} Prism`;
    document.getElementById('prismCalcDetails').textContent =
      `${formatGameNumber(totalCycles)} cycles over ${formatPrismDuration(totalSeconds)} (${formatGameNumber(prismPerCycle)} Prism / ${cycleLength}s cycle)`;
    document.getElementById('prismCalcCyclesStat').textContent = formatGameNumber(totalCycles);
    document.getElementById('prismCalcTotalWithReserveStat').textContent = formatGameNumber(totalWithReserve);

    try {
      localStorage.setItem('noob_prism_sim_settings', JSON.stringify({
        prismPerCycle: document.getElementById('prismPerCycleInput').value,
        cycleLength: document.getElementById('prismCycleLengthInput').value,
        capsuleCost: document.getElementById('capsuleCostInput').value,
        capsuleBulk: document.getElementById('capsuleBulkInput').value,
        reservePrism: document.getElementById('reservePrismInput').value,
        hasGamepass: hasGamepass,
        calcTime: document.getElementById('prismCalcTimeInput').value,
        expeditionTime: document.getElementById('expeditionTimeInput') ? document.getElementById('expeditionTimeInput').value : '30m'
      }));
    } catch (e) {}
  }

  // Restore saved Prism settings if available
  try {
    const savedPrism = localStorage.getItem('noob_prism_sim_settings');
    if (savedPrism) {
      const ps = JSON.parse(savedPrism);
      if (ps.prismPerCycle !== undefined) document.getElementById('prismPerCycleInput').value = ps.prismPerCycle;
      if (ps.cycleLength !== undefined) document.getElementById('prismCycleLengthInput').value = ps.cycleLength;
      if (ps.capsuleCost !== undefined) document.getElementById('capsuleCostInput').value = ps.capsuleCost;
      if (ps.capsuleBulk !== undefined) document.getElementById('capsuleBulkInput').value = ps.capsuleBulk;
      if (ps.reservePrism !== undefined) document.getElementById('reservePrismInput').value = ps.reservePrism;
      if (ps.hasGamepass !== undefined) document.getElementById('minionMasterCheckbox').checked = Boolean(ps.hasGamepass);
      if (ps.calcTime !== undefined) {
        document.getElementById('prismCalcTimeInput').value = String(ps.calcTime).trim();
      }
      if (ps.expeditionTime !== undefined && document.getElementById('expeditionTimeInput')) {
        document.getElementById('expeditionTimeInput').value = String(ps.expeditionTime).trim();
      }
    }
    const savedMode = localStorage.getItem('noob_rune_sim_active_mode');
    if (savedMode === 'prism') {
      switchAppMode('prism');
    }
  } catch (e) {}

  btnModeRune.addEventListener('click', () => switchAppMode('rune'));
  btnModePrism.addEventListener('click', () => switchAppMode('prism'));

  [
    'prismPerCycleInput',
    'prismCycleLengthInput',
    'capsuleCostInput',
    'capsuleBulkInput',
    'reservePrismInput',
    'prismCalcTimeInput'
  ].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePrismModeCalculators);
  });

  document.getElementById('minionMasterCheckbox').addEventListener('change', updatePrismModeCalculators);

  document.querySelectorAll('.prism-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('prismCalcTimeInput').value = btn.getAttribute('data-prism-time') || '1h';
      updatePrismModeCalculators();
    });
  });

  updatePrismModeCalculators();

  // =====================================================================
  // 9. CHEST ROLLS LOGIC (T1 & T2 Combined Estimator)
  // =====================================================================
  const PRISM_ICON_URL = 'https://i.imgur.com/E9u8GSG.png';

  const CHEST_ITEMS = [
    {
      id: 'prisms',
      name: 'Prisms',
      category: 'Currency',
      icon: PRISM_ICON_URL,
      t1Chance: 20.95,
      t2Chance: 21.5,
      isDynamicPrism: true
    },
    {
      id: 'enchant_shards',
      name: 'Enchant Shards',
      category: 'Enchant Shards',
      icon: 'https://i.imgur.com/5ziBi1k.png',
      isCombinedShards: true
    },
    {
      id: 'dice',
      name: 'Dice',
      category: 'Items',
      icon: 'https://i.imgur.com/BghPnKM.png',
      t1Chance: 57.75,
      t2Chance: 51.25,
      t1Amount: 15,
      t2Amount: 20
    },
    {
      id: 'golden_dice',
      name: 'Golden Dice',
      category: 'Items',
      icon: 'https://i.imgur.com/3v5U29p.png',
      t1Chance: 0.5,
      t2Chance: 0.75,
      t1Amount: 1,
      t2Amount: 1
    },
    {
      id: 'tickets',
      name: 'Tickets',
      category: 'Items',
      icon: 'https://i.imgur.com/149sN2E.png',
      t1Chance: 0.25,
      t2Chance: 0.4,
      t1Amount: 1,
      t2Amount: 1
    },
    {
      id: 'ancient_fragments',
      name: 'Ancient Fragments',
      category: 'Items',
      icon: 'https://i.imgur.com/OXVGDaG.png',
      t1Chance: 0.4,
      t2Chance: 0.6,
      t1Amount: 1,
      t2Amount: 1
    },
    {
      id: 'iron_scythe',
      name: 'Iron Scythe',
      category: 'T1 Weapon',
      icon: 'https://i.imgur.com/WORUWtr.png',
      t1Chance: 4,
      t2Chance: 0,
      t1Amount: 1,
      t2Amount: 0
    },
    {
      id: 'gold_scythe',
      name: 'Gold Scythe',
      category: 'T1 Weapon',
      icon: 'https://i.imgur.com/MHzEcF2.png',
      t1Chance: 2,
      t2Chance: 0,
      t1Amount: 1,
      t2Amount: 0
    },
    {
      id: 'titanium_scythe',
      name: 'Titanium Scythe',
      category: 'T1 Weapon',
      icon: 'https://i.imgur.com/IEcfsRb.png',
      t1Chance: 0.5,
      t2Chance: 0,
      t1Amount: 1,
      t2Amount: 0
    },
    {
      id: 'emerald_sword',
      name: 'Emerald Sword',
      category: 'T2 Weapon',
      icon: 'https://i.imgur.com/FAW8jCE.png',
      t1Chance: 0,
      t2Chance: 5,
      t1Amount: 0,
      t2Amount: 1
    },
    {
      id: 'titanium_spear',
      name: 'Titanium Spear',
      category: 'T2 Weapon',
      icon: 'https://i.imgur.com/OsesTb6.png',
      t1Chance: 0,
      t2Chance: 2,
      t1Amount: 0,
      t2Amount: 1
    },
    {
      id: 'titanium_hammer',
      name: 'Titanium Hammer',
      category: 'T2 Weapon',
      icon: 'https://i.imgur.com/z5ValAz.png',
      t1Chance: 0,
      t2Chance: 1,
      t1Amount: 0,
      t2Amount: 1
    }
  ];

  function getCurrentPrismGainForChests() {
    const prismPerCycle = parsePrismNumberAllowZero(document.getElementById('prismPerCycleInput').value, 0);
    return prismPerCycle * 2;
  }

  function getChestCounts() {
    const t1 = Math.max(0, Math.floor(parsePrismNumberAllowZero(document.getElementById('t1ChestAmountInput').value, 0)));
    const t2 = Math.max(0, Math.floor(parsePrismNumberAllowZero(document.getElementById('t2ChestAmountInput').value, 0)));
    return { t1, t2 };
  }

  function generateChestRollEstimate() {
    const { t1, t2 } = getChestCounts();
    const prismReward = getCurrentPrismGainForChests();

    document.getElementById('btnOpenChestsLabel').textContent = `${formatGameNumber(t1)} T1 + ${formatGameNumber(t2)} T2`;
    document.getElementById('chestRollsSummaryLabel').textContent = `${formatGameNumber(t1)} T1 + ${formatGameNumber(t2)} T2 Chests`;

    const results = CHEST_ITEMS.map(item => {
      let combinedExpectedAmt = 0;
      let detailsText = '';

      if (item.isDynamicPrism) {
        const p1 = item.t1Chance / 100;
        const p2 = item.t2Chance / 100;
        const t1Expected = t1 * p1 * prismReward;
        const t2Expected = t2 * p2 * prismReward;
        combinedExpectedAmt = t1Expected + t2Expected;
        detailsText = `T1: ${formatGameNumber(t1Expected, 1)} · T2: ${formatGameNumber(t2Expected, 1)}`;
      } else if (item.isCombinedShards) {
        // Rare shards: 12% T1 (40 amt), 10% T2 (20 amt)
        // Legendary shards: 1.75% T1 (200 amt), 2.5% T2 (135 amt)
        const rareT1Exp = t1 * (12 / 100) * 40;
        const rareT2Exp = t2 * (10 / 100) * 20;
        const legT1Exp = t1 * (1.75 / 100) * 200;
        const legT2Exp = t2 * (2.5 / 100) * 135;
        combinedExpectedAmt = rareT1Exp + rareT2Exp + legT1Exp + legT2Exp;
        detailsText = `Rare: ${formatGameNumber(rareT1Exp + rareT2Exp, 1)} · Leg: ${formatGameNumber(legT1Exp + legT2Exp, 1)}`;
      } else {
        const p1 = item.t1Chance / 100;
        const p2 = item.t2Chance / 100;
        const t1Expected = t1 * p1 * item.t1Amount;
        const t2Expected = t2 * p2 * item.t2Amount;
        combinedExpectedAmt = t1Expected + t2Expected;
        detailsText = `T1: ${formatGameNumber(t1Expected, 1)} · T2: ${formatGameNumber(t2Expected, 1)}`;
      }

      return {
        item,
        combinedExpectedAmt,
        detailsText
      };
    });

    const listEl = document.getElementById('chestCombinedResultsList');
    listEl.innerHTML = results.map(entry => {
      const { item, combinedExpectedAmt, detailsText } = entry;

      return `
        <div class="grid grid-cols-2 items-center px-3 py-2 gap-3 hover:bg-[#1b1d24] transition text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 min-w-0 text-center">
            <img src="${item.icon}" alt="${item.name}" class="w-8 h-8 object-contain shrink-0 rounded bg-[#101114] p-1 border border-[#282b33]">
            <div class="min-w-0 text-center">
              <div class="text-xs font-medium text-[#e6e8ec] truncate text-center">${item.name}</div>
              <div class="text-[10px] text-[#6b7280] text-center">${item.category}</div>
            </div>
          </div>
          <div class="text-center font-mono shrink-0 tabular-nums">
            <div class="text-xs font-semibold text-amber-400 text-center">${formatGameNumber(combinedExpectedAmt, 2)}</div>
            <div class="text-[10px] text-[#6b7280] text-center">${detailsText}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  const t1ChestInput = document.getElementById('t1ChestAmountInput');
  const t2ChestInput = document.getElementById('t2ChestAmountInput');

  [t1ChestInput, t2ChestInput].forEach(inp => {
    inp.addEventListener('input', () => {
      const { t1, t2 } = getChestCounts();
      document.getElementById('btnOpenChestsLabel').textContent = `${formatGameNumber(t1)} T1 + ${formatGameNumber(t2)} T2`;
    });
  });

  document.getElementById('btnOpenChests').addEventListener('click', () => {
    generateChestRollEstimate();
  });

  document.getElementById('prismPerCycleInput').addEventListener('input', () => {
    generateChestRollEstimate();
  });

  generateChestRollEstimate();

  // =====================================================================
  // 10. EXPEDITION PRISM ESTIMATION LOGIC (1 Roll / Minute)
  // =====================================================================
  const EXPEDITIONS = [
    {
      id: 'easy',
      name: 'Easy',
      styleClass: 'expo-easy',
      chance: 97.5,
      multiplier: 0.11
    },
    {
      id: 'medium',
      name: 'Medium',
      styleClass: 'expo-medium',
      chance: 98,
      multiplier: 0.333
    },
    {
      id: 'hard',
      name: 'Hard',
      styleClass: 'expo-hard',
      chance: 96.5,
      multiplier: 1
    },
    {
      id: 'extreme',
      name: 'Extreme',
      styleClass: 'expo-extreme',
      chance: 96.55,
      multiplier: 1.247
    },
    {
      id: 'galaxy',
      name: 'Galaxy',
      styleClass: 'expo-galaxy',
      chance: 94.76,
      multiplier: 1.495
    },
    {
      id: 'yinyang',
      name: 'Yin Yang',
      styleClass: 'expo-yinyang',
      chance: 89.35,
      multiplier: 1.995
    },
    {
      id: 'underwater',
      name: 'Underwater',
      styleClass: 'expo-underwater',
      chance: 92.7,
      multiplier: 2.247
    },
    {
      id: 'godly',
      name: 'Godly',
      styleClass: 'expo-godly',
      chance: 92.5,
      multiplier: 2.495
    }
  ];

  const expeditionTimeInputEl = document.getElementById('expeditionTimeInput');

  if (expeditionTimeInputEl) {
    function updateExpeditionEstimator() {
      const currentGain = parsePrismNumberAllowZero(document.getElementById('prismPerCycleInput').value, 0);
      const rawTimeStr = expeditionTimeInputEl.value;
      const totalSeconds = parsePrismTimeInput(rawTimeStr);

      // Expeditions roll once every 1 minute (60 seconds)
      const totalRolls = Math.floor(totalSeconds / 60);

      document.getElementById('parsedExpeditionTimeLabel').textContent = formatParsedTimeLabel(totalSeconds);
      document.getElementById('expeditionRollsSummaryLabel').textContent =
        `${formatGameNumber(totalRolls, 0)} ${totalRolls === 1 ? 'Roll' : 'Rolls'} (1 / min)`;

      let totalExpectedPrism = 0;
      let totalExpectedPerMin = 0;

      const rowsHtml = EXPEDITIONS.map(exp => {
        const prismPerHit = currentGain * exp.multiplier;
        const expectedPerMin = prismPerHit * (exp.chance / 100);
        const expectedPrism = totalRolls * expectedPerMin;

        totalExpectedPerMin += expectedPerMin;
        totalExpectedPrism += expectedPrism;

        return `
          <div class="grid grid-cols-2 items-center px-3 py-2 gap-3 hover:bg-[#1b1d24] transition text-center">
            <div class="flex flex-col items-center justify-center min-w-0 text-center">
              <div class="text-xs font-semibold ${exp.styleClass} truncate text-center">${exp.name}</div>
              <div class="text-[10px] text-[#6b7280] font-mono text-center">${exp.chance}%</div>
            </div>
            <div class="text-center font-mono shrink-0 tabular-nums">
              <div class="text-xs font-semibold text-amber-400 text-center">${formatGameNumber(expectedPrism, 2)}</div>
              <div class="text-[10px] text-[#6b7280] text-center">${formatGameNumber(prismPerHit, 1)}/hit · ${formatGameNumber(totalRolls, 0)} rolls</div>
            </div>
          </div>
        `;
      }).join('');

      const selectedCardEl = document.getElementById('expeditionSelectedCard');
      if (selectedCardEl) {
        selectedCardEl.innerHTML = `
          <div class="flex items-center justify-center gap-1.5 text-[11px] text-[#6b7280] text-center">
            <img src="${PRISM_ICON_URL}" alt="Prisms" class="w-5 h-5 object-contain">
            <span>Total Prisms</span>
          </div>
          <div class="text-lg font-mono font-bold prism-glow tabular-nums text-center">
            ${formatGameNumber(totalExpectedPrism, 2)} Prism
          </div>
          <div class="text-xs text-[#9ca3af] font-mono text-center">
            ${formatGameNumber(totalRolls, 0)} rolls over ${formatPrismDuration(totalSeconds)} (${formatGameNumber(totalExpectedPerMin, 2)} Prism / min)
          </div>
        `;
      }

      const listEl = document.getElementById('expeditionResultsList');
      if (listEl) {
        listEl.innerHTML = rowsHtml;
      }
    }

    expeditionTimeInputEl.addEventListener('input', () => {
      updateExpeditionEstimator();
      updatePrismModeCalculators();
    });

    document.querySelectorAll('.expo-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        expeditionTimeInputEl.value = btn.getAttribute('data-expo-time') || '30m';
        updateExpeditionEstimator();
        updatePrismModeCalculators();
      });
    });

    document.getElementById('prismPerCycleInput').addEventListener('input', () => {
      updateExpeditionEstimator();
    });

    updateExpeditionEstimator();
  }
});
