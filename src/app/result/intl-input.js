import {Component}          from 'preact';
import {observer}           from 'mobx-preact';
import {index}              from '../../state';
import apis                 from '../../../assets/apis';
import {resolveFormElement} from '../../components/form/form';
import './intl-input.scss';

@observer
export class IntlInput extends Component {
    updateInput = name => value => {
        index.input[name] = value;
    };

    render() {
        const {input} = apis.find(v => v.name === index.api);

        const inputs = input.map(op => {
            const currentValue = index.input[op.name];

            return resolveFormElement({
                option: op,
                onUpdate: this.updateInput(op.name),
                currentValue: currentValue !== undefined ? currentValue : op.value
            });
        });

        return (
            <div id="intl-input">
                {inputs}
            </div>
        );
    }
}
