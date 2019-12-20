import {observable} from 'mobx';
import apis         from '../../assets/apis';

const locationHash = location.hash.slice(1).trim().toLowerCase();
const targetAPI = locationHash && apis.find(v => v.name.toLowerCase() === locationHash);

export const index = observable({
    api: targetAPI ? targetAPI.name : apis[Math.floor(Math.random() * apis.length)].name,

    options: {},
    input: {},

    setAPI(val) {
        this.options = {};
        this.input = {};
        this.api = val;
    },

    getAPI() {
        return apis.find(v => v.name === this.api);
    }
});
