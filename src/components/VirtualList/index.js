import React, { Component } from 'react'
import {throttle} from 'lodash';
// import './index.less'

const height = 60;
const bufferSize = 5;

export default class VirtualList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            startOffset: 0,
            endOffset: 0,
            visibleData: []
        };

        this.startIndex = 0;
        this.endIndex = 0;
        this.scrollTop = 0;
        this.rowCount = 0;

        this.doc = null;

        // 缓存已渲染元素的位置信息
        this.cache = [];
        // 缓存锚点元素的位置信息
        this.anchorItem = {
            index: 0, // 锚点元素的索引值
            top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
            bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.cachePosition = this.cachePosition.bind(this);
    }

    cachePosition (node, index) {
        const rect = node.getBoundingClientRect();
        const top = rect.top + window.pageYOffset;
        this.cache.push({
            index,
            top,
            bottom: top + 60
        });
    }

    // 滚动事件处理函数
    handleScroll =  throttle((e) => {
        if (!this.doc) {
            // 兼容 iOS Safari/Webview
            this.doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement
        }

        const scrollTop = this.doc.scrollTop;

        if (scrollTop > this.scrollTop) {
            if (scrollTop > this.anchorItem.bottom) {
                this.updateBoundaryIndex(scrollTop);
                this.updateVisibleData()
            }
        } else if (scrollTop < this.scrollTop) {
            if (scrollTop < this.anchorItem.top) {
                this.updateBoundaryIndex(scrollTop);
                this.updateVisibleData()
            }
        }

        this.scrollTop = scrollTop
    }, 30);

    // 计算 startIndex 和 endIndex
    updateBoundaryIndex (scrollTop) {
        scrollTop = scrollTop || 0;
        // 用户正常滚动下，根据 scrollTop 找到新的锚点元素位置
        const anchorItem = this.cache.find(item => item.bottom >= scrollTop);
        // console.log(scrollTop, anchorItem);
        if (!anchorItem) {
            // 滚的太快，找不到锚点元素，这个暂不处理
            return
        }

        this.anchorItem = {
            ...anchorItem
        };

        this.startIndex = this.anchorItem.index;
        this.endIndex = this.startIndex + this.rowCount;
    }

    updateVisibleData () {
        const visibleData = this.props.data.slice(this.startIndex, this.endIndex);

        this.setState({
            startOffset: this.anchorItem.top,
            endOffset: (this.props.data.length - this.endIndex) * height,
            visibleData
        })
    }

    componentDidMount () {
        // 计算可渲染的元素个数
        this.rowCount = Math.ceil(window.innerHeight / height) + bufferSize;
        this.endIndex = this.startIndex + this.rowCount;
        this.updateVisibleData();

        window.addEventListener('scroll', this.handleScroll, false);
    }

    render () {
        const { startOffset, endOffset, visibleData } = this.state;

        return (
            <div className='wrapper' ref={node => { this.wrapper = node }}>
                <div style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px` }}>
                    {
                        visibleData.map((item, index) => {
                           return (
                               this.props.renderItem(this.cachePosition, this.startIndex + index)
                           )
                        })
                    }
                </div>
            </div>
        )
    }
}