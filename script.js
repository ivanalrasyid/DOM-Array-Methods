const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

getRandomUser();
getRandomUser();
getRandomUser(); 


let data = [];

// fetch random user and add money 
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

// double money 
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

// filter only millionaires
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}

// sort by richest
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

// add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
// update dom 
function updateDOM(provideData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
    

}

// format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

// event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);

// Dark Mode 
const ToogleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked){
        document.documentElement.setAttribute('mode-dark', 'dark');
        localStorage.setItem('theme', 'dark'); // save to localstorage in dark mode
    }else{
        document.documentElement.setAttribute('mode-dark', 'light');
        localStorage.setItem('theme', 'light'); // save to localstorage in light mode
    }
}

ToogleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('mode-dark', currentTheme);

        if (currentTheme === 'dark') {
            ToogleSwitch.checked = true;
        }
    }