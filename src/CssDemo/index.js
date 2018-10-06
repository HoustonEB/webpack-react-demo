import React, {Component} from 'react';
import './style.use.less';
import {Card} from 'antd';
import TextDisposeDraw from '../component/draw';
import GradientDraw from '../component/draw';
import TextDisposeMd from './文本处理.md';
import Gradient from './渐变.md';

const md = require('markdown-it')({
    html: false
});
const result1 = md.render(TextDisposeMd);
const result2 = md.render(Gradient);

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

export default class CssDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowTextDispose: false,
            isShowGradient: false,
        };
        this.showTextDispose = this.showTextDispose.bind(this);
        this.showGradient = this.showGradient.bind(this);
    }

    showTextDispose() {
        this.setState({
            isShowTextDispose: true
        });
    }

    showGradient() {
        this.setState({
            isShowGradient: true
        });
    }

    componentDidMount() {}

    componentWillUnmount() {
        // this.setState({
        //     isShowTextDispose: false
        // });
    }

    renderTextDispose(show) {
        return (
            <TextDisposeDraw enable={show} text={result1}/>
        )
    }

    renderGradient(show) {
        return (
            <GradientDraw enable={show} text={result2}/>
        )
    }

    render() {
        return (
            <div>
                <Card title="Card Title">
                    <Card.Grid style={gridStyle} onClick={this.showTextDispose}>文本处理</Card.Grid>
                    <Card.Grid style={gridStyle} onClick={this.showGradient}>渐变</Card.Grid>
                    {/*<Card.Grid style={gridStyle}>Content</Card.Grid>*/}
                    {/*<Card.Grid style={gridStyle}>Content</Card.Grid>*/}
                    {/*<Card.Grid style={gridStyle}>Content</Card.Grid>*/}
                    {/*<Card.Grid style={gridStyle}>Content</Card.Grid>*/}
                    {/*<Card.Grid style={gridStyle}>Content</Card.Grid>*/}
                </Card>
                {this.state.isShowTextDispose ? this.renderTextDispose(true) : this.renderTextDispose(false)}
                {this.state.isShowGradient ? this.renderGradient(true) : this.renderGradient(false)}
            </div>
        )
    }
}