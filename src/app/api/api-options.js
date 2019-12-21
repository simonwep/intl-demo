import {Component}          from 'preact';
import {observer}           from 'mobx-preact';
import {index}              from '../../state';
import './api-options.scss';
import {resolveFormElement} from '../../components/form/form';

@observer
export class APIOptions extends Component {
    updateOption = name => value => {
        index.options[name] = value || undefined; // Empty strings and null would throw an error
    };

    render() {
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
            <div id="api-options">
                {optionElements}
            </div>
        );
    }
}
