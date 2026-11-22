import Handlebars from 'handlebars';
import  countryList  from 'bundle-text:../../../src/templates/country.hbs';
import { countries } from '../data/countries';
const headerList = document.querySelector('.country-select');
console.log(countries)
const normalizeData = data => {
  const normalizedEvents = [];
  const event = {
    country: data._embedded.venues[0].city.name,
  };
  normalizedEvents.push(event);
  // console.log(normalizedEvents);
  return normalizedEvents;
};

const headerListMarkup = () => {
const markup = Handlebars.compile(countryList);
    const result = markup(countries);
    headerList.innerHTML = result;
}
headerListMarkup()
