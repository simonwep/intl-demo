import { APIOptions }   from './app/api-options/api-options';
import { APISelection } from './app/api-selection';
import { Component }    from 'preact';
import './index.scss';

export default class App extends Component {

    state = {
        chosenAPI: null
    };

    changeAPI = name => {
        this.setState({
            ...this.state,
            chosenAPI: name
        });
    };

    render(_, { chosenAPI }) {
        return (
            <div id="app">
                <APISelection onSelect={this.changeAPI}/>
                <APIOptions name={chosenAPI}/>
            </div>
        );
    }
}
