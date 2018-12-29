import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-cd8c8.firebaseio.com/'
});

export default instance;