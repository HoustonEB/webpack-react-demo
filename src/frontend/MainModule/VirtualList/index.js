import React, { Component } from 'react'
// import {throttle} from 'lodash';
// import VirtualList from '../../components/VirtualList';
import './style.use.less';
import {VirtualList} from 'package-demo-yu';

export class Item extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.cachePosition(this.node, this.props.index);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.index, 'renderItem')
        // nextProps.cachePosition(this.node, nextProps.index);
    }

    render () {
        const {index, item} = this.props;

        return (
            <div className='list-item'
                 style={{ height: '60px' }}
                 ref={node => {this.node = node}}
                 key={index}>
                <p>#${index} eligendi voluptatem quisquam</p>
                <p>Modi autem fugiat maiores. Doloremque est sed quis qui nobis. Accusamus dolorem aspernatur sed rem.</p>
            </div>
        )
    }
}

export default class VirtualizedList extends Component {
    constructor (props) {
        super(props);
        this.data = new Array(1001).fill('io');
    }

    renderItem(cachePosition, index) {
        return (
            <Item
                key={index}
                cachePosition={cachePosition}
                index={index}
            />
        )
    }

    render () {
        return (
            <div className='wrapper' ref={node => { this.wrapper = node }}>
                <VirtualList
                    data={this.data}
                    rowCount={10}
                    renderItem={this.renderItem}/>
            </div>
        )
    }
}