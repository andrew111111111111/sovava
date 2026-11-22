import Handlebars from "handlebars";
import tempalteEventList from "bundle-text:../../../src/templates/event.hbs";
import bonusEvent from "bundle-text:../../templates/bonus.hbs";
import { getEvents, getEventById } from "../api.js";
const bonus = document.querySelector(".bonus__list");


const eventMakeMurkup = Handlebars.compile(tempalteEventList);
const min = 0;
const max = 19;

const min = 0;
const max = 19;

const renderSections = async () => {
  try {
    const eventList = document.querySelector(".event__list");
    const data = await getEvents();

    const html = eventMakeMurkup(normalizeDate(data));
    eventList.innerHTML = html;
    //========================================
    const events = document.querySelectorAll(".event__item");
    for (let i = 0; i < 3; i++) {
      const rnm = Math.floor(Math.random() * (max - min + 1) + min);
      const event = events[rnm];
      bonus.append(event);
    }
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};

renderSections();

const normalizeDate = (data) => {
  const currentData = data._embedded.events;
  const normalizedEvents = [];
  for (const data of currentData) {
    const event = {
      img: data.images[0].url,
      name: data.name,
      date: data.dates.start.localDate,
      place: data._embedded.venues[0].city.name,
      id: data.id,
    };
    normalizedEvents.push(event);
  }
  return normalizedEvents;
};

const normalizeEvent = (data, id) => {
  const normalizedEvents = [];
  const currentEvent = data._embedded.events[id];
  const event = {
    img: currentEvent.images[0].url,
    name: currentEvent.name,
    date: currentEvent.dates.start.localDate,
    place: currentEvent._embedded.venues[0].city.name,
    id: currentEvent.id,
  };
  console.log(event);
  normalizedEvents.push(event);
};
