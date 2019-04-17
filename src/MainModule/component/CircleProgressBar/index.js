import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import './style.use.less';

@observer
export default class CircleProgressBar extends Component {
@observable progressNum = 0;

  constructor(props) {
    super(props);
    this.progressNum = this.props.progressNum;
    console.log(this.props.progressNum, 'num1');
  }

  componentWillReceiveProps(props) {
    // 注意: this.props.progressNum是旧值.新值从形参props获取
    this.progressNum = props.progressNum;
    let leftCircle = document.querySelector('.circle-progress-bar-wrapper .left-circle');
    let rightCircle = document.querySelector('.circle-progress-bar-wrapper .right-circle');
    console.log(this.props.progressNum, 'num2');
    if (this.progressNum <= 50) {
      leftCircle.style.transform = `rotate(-225deg)`;
      rightCircle.style.transform = `rotate(${(-225 + 360 * this.progressNum/100)}deg)`;
    } else {
      leftCircle.style.transform = `rotate(${(-45 + 360 * this.progressNum/100)}deg)`;
      rightCircle.style.transform = `rotate(-45deg)`;
    }
    this.forceUpdate()
  }

  renderCircle() {
    return (
     <div className={'circle-progress-bar-wrapper'}>
        <div className={'left-circle-wrapper'}>
        <div className={'left-circle'}></div>
      </div>
      <div className={'process-num'}><span>{this.progressNum}</span></div>
      <div className={'right-circle-wrapper'}>
        <div className={'right-circle'}></div>
      </div>
     </div>
    )
  }

  render() {
    return (
        this.renderCircle()
    )
  }
}