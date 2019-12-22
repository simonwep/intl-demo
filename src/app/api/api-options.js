import {Component}          from 'preact';
import {observer}           from 'mobx-preact';
import {index}              from '../../state';
import {resolveFormElement} from '../../components/form/form';
import {classnames}         from '../../js/classnames';
import './api-options.scss';

@observer
export class APIOptions extends Component {
    state = {
        collapsed: false,
        hideAcknowledgeDefaultValue: false
    };

    updateOption = name => value => {
        index.options[name] = value;
    };

    hideAcknowledgeDefaultValue = () => {
        this.setState({
            ...this.state,
            hideAcknowledgeDefaultValue: true
        });
    };

    toggleCollapse = () => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    };

    render(_, {collapsed, hideAcknowledgeDefaultValue}) {
        const {options} = index.getAPI();

        const optionElements = options.map(op => {
            const currentValue = index.options[op.name];

            return resolveFormElement({
                option: op,
                onUpdate: this.updateOption(op.name),
                currentValue: currentValue !== undefined ? currentValue : op.value
            });
        });

        return (
            <div id="api-options" class={classnames({collapsed})}>
                <button onClick={this.toggleCollapse}>{collapsed ? 'Show' : 'Collapse'} Options</button>

                <div class={classnames({
                    'acknowledge-default-value': 1,
                    hidden: hideAcknowledgeDefaultValue
                })}>
                    <p>If a value is missing the default value is used!</p>
                    <button onClick={this.hideAcknowledgeDefaultValue}>Okay!</button>
                </div>

                <div class="options">
                    {optionElements}
                </div>
            </div>
        );
    }
}
