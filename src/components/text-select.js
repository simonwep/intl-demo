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

    selectValue = e => {
        this.toggle(false);
        this.props.onSelect(e.target.dataset.value);
    };

    render({values = [], value = null}, {open}) {
        return (
            <div className={styles.root}>
                <p onClick={this.toggle}>{value}</p>

                <div
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
