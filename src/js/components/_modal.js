import { getEvents } from "../api.js";
import { getEventById } from "../api.js";
import templateError from "bundle-text:../../../src/templates/error.hbs";
import Handlebars from "handlebars";
const errorBackdrop = document.querySelector(".error-backdrop");
const errorModal = document.querySelector(".error-text-container");
const textPeople = document.querySelector(".text-people");
const textPlaceSpan = document.querySelector(".text-place-span");
const textPlace = document.querySelector(".text-place");
const textTimeSpan = document.querySelector(".text-time-span");
const textTime = document.querySelector(".text-time");
const textInfo = document.querySelector(".text-info");
const textPriceDef = document.querySelector(".modal-price-def");
const textPriceVip = document.querySelector(".modal-price-vip");
const smallPhoto = document.querySelector("[data-photo-small]");
const largePhoto = document.querySelector(".large-modal-photo");
const modal = document.querySelector(".backdrop");
const body = document.querySelector("body");
const madeMarkup = Handlebars.compile(templateError);
const truncateText = (text) => {
  if (text.length <= 120) return text;

  return text.slice(0, 120) + "...";
};
const min = 1;
const max = 8;
const arrayNoPrices = [
  "Price is temporarily unavailable. Please refresh the page or try again later",
  "Unable to load the price. We are already working on a fix",
  "Price is being updated. Please contact our manager for the current cost",
  "Error loading price data. Please check your internet connection and try again",
  "Price is calculated individually. Submit a request to get a custom quote",
  "Price depends on the selected options. Specify your order details for an accurate calculation",
  "Our current price list is being updated. Please request the cost from a specialist",
  "Oops, the price tag seems to be hiding! Try refreshing the page in a few seconds",
];
const handleEventModalOpen = async (event) => {
  const eventId = event.target.closest(".event__item").dataset.id;
  if (!eventId) return;
  try {
    const event = await getEventById(eventId);
    console.log(event);
    const normaEvent = await normalizeData(event);
    await renderTextModal(normaEvent[0]);
    body.classList.add("no-scroll");
  } catch (error) {
    body.classList.add("no-scroll");
    const errorHtml = madeMarkup(error);
    errorModal.innerHTML = "";
    errorModal.insertAdjacentHTML("beforeend", errorHtml);
    errorBackdrop.classList.remove("is-hidden");
  }
};
const renderTextModal = async (eventData) => {
  modal.classList.remove("is-hidden");
  try {
    const rnm = Math.floor(Math.random() * (max - min + 1) + min);
    textInfo.textContent = truncateText(eventData.info);
    textTime.textContent = eventData.date;
    textTimeSpan.textContent = eventData.time;
    textPlace.textContent = eventData.place;
    textPlaceSpan.textContent = eventData.place;
    textPeople.textContent = eventData.name;
    if (eventData.price_def === undefined) {
      textPriceDef.textContent = arrayNoPrices[rnm];
    } else {
      "Standard " + eventData.price_def + " UAH";
    }
    if (eventData.price_vip === undefined) {
      textPriceVip.textContent = arrayNoPrices[rnm];
    } else {
      "VIP " + eventData.price_vip + " UAH";
    }

    if (smallPhoto) {
      smallPhoto.src = eventData.img;
      smallPhoto.alt = eventData.name;
    }
    if (largePhoto) {
      largePhoto.style.backgroundImage = `url(${eventData.img})`;
    }
    const openMiniModal = (event) => {
      if (event.target !== textInfo) return;
      textInfo.textContent = eventData.info;
    };

    textInfo.addEventListener("click", openMiniModal);
  } catch (error) {
    body.classList.add("no-scroll");
    const errorHtml = madeMarkup(error);
    errorModal.innerHTML = "";
    errorModal.insertAdjacentHTML("beforeend", errorHtml);
    errorBackdrop.classList.remove("is-hidden");
  }
};

const normalizeData = (data) => {
  const normalizedEvents = [];
  const event = {
    img: data.images[0].url,
    name: data.name,
    date: data.dates.start.localDate,
    time: data.sales.presales[0].name,
    place: data._embedded.venues[0].city.name,
    country: data._embedded.venues[0].city.name,
    info: data.sales.presales[0].description || data.info,
    price_def: data.priceRanges?.[0]?.min,
    price_vip: data.priceRanges?.[0]?.max,
  };
  normalizedEvents.push(event);

  return normalizedEvents;
};
const eventList = document.querySelector(".event__list");

eventList.addEventListener("click", handleEventModalOpen);

const closer = document.querySelector(".modal-closer");

const handleCloseModal = () => {
  modal.classList.add("is-hidden");
  body.classList.remove("no-scroll");
};

closer.addEventListener("click", handleCloseModal);

const handleCloseModalByBackdrop = (event) => {
  if (event.target.closest(".modal")) return;
  modal.classList.add("is-hidden");
  body.classList.remove("no-scroll");
};

modal.addEventListener("click", handleCloseModalByBackdrop);

const handleCloseErrorModal = (event) => {
  if (event.target.closest(".error-container")) return;
  errorBackdrop.classList.add("is-hidden");
  body.classList.remove("no-scroll");
};
const errorCloser = document.querySelector(".error-closer");
errorBackdrop.addEventListener("click", handleCloseErrorModal);

const handleCloseErrorModalByBtn = () => {
  errorBackdrop.classList.add("is-hidden");
  errorModal.innerHTML = "";
  body.classList.remove("no-scroll");
};
errorCloser.addEventListener("click", handleCloseErrorModalByBtn);
