import React, {Component} from 'react';
import Calendar from '../';
import './style.use.less';

export default class Demo extends Component {
    static demoKey = 'CalendarNormal';
    static demoName = 'Calendar-Normal';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Calendar></Calendar>
            </div>
        )
    }
}