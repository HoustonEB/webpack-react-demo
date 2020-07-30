import React, {Component} from 'react';
import VirtualList from '../';
import './style.use.less';

export class Item extends Component {
    static demoKey = 'VirtualListNormal';
    static demoName = 'VirtualList-Normal';

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

export default class Demo extends Component {
    static demoKey = 'VirtualListNormal';
    static demoName = 'VirtualList-Normal';

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