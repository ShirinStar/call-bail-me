async function loadJSON (url) {
  const res = await fetch(url);
  return await res.json();
}

const cities = [];

loadJSON('./phones.json')
.then(data => cities.push(...data))
.catch(err => console.error(err));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  })
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray)
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
    <p>
      <span class='name'>${cityName}, ${stateName}</span>
      <span class='phone'>${place.number}</span>
    </p>
    `
  }).join('');
  suggestions.innerHTML = html;
}

const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions');

search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);

