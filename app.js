const tabs = [
  {
    id: "info",
    label: "Meetup<br>Info",
    file: "tabs/info.md",
    fallback: "# Event Info & Tips\n- 🔋 Bring a power bank\n- 💧 Stay hydrated\n- 📍 Use Campfire or Discord"
  },
  {
    id: "day1",
    label: "Day 1<br>Info",
    file: "tabs/day1.md",
    fallback: "# Day 1 Meetups\n- [Klyde Warren Park](https://cmpf.re/yZHF8Q)\n- [Haggard Park](https://cmpf.re/SEmS0i)"
  },
  {
    id: "day2",
    label: "Day 2<br>Info",
    file: "tabs/day2.md",
    fallback: "# Day 2 Meetups\n- [NorthPark Mall](https://cmpf.re/ykUh9Y)\n- [Grapevine Mills Mall](https://cmpf.re/4mBmj0)"
  }
];

let currentTab = 0;
let tabIds = tabs.map(t => t.id);

function createTabs() {
  const tabButtons = document.getElementById('tab-buttons');
  const tabContents = document.getElementById('tab-contents');
  tabButtons.innerHTML = '';
  tabContents.innerHTML = '';

  tabs.forEach((tab, index) => {
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
      .then(res => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then(md => div.innerHTML = marked.parse(md))
      .catch(() => div.innerHTML = marked.parse(tab.fallback));
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