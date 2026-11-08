import Handlebars from "handlebars";
import { getEvents } from "./config";
import { modalTemplate } from "bundle-text:../../templates/modal.hbs";
const container = document.querySelector(".modal");
// const madeMarkup = Handlebars.compile(modalTemplate);

const renderModal = async () => {
  try {
    const data = getEvents();
    container.innerHTML = "";
    const html = madeMarkup(normalizeData(data));
    container.innerHTML = html;
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};

renderModal();
const normalizeData = (data) => {
  console.log(data._embedded.events);
  const currentData = data._embedded.events;
  const normalizedEvents = [];
  for (const data of currentData) {
    const event = {
      img: data.images[0].url,
      name: data.name,
      date: data.dates.start.localDate,
      time: data.sales.presales[0].name,
      place: data._embedded.venues[0].city.name,
      country: data._embedded.venues[0].city.name,
      info: data.sales.presales[0].description,
    };
    normalizedEvents.push(event);
  }
  return normalizedEvents;
};

const handleGetEventById = () => {};

const closer = document.querySelector(".backdrop");
const closerBtn = document.querySelector(".modal-closer");

const handleClose = () => {
  closer.classList.add("is-hidden");
};
closerBtn.addEventListener("click", handleClose);
closer.addEventListener("click", handleClose);

const eventList = document.querySelector(".event__list");

const handleOpenModal = (event) => {
  if (event.target.closest(".event__item") === ".event__item") {
    return;
  }
};

eventList.addEventListener("click", handleOpenModal);
