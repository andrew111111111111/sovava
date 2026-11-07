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
    console.log(eventList);
    const data = await geter();
    const html = eventMakeMurkup(normalizeDate(data));
    eventList.innerHTML = html;
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};

yyf();

const normalizeDate = (date) => {
  const event = () => {
    img: date._embedded.events.map((event) => {
      const img = event.images[0].url;
      return img;
    });
  };
  date: date._embedded.events.map((event) => {
    const date = event.dates.start.localDate;
    return date;
  });
  name: date._embedded.events.map((event) => {
    const name = event.name;
    return name;
  });
  place: date._embedded.events.map((event) => {
    const place = event._embedded.venues[0].city.name;
    return place;
  });
  return event;
};
