import axios from 'axios';
import config from '../config.json';

const req = async (method, endPoint, data = {}) => {

    let instance;
    let resp;

    instance = axios.create({
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': typeof sessionStorage !== "undefined" ? sessionStorage.getItem('token') : ''
        }
    });

    resp = await instance[method](config.apiURL + endPoint, data);


    return resp;
};

export default req;