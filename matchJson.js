async function loadJSON (url) {
  const res = await fetch(url);
  return await res.json();
}

const funds = [];

loadJSON('./phones.json')
.then(data => funds.push(...data))
.catch(err => console.error(err));

function findMatches(wordToMatch, funds) {
  return funds.filter(fund => {
    const regex = new RegExp(wordToMatch, 'gi');
    return fund.city.match(regex) || fund.state.match(regex)
  })
}

function displayMatches() {
  const matchArray = findMatches(this.value, funds);
  console.log(matchArray)
  const html = matchArray.map(fund => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = fund.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = fund.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
    <p class='listResults'>
      <span class='name'>${cityName}, ${stateName}</span>
      <span class='name'>${fund.name}</span>
      <a class='phone' href="${fund.number}">${fund.number}</a>
    </p>
    `
  }).join('');
  suggestions.innerHTML = html;
}

const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions');

search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);

