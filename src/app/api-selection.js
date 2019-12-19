import {Component}  from 'preact';
import {TextSelect} from '../components/text-select';
import './api-selection.scss';

export class APISelection extends Component {

    state = {
        selectedAPI: 1,
        apiList: [
            {label: 'Collator', disabled: false},
            {label: 'DateTimeFormat', disabled: false},
            {label: 'ListFormat', disabled: false},
            {label: 'NumberFormat', disabled: false},
            {label: 'PluralRules', disabled: false},
            {label: 'RelativeTimeFormat', disabled: false}
        ]
    };

    selectAPI = newIndex => {
        const {state} = this;

        this.setState({
            ...state,
            selectedAPI: newIndex
        });

        this.props.onSelect(state.apiList[newIndex].label);
    };

    componentDidMount() {
        const {apiList, selectedAPI} = this.state;
        this.props.onSelect(apiList[selectedAPI].label);
    }

    render(_, {selectedAPI, apiList}) {
        return (
            <div id="api-selection">
                <p>Intl.</p>
                <TextSelect options={apiList} selected={selectedAPI} onSelect={this.selectAPI}/>
            </div>
        );
    }
}
