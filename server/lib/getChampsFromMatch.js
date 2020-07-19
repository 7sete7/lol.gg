import api from "../api";
import { pickBy, pipe, keys, head, path } from "ramda";

import { user as fakeUser, match as fakeMatch } from "../fakeData";
import { getFromCache } from "../utils/cache";

const getNameById = (champs) => (id) =>
	pipe(
		pickBy((obj) => Number(obj.key) == id),
		keys,
		head
	)(champs.data);

const getChamps = async (id) => {
	let match;

	if (id === fakeUser.id) {
		match = fakeMatch;
	} else {
		({ data: match } = await api.get(
			`lol-api/spectator/v4/active-games/by-summoner/${id}`
		));
	}
	const champsIds = match.participants.map((player) => player.championId);
	const champsInfo = getFromCache("champs");
	const champsNames = champsIds.map(getNameById(champsInfo));

	const url =
		"http://ddragon.leagueoflegends.com/cdn/10.14.1/data/en_US/champion";
	const promises = champsNames.map((champ) => api.get(`${url}/${champ}.json`));
	const responses = await Promise.all(promises);
	const champs = responses.map(path(["data", "data"]));

	return champs.map((item, i) => item[champsNames[i]]);
};

export default getChamps;
