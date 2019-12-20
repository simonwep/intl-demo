import styles                 from './form-number.scss';
import base                   from './base.scss';
import {classnames}           from '../../js/classnames';
import React                  from 'preact/compat';
import {Component, createRef} from 'preact';
import {off, on}              from '../../js/event-listener';

export class FormNumber extends Component {
    eventListeners = [];
    rootEl = createRef();

    increase = this.emit.bind(this, 1);
    decrease = this.emit.bind(this, -1);

    emit(change) {
        const {onChange, value, min, max} = this.props;

        const newValue = value + change;
        if (newValue >= min && newValue <= max) {
            onChange(value + change);
        }
    }

    componentDidMount() {
        const root = this.rootEl.current;

        this.eventListeners = [
            on(root, 'wheel', e => {
                if (root.contains(document.activeElement)) {
                    this[e.deltaY > 0 ? 'increase' : 'decrease']();
                    e.preventDefault();
                }
            })
        ];
    }

    componentWillUnmount() {
        this.eventListeners.forEach(off);
    }

    render({value, min, max}) {

        return (
            <div class={classnames({
                [base['form-element']]: true,
                [styles['form-number']]: true
            })} ref={this.rootEl}>
                <button class={classnames({
                    [styles.decrease]: true,
                    [styles.disabled]: (value - 1) < min
                })} onClick={this.decrease}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                            d="M 24.990234 8.9863281 A 1.0001 1.0001 0 0 0 24.292969 9.2929688 L 15 18.585938 L 5.7070312 9.2929688 A 1.0001 1.0001 0 0 0 4.9902344 8.9902344 A 1.0001 1.0001 0 0 0 4.2929688 10.707031 L 14.292969 20.707031 A 1.0001 1.0001 0 0 0 15.707031 20.707031 L 25.707031 10.707031 A 1.0001 1.0001 0 0 0 24.990234 8.9863281 z"/>
                    </svg>
                </button>

                <p class={styles.value}>{value}</p>

                <button class={classnames({
                    [styles.increase]: true,
                    [styles.disabled]: (value + 1) > max
                })} onClick={this.increase}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                            d="M 24.990234 8.9863281 A 1.0001 1.0001 0 0 0 24.292969 9.2929688 L 15 18.585938 L 5.7070312 9.2929688 A 1.0001 1.0001 0 0 0 4.9902344 8.9902344 A 1.0001 1.0001 0 0 0 4.2929688 10.707031 L 14.292969 20.707031 A 1.0001 1.0001 0 0 0 15.707031 20.707031 L 25.707031 10.707031 A 1.0001 1.0001 0 0 0 24.990234 8.9863281 z"/>
                    </svg>
                </button>
            </div>
        );
    }
}
