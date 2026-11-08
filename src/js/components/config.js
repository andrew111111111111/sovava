const key = "dsGhljRAKDdipjnFnCO5MUOkfPAmATwO";
export const baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`;

export const getEvents = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) throw Error("Get api error: " + response.statusText);
  return response.json();
};
