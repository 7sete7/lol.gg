import express, { static } from "express";
import proxy from "express-http-proxy";
import api from "./api";

import { user as fakeUser } from "./fakeData";
import { saveInCache } from "./utils/cache";
import logError from "./utils/logError";
import matchRoutes from "./routes/match";

const DDRAGON = "/cdn/10.14.1";
(async () => {
	const app = express();

	app.use("/api/summoner/:name", async (req, res) => {
		const { name } = req.params;
		try {
			if (name === fakeUser.fakeName) {
				res.send(fakeUser);
			}

			const { data } = await api.get(`lol-api/summoner/v4/summoners/by-name/${name}`);

			res.json(data);
		} catch (e) {
			logError(e);
			res.send(null);
		}
	});

	app.use("/api/ddragon", proxy(process.env.DDRAGON_URL, {
		proxyReqPathResolver : req => `${DDRAGON}${req.url}`
	}));

	app.use("/api", matchRoutes);

	if (process.env.NODE_ENV === "production") {
		app.use("/", static("app"));
	} else {
		app.use("/", proxy("localhost:51300"));
	}

	const championsUrl = `${process.env.DDRAGON_URL}${DDRAGON}/data/en_US/champion.json`;
	api.get(championsUrl).then(({ data }) => saveInCache("champs", data));

	app.listen(3000, () => console.log("Server started in localhost:3000"));
})();
// https://cdn.midorfeed.net/media/lol/img/champion/Xayah.png
