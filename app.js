let currentTab = 0;
let tabIds = [];

async function createTabs() {
  const tabButtons = document.getElementById('tab-buttons');
  const tabContents = document.getElementById('tab-contents');
  tabButtons.innerHTML = '';
  tabContents.innerHTML = '';

  const response = await fetch('tabs.json');
  const tabs = await response.json();
  tabIds = [];

  tabs.filter(t => t.visible).forEach((tab, index) => {
    tabIds.push(tab.id);

    const button = document.createElement('button');
    button.className = 'tab-button' + (index === 0 ? ' active' : '');
    button.setAttribute('onclick', `showTab('${tab.id}')`);
    button.innerHTML = tab.label;
    tabButtons.appendChild(button);

    const div = document.createElement('div');
    div.id = tab.id;
    div.className = 'tab-content' + (index === 0 ? ' active' : '');
    div.innerHTML = "<p>Loading...</p>";
    tabContents.appendChild(div);

    fetch(tab.file)
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(md => div.innerHTML = marked.parse(md))
      .catch(() => div.innerHTML = "<p>Could not load content.</p>");
  });
}

function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach((btn, i) => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    if (tabIds[i] === tabId) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
  });
  document.getElementById(tabId).classList.add('active');
  currentTab = tabIds.indexOf(tabId);
}

document.addEventListener('DOMContentLoaded', createTabs);

//Last update: 2025-06-21