import React, {Component} from 'react';
import Draw from '../';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class Demo extends Component {
    static demoKey = 'DrawNormal';
    static demoName = 'Draw-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Draw enable={true}/>
            </div>
        )
    }
}