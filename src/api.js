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
  // 1. Local development shortcut
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // 2. Try cached events first
  const cachedEvents = localStorage.getItem("lastEvents");
  if (cachedEvents) {
    return JSON.parse(cachedEvents);
  }

  // 3. Authentication
  const token = await getAccessToken();
  if (!token) {
    console.error("No access token available");
    return [];
  }

  // 4. Build request
  const url = `${CALENDAR_API_URL}?access_token=${token}`;

  // 5. Fetch events
  const response = await fetch(url);
  const result = await response.json();

  // 6. Handle response
  if (result && result.events) {
    NProgress.done();
    localStorage.setItem("lastEvents", JSON.stringify(result.events));
    return result.events;
  }

  return [];
};


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
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }
  };

  if (token) {
    removeQuery();
    const url = "https://86www9yvvi.execute-api.us-east-2.amazonaws.com/dev/api/get-events/" + token;
    console.log("Fetching events from:", url);
    try {
      const response = await fetch(url);
      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("API Response:", result);
      if (result && result.events) {
        console.log("Number of events from API:", result.events.length);
        return result.events;
      } else {
        console.error("No events in response:", result);
        return [];
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }
  
  return [];
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://86www9yvvi.execute-api.us-east-2.amazonaws.com/dev/api/token/" + encodeCode
  );

  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if(!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://86www9yvvi.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result; 
      window.location.href = authUrl;
      return;
    }
    return await getToken(code);
  }

  return accessToken;
};