import {Component}    from 'preact';
import {APISelection} from './app/api-selection';
import './index.scss';

export default class App extends Component {

    changeAPI = name => {
        /* eslint-disable no-console */
        console.log(name);
    };

    render() {
        return (
            <div id="app">
                <APISelection onSelect={this.changeAPI}/>
            </div>
        );
    }
}
