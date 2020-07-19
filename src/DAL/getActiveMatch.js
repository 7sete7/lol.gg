import axios from "axios";

const getActiveMatch = async id => {
	try {
		const { data } = await axios.get(`/api/active-match/${id}`);
		return data;
	} catch(e) {
		console.error(e);
		return { active: false };
	}
};

export default getActiveMatch;
