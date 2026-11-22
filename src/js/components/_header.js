import Handlebars from "handlebars";
import { countryList } from "bundle-text:../../../src/templates/country.hbs";
import { getEvents } from "../api.js";

const headerSelect = document.querySelector(".header-select");
const normalizedEvents = [];
const event = {
  country: currentData._embedded.venues[0].city.name,
};
normalizedEvents.push(event);

const headerListMarkup = () => {
  const markup = Handlebars.compile(countryList);
  const result = markup(normalizedEvents);

  headerSelect.innerHTML = result;
};
headerListMarkup();
