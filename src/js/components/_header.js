import Handlebars from 'handlebars';
import countryList from 'bundle-text:../../../src/templates/country.hbs';
import { countries } from '../data/countries';
import { renderCountryEvents } from './event.js';

const headerList = document.querySelector('.country-select');

const headerListMarkup = () => {
  const markup = Handlebars.compile(countryList);
  const result = markup(countries);
  headerList.innerHTML = result;
};

headerListMarkup();

const select = document.querySelector('.header-select');

select.addEventListener('change', async () => {
  try {
    await renderCountryEvents(select.value);
  } catch (error) {
    console.log(error);
  }
});
