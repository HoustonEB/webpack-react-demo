import React, {Component} from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import './style.use.less';

export default class Breadcrumb extends Component {
    static propTypes = {
        route: PropTypes.object,
        className: PropTypes.string
    };

    static defaultProps = {
        classPrefix: 'ONCE'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            classPrefix,
            className,
            route
        } = this.props;
        let linkArr = route.pathname.split('/').filter(item => item);
        let path = '#/';

        return (
            <div className={c(`${classPrefix}-breadcrumb-wrapper`, className)}>
                {
                    linkArr.map((item, index) => {
                        path += item + '/';
                        return (
                            <a key={index} href={path}>{item} {index >= linkArr.length - 1 ? null : '>'} </a>
                        )
                    })
                }
            </div>
        )
    }
}