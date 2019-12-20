import {Component} from 'preact';
import {observer}  from 'mobx-preact';
import {index}     from '../../state';
import apis        from '../.././../assets/apis';
import './intl-result.scss';

@observer
export class IntlResult extends Component {

    render() {
        const {api, options, input} = index;

        return (
            <div id="intl-result">
                <p>{execResult(api, options, input)}</p>
            </div>
        );
    }
}

function execResult(api, options, input) {
    const {locales = 'en-US', ...rest} = options;
    const apiTarget = apis.find(v => v.name === api);
    const serializedOptions = {};
    const seralizedConfig = {};

    for (const {name, value} of apiTarget.input) {
        serializedOptions[name] = input[name] || value;
    }

    for (const {name, value} of apiTarget.options) {
        seralizedConfig[name] = rest[name] || value;
    }

    try {
        switch (api) {
            case 'Collator': {
                return serializedOptions.values.split(/,/g)
                    .sort(new Intl.Collator(locales, seralizedConfig).compare)
                    .join(', ');
            }
            case 'DateTimeFormat': {
                return new Intl.DateTimeFormat(locales, seralizedConfig).format(new Date(
                    serializedOptions.year,
                    serializedOptions.month,
                    serializedOptions.day,
                    serializedOptions.hours,
                    serializedOptions.minutes,
                    serializedOptions.seconds,
                    serializedOptions.milliseconds
                ));
            }
            case 'ListFormat': {
                return new Intl.ListFormat(locales, seralizedConfig)
                    .format(serializedOptions.values.split(/,/g));
            }
            case 'NumberFormat': {
                return new Intl.NumberFormat(locales, seralizedConfig)
                    .format(serializedOptions.value);
            }
            case 'PluralRules': {
                return new Intl.PluralRules(locales, seralizedConfig)
                    .select(serializedOptions.value);
            }
            case 'RelativeTimeFormat': {
                return new Intl.RelativeTimeFormat(locales, seralizedConfig)
                    .format(serializedOptions.value, serializedOptions.unit);
            }
        }
    }
    catch (e) {
        return e.message;
    }
}
