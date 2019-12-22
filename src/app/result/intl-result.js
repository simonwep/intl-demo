import {Component}  from 'preact';
import {observer}   from 'mobx-preact';
import {index}      from '../../state';
import apis         from '../.././../assets/apis';
import {computed}   from 'mobx';
import {classnames} from '../../js/classnames';
import './intl-result.scss';

@observer
export class IntlResult extends Component {

    @computed get result() {
        const {api, options, input} = index;
        let result = null, error = null;

        try {
            result = execIntl(api, options, input);
        }
 catch (e) {
            error = e.message;
        }

        return {result, error};
    }

    render() {
        const {error, result} = this.result;

        return (
            <div id="intl-result" class={classnames({
                errored: !!error
            })}>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 48 48">
                    <path fill="#F44336"
                          d="M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18C25.3,46.4,22.7,46.4,21.2,44.8z"/>
                    <path fill="#FFF"
                          d="M21.6,32.7c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.5-0.7c0.2-0.2,0.5-0.4,0.8-0.5s0.6-0.2,1-0.2s0.7,0.1,1,0.2c0.3,0.1,0.6,0.3,0.8,0.5c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.6,0.2,0.9s-0.1,0.6-0.2,0.9s-0.3,0.5-0.5,0.7c-0.2,0.2-0.5,0.4-0.8,0.5c-0.3,0.1-0.6,0.2-1,0.2s-0.7-0.1-1-0.2s-0.5-0.3-0.8-0.5c-0.2-0.2-0.4-0.4-0.5-0.7S21.6,33.1,21.6,32.7z M25.8,28.1h-3.6L21.7,13h4.6L25.8,28.1z"/>
                </svg>

                <p>{error || result}</p>
            </div>
        );
    }
}

function serialize(source, template) {
    const serialized = {};

    for (const {name, value} of template) {
        const sourceValue = source[name];
        serialized[name] = typeof sourceValue !== 'undefined' ? (sourceValue || undefined) : value;
    }

    return serialized;
}

function execIntl(api, options, input) {
    const apiTarget = apis.find(v => v.name === api);
    const {locales, ...serializedConfig} = serialize(options, apiTarget.options);
    const serializedInput = serialize(input, apiTarget.input);

    // Check if API is available
    if (typeof Intl[api] === 'undefined') {
        throw new Error(`Intl.${api} isn't supported by your browser :/\nTry another option!`);
    }

    switch (api) {
        case 'Collator': {
            return serializedInput.values.split(/,/g)
                .sort(new Intl.Collator(locales, serializedConfig).compare)
                .join(', ');
        }
        case 'DateTimeFormat': {
            return new Intl.DateTimeFormat(locales, serializedConfig).format(new Date(
                serializedInput.year,
                serializedInput.month,
                serializedInput.day,
                serializedInput.hours,
                serializedInput.minutes,
                serializedInput.seconds,
                serializedInput.milliseconds
            ));
        }
        case 'ListFormat': {
            return new Intl.ListFormat(locales, serializedConfig)
                .format(serializedInput.values.split(/,/g));
        }
        case 'Locale': {
            const inst = new Intl.Locale(locales, serializedConfig);
            const properties = [
                'baseName', 'calendar', 'collation', 'hourCycle', 'caseFirst',
                'numeric', 'numberingSystem', 'language', 'script', 'region'
            ];

            const props = [];
            for (const prop of properties) {
                props.push(`locale.${prop} = ${inst[prop] || '[unset]'}`);
            }

            return props.join('\n');
        }
        case 'NumberFormat': {
            return new Intl.NumberFormat(locales, serializedConfig)
                .format(serializedInput.value);
        }
        case 'PluralRules': {
            return new Intl.PluralRules(locales, serializedConfig)
                .select(serializedInput.value);
        }
        case 'RelativeTimeFormat': {
            return new Intl.RelativeTimeFormat(locales, serializedConfig)
                .format(serializedInput.value, serializedInput.unit);
        }
    }
}
