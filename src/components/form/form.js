import {FormSelect}    from './form-select';
import {FormDropDown}  from './form-drop-down';
import {FormSwitch}    from './form-switch';
import {FormNumber}    from './form-number';
import {FormTextField} from './form-text-field';
import style           from './form.scss';

const resolveValue = (updateListener, values) =>
        index => updateListener(values[index]);

export function resolveFormElement({option, currentValue, onUpdate}) {
    switch (option.type) {
        case 'text': {
            return (
                <div class={style.option}>
                    <code>{option.name}</code>
                    <FormTextField value={currentValue}
                                   onInput={onUpdate}
                                   placeholder={option.value}
                                   data-name={option.name}/>
                </div>
            );
        }
        case 'select': {
            return (
                <div class={style.option}>
                    <code>{option.name}</code>
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
                    <code>{option.name}</code>
                    <FormDropDown value={option.values.indexOf(currentValue)}
                                  onSelect={resolveValue(onUpdate, option.values)}
                                  data-name={option.name}>
                        {option.values.map(v => <p>{v}</p>)}
                    </FormDropDown>
                </div>
            );
        }
        case 'switch': {
            return (
                <div class={style.option}>
                    <code>{option.name}</code>
                    <FormSwitch value={currentValue}
                                onChange={onUpdate}
                                data-name={option.name}/>
                </div>
            );
        }
        case 'number': {
            return (
                <div class={style.option}>
                    <code>{option.name}</code>
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
