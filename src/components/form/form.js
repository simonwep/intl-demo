import {FormSelect}    from './form-select';
import {FormDropDown}  from './form-drop-down';
import {FormSwitch}    from './form-switch';
import {FormNumber}    from './form-number';
import {FormTextField} from './form-text-field';
import style           from './form.scss';

export function resolveFormElement({option, currentValue, onUpdate}) {
    switch (option.type) {
        case 'text': {
            return (
                <div class={style.option}>
                    <p>{option.name}</p>
                    <FormTextField value={currentValue}
                        onInput={onUpdate}
                        data-name={option.name}/>
                </div>
            );
        }
        case 'select': {
            return (
                <div class={style.option}>
                    <p>{option.name}</p>
                    <FormSelect values={option.values}
                        value={currentValue}
                        onSelect={onUpdate}
                        data-name={option.name}/>
                </div>
            );
        }
        case 'drop-down': {
            return (
                <div class={style.option}>
                    <p>{option.name}</p>
                    <FormDropDown values={option.values}
                        value={currentValue}
                        onSelect={onUpdate}
                        data-name={option.name}/>
                </div>
            );
        }
        case 'switch': {
            return (
                <div class={style.option}>
                    <p>{option.name}</p>
                    <FormSwitch value={currentValue}
                        onChange={onUpdate}
                        data-name={option.name}/>
                </div>
            );
        }
        case 'number': {
            return (
                <div class={style.option}>
                    <p>{option.name}</p>
                    <FormNumber value={currentValue}
                        min={typeof option.min === 'number' ? option.min : Number.MIN_SAFE_INTEGER}
                        max={typeof option.max === 'number' ? option.max : Number.MAX_SAFE_INTEGER}
                        onChange={onUpdate}/>
                </div>
            );
        }
        default: {
            throw new Error(`Unknown option: ${option.type}`);
        }
    }
}
