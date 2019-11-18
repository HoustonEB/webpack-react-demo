import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import c from 'classnames';
import './style.use.less';

const DATE_COL = 7;
export default class ModalPopup extends Component {
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
        let firstDayOfWeek = localData.firstDayOfWeek();
        let weekDays = [];
        const now = moment();
        for (let index = 0; index < DATE_COL; index++) {
            let dayIndex = (firstDayOfWeek + index) % DATE_COL;
            now.day(dayIndex);
            weekDays[index] = localData.weekdaysMin(now);
        }
        console.log(weekDays, 'now')
        const headerClass = this.dateClass + '-header';
        const headerRowClass = `${headerClass}-row`;
        const headerCellClass = `${headerClass}-cell`;
        return (
            <thead className={headerClass}>
            <tr className={headerRowClass}>
                {
                    weekDays.map((day, idx) => {
                        return (
                            <th
                                key={idx}
                                className={headerCellClass}>
                                <span className={`${headerCellClass}-content`}>{day}</span>
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
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
            <div className={c(classPrefix,'-calendar-wrapper', className)}>
                {this.renderHeader()}
                <table>
                    {this.renderDateHeader()}
                    {this.renderDateBody()}
                </table>
            </div>
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