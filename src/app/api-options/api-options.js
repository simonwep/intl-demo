import {Component}     from 'preact';
import forms           from '../../../assets/api-options';
import {FormTextField} from '../../components/form/form-text-field';
import {FormSelect}    from '../../components/form/form-select';
import {FormSwitch}    from '../../components/form/form-switch';
import {FormNumber}    from '../../components/form/form-number';
import {TextSelect}    from '../../components/form/text-select';
import './api-options.scss';

/* eslint-disable no-console */

/* eslint-disable react/prefer-stateless-function */
export class APIOptions extends Component {

    state = {
        options: {}
    };

    updateOption = name => value => {
        this.setState({
            ...this.state,
            options: {
                ...this.state.options,
                [name]: value
            }
        });
    };

    render({name}, {options}) {
        const baseOptions = forms[(name || '')];

        if (!baseOptions) {
            return (<p>Not found</p>);
        }

        const optionElements = baseOptions.map(op => {
            const updateFunc = this.updateOption(op.name);
            const currentValue = options[op.name] || null;

            switch (op.type) {
                case 'text': {
                    return (
                        <div class="option">
                            <p>{op.name}</p>
                            <FormTextField value={currentValue || op.value || ''}
                                onInput={updateFunc}
                                data-name={op.name}/>
                        </div>
                    );
                }
                case 'select': {
                    return (
                        <div class="option">
                            <p>{op.name}</p>
                            <FormSelect values={op.values}
                                value={currentValue || op.default || null}
                                onSelect={updateFunc}
                                data-name={op.name}/>
                        </div>
                    );
                }
                case 'drop-down': {
                    return (
                        <div class="option">
                            <p>{op.name}</p>
                            <TextSelect values={op.values}
                                value={currentValue || op.default || null}
                                onSelect={updateFunc}
                                data-name={op.name}/>
                        </div>
                    );
                }
                case 'switch': {
                    return (
                        <div class="option">
                            <p>{op.name}</p>
                            <FormSwitch value={currentValue || op.default}
                                onChange={updateFunc}
                                data-name={op.name}/>
                        </div>
                    );
                }
                case 'number': {
                    return (
                        <div class="option">
                            <p>{op.name}</p>
                            <FormNumber value={currentValue || op.value}
                                min={op.min}
                                max={op.max}
                                onChange={updateFunc}/>
                        </div>
                    );
                }
                default: {
                    return (<p>Unknown option: {op.type}</p>);
                }
            }
        });

        return (
            <div id="api-options">
                {optionElements}
            </div>
        );
    }
}
