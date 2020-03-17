import {Component, createRef} from 'preact';
import styles                 from './form-drop-down.scss';
import base                   from './base.scss';
import {classnames}           from '../../js/classnames';
import {createPopper}         from '@popperjs/core';
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

    selectValue = index => () => {
        this.toggle(false);
        this.props.onSelect(index);
    };

    componentDidMount() {
        const popperRef = this.popperReference.current;
        const popperCon = this.popperContainer.current;

        this.popperInstance = createPopper(
            popperCon,
            popperRef,
            {
                strategy: 'fixed',
                placement: 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 5]
                        }
                    }
                ]
            }
        );

        // Move to initial position
        this.popperInstance.forceUpdate();

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

    render({value = null, children = []}, {open}) {
        return (
            <div ref={this.popperContainer}
                 class={classnames({
                     [base['form-element']]: true,
                     [styles['drop-down']]: true
                 })}>

                <p onClick={this.toggle}>{children[value]}</p>

                <div ref={this.popperReference}
                     class={classnames({
                         [styles.options]: true,
                         [styles.visible]: open
                     })}>

                    {children.map((v, index) => (
                        <div onClickCapture={this.selectValue(index)}
                             class={classnames({
                                 [styles.selected]: index === value
                             })}>
                            {v}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
