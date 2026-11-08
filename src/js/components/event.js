import Handlebars from "handlebars";
import tempalteEventList from "bundle-text:../../../src/templates/event.hbs";

const eventMakeMurkup = Handlebars.compile(tempalteEventList);

const key = "dsGhljRAKDdipjnFnCO5MUOkfPAmATwO";
const geter = async () => {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`
  );
  if (!response.ok) throw Error("Get api error: " + response.statusText);
  return response.json();
};

const yyf = async () => {
  try {
    const eventList = document.querySelector(".event__list");
    const data = await geter();
    const html = eventMakeMurkup(normalizeDate(data));
    eventList.innerHTML = html;
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};

yyf();

const normalizeDate = (data) => {
  for (let i = 0; i < data._embedded.events.length; i++) {
    const currentData = data._embedded.events;
    const normalizedEvents = [];
    for (const data of currentData) {
      const event = {
        img: data.images[0].url,
        name: data.name,
        date: data.dates.start.localDate,
        place: data._embedded.venues[0].city.name,
      };
      normalizedEvents.push(event);
    }
    return normalizedEvents;
  }
};
