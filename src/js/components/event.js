import Handlebars from "handlebars";
import tempalteEventList from "bundle-text:../../../src/templates/event.hbs";
import { getEvents } from "./config";

const eventMakeMurkup = Handlebars.compile(tempalteEventList);

const yyf = async () => {
  try {
    const eventList = document.querySelector(".event__list");
    const data = await getEvents();
    const html = eventMakeMurkup(normalizeDate(data));
    eventList.innerHTML = html;
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};

yyf();

const normalizeDate = (data) => {
  console.log(data._embedded.events);
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
