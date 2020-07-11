import axios from "axios";

const api = axios.create();
api.interceptors.request.use(req => {
  const lolRequest = /^lol-api\//.test(req.url);

  if (lolRequest) {
    const { LOL_URL, LOL_KEY } = process.env;

    req.url = req.url.replace(/^lol-api/, LOL_URL);
    req.headers["X-Riot-Token"] = LOL_KEY;
  }

  return req;
});

export default api;
