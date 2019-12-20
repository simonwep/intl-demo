import base        from './base.scss';
import {Component} from 'preact';

export class FormTextField extends Component {

    onChange = e => {
        this.props.onInput(e.target.value);
    };

    render({value, placeholder}) {
        return (
            <input class={base['form-element']}
                placeholder={placeholder || 'Enter value here'}
                value={value}
                onInput={this.onChange}/>
        );
    }
}
