import api from "../api";
import logError from "../utils/logError";
import { pickBy, pipe, keys, head, prop } from "ramda";

import { user as fakeUser, match as fakeMatch } from "../fakeData";

const getNameById = champs => id => pipe(
    pickBy((obj) => Number(obj.key) == id),
    keys,
    head
  )(champs.data);

const getCooldowns = app => async (req, res) => {
	try {
		let match;
		const { id } = req.params;

		if (id === fakeUser.id) {
			match = fakeMatch;
		} else {
			({ data: match } = await api.get(
				`lol-api/spectator/v4/active-games/by-summoner/${id}`
			));
		}
		const champsIds = match.participants.map((player) => player.championId);
		const champsInfo = app.get("champs");
		const champsNames = champsIds.map(getNameById(champsInfo));

    const url = "http://ddragon.leagueoflegends.com/cdn/10.14.1/data/en_US/champion";
    const promises = champsNames.map(champ => api.get(`${url}/${champ}.json`));
    const responses = await Promise.all(promises);
    const champs = responses.map(prop("data"));

		res.json(champs);
	} catch (e) {
		logError(e);
		res.json({ error: true });
	}
};

export default getCooldowns;
