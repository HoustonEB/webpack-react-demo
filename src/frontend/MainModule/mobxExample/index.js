import React, {Component} from 'react';
import {data, getData} from '../../global/utils/data';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
export default class mobx extends Component {
    @observable ui = 'sd';

    constructor(props) {
        super(props);
        data();
        this.init();
    }

    init() {
        setTimeout(action(() => {
            this.ui = '12'
        }), 1000)
    }

    render() {
        return <div>
            {getData()}
            {/*{this.ui}*/}
        </div>
    }
}