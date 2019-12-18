import base from './base.scss';

export function FormTextField({ value, placeholder, onInput }) {
    return (
        <input class={base['form-element']}
            placeholder={placeholder || 'Enter value here'}
            value={value}
            onInput={onInput}/>
    );
}
