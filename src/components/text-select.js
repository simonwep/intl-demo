import {Component}  from 'preact';
import styles       from './text-select.scss';
import {classnames} from '../js/classnames';

export class TextSelect extends Component {

    state = {
        open: false
    };

    toggle = open => {
        this.setState({
            ...this.state,
            open: typeof open === 'undefined' ? !this.state.open : open
        });
    };

    selectIndex = e => {
        this.toggle(false);
        this.props.onSelect(Number(e.target.dataset.index));
    };

    render(props, {open}) {
        const {
            options = [],
            selected = 0
        } = props;

        return (
            <div className={styles.root}>
                <p onClick={this.toggle}>{
                    options[selected].label
                }</p>

                <div
                    className={classnames({
                        [styles.options]: true,
                        [styles.visible]: open
                    })}>

                    {options.map((v, index) => (
                        <p className={classnames({
                            [styles.disabled]: v.disabled,
                            [styles.hidden]: index === selected
                        })}
                        data-index={index}
                        onClick={this.selectIndex}>
                            {v.label}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
}
