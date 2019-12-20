import {Component, createRef} from 'preact';
import styles                 from './form-drop-down.scss';
import {classnames}           from '../../js/classnames';
import Popper                 from 'popper.js';

export class FormDropDown extends Component {
    popperContainer = createRef();
    popperReference = createRef();
    popperInstance = null;

    state = {
        open: false
    };

    toggle = open => {
        this.setState({
            ...this.state,
            open: typeof open === 'undefined' ? !this.state.open : open
        });
    };

    selectValue = e => {
        this.toggle(false);
        this.props.onSelect(e.target.dataset.value);
    };

    componentDidMount() {
        this.popperInstance = new Popper(
            this.popperContainer.current,
            this.popperReference.current,
            {
                placement: 'bottom-end',
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
    }

    componentWillUnmount() {
        this.popperInstance.destroy();
    }

    render({values = [], value = null}, {open}) {
        return (
            <div ref={this.popperContainer} className={styles.root}>
                <p onClick={this.toggle}>{value}</p>

                <div ref={this.popperReference}
                    className={classnames({
                        [styles.options]: true,
                        [styles.visible]: open
                    })}>


                    {values.map(v => (
                        <p data-value={v}
                            onClick={this.selectValue}>
                            {v}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
}
