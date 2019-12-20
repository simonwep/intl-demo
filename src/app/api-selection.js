import {Component}  from 'preact';
import {TextSelect} from '../components/text-select';
import './api-selection.scss';

export class APISelection extends Component {

    state = {
        selectedAPI: 'DateTimeFormat',
        apiList: [
            'Collator', 'DateTimeFormat', 'ListFormat',
            'NumberFormat', 'PluralRules', 'RelativeTimeFormat'
        ]
    };

    selectAPI = newAPI => {
        const {state} = this;

        this.setState({
            ...state,
            selectedAPI: newAPI
        });

        this.props.onSelect(newAPI);
    };

    componentDidMount() {
        this.props.onSelect(this.state.selectedAPI);
    }

    render(_, {selectedAPI, apiList}) {
        return (
            <div id="api-selection">
                <p>Intl.</p>
                <TextSelect values={apiList}
                    value={selectedAPI}
                    onSelect={this.selectAPI}/>
            </div>
        );
    }
}
