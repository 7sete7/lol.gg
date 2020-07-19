import express from "express";
const router = express.Router();

import logError from "../utils/logError";
import getChampsFromMatch from "../lib/getChampsFromMatch";

router.get("/active-match/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const champs = await getChampsFromMatch(id);
		res.send({ active: true, champs });
	} catch (e) {
		logError(e);
		res.send({ active: false });
	}
});

export default router;