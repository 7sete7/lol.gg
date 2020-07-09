import express, { static } from 'express';
import proxy from 'express-http-proxy';
import axios from 'axios';

import { user as fakeUser, match as fakeMatch } from './fakeData';

(() => {
    const app = express();
    
    app.use('/summoner/:name', async (req, res) => {
        const { name } = req.params;
        try {
            if (name === fakeUser.fakeName){
                res.send(fakeUser);
            }

            const { LOL_URL, LOL_KEY } = process.env;
            const { data } = await axios.get(`${LOL_URL}/summoner/v4/summoners/by-name/${name}?api_key=${LOL_KEY}`);

            res.json(data);
        } catch(e) {
            console.error(e.Error);
            console.error(e.config.url);
            console.error(`${e.response.status} - ${e.response.statusText}`);
            res.send(null);
        }
    });

    app.use('/active-match/:id', async (req, res) => {
        const { id } = req.params;
        try {
            if (id === fakeUser.id) {
                res.send(fakeMatch);
            }

            const { LOL_URL, LOL_KEY } = process.env;
            const { data } = await axios.get(`${LOL_URL}/spectator/v4/active-games/by-summoner/${id}?api_key=${LOL_KEY}`);

            res.json(data);
        } catch(e) {
            console.error(e.Error);
            console.error(e.config.url);
            console.error(`${e.response.status} - ${e.response.statusText}`);
            res.send(null);
        }
    });

    if (process.env.NODE_ENV === 'production') {
		app.use('/', static('app'));
	} else {
		app.use('/', proxy('localhost:51300'));
    }

    app.listen(3000, () => console.log('Server started in localhost:3000'));
})();