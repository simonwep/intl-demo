import {observable} from 'mobx';
import apis         from '../../assets/apis';

export const index = observable({
    api: apis[Math.floor(Math.random() * apis.length)].name,
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
