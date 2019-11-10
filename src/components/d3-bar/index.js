import React, {Component} from 'react';
import * as d3 from 'd3';
import c from 'classnames';
import './style.use.less';

export default class Button extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.renderGrid();
        this.renderBar();
    }

    renderGrid() {
        let w = 300;
        let h = 200;
        let p = 10;
        // let data = d3.range(10);

        let svg = d3.selectAll('.grid-content')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        let x = d3.scaleLinear().domain([0, 1]).range([p, w - p]);
        let y = d3.scaleLinear().domain([0, 1]).range([h - p, p]);
        console.log(x.ticks(5))
        let grid = svg.selectAll('.grid').data(x.ticks(5)).enter().append('g').attr('class', 'grid-line');
        console.log(x,'12')
        grid.append("line")
            .transition()
            .duration(3000)
            // .ease('linear')
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", p)
            .attr("y2", h - p);

        grid.append("line")
            .transition()
            .duration(3000)
            // .ease('linear')
            .attr("y1", y)
            .attr("y2", y)
            .attr("x1", p)
            .attr("x2", w - p);
    }

    renderBar() {
        let w = 400;
        let h = 300;
        let p = 10;
        let data = [10, 22, 33, 90, 34, 65, 72, 23, 200, 100, 80, 20, 34];
        let svg = d3.selectAll('.bar-content')
            .append('svg')
            .attr('width', w)
            .attr('height', h);
        let x = d3.scaleLinear().domain([0, data.length]).range([p, w - p]);
        let y = d3.scaleLinear().domain([0, d3.max(data, function(d) {return d;})]).range([h - p, p]);
        let xAxis = d3.axisBottom(x).ticks(5, 's');
        let yAxis = d3.axisRight(y).ticks(3);
        svg.append('g').attr('transform', 'translate(0, ' + (h - p - 5) + ')').call(xAxis);
        svg.append('g').attr('transform', 'translate(10, -20)').call(yAxis);
        svg.selectAll('rect-wrapper')
            .data(data)
            .enter()
            .append('rect')
            // .attr('x', function(d, i) {return i * (w/data.length)})
            .attr('x', function(d, i) {return x(i)})
            // .attr('y', function(d, i) {return h - d * 4})
            .attr('y', function(d, i) {return y(d)})
            .transition()
            .duration(1000)
            .attr('width', w/data.length - p)
            .attr('height', function(d) {return h - y(d);})
            .attr('fill', 'red')
            .attr('transform', 'translate(0, -20)')
    }

    render() {
        const {
            className
        } = this.props;
        return (
            <div className={c('d3-bar-wrapper', className)}>
                <div className={'grid-content'}>
                </div>
                <div className={'bar-content'}>

                </div>
            </div>
        )
    }
}