const cache = {};

export const saveInCache = (key, data) => {
	cache[key] = data;
}

export const getFromCache = key => cache[key];
