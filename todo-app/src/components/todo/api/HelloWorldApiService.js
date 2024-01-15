import { apiClient } from './ApiClient';
export const retriveHelloWorkdBean = () => apiClient.get('hello-world-bean');

export const retriveHelloWordPath = (username) => apiClient.get(`hello-world/path-variable/${username}`);



