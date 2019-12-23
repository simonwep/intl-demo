import {render}       from 'preact';
import {APIOptions}   from './app/api/api-options';
import {APISelection} from './app/api/api-selection';
import {IntlResult}   from './app/result/intl-result';
import {IntlInput}    from './app/result/intl-input';
import {Footer}       from './app/footer';
import './register-service-worker';
import './index.scss';

render(
    <div id="app">
        <div class="content">
            <div className="left">
                <APISelection/>
                <APIOptions/>
            </div>
            <p/>
            <div className="right">
                <IntlInput/>
                <IntlResult/>
            </div>
        </div>
        <Footer/>
    </div>,
    document.body
);

