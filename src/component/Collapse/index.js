import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.use.less';

export default class View extends Component {
    static propTypes = {
        collapseData: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            showContent: true,
            openIndex: 0
        };
        // this.handleClickItem = this.handleClickItem.bind(this);
    }

    handleClickItem(e, index) {
        console.log(e, this.content, '23')
        if (this.props.collapseMode) {
            e.target.nextSibling ? e.target.nextSibling.classList.toggle('open') : null;
        } else{
            if (this.state.openIndex === index) {
                return false;
            } else {
                this.setState({
                    // showContent: !this.state.showContent,
                    openIndex: index
                });
            }
        }
    }

    // shouldComponentUpdate(preProps, nextProps) {
    //     console.log('should', preProps, nextProps)
    // }

    renderCollapseItem() {
        return (
            this.props.collapseMode ? this.props.collapseData.map((item, index) => {
                return (
                   <li
                       key={index}
                       ref={dom => {this.content = dom}}
                       onClick={(e) => this.handleClickItem(e, index)}
                   >
                       <div className={'title'}>{item.title}</div>
                       <div className={`content`}>{Math.random(0, 100)}</div>
                   </li>
                )
            }) : this.props.collapseData.map((item, index) => {
                return (
                    <li
                        key={index}
                        onClick={this.handleClickItem.bind(this, index)}
                    >
                        <div className={'title'}>{item.title}</div>
                        <div className={`content ${this.state.openIndex === index ? 'open' : 'close'}`}>{Math.random(0, 100)}</div>
                    </li>
                )
            })
        )
    }

    render () {
        return (
            <div className={'collapse-wrapper'}>
                <ul>
                    {this.renderCollapseItem()}
                </ul>
            </div>
        )
    }
}