import express, { static } from "express";
import proxy from "express-http-proxy";
import api from "./api";

import { user as fakeUser, match as fakeMatch } from "./fakeData";
import getCooldowns from "./lib/getCooldowns";

(async () => {
	const app = express();

	app.use("/summoner/:name", async (req, res) => {
		const { name } = req.params;
		try {
			if (name === fakeUser.fakeName) {
				res.send(fakeUser);
			}

			const { data } = await api.get(`lol-api/summoner/v4/summoners/by-name/${name}`);

			res.json(data);
		} catch (e) {
			console.error(e.Error);
			console.error(e.config.url);
			console.error(`${e.response.status} - ${e.response.statusText}`);
			res.send(null);
		}
	});

	app.use("/active-game/:id", async (req, res) => {
		const { id } = req.params;
		try {
			if (id === fakeUser.id) {
				res.send(fakeMatch);
			}

			const { data } = await api.get(`lol-api/spectator/v4/active-games/by-summoner/${id}`);

			res.json(data);
		} catch (e) {
			console.error(e.Error);
			console.error(e.config.url);
			console.error(`${e.response.status} - ${e.response.statusText}`);
			res.send(null);
		}
  });

  app.use("/active-match/:id", getCooldowns(app));

	if (process.env.NODE_ENV === "production") {
		app.use("/", static("app"));
	} else {
		app.use("/", proxy("localhost:51300"));
  }
  
  api.get("http://ddragon.leagueoflegends.com/cdn/10.14.1/data/en_US/champion.json").then(({ data }) => app.set("champs", data));

	app.listen(3000, () => console.log("Server started in localhost:3000"));
})();
// https://cdn.midorfeed.net/media/lol/img/champion/Xayah.png
