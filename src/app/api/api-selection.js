import {Component}    from 'preact';
import {FormDropDown} from '../../components/form/form-drop-down';
import apis           from '../../../assets/apis';
import {index}        from '../../state';
import {observer}     from 'mobx-preact';
import './api-selection.scss';

@observer
export class APISelection extends Component {

    state = {
        apiList: apis.map(v => v.name)
    };

    selectAPI = newAPI => {
        index.setAPI(newAPI);
    };

    render(_, {apiList}) {
        return (
            <div id="api-selection">
                <FormDropDown values={apiList}
                    value={index.api}
                    onSelect={this.selectAPI}/>
            </div>
        );
    }
}
