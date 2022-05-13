import axios from 'axios';

const baseService = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// baseService.interceptors.request.use((config) => {
// 	const userTokenCookie = getCognitoUserTokenCookie();

// 	delete config.headers.common.Authorization;

// 	if (userTokenCookie) {
// 		config.headers.common.Authorization = `${userTokenCookie}`;
// 	}

// 	return config;
// }, (error) => {
// 	destroyCookies();
// 	window.location.reload();
// 	Promise.reject(error);
// });

// baseService.interceptors.response.use((response) => response, (error) => {
// 	const originalRequest = error.config;

// 	if (error.response && error.response.status === 401 && originalRequest.url.includes('login/refresh-token/')) {
// 		return Promise.reject(error);
// 	}

// 	if (error.response && error.response.status === 401 && !originalRequest._retry) {
// 		originalRequest._retry = true;

// 		return baseService.post('login/refresh-token/', { refreshToken: getJwtRefreshCookie() }).then((res) => {
// 			setJwtCookie({ ...res.data, refreshToken: getJwtRefreshCookie() }, () => true);
// 			baseService.defaults.headers.common.Authorization = `Bearer ${getJwtCookie()}`;
// 			return baseService(originalRequest);
// 		});
// 	}

// 	return Promise.reject(error);
// });

export default baseService;
