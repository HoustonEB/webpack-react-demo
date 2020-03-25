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
        this.renderScatterplot();
        this.renderPie();
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
        console.log(x, '12')
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
        let p = 30;
        let data = [10, 22, 33, 90, 34, 65, 72, 23, 200, 100, 80, 20, 34];
        let svg = d3.selectAll('.bar-content')
            .append('svg')
            .attr('width', w)
            .attr('height', h);
        let x = d3.scaleLinear().domain([0, data.length]).range([p, w - p]);
        let y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d;
        })]).range([h - p, p]);
        let xAxis = d3.axisBottom(x).ticks(5, 's');
        let yAxis = d3.axisLeft(y).ticks(3);

        svg.append('g').attr('transform', 'translate(0, ' + (h - p) + ')').call(xAxis);
        svg.append('g').attr('transform', 'translate(' + p + ', 0)').call(yAxis);

        // 创建组
        svg.selectAll('.rect-wrapper')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
                return x(i)
            })
            .attr('y', function (d, i) {
                return y(0)
            })
            .attr('width', w / data.length - 10)
            .attr('height', function (d) {
                return 0;
            })
            .on('mouseover', function () {
                d3.select(this)
                    .attr('fill', 'red')
                    .attr('opacity', '.5')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('fill', 'red')
                    .attr('opacity', '1')
            })
            .transition()
            .duration(500)
            .ease(d3.easeCircle)
            .delay(function (d, i) {
                return i * 100
            })
            .attr('y', function (d, i) {
                return y(d)
            })
            .attr('height', function (d) {
                return h - p - y(d);
            })
            .attr('fill', 'red');
        svg.selectAll('.bar-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'text')
            .attr('x', function (d, i) {
                return x(i) + p / 2 - 3
            })
            .text(function (d) {
                return d;
            })
            .attr('y', function (d) {
                return y(0)
            })
            .transition()
            .duration(500)
            .ease(d3.easeCircle)
            .attr('y', function (d) {
                return y(d) - 5
            })
            .delay(function (d, i) {
                return i * 100
            })
            .attr('fill', 'orange')
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
    }

    renderScatterplot() {
        let data = new Array(10).fill(1).map(() => {
            return [Math.ceil(Math.random(0, 1) * 200), Math.ceil(Math.random(0, 1) * 200)]
        });
        let w = 400;
        let h = 400;
        let p = 30;
        let r = 10;
        let x = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d[0]
        })]).range([p, w - p]);
        let y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
            return d[1]
        })]).range([h - p, p]);
        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y).ticks(5);
        let svg = d3.selectAll('.scatterplot-content')
            .append('svg')
            .attr('width', w)
            .attr('height', h);
        svg.append('g').call(xAxis).attr('transform', 'translate(0,' + (h - p) + ')');
        svg.append('g').call(yAxis).attr('transform', 'translate(' + p + ',0)');
        svg.selectAll('.circle-g')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return x(d[0])
            })
            .attr('cy', function (d) {
                return y(d[1])
            })
            .attr('r', 0)
            .on('mouseover', function () {
                d3.select(this)
                // .attr('fill', '#b71ed7')
                    .transition()
                    .duration(400)
                    .ease(d3.easeBounce)
                    .attr('r', 1.5 * r)
                    .attr('fill', '#b71ed7')
            })
            .on('mouseleave', function () {
                d3.select(this)
                    .transition()
                    .duration(400)
                    .ease(d3.easeBounce)
                    .attr('r', r)
                    .attr('fill', 'orange')
            })
            .transition()
            .duration(500)
            .delay(function (d, i) {
                return i * 100
            })
            .attr('r', r)
            .attr('fill', 'orange');
        svg.selectAll('.circle-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'text')
            .text(function (d) {
                return d[0] + ',' + d[1]
            })
            .attr('x', function (d) {
                return x(d[0])
            })
            .attr('y', function (d) {
                return y(d[1])
            })
            .attr('font-size', '12px')
        console.log(data, 'data')
    }

    renderPie() {
        let data = [
            {name: 'Chrome', value: 72.5},
            {name: 'IE', value: 5.3},
            {name: 'Firefox', value: 16.3},
            {name: 'Safari', value: 3.5},
            {name: 'Opera', value: 1.0},
            {name: 'Others', value: 1.4}
        ];
        data.forEach((item) => {
            item.value = Math.random()
        });
        // 构建一个饼布局并接受数据
        let pie = d3.pie()
            .sort(null) // 在创建布局的时候,默认排序数据从大到小,设为null可以按照数据默认的顺序排序
            .value(function (d) {
                return d['value']
            });
        // 把数据转化为饼图绘制所需要的数据
        let pieData = pie(data);
        let w = 400;
        let h = 300;
        let p = 20;
        let svg = d3.selectAll('.pie-content')
            .append('svg')
            .attr('width', w)
            .attr('height', h);
        let outerRadius = (Math.min(w, h) - 2 * p) / 2;
        let innerRadius = 0;
        let arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        let arcs = svg.selectAll('g')
            .data(pieData)
            .enter()
            .append('g')
            .attr('transform', 'translate('+ w/2 + ',' + h/2 +')');
        let colors = d3.schemeCategory10;
        arcs.append('path')
            .attr('transform', 'scale(.5)')
            .on('mouseover', function() {
                d3.select(this)
                    .transition()
                    .ease(d3.easeBounceOut)
                    .duration(500)
                    .attr('transform', 'scale(1.1)')
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .transition()
                    .ease(d3.easeBounceOut)
                    .duration(500)
                    .attr('transform', 'scale(1)')
            })
            .transition()
            .ease(d3.easeBounceOut)
            .duration(1000)
            .delay(function(d, i) {return i*200})
            .attr('transform', 'scale(1)')
            .attr('fill', function (d, i) {
                return colors[i];
            })
            .attr('d', function (d) {
                return arc(d);
            });
        arcs.append('text')
            .attr('class', 'text')
            .attr('transform', function(d, i) {
                let x = arc.centroid(d)[0];
                let y = arc.centroid(d)[1];
                return 'translate(' + x + ',' + y + ')';
            })
            .attr('text-anchor', 'middle')
            .text(function(d, i) {
                let percent = (d.value/d3.sum(pieData, function(d) {return d.value;}) * 100).toFixed(1)
                return percent + '%';
            })
    }

    render() {
        const {
            className
        } = this.props;
        return (
            <div className={c('d3-bar-wrapper', className)}>
                <div className={'grid-content'}></div>
                <div className={'bar-content'}></div>
                <div className={'scatterplot-content'}></div>
                <div className={'pie-content'}></div>
            </div>
        )
    }
}