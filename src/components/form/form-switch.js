import base         from './base.scss';
import styles       from './form-switch.scss';
import {classnames} from '../../js/classnames';

export function FormSwitch({value, onChange}) {
    return (
        <button className={classnames({
            [base['form-element']]: true,
            [styles['form-switch']]: true,
            [styles.selected]: value
        })}
        onClick={onChange}/>
    );
}
