const form = document.getElementById('billing-form');
const addItemBtn = document.getElementById('add-item-btn');
const splitCountField = document.getElementById('splitCountField');
const previewItems = document.getElementById('preview-items');
const totalsSection = document.getElementById('totals-section');
const copyTextBtn = document.getElementById('copy-text-btn');
const downloadImageBtn = document.getElementById('download-image-btn');
const shareBtn = document.getElementById('share-btn');
const actionFeedback = document.getElementById('action-feedback');

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
  invoiceNumber: document.getElementById('invoiceNumber'),
  invoiceDate: document.getElementById('invoiceDate'),
  invoiceNote: document.getElementById('invoiceNote'),
  zone1Name: document.getElementById('zone1Name'),
  zone1Rate: document.getElementById('zone1Rate'),
  zone2Name: document.getElementById('zone2Name'),
  zone2Rate: document.getElementById('zone2Rate'),
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
  more: document.getElementById('share-more'),
  totals: document.getElementById('share-totals'),
  note: document.getElementById('share-note'),
};

const currencyFormatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'TWD',
  maximumFractionDigits: 0,
});

const items = [];
let feedbackTimer = null;
let currentPreviewImageUrl = '';
let currentPreviewImageBlob = null;

function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function formatNumber(value) {
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
  if (value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return null;
  return num;
}

function formatDate(value) {
  return value || '—';
}

function showFeedback(message) {
  if (!actionFeedback) return;
  actionFeedback.textContent = message;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    actionFeedback.textContent = '';
  }, 2200);
}

function getZones() {
  return [
    {
      key: 'ZONE1',
      name: fieldRefs.zone1Name?.value.trim() || '',
      rate: parseRate(fieldRefs.zone1Rate?.value || ''),
      filled: Boolean(fieldRefs.zone1Name?.value.trim()),
    },
    {
      key: 'ZONE2',
      name: fieldRefs.zone2Name?.value.trim() || '',
      rate: parseRate(fieldRefs.zone2Rate?.value || ''),
      filled: Boolean(fieldRefs.zone2Name?.value.trim()),
    },
  ];
}

function getZoneMap() {
  return Object.fromEntries(getZones().map((zone) => [zone.key, zone]));
}

function refreshGroupOptions() {
  if (!fieldRefs.draftItemGroup) return;

  const currentValue = fieldRefs.draftItemGroup.value;
  const zones = getZones().filter((zone) => zone.filled);

  fieldRefs.draftItemGroup.innerHTML = [
    ...zones.map((zone) => `<option value="${zone.key}">${zone.name}</option>`),
    '<option value="NONE">無</option>',
  ].join('');

  const nextValue = zones.some((zone) => zone.key === currentValue) || currentValue === 'NONE' ? currentValue : 'NONE';
  fieldRefs.draftItemGroup.value = nextValue;
}

function getItemPricing(item, zoneMap = getZoneMap()) {
  const originalAmount = Number(item.amount) || 0;
  const zone = zoneMap[item.group];
  const hasDiscount = item.group !== 'NONE' && zone?.filled && zone?.rate !== null;
  const zoneName = hasDiscount ? zone.name : '無';
  const rate = hasDiscount ? zone.rate : 1;
  const discountedAmount = originalAmount * rate;

  return {
    name: item.name,
    originalAmount,
    zoneName,
    rate,
    discountedAmount,
    note: item.note || '',
    hasDiscount,
    group: item.group,
  };
}

function getCurrentItemsDetailed() {
  const zoneMap = getZoneMap();
  return items.map((item) => getItemPricing(item, zoneMap));
}

function calculateTotals(detailedItems = getCurrentItemsDetailed()) {
  const zones = getZones();

  const zoneSummaries = zones.map((zone) => {
    const zoneItems = detailedItems.filter((item) => item.group !== 'NONE' && item.zoneName === zone.name);
    const subtotal = zoneItems.reduce((sum, item) => sum + item.originalAmount, 0);
    const discountedTotal = zoneItems.reduce((sum, item) => sum + item.discountedAmount, 0);

    return {
      ...zone,
      subtotal,
      discountedTotal,
      effectiveRate: zone.rate ?? 1,
    };
  });

  const grandTotal = detailedItems.reduce((sum, item) => sum + item.discountedAmount, 0);
  const splitEnabled = Boolean(fieldRefs.splitEnabled?.checked);
  const splitCount = clampSplitCount(fieldRefs.splitCount?.value || 1);
  const perPersonAmount = splitEnabled ? grandTotal / splitCount : 0;

  return {
    zoneSummaries,
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
    name: fieldRefs.clientName?.value.trim() || '未填寫',
    number: fieldRefs.invoiceNumber?.value.trim() || '—',
    date: formatDate(fieldRefs.invoiceDate?.value || ''),
    note: fieldRefs.invoiceNote?.value.trim() || '尚無備註',
    items: detailedItems,
    totals,
  };
}

function getAmountDisplay(item) {
  if (!item.hasDiscount) return formatNumber(item.originalAmount);
  return `${formatNumber(item.originalAmount)} × ${formatNumber(item.rate)} = ${formatNumber(item.discountedAmount)}`;
}

function renderPreviewItems() {
  if (!previewItems || !previewRefs.itemCount) return;

  const detailedItems = getCurrentItemsDetailed();
  previewRefs.itemCount.textContent = `${detailedItems.length} 筆`;

  if (!detailedItems.length) {
    previewItems.className = 'preview-items empty';
    previewItems.textContent = '尚未新增明細';
    return;
  }

  previewItems.className = 'preview-items';
  previewItems.innerHTML = detailedItems
    .map(
      (item, index) => `
        <div class="preview-item">
          <div class="preview-item-top">
            <span class="preview-item-name">${item.name}</span>
            <button type="button" class="ghost-btn delete-item-btn" data-index="${index}">刪除</button>
          </div>
          <div class="preview-item-meta preview-item-amount-row">
            <span>${getAmountDisplay(item)}</span>
          </div>
          ${item.hasDiscount ? `<div class="preview-item-meta"><span class="preview-item-group">${item.zoneName}</span></div>` : ''}
          <p class="preview-item-note">${item.note || '—'}</p>
        </div>
      `
    )
    .join('');
}

function renderTotals(totals) {
  if (!totalsSection) return;

  const rows = [];
  totals.zoneSummaries.forEach((zone) => {
    if (!zone.filled) return;
    rows.push(`
      <div class="total-row">
        <span>${zone.name} 小計</span>
        <strong>${formatCurrency(zone.subtotal)}</strong>
      </div>
    `);
    rows.push(`
      <div class="total-row muted-row">
        <span>${zone.name} 折後金額</span>
        <strong>${formatCurrency(zone.discountedTotal)}</strong>
      </div>
    `);
  });

  rows.push(`
    <div class="total-row grand-total-row">
      <span>全部總金額</span>
      <strong>${formatCurrency(totals.grandTotal)}</strong>
    </div>
  `);

  if (totals.splitEnabled) {
    rows.push(`
      <div class="total-row split-row">
        <span>每人應付金額</span>
        <strong>${formatCurrency(totals.perPersonAmount)}</strong>
      </div>
    `);
  }

  totalsSection.innerHTML = rows.join('');
}

function renderMeta() {
  if (previewRefs.client) previewRefs.client.textContent = fieldRefs.clientName?.value.trim() || '未填寫';
  if (previewRefs.number) previewRefs.number.textContent = fieldRefs.invoiceNumber?.value.trim() || '—';
  if (previewRefs.date) previewRefs.date.textContent = formatDate(fieldRefs.invoiceDate?.value || '');
  if (previewRefs.note) previewRefs.note.textContent = fieldRefs.invoiceNote?.value.trim() || '尚無備註';
}

function updateSplitUI() {
  const enabled = Boolean(fieldRefs.splitEnabled?.checked);
  if (splitCountField) splitCountField.classList.toggle('hidden', !enabled);
  if (enabled && fieldRefs.splitCount) {
    fieldRefs.splitCount.value = clampSplitCount(fieldRefs.splitCount.value);
  }
}

function renderShareCard() {
  if (!shareRefs.card) return;

  const state = getCurrentState();
  const visibleItems = state.items.slice(0, 5);
  const hiddenCount = Math.max(0, state.items.length - visibleItems.length);

  if (shareRefs.client) shareRefs.client.textContent = state.name;
  if (shareRefs.date) shareRefs.date.textContent = state.date;
  if (shareRefs.itemCount) shareRefs.itemCount.textContent = `${state.items.length} 筆`;
  if (shareRefs.note) shareRefs.note.textContent = state.note;

  if (shareRefs.items) {
    shareRefs.items.innerHTML = visibleItems.length
      ? visibleItems
          .map(
            (item) => `
              <div class="share-item">
                <div class="share-item-row">
                  <span class="share-item-name">${item.name}</span>
                </div>
                <div class="share-item-meta">
                  <span>${getAmountDisplay(item)}</span>
                </div>
                ${item.hasDiscount ? `<div class="share-item-meta"><span class="share-item-group">${item.zoneName}</span></div>` : ''}
                <p class="share-item-note">${item.note || '—'}</p>
              </div>
            `
          )
          .join('')
      : '<div class="empty">尚未新增明細</div>';
  }

  if (shareRefs.more) {
    shareRefs.more.classList.toggle('hidden', hiddenCount === 0);
    shareRefs.more.textContent = hiddenCount > 0 ? `其餘 ${hiddenCount} 筆未顯示` : '';
  }

  if (shareRefs.totals) {
    const totalRows = [];
    state.totals.zoneSummaries.forEach((zone) => {
      if (!zone.filled) return;
      totalRows.push(`
        <div class="total-row">
          <span>${zone.name} 小計</span>
          <strong>${formatCurrency(zone.subtotal)}</strong>
        </div>
      `);
      totalRows.push(`
        <div class="total-row muted-row">
          <span>${zone.name} 折後金額</span>
          <strong>${formatCurrency(zone.discountedTotal)}</strong>
        </div>
      `);
    });

    totalRows.push(`
      <div class="total-row grand-total-row">
        <span>總金額</span>
        <strong>${formatCurrency(state.totals.grandTotal)}</strong>
      </div>
    `);

    if (state.totals.splitEnabled) {
      totalRows.push(`
        <div class="total-row split-row">
          <span>每人應付</span>
          <strong>${formatCurrency(state.totals.perPersonAmount)}</strong>
        </div>
      `);
    }

    shareRefs.totals.innerHTML = totalRows.join('');
  }
}

function updateView() {
  if (fieldRefs.splitCount) {
    fieldRefs.splitCount.value = clampSplitCount(fieldRefs.splitCount.value);
  }
  updateSplitUI();
  refreshGroupOptions();
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
  const group = fieldRefs.draftItemGroup?.value || 'NONE';
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
  const lines = [`名稱：${state.name}`, `日期：${state.date}`, ''];

  if (state.items.length) {
    state.items.forEach((item) => {
      const groupText = item.hasDiscount ? `（${item.zoneName}）` : '';
      lines.push(`${item.name} ${getAmountDisplay(item)}${groupText}`);
      if (item.note) lines.push(`備註：${item.note}`);
    });
  } else {
    lines.push('尚未新增明細');
  }

  lines.push('');
  lines.push(`總筆數：${state.items.length}`);
  lines.push(`總金額：${formatCurrency(state.totals.grandTotal)}`);
  if (state.totals.splitEnabled) lines.push(`每人應付：${formatCurrency(state.totals.perPersonAmount)}`);
  lines.push('');
  lines.push(`備註：${state.note}`);

  return lines.join('\n');
}

async function copyText() {
  const text = buildShareText();
  await navigator.clipboard.writeText(text);
  showFeedback('已複製');
  return text;
}

async function waitForNextFrame() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

async function createShareImageBlob() {
  if (!shareRefs.card) throw new Error('share-card 不存在');
  if (typeof html2canvas !== 'function') throw new Error('html2canvas 未載入');

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
      else reject(new Error('無法產生圖片'));
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
  showFeedback('圖片預覽已產生');
}

async function triggerImageDownload(blob = currentPreviewImageBlob) {
  const targetBlob = blob || (await createShareImageBlob());
  const url = URL.createObjectURL(targetBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `billing-summary-${fieldRefs.invoiceDate?.value || 'export'}.png`;
  link.click();
  URL.revokeObjectURL(url);
  showFeedback('圖片已下載');
}

async function shareContent(preferredBlob = null) {
  const text = buildShareText();

  if (!navigator.share) {
    await navigator.clipboard.writeText(text);
    showFeedback('此瀏覽器不支援分享，已自動複製文字');
    return;
  }

  try {
    const blob = preferredBlob || (await createShareImageBlob());
    const file = new File([blob], 'billing-summary.png', { type: 'image/png' });
    const payload = { title: '請款明細', text };

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      payload.files = [file];
    }

    await navigator.share(payload);
    showFeedback('已開啟分享');
  } catch (error) {
    if (error?.name === 'AbortError') return;
    console.error('分享功能執行失敗', error);
    await navigator.clipboard.writeText(text);
    showFeedback('分享失敗，已自動複製文字');
  }
}

if (addItemBtn) {
  addItemBtn.addEventListener('click', addDraftItem);
}

if (copyTextBtn) {
  copyTextBtn.addEventListener('click', async () => {
    try {
      await copyText();
    } catch (error) {
      console.error('複製文字失敗', error);
      showFeedback('複製失敗，請檢查瀏覽器權限');
    }
  });
}

if (downloadImageBtn) {
  downloadImageBtn.addEventListener('click', async () => {
    try {
      await showImagePreview();
    } catch (error) {
      console.error('圖片預覽產生失敗', error);
      showFeedback('圖片預覽產生失敗，請查看瀏覽器 console');
    }
  });
}

if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    try {
      await shareContent();
    } catch (error) {
      console.error('分享按鈕執行失敗', error);
      showFeedback('分享功能執行失敗');
    }
  });
}

if (modalDownloadBtn) {
  modalDownloadBtn.addEventListener('click', async () => {
    try {
      await triggerImageDownload();
    } catch (error) {
      console.error('下載圖片失敗', error);
      showFeedback('圖片預覽產生失敗，請查看瀏覽器 console');
    }
  });
}

if (modalShareBtn) {
  modalShareBtn.addEventListener('click', async () => {
    try {
      await shareContent(currentPreviewImageBlob);
    } catch (error) {
      console.error('Modal 分享功能執行失敗', error);
      showFeedback('分享功能執行失敗');
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
  form.addEventListener('input', updateView);
  form.addEventListener('change', updateView);
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
updateView();
