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

    selectAPI = name => {
        index.setAPI(name);
    };

    render(_, {apiList}) {
        const {name, links} = index.getAPI();

        return (
            <div id="api-selection">
                <FormDropDown values={apiList}
                              value={name}
                              onSelect={this.selectAPI}/>
                <a href={links.params}>
                    <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0,0h48v48H0V0z M41.9,22c0-0.7-0.1-1.4-0.2-2.2c0-0.4-0.2-0.7-0.4-1c-0.3-0.3-0.6-0.6-1-0.7c-0.8-0.3-1.6-0.7-2.4-1c-1.2-0.4-2.3-0.9-3.3-1.5c-0.7-0.4-1.2-1.1-1.3-2c-0.1-0.9-0.7-1.8-1.5-2.2c-0.9-0.5-2-0.6-3-0.4c-0.7,0.2-1.5,0.2-2.2,0l-1.1-0.3l-0.3-0.1l-0.9-0.3c-1.6-0.5-2.2-0.7-4.8-0.3c-2.7,0.6-5.1,2-7.1,3.9l-6.4,6.8h5.7l-3.5,3.7h6l-3.5,3.7h4.8l-1.5,4.1c5.9,6.1,12.3,7.3,12.3,7.3c0-1.7,0.4-8.2,0.8-9.3c0.2-0.6,0.4-1.1,0.8-1.5c0.8-1,2.1-1.6,3.4-1.5c1.3,0,2.6,0.2,3.8,0.7c0.7,0.3,1.6,0.3,2.3-0.1c0.5-0.3,1-0.6,1.5-0.9c0.2-0.1,0.4-0.2,0.6-0.2c0.5,0.1,1.1-0.2,1.3-0.7c0.2-0.3,0.3-0.6,0.5-1C41.7,24,41.9,23,41.9,22L41.9,22z"/>
                    </svg>

                </a>
            </div>
        );
    }
}
