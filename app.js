const STORAGE_KEY = 'northstar-finance-dashboard-v2';
const THEME_KEY = 'northstar-finance-dashboard-theme';
const MONTHLY_BUDGET = 2600;

const seededTransactions = [
  { id: 'tx-001', title: 'Salary Deposit', date: '2026-01-28', category: 'Salary', type: 'income', amount: 5200 },
  { id: 'tx-002', title: 'Freelance Sprint', date: '2026-02-03', category: 'Consulting', type: 'income', amount: 950 },
  { id: 'tx-003', title: 'Apartment Rent', date: '2026-02-04', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 'tx-004', title: 'Market Groceries', date: '2026-02-07', category: 'Groceries', type: 'expense', amount: 212.45 },
  { id: 'tx-005', title: 'Metro Pass', date: '2026-02-10', category: 'Transport', type: 'expense', amount: 62.2 },
  { id: 'tx-006', title: 'Design Subscription', date: '2026-02-11', category: 'Software', type: 'expense', amount: 29 },
  { id: 'tx-007', title: 'Quarterly Bonus', date: '2026-02-19', category: 'Bonus', type: 'income', amount: 780 },
  { id: 'tx-008', title: 'Team Dinner', date: '2026-02-22', category: 'Dining', type: 'expense', amount: 88.9 },
  { id: 'tx-009', title: 'Electricity Bill', date: '2026-03-01', category: 'Utilities', type: 'expense', amount: 96.4 },
  { id: 'tx-010', title: 'Stock Dividend', date: '2026-03-03', category: 'Investments', type: 'income', amount: 210 },
  { id: 'tx-011', title: 'Health Insurance', date: '2026-03-05', category: 'Insurance', type: 'expense', amount: 155 },
  { id: 'tx-012', title: 'Client Retainer', date: '2026-03-09', category: 'Consulting', type: 'income', amount: 1300 },
  { id: 'tx-013', title: 'Weekend Escape', date: '2026-03-14', category: 'Travel', type: 'expense', amount: 360 },
  { id: 'tx-014', title: 'Coffee Meetings', date: '2026-03-18', category: 'Dining', type: 'expense', amount: 47.5 },
  { id: 'tx-015', title: 'Gym Renewal', date: '2026-03-21', category: 'Health', type: 'expense', amount: 72 },
  { id: 'tx-016', title: 'Sold Old Tablet', date: '2026-03-25', category: 'Other Income', type: 'income', amount: 180 },
  { id: 'tx-017', title: 'New Monitor', date: '2026-03-26', category: 'Equipment', type: 'expense', amount: 260 },
  { id: 'tx-018', title: 'Movie Night', date: '2026-03-28', category: 'Entertainment', type: 'expense', amount: 34.5 },
  { id: 'tx-019', title: 'Salary Deposit', date: '2026-04-01', category: 'Salary', type: 'income', amount: 5200 },
  { id: 'tx-020', title: 'Apartment Rent', date: '2026-04-02', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 'tx-021', title: 'Cloud Storage', date: '2026-04-02', category: 'Software', type: 'expense', amount: 19 }
];

const state = {
  role: 'viewer',
  theme: loadTheme(),
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sort: 'date-desc',
    range: 'all'
  },
  transactions: loadTransactions(),
  editingId: null,
  toastTimer: null
};

const elements = {
  body: document.body,
  roleSelect: document.querySelector('#roleSelect'),
  roleHeadline: document.querySelector('#roleHeadline'),
  roleDescription: document.querySelector('#roleDescription'),
  themeToggleBtn: document.querySelector('#themeToggleBtn'),
  exportJsonBtn: document.querySelector('#exportJsonBtn'),
  exportCsvBtn: document.querySelector('#exportCsvBtn'),
  heroMetrics: document.querySelector('#heroMetrics'),
  summaryCards: document.querySelector('#summaryCards'),
  focusGrid: document.querySelector('#focusGrid'),
  rangeLabel: document.querySelector('#rangeLabel'),
  trendChart: document.querySelector('#trendChart'),
  categoryChart: document.querySelector('#categoryChart'),
  insightsGrid: document.querySelector('#insightsGrid'),
  searchInput: document.querySelector('#searchInput'),
  typeFilter: document.querySelector('#typeFilter'),
  categoryFilter: document.querySelector('#categoryFilter'),
  sortSelect: document.querySelector('#sortSelect'),
  rangeFilters: document.querySelector('#rangeFilters'),
  tableMeta: document.querySelector('#tableMeta'),
  transactionsBody: document.querySelector('#transactionsBody'),
  emptyState: document.querySelector('#emptyState'),
  addTransactionBtn: document.querySelector('#addTransactionBtn'),
  resetFiltersBtn: document.querySelector('#resetFiltersBtn'),
  restoreSampleBtn: document.querySelector('#restoreSampleBtn'),
  emptyResetBtn: document.querySelector('#emptyResetBtn'),
  emptyRestoreBtn: document.querySelector('#emptyRestoreBtn'),
  dialog: document.querySelector('#transactionDialog'),
  dialogTitle: document.querySelector('#dialogTitle'),
  form: document.querySelector('#transactionForm'),
  transactionId: document.querySelector('#transactionId'),
  titleInput: document.querySelector('#titleInput'),
  dateInput: document.querySelector('#dateInput'),
  categoryInput: document.querySelector('#categoryInput'),
  transactionTypeInput: document.querySelector('#transactionTypeInput'),
  amountInput: document.querySelector('#amountInput'),
  closeDialogBtn: document.querySelector('#closeDialogBtn'),
  cancelDialogBtn: document.querySelector('#cancelDialogBtn'),
  toast: document.querySelector('#toast'),
  summaryTemplate: document.querySelector('#summaryCardTemplate')
};

const categoryColors = ['#0f766e', '#c65d3a', '#d09b2f', '#234c84', '#7c5e10', '#2f8f83'];

bindEvents();
render();

function bindEvents() {
  elements.roleSelect.addEventListener('change', (event) => {
    state.role = event.target.value;
    render();
    showToast(`Switched to ${capitalize(state.role)} mode.`);
  });

  elements.themeToggleBtn.addEventListener('click', toggleTheme);
  elements.exportJsonBtn.addEventListener('click', exportTransactionsAsJson);
  elements.exportCsvBtn.addEventListener('click', exportTransactionsAsCsv);

  elements.searchInput.addEventListener('input', (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.typeFilter.addEventListener('change', (event) => {
    state.filters.type = event.target.value;
    render();
  });

  elements.categoryFilter.addEventListener('change', (event) => {
    state.filters.category = event.target.value;
    render();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.filters.sort = event.target.value;
    render();
  });

  elements.rangeFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-range]');
    if (!button) return;
    state.filters.range = button.dataset.range;
    render();
  });

  elements.resetFiltersBtn.addEventListener('click', () => resetFilters());
  elements.emptyResetBtn.addEventListener('click', () => resetFilters());
  elements.restoreSampleBtn.addEventListener('click', restoreSampleData);
  elements.emptyRestoreBtn.addEventListener('click', restoreSampleData);

  elements.addTransactionBtn.addEventListener('click', () => {
    if (state.role !== 'admin') return;
    openDialog();
  });

  elements.transactionsBody.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;

    const targetId = actionButton.dataset.id;
    if (actionButton.dataset.action === 'edit' && state.role === 'admin') {
      const tx = state.transactions.find((item) => item.id === targetId);
      if (tx) openDialog(tx);
    }

    if (actionButton.dataset.action === 'delete' && state.role === 'admin') {
      deleteTransaction(targetId);
    }
  });

  elements.closeDialogBtn.addEventListener('click', closeDialog);
  elements.cancelDialogBtn.addEventListener('click', closeDialog);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveTransaction();
  });

  elements.dialog.addEventListener('click', (event) => {
    const bounds = elements.dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) closeDialog();
  });
}

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneTransactions(seededTransactions);

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : cloneTransactions(seededTransactions);
  } catch {
    return cloneTransactions(seededTransactions);
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function persistTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
}

function persistTheme() {
  localStorage.setItem(THEME_KEY, state.theme);
}

function cloneTransactions(transactions) {
  return transactions.map((transaction) => ({ ...transaction }));
}

function render() {
  applyTheme();
  syncControls();
  renderHeroMetrics();
  renderSummary();
  renderFocusGrid();
  renderCategoryOptions();
  renderTransactionsSection();
  renderDerivedPanels();
}

function applyTheme() {
  elements.body.dataset.theme = state.theme;
  elements.themeToggleBtn.textContent = state.theme === 'dark' ? 'Enable light mode' : 'Enable dark mode';
}

function syncControls() {
  elements.roleSelect.value = state.role;
  elements.typeFilter.value = state.filters.type;
  elements.sortSelect.value = state.filters.sort;
  elements.searchInput.value = state.filters.search;

  const adminEnabled = state.role === 'admin';
  elements.addTransactionBtn.disabled = !adminEnabled;
  elements.restoreSampleBtn.disabled = !adminEnabled;
  elements.emptyRestoreBtn.disabled = !adminEnabled;
  elements.addTransactionBtn.textContent = adminEnabled ? 'Add transaction' : 'Admin only';

  elements.roleHeadline.textContent = adminEnabled
    ? 'Admin mode unlocks add, edit, and delete actions.'
    : 'Viewer mode keeps the dashboard read only.';
  elements.roleDescription.textContent = adminEnabled
    ? 'Use this mode to demonstrate transaction management and how the UI adapts to permissions.'
    : 'This mirrors a safe review role where the user can analyze data without changing it.';

  elements.rangeFilters.querySelectorAll('[data-range]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.range === state.filters.range);
  });
}

function getFilteredTransactions(options = {}) {
  const { ignoreCategory = false, sort = true } = options;
  const referenceDate = startOfDay(getReferenceDate());
  const last30Start = new Date(referenceDate);
  last30Start.setDate(last30Start.getDate() - 29);

  const filtered = state.transactions.filter((tx) => {
    const transactionDate = parseDate(tx.date);
    const matchesSearch = !state.filters.search || `${tx.title} ${tx.category}`.toLowerCase().includes(state.filters.search);
    const matchesType = state.filters.type === 'all' || tx.type === state.filters.type;
    const matchesCategory = ignoreCategory || state.filters.category === 'all' || tx.category === state.filters.category;

    let matchesRange = true;
    if (state.filters.range === '30d') {
      matchesRange = transactionDate >= last30Start && transactionDate <= referenceDate;
    }
    if (state.filters.range === 'month') {
      matchesRange = transactionDate.getMonth() === referenceDate.getMonth() && transactionDate.getFullYear() === referenceDate.getFullYear();
    }

    return matchesSearch && matchesType && matchesCategory && matchesRange;
  });

  if (!sort) return filtered;

  return filtered.sort((left, right) => {
    switch (state.filters.sort) {
      case 'date-asc':
        return parseDate(left.date) - parseDate(right.date);
      case 'amount-desc':
        return right.amount - left.amount;
      case 'amount-asc':
        return left.amount - right.amount;
      case 'date-desc':
      default:
        return parseDate(right.date) - parseDate(left.date);
    }
  });
}

function renderHeroMetrics() {
  const visible = getFilteredTransactions();
  const income = totalFor(visible, 'income');
  const expenses = totalFor(visible, 'expense');
  const netFlow = income - expenses;
  const savingsRate = income > 0 ? (netFlow / income) * 100 : 0;
  const dominantCategory = aggregateCategories(visible.filter((tx) => tx.type === 'expense'), 1)[0];

  const cards = [
    {
      label: 'Visible net flow',
      value: formatSignedCurrency(netFlow),
      note: `${visible.length} transactions in the current view`
    },
    {
      label: 'Savings rate',
      value: `${Number.isFinite(savingsRate) ? savingsRate.toFixed(1) : '0.0'}%`,
      note: income > 0 ? 'Income retained after visible expenses' : 'No income in the active selection'
    },
    {
      label: 'Top spend right now',
      value: dominantCategory ? dominantCategory.category : 'No spend data',
      note: dominantCategory ? `${formatCurrency(dominantCategory.amount)} across the active filters` : 'Switch filters or add expenses to populate this card'
    }
  ];

  elements.heroMetrics.innerHTML = cards.map((card) => `
    <article class="hero-metric">
      <p class="eyebrow">${card.label}</p>
      <strong>${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `).join('');
}

function renderSummary() {
  const visible = getFilteredTransactions();
  const income = totalFor(visible, 'income');
  const expenses = totalFor(visible, 'expense');
  const netFlow = income - expenses;
  const savingsRate = income > 0 ? (netFlow / income) * 100 : 0;
  const topIncomeSource = aggregateCategories(visible.filter((tx) => tx.type === 'income'), 1)[0];
  const topExpenseCategory = aggregateCategories(visible.filter((tx) => tx.type === 'expense'), 1)[0];
  const monthlySeries = buildMonthlySeries(visible);
  const monthlyComparison = describeMonthlyComparison(monthlySeries);

  const cards = [
    {
      label: 'Net balance',
      value: formatSignedCurrency(netFlow),
      footnote: `${visible.length} records in the active selection`
    },
    {
      label: 'Income',
      value: formatCurrency(income),
      footnote: topIncomeSource ? `${topIncomeSource.category} is the strongest inflow source` : 'No income records in view'
    },
    {
      label: 'Expenses',
      value: formatCurrency(expenses),
      footnote: topExpenseCategory ? `${topExpenseCategory.category} leads current spending` : 'No expense records in view'
    },
    {
      label: 'Savings rate',
      value: `${Number.isFinite(savingsRate) ? savingsRate.toFixed(1) : '0.0'}%`,
      footnote: monthlyComparison
    }
  ];

  elements.summaryCards.innerHTML = '';
  cards.forEach((card) => {
    const node = elements.summaryTemplate.content.cloneNode(true);
    node.querySelector('.summary-label').textContent = card.label;
    node.querySelector('.summary-value').textContent = card.value;
    node.querySelector('.summary-footnote').textContent = card.footnote;
    elements.summaryCards.appendChild(node);
  });

  if (!visible.length) {
    elements.rangeLabel.textContent = 'No matching records for the current filters';
    return;
  }

  const sortedDates = [...visible].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  elements.rangeLabel.textContent = `${formatDate(sortedDates[0].date)} - ${formatDate(sortedDates.at(-1).date)}`;
}

function renderFocusGrid() {
  const visible = getFilteredTransactions();
  const currentMonthTransactions = getCurrentMonthTransactions(visible);
  const currentMonthExpense = totalFor(currentMonthTransactions, 'expense');
  const budgetRatio = MONTHLY_BUDGET ? Math.min((currentMonthExpense / MONTHLY_BUDGET) * 100, 100) : 0;
  const budgetCopy = currentMonthExpense <= MONTHLY_BUDGET
    ? `${formatCurrency(MONTHLY_BUDGET - currentMonthExpense)} left in the current target.`
    : `${formatCurrency(currentMonthExpense - MONTHLY_BUDGET)} above the target.`;
  const largestExpense = [...visible].filter((tx) => tx.type === 'expense').sort((a, b) => b.amount - a.amount)[0];
  const strongestIncome = [...visible].filter((tx) => tx.type === 'income').sort((a, b) => b.amount - a.amount)[0];

  const cards = [
    `
      <article class="focus-card">
        <header>
          <div>
            <p class="eyebrow">Budget pulse</p>
            <h3>${formatCurrency(currentMonthExpense)} spent</h3>
          </div>
          <span class="type-pill ${currentMonthExpense > MONTHLY_BUDGET ? 'expense' : 'income'}">${Math.min(budgetRatio, 999).toFixed(0)}%</span>
        </header>
        <div class="progress-track">
          <div class="progress-fill" style="width:${budgetRatio.toFixed(1)}%"></div>
        </div>
        <p>${budgetCopy}</p>
        <div class="focus-list">
          <div class="focus-item">
            <span>Target</span>
            <strong>${formatCurrency(MONTHLY_BUDGET)}</strong>
          </div>
          <div class="focus-item">
            <span>This month</span>
            <strong>${formatCurrency(currentMonthExpense)}</strong>
          </div>
        </div>
      </article>
    `,
    `
      <article class="focus-card">
        <p class="eyebrow">Largest expense</p>
        <h3>${largestExpense ? largestExpense.title : 'No expense visible'}</h3>
        <strong class="focus-value">${largestExpense ? formatCurrency(largestExpense.amount) : '--'}</strong>
        <p>${largestExpense ? `${largestExpense.category} on ${formatDate(largestExpense.date)}` : 'Change filters or add expenses to populate this card.'}</p>
        <div class="focus-list">
          <div class="focus-item">
            <span>Status</span>
            <strong>${largestExpense ? 'Needs attention' : 'Clear'}</strong>
          </div>
        </div>
      </article>
    `,
    `
      <article class="focus-card">
        <p class="eyebrow">Income anchor</p>
        <h3>${strongestIncome ? strongestIncome.title : 'No income visible'}</h3>
        <strong class="focus-value">${strongestIncome ? formatCurrency(strongestIncome.amount) : '--'}</strong>
        <p>${strongestIncome ? `${strongestIncome.category} on ${formatDate(strongestIncome.date)}` : 'Visible filters currently remove income records.'}</p>
        <div class="focus-list">
          <div class="focus-item">
            <span>Role demo</span>
            <strong>${state.role === 'admin' ? 'Editing enabled' : 'Read only'}</strong>
          </div>
        </div>
      </article>
    `
  ];

  elements.focusGrid.innerHTML = cards.join('');
}

function renderCategoryOptions() {
  const categorySource = getFilteredTransactions({ ignoreCategory: true, sort: false });
  const categories = [...new Set(categorySource.map((tx) => tx.category))].sort();

  elements.categoryFilter.innerHTML = '<option value="all">All categories</option>';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.appendChild(option);
  });

  if (!categories.includes(state.filters.category)) {
    state.filters.category = 'all';
  }

  elements.categoryFilter.value = state.filters.category;
}

function renderTransactionsSection() {
  const visible = getFilteredTransactions();
  const visibleNet = totalFor(visible, 'income') - totalFor(visible, 'expense');
  elements.transactionsBody.innerHTML = '';
  elements.tableMeta.textContent = `Showing ${visible.length} of ${state.transactions.length} transactions • Visible net ${formatSignedCurrency(visibleNet)} • ${rangeLabelForFilter()}`;

  if (!visible.length) {
    elements.emptyState.classList.remove('hidden');
  } else {
    elements.emptyState.classList.add('hidden');
  }

  visible.forEach((tx) => {
    const amount = tx.type === 'income' ? tx.amount : -tx.amount;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong>${escapeHtml(tx.title)}</strong>
      </td>
      <td>${formatDate(tx.date)}</td>
      <td><span class="category-pill ${tx.type}">${escapeHtml(tx.category)}</span></td>
      <td><span class="type-pill ${tx.type}">${capitalize(tx.type)}</span></td>
      <td><span class="amount-pill ${tx.type}">${formatSignedCurrency(amount)}</span></td>
      <td>
        ${state.role === 'admin'
          ? `<div class="row-actions">
              <button class="text-button" type="button" data-action="edit" data-id="${tx.id}">Edit</button>
              <button class="text-button danger" type="button" data-action="delete" data-id="${tx.id}">Delete</button>
            </div>`
          : '<span class="muted">Read only</span>'}
      </td>
    `;
    elements.transactionsBody.appendChild(row);
  });
}

function renderDerivedPanels() {
  const visible = getFilteredTransactions();
  renderTrendChart(visible);
  renderCategoryChart(visible);
  renderInsights(visible);
}

function renderTrendChart(transactions) {
  const monthlyData = buildMonthlySeries(transactions);

  if (!monthlyData.length) {
    elements.trendChart.innerHTML = emptyChartMarkup('No trend data for the selected filters.');
    return;
  }

  const values = monthlyData.map((item) => item.balance);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const span = maxValue - minValue || 1;
  const width = 560;
  const height = 240;
  const padding = 30;
  const stepX = monthlyData.length === 1 ? 0 : (width - padding * 2) / (monthlyData.length - 1);

  const points = monthlyData.map((item, index) => {
    const x = padding + index * stepX;
    const y = height - padding - ((item.balance - minValue) / span) * (height - padding * 2);
    return { ...item, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points.at(-1).x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const closingBalance = monthlyData.at(-1).balance;
  const bestMonth = [...monthlyData].sort((a, b) => b.net - a.net)[0];

  elements.trendChart.innerHTML = `
    <div class="chart-layout">
      <div>
        <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Balance trend chart">
          <line class="axis-line" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"></line>
          ${[0, 1, 2].map((step) => {
            const y = padding + ((height - padding * 2) / 2) * step;
            return `<line class="grid-line" x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}"></line>`;
          }).join('')}
          <path class="area-fill" d="${areaPath}"></path>
          <path class="data-line" d="${linePath}"></path>
          ${points.map((point) => `<circle class="data-point" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join('')}
          ${points.map((point) => `<text class="axis-label" x="${point.x}" y="${height - 10}" text-anchor="middle">${point.label}</text>`).join('')}
        </svg>
        <div class="trend-stats">
          <div class="trend-stat">
            <p class="muted">Closing balance</p>
            <strong>${formatSignedCurrency(closingBalance)}</strong>
          </div>
          <div class="trend-stat">
            <p class="muted">Strongest month</p>
            <strong>${bestMonth ? `${bestMonth.label} (${formatSignedCurrency(bestMonth.net)})` : 'No data'}</strong>
          </div>
        </div>
      </div>
      <div class="chart-legend">
        ${monthlyData.map((item) => `
          <div class="legend-card">
            <div class="legend-item">
              <div>
                <strong>${item.label}</strong>
                <p>${formatCurrency(item.income)} income / ${formatCurrency(item.expenses)} expense</p>
              </div>
              <strong>${formatSignedCurrency(item.net)}</strong>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCategoryChart(transactions) {
  const expenseTotals = aggregateCategories(transactions.filter((tx) => tx.type === 'expense'));

  if (!expenseTotals.length) {
    elements.categoryChart.innerHTML = emptyChartMarkup('No expense data available for this breakdown.');
    return;
  }

  const total = expenseTotals.reduce((sum, entry) => sum + entry.amount, 0);
  let cumulative = 0;
  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  const segments = expenseTotals.map((entry, index) => {
    const portion = entry.amount / total;
    const strokeDasharray = `${portion * circumference} ${circumference}`;
    const strokeDashoffset = -cumulative * circumference;
    cumulative += portion;
    return {
      ...entry,
      color: categoryColors[index % categoryColors.length],
      strokeDasharray,
      strokeDashoffset,
      share: portion
    };
  });

  elements.categoryChart.innerHTML = `
    <div class="chart-layout">
      <div class="donut-wrap">
        <svg viewBox="0 0 240 240" role="img" aria-label="Spending category breakdown">
          <circle cx="120" cy="120" r="76" fill="none" stroke="rgba(127,127,127,0.15)" stroke-width="28"></circle>
          ${segments.map((segment) => `
            <circle
              cx="120"
              cy="120"
              r="76"
              fill="none"
              stroke="${segment.color}"
              stroke-width="28"
              stroke-dasharray="${segment.strokeDasharray}"
              stroke-dashoffset="${segment.strokeDashoffset}"
              transform="rotate(-90 120 120)"
              stroke-linecap="round"
            ></circle>
          `).join('')}
          <text x="120" y="112" text-anchor="middle" class="axis-label">Total spend</text>
          <text x="120" y="136" text-anchor="middle" style="font-size: 22px; font-weight: 700; fill: currentColor;">${formatCurrency(total)}</text>
        </svg>
      </div>
      <div class="chart-legend">
        ${segments.map((segment) => `
          <div class="legend-card">
            <div class="legend-item">
              <div class="legend-main">
                <span class="swatch" style="background:${segment.color}"></span>
                <div>
                  <strong>${escapeHtml(segment.category)}</strong>
                  <p>${(segment.share * 100).toFixed(1)}% of expenses</p>
                </div>
              </div>
              <strong>${formatCurrency(segment.amount)}</strong>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderInsights(transactions) {
  const expenses = transactions.filter((tx) => tx.type === 'expense');
  const income = transactions.filter((tx) => tx.type === 'income');
  const topExpenseCategory = aggregateCategories(expenses, 1)[0];
  const monthlySeries = buildMonthlySeries(transactions);
  const lastTwoMonths = monthlySeries.slice(-2);
  const recurringCategory = findRecurringCategory(expenses);
  const largestTransaction = [...transactions].sort((a, b) => b.amount - a.amount)[0];
  const savingsRate = totalFor(transactions, 'income') > 0
    ? ((totalFor(transactions, 'income') - totalFor(transactions, 'expense')) / totalFor(transactions, 'income')) * 100
    : 0;

  const insights = [
    {
      title: 'Highest spending category',
      emphasis: topExpenseCategory ? topExpenseCategory.category : 'No spend data',
      body: topExpenseCategory ? `${formatCurrency(topExpenseCategory.amount)} spent in this category under the current filters.` : 'Add or reveal expense transactions to generate this signal.'
    },
    {
      title: 'Monthly comparison',
      emphasis: lastTwoMonths.length === 2 ? formatSignedCurrency(lastTwoMonths[1].net - lastTwoMonths[0].net) : 'Need more data',
      body: lastTwoMonths.length === 2 ? compareMonths(lastTwoMonths[0], lastTwoMonths[1]) : 'At least two months of visible data are needed to compare momentum.'
    },
    {
      title: 'Savings signal',
      emphasis: `${Number.isFinite(savingsRate) ? savingsRate.toFixed(1) : '0.0'}%`,
      body: income.length ? 'This is the share of visible income retained after visible expenses.' : 'Income is currently filtered out, so the signal is neutral.'
    },
    {
      title: 'Recurring watchlist',
      emphasis: recurringCategory ? recurringCategory.category : largestTransaction ? largestTransaction.title : 'No pattern yet',
      body: recurringCategory
        ? `${recurringCategory.count} expense entries share this category, which may indicate a repeat spend pattern.`
        : largestTransaction
          ? `${largestTransaction.title} is the largest single transaction in the current view.`
          : 'More transactions are needed to surface a meaningful pattern.'
    }
  ];

  elements.insightsGrid.innerHTML = insights.map((insight) => `
    <article class="insight-card">
      <p class="eyebrow">Insight</p>
      <h3>${insight.title}</h3>
      <strong>${insight.emphasis}</strong>
      <p>${insight.body}</p>
    </article>
  `).join('');
}

function openDialog(transaction = null) {
  state.editingId = transaction ? transaction.id : null;
  elements.dialogTitle.textContent = transaction ? 'Edit transaction' : 'Add transaction';
  elements.transactionId.value = transaction?.id ?? '';
  elements.titleInput.value = transaction?.title ?? '';
  elements.dateInput.value = transaction?.date ?? new Date().toISOString().slice(0, 10);
  elements.categoryInput.value = transaction?.category ?? '';
  elements.transactionTypeInput.value = transaction?.type ?? 'expense';
  elements.amountInput.value = transaction?.amount ?? '';

  if (!elements.dialog.open) {
    elements.dialog.showModal();
  }
}

function closeDialog() {
  if (!elements.dialog.open) return;
  elements.form.reset();
  state.editingId = null;
  elements.dialog.close();
}

function saveTransaction() {
  const payload = {
    id: state.editingId ?? `tx-${Date.now()}`,
    title: elements.titleInput.value.trim(),
    date: elements.dateInput.value,
    category: elements.categoryInput.value.trim(),
    type: elements.transactionTypeInput.value,
    amount: Number(elements.amountInput.value)
  };

  if (!payload.title || !payload.date || !payload.category || payload.amount <= 0) {
    showToast('Please complete all transaction fields before saving.');
    return;
  }

  if (state.editingId) {
    state.transactions = state.transactions.map((tx) => tx.id === state.editingId ? payload : tx);
    showToast('Transaction updated.');
  } else {
    state.transactions = [payload, ...state.transactions];
    showToast('Transaction added.');
  }

  persistTransactions();
  closeDialog();
  render();
}

function deleteTransaction(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;

  const confirmed = window.confirm(`Delete ${transaction.title}? This only changes local demo data.`);
  if (!confirmed) return;

  state.transactions = state.transactions.filter((item) => item.id !== id);
  persistTransactions();
  render();
  showToast('Transaction deleted.');
}

function resetFilters(options = {}) {
  state.filters = {
    search: '',
    type: 'all',
    category: 'all',
    sort: 'date-desc',
    range: 'all'
  };

  if (!options.silent) {
    showToast('Filters reset to default.');
  }

  render();
}

function restoreSampleData() {
  if (state.role !== 'admin') return;

  const confirmed = window.confirm('Restore the sample dataset and replace local edits?');
  if (!confirmed) return;

  state.transactions = cloneTransactions(seededTransactions);
  persistTransactions();
  resetFilters({ silent: true });
  showToast('Sample data restored.');
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  persistTheme();
  applyTheme();
  showToast(`${capitalize(state.theme)} theme enabled.`);
}

function exportTransactionsAsJson() {
  downloadFile('transactions-export.json', JSON.stringify(state.transactions, null, 2), 'application/json');
  showToast('JSON export started.');
}

function exportTransactionsAsCsv() {
  const csv = toCsv(state.transactions);
  downloadFile('transactions-export.csv', csv, 'text/csv;charset=utf-8');
  showToast('CSV export started.');
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toCsv(transactions) {
  const headers = ['id', 'title', 'date', 'category', 'type', 'amount'];
  const lines = transactions.map((transaction) => headers.map((header) => csvEscape(String(transaction[header]))).join(','));
  return [headers.join(','), ...lines].join('\n');
}

function csvEscape(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

function buildMonthlySeries(transactions) {
  const byMonth = new Map();

  [...transactions]
    .sort((a, b) => parseDate(a.date) - parseDate(b.date))
    .forEach((tx) => {
      const key = tx.date.slice(0, 7);
      if (!byMonth.has(key)) {
        byMonth.set(key, { key, label: monthLabel(key), income: 0, expenses: 0 });
      }

      const entry = byMonth.get(key);
      if (tx.type === 'income') entry.income += tx.amount;
      if (tx.type === 'expense') entry.expenses += tx.amount;
    });

  let runningBalance = 0;
  return [...byMonth.values()].map((entry) => {
    const net = entry.income - entry.expenses;
    runningBalance += net;
    return {
      ...entry,
      net,
      balance: runningBalance
    };
  });
}

function aggregateCategories(transactions, limit = 6) {
  const map = new Map();
  transactions.forEach((tx) => {
    map.set(tx.category, (map.get(tx.category) || 0) + tx.amount);
  });

  return [...map.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

function findRecurringCategory(expenses) {
  const map = new Map();
  expenses.forEach((expense) => {
    map.set(expense.category, (map.get(expense.category) || 0) + 1);
  });

  return [...map.entries()]
    .map(([category, count]) => ({ category, count }))
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count)[0];
}

function getCurrentMonthTransactions(transactions) {
  const referenceDate = getReferenceDate(transactions);
  return transactions.filter((tx) => {
    const date = parseDate(tx.date);
    return date.getMonth() === referenceDate.getMonth() && date.getFullYear() === referenceDate.getFullYear();
  });
}

function compareMonths(previous, current) {
  const difference = current.expenses - previous.expenses;
  const direction = difference > 0 ? 'up' : difference < 0 ? 'down' : 'flat';

  if (direction === 'flat') {
    return `Spending stayed nearly unchanged between ${previous.label} and ${current.label}.`;
  }

  return `Spending is ${direction} by ${formatCurrency(Math.abs(difference))} compared with ${previous.label}.`;
}

function describeMonthlyComparison(monthlySeries) {
  const pair = monthlySeries.slice(-2);
  if (pair.length < 2) return 'Add another month of visible data to compare momentum.';

  const difference = pair[1].expenses - pair[0].expenses;
  if (difference === 0) {
    return `${pair[0].label} and ${pair[1].label} had similar spend levels.`;
  }

  return `${pair[1].label} spend moved ${difference > 0 ? 'up' : 'down'} by ${formatCurrency(Math.abs(difference))}.`;
}

function totalFor(transactions, type) {
  return transactions
    .filter((tx) => tx.type === type)
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function rangeLabelForFilter() {
  switch (state.filters.range) {
    case '30d':
      return 'Range: last 30 days';
    case 'month':
      return 'Range: this month';
    case 'all':
    default:
      return 'Range: all time';
  }
}

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getReferenceDate(transactions = state.transactions) {
  if (!transactions.length) return new Date();
  return transactions
    .map((tx) => parseDate(tx.date))
    .sort((a, b) => b - a)[0];
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(amount);
}

function formatSignedCurrency(amount) {
  return `${amount >= 0 ? '+' : '-'}${formatCurrency(Math.abs(amount))}`;
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parseDate(dateString));
}

function monthLabel(key) {
  const [year, month] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(year, month - 1, 1));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function emptyChartMarkup(message) {
  return `
    <div class="empty-state">
      <h3>Nothing to visualize yet.</h3>
      <p>${message}</p>
    </div>
  `;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');

  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2200);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
