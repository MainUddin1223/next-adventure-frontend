import { decodeToken } from '@/utils/jwt';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
const AuthKey = 'accessToken';
export const storeUserInfo = (accessToken: string) => {
	return setToLocalStorage(AuthKey, accessToken);
};

export const getUserInfo = () => {
	const authLocalStorageData = getFromLocalStorage(AuthKey);
	if (authLocalStorageData == 'undefined') {
		return '';
	}
	if (authLocalStorageData) {
		const decodedToken = decodeToken(authLocalStorageData);
		return decodedToken;
	} else {
		return '';
	}
};

export const isLoggedIn = () => {
	const authToken = getFromLocalStorage(AuthKey);
	return !!authToken;
};
export const removeUserToken = (key: string) => {
	return localStorage.removeItem(key);
};
