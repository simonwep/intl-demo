import base from './base.scss';

export class FormTextField {

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
