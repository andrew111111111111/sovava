import { getEvents } from "./config";
const textPeople = document.querySelector(".text-people");
const textPlaceSpan = document.querySelector(".text-place-span");
const textPlace = document.querySelector(".text-place");
const textTimeSpan = document.querySelector(".text-time-span");
const textTime = document.querySelector(".text-time");
const textInfo = document.querySelector(".text-info");
const smallPhoto = document.querySelector("[data-photo-small]");
const largePhoto = document.querySelector(".large-modal-photo");

const truncateText = (text) => {
  if (text.length <= 120) return text;

  return text.slice(0, 120) + "...";
};

const getEventId = async (event) => {
  modal.classList.remove("is-hidden");
  if (event.target.closest(".event__item")) {
    const elementsId = event.target.closest(".event__item").dataset.id;
    try {
      const apiAnswer = await getEvents();

      const arr = apiAnswer._embedded.events;
      const index = arr.findIndex((event) => event.id === elementsId);
      renderTextForModal(index);
      return index;
    } catch (error) {
      console.log(error);
    }
  }
};

const renderTextForModal = async (index) => {
  try {
    const id = index;
    const data = await getEvents();
    const normalize = await normalizeData(data, id);
    const normalized = normalize[0];
    textInfo.textContent = truncateText(normalized.info);
    textTime.textContent = normalized.date;
    textTimeSpan.textContent = normalized.time;
    textPlace.textContent = normalized.place;
    textPlaceSpan.textContent = normalized.place;
    textPeople.textContent = normalized.name;
    if (smallPhoto) {
      smallPhoto.src = normalized.img;
      smallPhoto.alt = normalized.name;
    }
    if (largePhoto) {
      largePhoto.style.backgroundImage = `url(${normalized.img})`;
    }
    const openMiniModal = (event) => {
      if (event.target !== textInfo) return;
      textInfo.textContent = normalized.info;
    };

    textInfo.addEventListener("click", openMiniModal);
  } catch (error) {
    console.log("Відбулася помилка: ", error);
  }
};
const normalizeData = async (data, id) => {
  const currentData = data._embedded.events[id];

  const normalizedEvents = [];
  const event = {
    img: currentData.images[0].url,
    name: currentData.name,
    date: currentData.dates.start.localDate,
    time: currentData.sales.presales[0].name,
    place: currentData._embedded.venues[0].city.name,
    country: currentData._embedded.venues[0].city.name,
    info: currentData.sales.presales[0].description,
  };
  normalizedEvents.push(event);

  return normalizedEvents;
};

const eventList = document.querySelector(".event__list");
const modal = document.querySelector(".backdrop");

eventList.addEventListener("click", getEventId);

const closer = document.querySelector(".modal-closer");

const handleCloseModal = () => {
  modal.classList.add("is-hidden");
};

closer.addEventListener("click", handleCloseModal);

const handleCloseModalByBackdrop = (event) => {
  if (event.target.closest(".modal")) return;
  modal.classList.add("is-hidden");
};

modal.addEventListener("click", handleCloseModalByBackdrop);
