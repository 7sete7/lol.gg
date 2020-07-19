import axios from 'axios';

const getSummoner = async name => {
	try {
		const { data } = await axios.get(`/api/summoner/${name}`);
		return data;
	} catch(e) {
		console.error(e);
		return {};
	}
}

export default getSummoner;
