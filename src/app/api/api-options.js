import {Component}          from 'preact';
import {observer}           from 'mobx-preact';
import {index}              from '../../state';
import {resolveFormElement} from '../../components/form/form';
import {classnames}         from '../../js/classnames';
import './api-options.scss';

@observer
export class APIOptions extends Component {
    state = {
        collapsed: false
    };

    updateOption = name => value => {
        index.options[name] = value;
    };

    toggleCollapse = () => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    };

    render(_, {collapsed}) {
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
                <div class="options">
                    {optionElements}
                </div>
            </div>
        );
    }
}
