import {observable} from 'mobx';

export const index = observable({
    api: 'ListFormat',
    options: {},
    input: {},

    setAPI(val) {
        this.options = {};
        this.input = {};
        this.api = val;
    }
});
