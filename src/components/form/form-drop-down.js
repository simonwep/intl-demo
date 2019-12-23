import {Component, createRef} from 'preact';
import styles                 from './form-drop-down.scss';
import base                   from './base.scss';
import {classnames}           from '../../js/classnames';
import Popper                 from 'popper.js';
import {off, on}              from '../../js/event-listener';
import {eventPath}            from '../../js/event-path';

export class FormDropDown extends Component {
    popperContainer = createRef();
    popperReference = createRef();
    popperInstance = null;
    listener = [];

    state = {
        open: false
    };

    toggle = e => {
        const {open} = this.state;

        if (!open) {
            e.stopImmediatePropagation();
        }

        this.setState({
            ...this.state,
            open: !open
        });
    };

    selectValue = e => {
        this.toggle(false);
        this.props.onSelect(e.target.dataset.value);
    };

    componentDidMount() {
        const popperRef = this.popperReference.current;
        const popperCon = this.popperContainer.current;

        this.popperInstance = new Popper(
            popperCon,
            popperRef,
            {
                placement: 'bottom',
                positionFixed: true,
                flip: [
                    'top', 'left', 'bottom', 'right'
                ],
                modifiers: {
                    preventOverflow: {
                        boundariesElement: document.getElementById('app')
                    }
                }
            }
        );

        // Close if user clicks outside of it
        this.listener = [
            on(window, 'click', e => {
                if (this.state.open && !eventPath(e).includes(popperRef)) {
                    this.toggle();
                }
            })
        ];
    }

    componentWillUnmount() {
        this.popperInstance.destroy();

        for (const args of this.listener) {
            off(...args);
        }
    }

    render({values = [], value = null}, {open}) {
        return (
            <div ref={this.popperContainer}
                 class={classnames({
                     [styles['drop-down']]: true,
                     [base['form-element']]: true
                 })}>
                <p onClick={this.toggle}>{value}</p>

                <div ref={this.popperReference}
                     class={classnames({
                         [styles.options]: true,
                         [styles.visible]: open
                     })}>

                    {values.map(v => (
                        <p data-value={v}
                           onClick={this.selectValue}
                           class={classnames({
                               [styles.selected]: v === value
                           })}>
                            {v}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
}
