import styles       from './form-number.scss';
import base         from './base.scss';
import {classnames} from '../../js/classnames';

export function FormNumber({min, max, value, decrease, increase}) {
    return (
        <div className={classnames({
            [base['form-element']]: true,
            [styles['form-number']]: true
        })}>
            <button class={classnames({
                [styles.decrease]: true,
                [styles.disabled]: (value - 1) < min
            })} onClick={decrease}>-1
            </button>

            <p class={styles.value}>{value}</p>

            <button class={classnames({
                [styles.increase]: true,
                [styles.disabled]: (value + 1) > max
            })} onClick={increase}>+1
            </button>
        </div>
    );
}
