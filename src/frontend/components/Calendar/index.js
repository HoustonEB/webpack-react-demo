import React, { Component } from 'react';
import { h, c, isCallable, noop } from '../utils';
import moment from 'moment';
import {ui} from '../locale';
import PropTypes from 'prop-types';
import './style.use.less';
console.log(ui, 'ui')
const DATE_ROW = 6;
const DATE_COL = 7;
export default class Calendar extends Component {
    static propTypes = {
        date: PropTypes.string,
        classPrefix: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        classPrefix: 'once',
    };

    state = {
        current: this.props.date || moment()
    };

    constructor(props) {
        super(props);
        // console.log(moment().format('YYYY-MM-DD,HH:mm:ss'), 'moment')
    }

    renderHeader() {
        return (
            <div>header</div>
        )
    }

    renderDateHeader() {
        let localData = this.localeData;
        let firstDayOfWeek = localData.firstDayOfWeek(); // 一周的第一天是星期几,英文是星期日,中文是周一.
        let weekDays = [];
        const now = moment();
        for (let index = 0; index < DATE_COL; index++) {
            let dayIndex = (firstDayOfWeek + index) % DATE_COL;
            now.day(dayIndex); // 设置时间是周几
            weekDays[index] = localData.weekdaysMin(now); // 获取传入时间是周几
            // 多余的处理
        }
        const headerClass = this.dateClass + '-header';
        const headerRowClass = `${headerClass}-row`;
        const headerCellClass = `${headerClass}-cell`;
        return (
            h.thead(headerClass, {},
                h.tr(headerRowClass, {},
                    weekDays.map((day, idx) => {
                        return (
                            <th
                                key={idx}
                                className={headerCellClass}>
                                <span className={`${headerCellClass}-content`}>{day}</span>
                            </th>
                        )
                    })
                )
            )
        )
    }

    renderDateBody() {

    }

    render() {
        const {
            classPrefix,
            className,
        } = this.props;
        return (
            h.div('', {
                className: c(classPrefix, '-calendar-wrapper', className)
            },
                this.renderHeader(),
                h.table('', {},
                    this.renderDateHeader(),
                    this.renderDateBody()
                )
            )
        )
    }

    get localeData() {
        return this.state.current.localeData();
    }

    get dateClass() {
        return this.compClass + '-date';
    }

    get compClass() {
        return this.props.classPrefix + '-calendar';
    }
}

function getThisMoment() {
    const today = moment();
    return today.locale();
}