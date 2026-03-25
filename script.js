const STORAGE_KEY_LANGUAGE = 'quickbillnow-language';
const MAX_ZONES = 5;

const translations = {
  'zh-Hant': {
    locale: 'zh-TW',
    documentTitle: '請款明細產生器',
    brand: 'QuickBillNow',
    appTitle: '請款明細產生器',
    previewEyebrow: '即時預覽',
    sectionBasicInfo: '基本資料',
    sectionDiscountZones: '折扣分區',
    sectionAddItem: '新增明細',
    sectionResult: '結果區',
    discountHint: '啟用後預設 2 個分區，最多 5 個',
    labelName: '名稱',
    labelSplitEnabled: '多人均分',
    labelSplitCount: '人數',
    labelUseDiscount: '使用折扣',
    labelNumber: '編號',
    labelDate: '日期',
    labelNote: '備註',
    labelItemName: '項目名稱',
    labelAmount: '金額',
    labelDiscountZone: '折扣分區',
    labelItemNote: '單筆備註',
    labelAddedItems: '已新增明細',
    buttonAdd: '新增',
    buttonAddZone: '新增分區',
    buttonDelete: '刪除',
    buttonCopyText: '複製文字',
    buttonPreviewImage: '圖片預覽',
    buttonDownloadImage: '下載圖片',
    buttonShare: '分享',
    shareSummary: '明細摘要',
    imagePreviewTitle: '圖片預覽',
    imagePreviewHint: '長按圖片可儲存或分享',
    disclaimer: '本工具僅供整理與分享明細，實際請款內容請自行確認。',
    placeholderClientName: '例如：某某有限公司',
    placeholderInvoiceNumber: '例如：INV-001',
    placeholderInvoiceNote: '輸入補充說明',
    placeholderItemName: '例如：網站設計費',
    placeholderItemNote: '輸入此項目的補充說明',
    placeholderZoneName: '例如：9折、活動',
    placeholderZoneRate: '例如：0.9',
    zoneTitle: '折扣分區 {index}',
    zoneDefaultName: '折扣分區{index}',
    itemCount: '{count} 筆',
    itemEmpty: '尚未新增明細',
    unfilled: '未填寫',
    none: '無',
    noNote: '尚無備註',
    totalZoneSubtotal: '{label}小計',
    totalNoDiscount: '無折扣小計',
    totalGrand: '總金額',
    totalPerPerson: '每人應付金額',
    totalPerPersonShort: '每人應付',
    shareTextName: '名稱：{value}',
    shareTextNumber: '編號：{value}',
    shareTextDate: '日期：{value}',
    shareTextZoneSubtotal: '{label}小計：{value}',
    shareTextNoDiscountSubtotal: '無折扣小計：{value}',
    shareTextGrandTotal: '總金額：{value}',
    shareTextPerPerson: '每人應付：{value}',
    shareTextNote: '備註：{value}',
    shareTitle: '請款明細',
    feedbackCopied: '已複製',
    feedbackCopyFailed: '複製失敗，請檢查瀏覽器權限',
    feedbackImageReady: '圖片預覽已產生',
    feedbackImageFailed: '圖片預覽產生失敗，請查看瀏覽器 console',
    feedbackImageDownloaded: '圖片已下載',
    feedbackShareOpened: '已開啟分享',
    feedbackShareUnsupported: '此瀏覽器不支援分享，已自動複製文字',
    feedbackShareFailed: '分享失敗，已自動複製文字',
    feedbackShareButtonFailed: '分享功能執行失敗',
  },
  en: {
    locale: 'en-US',
    documentTitle: 'Billing Summary Generator',
    brand: 'QuickBillNow',
    appTitle: 'Billing Summary Generator',
    previewEyebrow: 'Live Preview',
    sectionBasicInfo: 'Basic Info',
    sectionDiscountZones: 'Discount Zones',
    sectionAddItem: 'Add Item',
    sectionResult: 'Result',
    discountHint: '2 zones are shown by default when enabled, up to 5 total',
    labelName: 'Name',
    labelSplitEnabled: 'Split bill',
    labelSplitCount: 'People',
    labelUseDiscount: 'Use discount',
    labelNumber: 'Number',
    labelDate: 'Date',
    labelNote: 'Note',
    labelItemName: 'Item name',
    labelAmount: 'Amount',
    labelDiscountZone: 'Discount zone',
    labelItemNote: 'Item note',
    labelAddedItems: 'Items',
    buttonAdd: 'Add',
    buttonAddZone: 'Add zone',
    buttonDelete: 'Delete',
    buttonCopyText: 'Copy Text',
    buttonPreviewImage: 'Image Preview',
    buttonDownloadImage: 'Download Image',
    buttonShare: 'Share',
    shareSummary: 'Summary',
    imagePreviewTitle: 'Image Preview',
    imagePreviewHint: 'Long press the image to save or share it',
    disclaimer: 'This tool is for organizing and sharing billing details only. Please verify the final billing content yourself.',
    placeholderClientName: 'e.g. Example Co., Ltd.',
    placeholderInvoiceNumber: 'e.g. INV-001',
    placeholderInvoiceNote: 'Add extra notes',
    placeholderItemName: 'e.g. Website design fee',
    placeholderItemNote: 'Add a note for this item',
    placeholderZoneName: 'e.g. 10% off, campaign',
    placeholderZoneRate: 'e.g. 0.9',
    zoneTitle: 'Discount Zone {index}',
    zoneDefaultName: 'Discount Zone {index}',
    itemCount: '{count} item(s)',
    itemEmpty: 'No items added yet',
    unfilled: 'Not filled',
    none: 'None',
    noNote: 'No note',
    totalZoneSubtotal: '{label} subtotal',
    totalNoDiscount: 'No-discount subtotal',
    totalGrand: 'Total',
    totalPerPerson: 'Per-person amount',
    totalPerPersonShort: 'Per person',
    shareTextName: 'Name: {value}',
    shareTextNumber: 'Number: {value}',
    shareTextDate: 'Date: {value}',
    shareTextZoneSubtotal: '{label}: {value}',
    shareTextNoDiscountSubtotal: 'No-discount subtotal: {value}',
    shareTextGrandTotal: 'Total: {value}',
    shareTextPerPerson: 'Per person: {value}',
    shareTextNote: 'Note: {value}',
    shareTitle: 'Billing Summary',
    feedbackCopied: 'Copied',
    feedbackCopyFailed: 'Copy failed. Please check browser permissions.',
    feedbackImageReady: 'Image preview is ready',
    feedbackImageFailed: 'Failed to generate image preview. Check the browser console.',
    feedbackImageDownloaded: 'Image downloaded',
    feedbackShareOpened: 'Share sheet opened',
    feedbackShareUnsupported: 'Sharing is not supported here, so the text was copied instead',
    feedbackShareFailed: 'Sharing failed, so the text was copied instead',
    feedbackShareButtonFailed: 'Failed to run share action',
  },
};

const form = document.getElementById('billing-form');
const addItemBtn = document.getElementById('add-item-btn');
const addZoneBtn = document.getElementById('add-zone-btn');
const splitCountField = document.getElementById('splitCountField');
const discountSection = document.getElementById('discount-section');
const discountZonesContainer = document.getElementById('discount-zones');
const draftItemGroupField = document.getElementById('draftItemGroupField');
const previewItems = document.getElementById('preview-items');
const totalsSection = document.getElementById('totals-section');
const copyTextBtn = document.getElementById('copy-text-btn');
const downloadImageBtn = document.getElementById('download-image-btn');
const shareBtn = document.getElementById('share-btn');
const actionFeedback = document.getElementById('action-feedback');
const langButtons = document.querySelectorAll('.lang-btn');

const imageModal = document.getElementById('image-modal');
const imageModalBackdrop = document.getElementById('image-modal-backdrop');
const closeImageModalBtn = document.getElementById('close-image-modal');
const previewImage = document.getElementById('preview-image');
const modalDownloadBtn = document.getElementById('modal-download-btn');
const modalShareBtn = document.getElementById('modal-share-btn');

const fieldRefs = {
  clientName: document.getElementById('clientName'),
  splitEnabled: document.getElementById('splitEnabled'),
  splitCount: document.getElementById('splitCount'),
  discountEnabled: document.getElementById('discountEnabled'),
  invoiceNumber: document.getElementById('invoiceNumber'),
  invoiceDate: document.getElementById('invoiceDate'),
  invoiceNote: document.getElementById('invoiceNote'),
  draftItemName: document.getElementById('draftItemName'),
  draftItemAmount: document.getElementById('draftItemAmount'),
  draftItemGroup: document.getElementById('draftItemGroup'),
  draftItemNote: document.getElementById('draftItemNote'),
};

const previewRefs = {
  client: document.getElementById('preview-client'),
  number: document.getElementById('preview-number'),
  date: document.getElementById('preview-date'),
  note: document.getElementById('preview-note'),
  itemCount: document.getElementById('preview-item-count'),
};

const shareRefs = {
  card: document.getElementById('share-card'),
  client: document.getElementById('share-client'),
  date: document.getElementById('share-date'),
  itemCount: document.getElementById('share-item-count'),
  items: document.getElementById('share-items'),
  totals: document.getElementById('share-totals'),
  note: document.getElementById('share-note'),
};

const items = [];
let discountZones = [];
let nextZoneId = 1;
let feedbackTimer = null;
let currentPreviewImageUrl = '';
let currentPreviewImageBlob = null;
let currentLanguage = resolveInitialLanguage();

function resolveInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
  if (saved && translations[saved]) return saved;

  const browserLanguage = (navigator.language || '').toLowerCase();
  if (browserLanguage.startsWith('zh')) return 'zh-Hant';
  return 'en';
}

function t(key, vars = {}) {
  const dict = translations[currentLanguage] || translations['zh-Hant'];
  let text = dict[key] ?? translations['zh-Hant'][key] ?? key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, value);
  });
  return text;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createDefaultZone(index) {
  return {
    id: `ZONE${nextZoneId++}`,
    name: t('zoneDefaultName', { index: String(index) }),
    rate: '',
  };
}

function ensureDiscountZones(forceReset = false) {
  if (forceReset || discountZones.length === 0) {
    discountZones = [createDefaultZone(1), createDefaultZone(2)];
  }
}

function formatCurrency(value, lang = currentLanguage) {
  const amount = Number(value) || 0;

  if (lang === 'en') {
    return `$${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  }

  return `NT$${new Intl.NumberFormat('zh-TW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

function formatRate(value) {
  const num = Number(value) || 0;
  if (Number.isInteger(num)) return String(num);
  return num.toFixed(2).replace(/\.00$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
}

function clampSplitCount(value) {
  const num = Number(value);
  if (Number.isNaN(num) || num < 1) return 1;
  return Math.floor(num);
}

function parseRate(value) {
  const raw = String(value ?? '').trim();
  if (raw === '' || raw === '.' || raw === '0.') return null;
  const num = Number(raw);
  if (Number.isNaN(num) || num <= 0) return null;
  return num;
}

function formatDateByLanguage(value, lang = currentLanguage) {
  if (!value) return '—';
  if (lang !== 'en') return value;

  const parsedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

function showFeedback(message) {
  if (!actionFeedback) return;
  actionFeedback.textContent = message;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    actionFeedback.textContent = '';
  }, 2200);
}

function isDiscountEnabled() {
  return Boolean(fieldRefs.discountEnabled?.checked);
}

function getZones() {
  if (!isDiscountEnabled()) return [];

  return discountZones.map((zone, index) => ({
    ...zone,
    displayName: zone.name.trim() || t('zoneDefaultName', { index: String(index + 1) }),
    rateValue: parseRate(zone.rate),
    filled: Boolean(zone.name.trim()) && parseRate(zone.rate) !== null,
  }));
}

function getZoneMap() {
  return Object.fromEntries(getZones().map((zone) => [zone.id, zone]));
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t('documentTitle');

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });

  if (closeImageModalBtn) closeImageModalBtn.setAttribute('aria-label', currentLanguage === 'en' ? 'Close' : '關閉');
  if (previewImage) previewImage.alt = currentLanguage === 'en' ? 'Billing summary preview image' : '請款明細預覽圖片';
}

function updateLanguageButtons() {
  langButtons.forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function setLanguage(language, persist = true) {
  if (!translations[language]) return;
  currentLanguage = language;
  if (persist) localStorage.setItem(STORAGE_KEY_LANGUAGE, language);
  applyStaticTranslations();
  updateLanguageButtons();
  updateView();
}

function renderDiscountZones() {
  if (!discountZonesContainer) return;

  if (!isDiscountEnabled()) {
    discountZonesContainer.innerHTML = '';
    return;
  }

  ensureDiscountZones();
  discountZonesContainer.innerHTML = discountZones
    .map(
      (zone, index) => `
        <div class="discount-zone-card" data-zone-id="${escapeHtml(zone.id)}">
          <div class="discount-zone-header">
            <h3>${escapeHtml(t('zoneTitle', { index: String(index + 1) }))}</h3>
            <button type="button" class="ghost-btn delete-zone-btn" data-zone-id="${escapeHtml(zone.id)}" ${discountZones.length <= 1 ? 'disabled' : ''}>${escapeHtml(t('buttonDelete'))}</button>
          </div>
          <div class="grid two-grid">
            <label class="field">
              <span>${escapeHtml(t('labelName'))}</span>
              <input type="text" class="zone-name-input" data-zone-id="${escapeHtml(zone.id)}" value="${escapeHtml(zone.name)}" placeholder="${escapeHtml(t('placeholderZoneName'))}" />
            </label>
            <label class="field">
              <span>${escapeHtml(currentLanguage === 'en' ? 'Rate' : '折數')}</span>
              <input type="text" inputmode="decimal" class="zone-rate-input" data-zone-id="${escapeHtml(zone.id)}" value="${escapeHtml(zone.rate)}" placeholder="${escapeHtml(t('placeholderZoneRate'))}" />
            </label>
          </div>
        </div>
      `
    )
    .join('');

  if (addZoneBtn) addZoneBtn.disabled = discountZones.length >= MAX_ZONES;
}

function refreshGroupOptions() {
  if (!fieldRefs.draftItemGroup) return;

  if (!isDiscountEnabled()) {
    fieldRefs.draftItemGroup.innerHTML = `<option value="NONE">${escapeHtml(t('none'))}</option>`;
    fieldRefs.draftItemGroup.value = 'NONE';
    return;
  }

  const currentValue = fieldRefs.draftItemGroup.value;
  const zones = getZones();

  fieldRefs.draftItemGroup.innerHTML = [
    `<option value="NONE">${escapeHtml(t('none'))}</option>`,
    ...zones.map((zone) => `<option value="${escapeHtml(zone.id)}">${escapeHtml(zone.displayName)}</option>`),
  ].join('');

  const available = zones.some((zone) => zone.id === currentValue);
  fieldRefs.draftItemGroup.value = available || currentValue === 'NONE' ? currentValue : 'NONE';
}

function normalizeItemGroups() {
  const zoneMap = getZoneMap();
  items.forEach((item) => {
    if (!isDiscountEnabled() || item.group === 'NONE' || !zoneMap[item.group]) {
      item.group = 'NONE';
    }
  });
}

function getItemPricing(item, zoneMap = getZoneMap()) {
  const originalAmount = Number(item.amount) || 0;
  const zone = zoneMap[item.group];
  const hasDiscount = isDiscountEnabled() && item.group !== 'NONE' && zone?.filled;
  const rate = hasDiscount ? zone.rateValue : 1;
  const discountedAmount = hasDiscount ? originalAmount * rate : originalAmount;

  return {
    name: item.name,
    originalAmount,
    discountedAmount,
    note: item.note || '',
    hasDiscount,
    group: hasDiscount ? item.group : 'NONE',
    zoneLabel: hasDiscount ? zone.displayName : '',
    rate,
  };
}

function getCurrentItemsDetailed() {
  const zoneMap = getZoneMap();
  return items.map((item) => getItemPricing(item, zoneMap));
}

function calculateTotals(detailedItems = getCurrentItemsDetailed()) {
  const discountEnabled = isDiscountEnabled();
  const zones = getZones();

  const zoneSummaries = discountEnabled
    ? zones
        .filter((zone) => zone.filled)
        .map((zone) => {
          const zoneItems = detailedItems.filter((item) => item.hasDiscount && item.group === zone.id);
          return {
            key: zone.id,
            label: zone.displayName,
            rate: zone.rateValue,
            total: zoneItems.reduce((sum, item) => sum + item.discountedAmount, 0),
          };
        })
    : [];

  const noDiscountSubtotal = detailedItems
    .filter((item) => !item.hasDiscount)
    .reduce((sum, item) => sum + item.originalAmount, 0);

  const grandTotal = detailedItems.reduce((sum, item) => sum + item.discountedAmount, 0);
  const splitEnabled = Boolean(fieldRefs.splitEnabled?.checked);
  const splitCount = clampSplitCount(fieldRefs.splitCount?.value || 1);
  const perPersonAmount = splitEnabled ? grandTotal / splitCount : 0;

  return {
    discountEnabled,
    zoneSummaries,
    noDiscountSubtotal,
    grandTotal,
    splitEnabled,
    splitCount,
    perPersonAmount,
  };
}

function getCurrentState() {
  const detailedItems = getCurrentItemsDetailed();
  const totals = calculateTotals(detailedItems);

  return {
    name: fieldRefs.clientName?.value.trim() || t('unfilled'),
    number: fieldRefs.invoiceNumber?.value.trim() || '—',
    date: formatDateByLanguage(fieldRefs.invoiceDate?.value || ''),
    note: fieldRefs.invoiceNote?.value.trim() || t('noNote'),
    items: detailedItems,
    totals,
  };
}

function getAmountDisplay(item) {
  if (!item.hasDiscount) return formatCurrency(item.originalAmount);
  return `${formatCurrency(item.originalAmount)} × ${formatRate(item.rate)} = ${formatCurrency(item.discountedAmount)}`;
}

function getItemLineDisplay(item) {
  const amountText = getAmountDisplay(item);
  return item.note ? `${amountText}（${item.note}）` : amountText;
}

function renderPreviewItems() {
  if (!previewItems || !previewRefs.itemCount) return;

  const detailedItems = getCurrentItemsDetailed();
  previewRefs.itemCount.textContent = t('itemCount', { count: String(detailedItems.length) });

  if (!detailedItems.length) {
    previewItems.className = 'preview-items empty';
    previewItems.textContent = t('itemEmpty');
    return;
  }

  previewItems.className = 'preview-items compact-list';
  previewItems.innerHTML = detailedItems
    .map(
      (item, index) => `
        <div class="compact-item-row">
          <div class="compact-item-main">
            <span class="compact-item-name">${escapeHtml(item.name)}</span>
            <span class="compact-item-text">${escapeHtml(getItemLineDisplay(item))}</span>
          </div>
          <button type="button" class="ghost-btn delete-item-btn" data-index="${index}">${escapeHtml(t('buttonDelete'))}</button>
        </div>
      `
    )
    .join('');
}

function buildTotalsRows(totals, shortSplitLabel = false) {
  const rows = [];

  if (totals.discountEnabled) {
    totals.zoneSummaries.forEach((zone) => {
      rows.push(`
        <div class="total-row">
          <span>${escapeHtml(t('totalZoneSubtotal', { label: zone.label }))}</span>
          <strong>${escapeHtml(formatCurrency(zone.total))}</strong>
        </div>
      `);
    });

    rows.push(`
      <div class="total-row">
        <span>${escapeHtml(t('totalNoDiscount'))}</span>
        <strong>${escapeHtml(formatCurrency(totals.noDiscountSubtotal))}</strong>
      </div>
    `);
  }

  rows.push(`
    <div class="total-row grand-total-row">
      <span>${escapeHtml(t('totalGrand'))}</span>
      <strong>${escapeHtml(formatCurrency(totals.grandTotal))}</strong>
    </div>
  `);

  if (totals.splitEnabled) {
    rows.push(`
      <div class="total-row split-row">
        <span>${escapeHtml(shortSplitLabel ? t('totalPerPersonShort') : t('totalPerPerson'))}</span>
        <strong>${escapeHtml(formatCurrency(totals.perPersonAmount))}</strong>
      </div>
    `);
  }

  return rows.join('');
}

function renderTotals(totals) {
  if (!totalsSection) return;
  totalsSection.innerHTML = buildTotalsRows(totals);
}

function renderMeta() {
  if (previewRefs.client) previewRefs.client.textContent = fieldRefs.clientName?.value.trim() || t('unfilled');
  if (previewRefs.number) previewRefs.number.textContent = fieldRefs.invoiceNumber?.value.trim() || '—';
  if (previewRefs.date) previewRefs.date.textContent = formatDateByLanguage(fieldRefs.invoiceDate?.value || '');
  if (previewRefs.note) previewRefs.note.textContent = fieldRefs.invoiceNote?.value.trim() || t('noNote');
}

function updateSplitUI() {
  const enabled = Boolean(fieldRefs.splitEnabled?.checked);
  if (splitCountField) splitCountField.classList.toggle('hidden', !enabled);
  if (enabled && fieldRefs.splitCount) {
    fieldRefs.splitCount.value = clampSplitCount(fieldRefs.splitCount.value);
  }
}

function updateDiscountUI({ renderZones = true } = {}) {
  const enabled = isDiscountEnabled();
  if (discountSection) discountSection.classList.toggle('hidden', !enabled);
  if (draftItemGroupField) draftItemGroupField.classList.toggle('hidden', !enabled);

  if (enabled) ensureDiscountZones();
  normalizeItemGroups();
  if (renderZones) renderDiscountZones();
  refreshGroupOptions();
}

function renderShareCard() {
  if (!shareRefs.card) return;

  const state = getCurrentState();

  if (shareRefs.client) shareRefs.client.textContent = state.name;
  if (shareRefs.date) shareRefs.date.textContent = state.date;
  if (shareRefs.itemCount) shareRefs.itemCount.textContent = t('itemCount', { count: String(state.items.length) });
  if (shareRefs.note) shareRefs.note.textContent = state.note;

  if (shareRefs.items) {
    shareRefs.items.innerHTML = state.items.length
      ? state.items
          .map(
            (item) => `
              <div class="share-line-item">
                <span class="share-line-name">${escapeHtml(item.name)}</span>
                <span class="share-line-text">${escapeHtml(getItemLineDisplay(item))}</span>
              </div>
            `
          )
          .join('')
      : `<div class="empty">${escapeHtml(t('itemEmpty'))}</div>`;
  }

  if (shareRefs.totals) {
    shareRefs.totals.innerHTML = buildTotalsRows(state.totals, true);
  }
}

function updateView({ renderDiscountZones: shouldRenderDiscountZones = true } = {}) {
  if (fieldRefs.splitCount) {
    fieldRefs.splitCount.value = clampSplitCount(fieldRefs.splitCount.value);
  }

  updateSplitUI();
  updateDiscountUI({ renderZones: shouldRenderDiscountZones });
  renderMeta();
  renderPreviewItems();
  renderTotals(calculateTotals(getCurrentItemsDetailed()));
  renderShareCard();
}

function clearDraftFields() {
  if (fieldRefs.draftItemName) fieldRefs.draftItemName.value = '';
  if (fieldRefs.draftItemAmount) fieldRefs.draftItemAmount.value = '';
  if (fieldRefs.draftItemGroup) fieldRefs.draftItemGroup.value = 'NONE';
  if (fieldRefs.draftItemNote) fieldRefs.draftItemNote.value = '';
  fieldRefs.draftItemName?.focus();
}

function addDraftItem() {
  const name = fieldRefs.draftItemName?.value.trim() || '';
  const amount = Number(fieldRefs.draftItemAmount?.value) || 0;
  const group = isDiscountEnabled() ? fieldRefs.draftItemGroup?.value || 'NONE' : 'NONE';
  const note = fieldRefs.draftItemNote?.value.trim() || '';

  if (!name) {
    fieldRefs.draftItemName?.focus();
    return;
  }

  items.push({ name, amount, group, note });
  clearDraftFields();
  updateView();
}

function buildShareText() {
  const state = getCurrentState();
  const lines = [
    t('shareTextName', { value: state.name }),
    t('shareTextNumber', { value: state.number }),
    t('shareTextDate', { value: state.date }),
    '',
  ];

  if (state.items.length) {
    state.items.forEach((item) => {
      lines.push(`- ${item.name} ${getItemLineDisplay(item)}`);
    });
  } else {
    lines.push(t('itemEmpty'));
  }

  lines.push('');
  if (state.totals.discountEnabled) {
    state.totals.zoneSummaries.forEach((zone) => {
      lines.push(t('shareTextZoneSubtotal', { label: zone.label, value: formatCurrency(zone.total) }));
    });
    lines.push(t('shareTextNoDiscountSubtotal', { value: formatCurrency(state.totals.noDiscountSubtotal) }));
  }
  lines.push(t('shareTextGrandTotal', { value: formatCurrency(state.totals.grandTotal) }));
  if (state.totals.splitEnabled) lines.push(t('shareTextPerPerson', { value: formatCurrency(state.totals.perPersonAmount) }));
  lines.push('');
  lines.push(t('shareTextNote', { value: state.note }));

  return lines.join('\n');
}

async function copyText() {
  const text = buildShareText();
  await navigator.clipboard.writeText(text);
  showFeedback(t('feedbackCopied'));
  return text;
}

async function waitForNextFrame() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

async function createShareImageBlob() {
  if (!shareRefs.card) throw new Error('share-card missing');
  if (typeof html2canvas !== 'function') throw new Error('html2canvas missing');

  renderShareCard();
  await waitForNextFrame();
  await waitForNextFrame();

  const canvas = await html2canvas(shareRefs.card, {
    backgroundColor: '#ffffff',
    scale: Math.max(window.devicePixelRatio || 2, 2),
    useCORS: true,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('blob failed'));
    }, 'image/png');
  });
}

function revokePreviewImageUrl() {
  if (currentPreviewImageUrl) {
    URL.revokeObjectURL(currentPreviewImageUrl);
    currentPreviewImageUrl = '';
  }
}

function openImageModal(blob) {
  if (!imageModal || !previewImage) return;
  revokePreviewImageUrl();
  currentPreviewImageBlob = blob;
  currentPreviewImageUrl = URL.createObjectURL(blob);
  previewImage.src = currentPreviewImageUrl;
  imageModal.classList.remove('hidden');
  imageModal.setAttribute('aria-hidden', 'false');
}

function closeImageModal() {
  if (!imageModal) return;
  imageModal.classList.add('hidden');
  imageModal.setAttribute('aria-hidden', 'true');
  if (previewImage) previewImage.removeAttribute('src');
  revokePreviewImageUrl();
}

async function showImagePreview() {
  const blob = await createShareImageBlob();
  openImageModal(blob);
  showFeedback(t('feedbackImageReady'));
}

async function triggerImageDownload(blob = currentPreviewImageBlob) {
  const targetBlob = blob || (await createShareImageBlob());
  const url = URL.createObjectURL(targetBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `billing-summary-${fieldRefs.invoiceDate?.value || 'export'}.png`;
  link.click();
  URL.revokeObjectURL(url);
  showFeedback(t('feedbackImageDownloaded'));
}

async function shareContent(preferredBlob = null) {
  const text = buildShareText();

  if (!navigator.share) {
    await navigator.clipboard.writeText(text);
    showFeedback(t('feedbackShareUnsupported'));
    return;
  }

  try {
    const blob = preferredBlob || (await createShareImageBlob());
    const file = new File([blob], 'billing-summary.png', { type: 'image/png' });
    const payload = { title: t('shareTitle'), text };

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      payload.files = [file];
    }

    await navigator.share(payload);
    showFeedback(t('feedbackShareOpened'));
  } catch (error) {
    if (error?.name === 'AbortError') return;
    console.error('share failed', error);
    await navigator.clipboard.writeText(text);
    showFeedback(t('feedbackShareFailed'));
  }
}

if (langButtons.length) {
  langButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });
}

if (addItemBtn) {
  addItemBtn.addEventListener('click', addDraftItem);
}

if (addZoneBtn) {
  addZoneBtn.addEventListener('click', () => {
    if (!isDiscountEnabled() || discountZones.length >= MAX_ZONES) return;
    discountZones.push(createDefaultZone(discountZones.length + 1));
    updateView();
  });
}

if (discountZonesContainer) {
  discountZonesContainer.addEventListener('input', (event) => {
    const zoneId = event.target.dataset.zoneId;
    if (!zoneId) return;

    const zone = discountZones.find((item) => item.id === zoneId);
    if (!zone) return;

    if (event.target.classList.contains('zone-name-input')) {
      zone.name = event.target.value;
    }

    if (event.target.classList.contains('zone-rate-input')) {
      zone.rate = event.target.value;
    }

    if (event.target.classList.contains('zone-rate-input') || event.target.classList.contains('zone-name-input')) {
      updateView({ renderDiscountZones: false });
    }
  });

  discountZonesContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.delete-zone-btn');
    if (!button) return;
    if (discountZones.length <= 1) return;

    const zoneId = button.dataset.zoneId;
    discountZones = discountZones.filter((zone) => zone.id !== zoneId);
    updateView();
  });
}

if (copyTextBtn) {
  copyTextBtn.addEventListener('click', async () => {
    try {
      await copyText();
    } catch (error) {
      console.error('copy failed', error);
      showFeedback(t('feedbackCopyFailed'));
    }
  });
}

if (downloadImageBtn) {
  downloadImageBtn.addEventListener('click', async () => {
    try {
      await showImagePreview();
    } catch (error) {
      console.error('image preview failed', error);
      showFeedback(t('feedbackImageFailed'));
    }
  });
}

if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    try {
      await shareContent();
    } catch (error) {
      console.error('share action failed', error);
      showFeedback(t('feedbackShareButtonFailed'));
    }
  });
}

if (modalDownloadBtn) {
  modalDownloadBtn.addEventListener('click', async () => {
    try {
      await triggerImageDownload();
    } catch (error) {
      console.error('download failed', error);
      showFeedback(t('feedbackImageFailed'));
    }
  });
}

if (modalShareBtn) {
  modalShareBtn.addEventListener('click', async () => {
    try {
      await shareContent(currentPreviewImageBlob);
    } catch (error) {
      console.error('modal share failed', error);
      showFeedback(t('feedbackShareButtonFailed'));
    }
  });
}

if (closeImageModalBtn) {
  closeImageModalBtn.addEventListener('click', closeImageModal);
}

if (imageModalBackdrop) {
  imageModalBackdrop.addEventListener('click', closeImageModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageModal && !imageModal.classList.contains('hidden')) {
    closeImageModal();
  }
});

if (form) {
  form.addEventListener('input', (event) => {
    const isDiscountZoneInput = event.target.closest('#discount-zones') &&
      (event.target.classList.contains('zone-name-input') || event.target.classList.contains('zone-rate-input'));

    updateView({ renderDiscountZones: !isDiscountZoneInput });
  });

  form.addEventListener('change', (event) => {
    const isDiscountZoneInput = event.target.closest('#discount-zones') &&
      (event.target.classList.contains('zone-name-input') || event.target.classList.contains('zone-rate-input'));

    updateView({ renderDiscountZones: !isDiscountZoneInput });
  });
}

if (previewItems) {
  previewItems.addEventListener('click', (event) => {
    const button = event.target.closest('.delete-item-btn');
    if (!button) return;

    const index = Number(button.dataset.index);
    if (Number.isNaN(index)) return;

    items.splice(index, 1);
    updateView();
  });
}

if (fieldRefs.draftItemNote) {
  fieldRefs.draftItemNote.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      addDraftItem();
    }
  });
}

if (fieldRefs.invoiceDate) {
  fieldRefs.invoiceDate.value = new Date().toISOString().split('T')[0];
}

setLanguage(currentLanguage, false);
