const key = "dsGhljRAKDdipjnFnCO5MUOkfPAmATwO";
const baseUrl = `https://app.ticketmaster.com/discovery/v2/events`;

export const getEvents = async () => {
  const response = await fetch(`${baseUrl}.json?apikey=${key}`);
  if (!response.ok) throw Error("Get api error: " + response.statusText);
  return response.json();
};
export const getEventById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}.json?apikey=${key}`);
  if (!response.ok) throw Error("Get api error: " + response.statusText);
  return response.json();
};
