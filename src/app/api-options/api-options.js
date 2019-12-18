import { Component }     from 'preact';
import forms           from '../../../assets/api-options';
import { FormTextField } from '../../components/form/form-text-field';
import { FormSelect }    from '../../components/form/form-select';
import { FormSwitch }    from '../../components/form/form-switch';
import './api-options.scss';

/* eslint-disable no-console */

/* eslint-disable react/prefer-stateless-function */
export class APIOptions extends Component {

    render({ name }) {
        const options = forms[(name || '')];

        if (!options) {
            return (<p>Not found</p>);
        }

        const optionElements = options.map(op => {
            switch (op.type) {
            case 'text': {
                return (
                    <div class="option">
                        <p>{op.name}</p>
                        <FormTextField value={op.value || ''}
                            onInput={console.log}/>
                    </div>
                );
            }
            case 'select': {
                return (
                    <div class="option">
                        <p>{op.name}</p>
                        <FormSelect values={op.values}
                            value={op.default || null}
                            onSelect={console.log}/>
                    </div>
                );
            }
            case 'switch': {
                return (
                    <div class="option">
                        <p>{op.name}</p>
                        <FormSwitch value={op.default || Math.random() > 0.5}
                            onChange={console.log}/>
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
