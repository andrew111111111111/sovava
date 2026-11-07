// import Handlebars from "handlebars";
// import modalTemplate from "bundle-text:../../modal.hbs";

// const key = "dsGhljRAKDdipjnFnCO5MUOkfPAmATwO";
// const container = document.querySelector(".modal");
// const madeMarkup = Handlebars.compile(modalTemplate);
// const geter = async () => {
//   const response = await fetch(
//     `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`,
//   );
//   if (!response.ok) throw Error("Get api error: " + response.statusText);

//   return response.json();
// };

// const renderModal = async () => {
//   try {
//     const data = await geter();

//     container.innerHTML = "";

//     const html = madeMarkup(normalizeData(data));
//     container.innerHTML = html;
//   } catch (error) {
//     console.log("Відбулася помилка: ", error);
//   }
// };

// renderModal();

// const normalizeData = (data) => {
//   console.log(data);
//   const event = {
//     img: data._embedded.events.map((event) => {
//       const img = event.images[0].url;
//       return img;
//     }),
//     date: data._embedded.events.map((event) => {
//       const date = event.dates.start.localDate;
//       return date;
//     }),
//     time: data._embedded.events.map((event) => {
//       const date = event.sales.presales[0].name;
//       return date;
//     }),
//     place: data._embedded.events.map((event) => {
//       const place = event._embedded.venues[0].city.name;
//       return place;
//     }),
//     country: data._embedded.events.map((event) => {
//       const country = event._embedded.venues[0].country.name;
//       return country;
//     }),
//     info: data._embedded.events.map((event) => {
//       const info = event.sales.presales[0].description;
//       return info;
//     }),
//     title: data._embedded.events.map((event) => {
//       const title = event.name;
//       return title;
//     }),
//   };
//   console.log(event);
//   return event;
// };

const closer = document.querySelector(".backdrop");
const closerBtn = document.querySelector(".modal-closer");

const handleClose = (event) => {
  closer.classList.add("is-hidden");
};
closerBtn.addEventListener("click", handleClose);
closer.addEventListener("click", handleClose);
