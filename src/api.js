import mockData from './mock-data';


/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith('http:/localhost')) {
    return mockData;
  }

  const token = await getAccessToken();

  const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
      newurl = 
        window.location.protocol +
        "//" + 
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" window.location.host;
      window.history.pushState("", "", newurl);
    }
  };

  if (token) {
    removeQuery();
    const url =  "https://vvb2v773edboswkv55jaymszwq0kaesh.lambda-url.us-east-2.on.aws" = "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://it47rdid3foq4d5iaodjqm5pxa0htkmg.lambda-url.us-east-2.on.aws" + "/" + encodeCode
  );

  const { accessToken } = await response.json();
  access_token && localStorage.setItem("acesss_token", access_token);

  return access_token
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if(!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = newURLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://6yedy4il3wqmftedncn7e7e5ca0didhr.lambda-url.us-east-2.on.aws/ "
      );
      const result = await response.json();
      const { authUrl } = result; 
      return (window.location.href = authUrl);
    }
    return accessToken;
  }

};