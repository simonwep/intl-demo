import {Component}  from 'preact';
import base         from './base.scss';
import styles       from './form-select.scss';
import {classnames} from '../../js/classnames';

export class FormSelect extends Component {

    selectItem = e => {
        this.props.onSelect(e.target.dataset.value);
    };

    render({values, value}) {
        return (
            <div className={classnames({
                [base['form-element']]: true,
                [styles['form-select']]: true
            })}>

                {values.map(v => (
                    <button
                        data-value={v}
                        onClick={this.selectItem}
                        className={
                            classnames({
                                [styles.active]: value === v
                            })
                        }>{v}</button>
                ))}

            </div>
        );
    }
}
