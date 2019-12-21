import {render}       from 'preact';
import {APIOptions}   from './app/api/api-options';
import {APISelection} from './app/api/api-selection';
import {IntlResult}   from './app/result/intl-result';
import {IntlInput}    from './app/result/intl-input';
import './index.scss';

render(
    <div id="app">
        <div class="left">
            <APISelection/>
            <APIOptions/>
        </div>
        <p/>
        <div class="right">
            <IntlInput/>
            <IntlResult/>
        </div>
    </div>,
    document.body
);

