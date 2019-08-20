// import {
//     Component,
//     h,
//     observer,
//     suh,
// } from '@befe/utils/dev-pattern-vm/index-pc-normal';
import React, {Fragment, Component} from 'react';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

// 如果有需要, 打开特定场景的 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'
import {observer} from 'mobx-react';
import classnames from 'classnames';
import compStyle from './style.use.less';

//  get renderList2() {
//         let {local, props} = this;
//         let instanceList = local.instanceList;
//         // let checklist = local.checklist;
//         // let spreadList = local.spreadList.toJS();
//         // 用来触发instanceDetails变化
//         // let size = local.instanceDetails.size;
//         if (!instanceList || !instanceList.length) {
//             return h.div('', {}, '没有符合条件的数据');
//         }
//         const renderItem = ({index, isScrolling, key, parent, style}) => {
//             let item = instanceList[index];
//             const className = classname('instance-item', {
//                 'error': item.status === 'ERROR',
//                 'fold': item.recordViewStatus === 'FOLD'
//             });
//             let row = null;
//             if (item.recordViewStatus === 'FOLD') {
//                 let text = item.spreaded ? '收起' : '展开';
//                 let icon = item.spreaded ? 'collapse-arrow-up' : 'collapse-arrow-down';
//                 row = h.div(className, {
//                         style,
//                         key: item.instanceId + item.recordViewStatus,
//                         onClick: () => {
//                             item.spreaded ? local.collspanInstance(index) : local.spreadMoreInstance(item);
//                         }
//                     },
//                     h.span('dot', {}),
//                     item.normalNum
//                     ? h.span('fold-text', {}, `${text}正常运行的${item.normalNum}项作业`)
//                     : h.span('fold-text', {}, `${text}剩余运行记录`),
//                     h(Icon, {name: icon})
//                 );
//             }
//             else {
//                 row = h(InstanceItem, {
//                     key: item.instanceId,
//                     index: index,
//                     style,
//                     app: props.app,
//                     isSpread: local.spreadList.indexOf(item.instanceId) > -1,
//                     checkHandle: local.toggleCheckList,
//                     checklist: local.checklist,
//                     detailActive: local.instanceDetailsAcitve.get(item.instanceId),
//                     spreadInstance: local.spreadInstance.bind(local),
//                     setInstanceDetailActive: local.setInstanceDetailActive.bind(local),
//                     detail: local.instanceDetails.get(item.instanceId),
//                     batchClick: local.batchClick,
//                     emitListChange: local.emitListChange,
//                     item,
//                 });
//             }
//
//             return row;
//         };
//         return h(ListProtector, {
//             wrapTag: 'ul',
//             openFromNumber: 1,
//             pageSize: 20,
//             offsetNumber: 4,
//             rowCount: instanceList.length,
//             defaultRowHeight: 250,
//             rowRenderer: renderItem
//         });
//     }

@observer
class ItemProtector extends Component {
    constructor(props) {
        super(props);
        this.height = props.defaultHeight || 100;
        this.setHeight = this.setHeight.bind(this);
    }
    componentDidUpdate() {
        if (this.canRender()) {
            this.setHeight();
        }
    }
    componentDidMount() {
        if (this.canRender()) {
            this.setHeight();
        }
    }
    setHeight() {
        let height = this.getChildHeight();
        // let paddingBottom = parseInt(window.getComputedStyle(this.itemDom).marginBottom, 10);
        this.height = height;
        this.props.addHeight(height);
    }
    getChildHeight() {
        let child = this.itemDom.children[0];
        return child.clientHeight
            + parseInt(getStyle(child, 'borderTopWidth'), 10)
            + parseInt(getStyle(child, 'borderBottomWidth'), 10)
            + parseInt(getStyle(child, 'marginTop'), 10)
            + parseInt(getStyle(child, 'marginBottom'), 10);
    }
    canRender() {
        // return true;
        const {index, listControl, isStartProtector} = this.props;
        // 如果未开启保护 全部渲染
        if (!isStartProtector) {
            return true;
        }
        return index >= listControl.startIndex && index <= listControl.endIndex;
    }
    render() {
        let canRender = this.canRender();
        let height = canRender ? 'auto' : `${this.height}px`;
        if (!canRender) {
            return null;
        }
        return h.div('item-protector',
            {
                ref: domNode => this.itemDom = domNode,
                key: this.props.index,
                style: {height: height}
            },
            this.props.children
        );
    }
}

@observer
// @suh(compStyle)
export default class ListProtector extends Component {

    static defaultProps = {
        pageSize: 10,
        offsetNumber: 2,
        defaultRowHeight: 100
    };
    constructor(props) {
        super(props);
        this.state = {
            listControl: {
                paddingTop: 0,
                paddingBottom: 0,
                startIndex: 0,
                endIndex: props.pageSize
            }
        };
        this.heightArr = [];
        this.addHeight = this.addHeight.bind(this);
    }
    componentDidMount() {
        this.addScrollFn();
    }
    componentDidUpdate() {
        this.addScrollFn();
    }
    componentWillUnmount() {
        if (this.scrollFn) {
            document.removeEventListener('scroll', this.scrollFn);
        }
    }
    addScrollFn() {
        if (this.startProtector() && !this.scrollFn) {
            this.scrollFn = throttle(e => {
                if (this.wrapDom) {
                    this.calculateIndex();
                }
                // console.log(e);
            }, 300, 100);
            document.addEventListener('scroll', this.scrollFn);
        }
    }
    calculateIndex() {
        let {pageSize, offsetNumber, rowCount} = this.props;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let dis = scrollTop - getCoords(this.wrapDom).top;
        let startIndex = 0;
        let endIndex = 0;
        let index = 0;
        let countHeight = 0;
        for (let i = 0; i <= rowCount; i++) {
            let height = this.getHeight(i);
            countHeight += height;
            if (countHeight > dis) {
                index = i;
                break;
            }
        }
        startIndex = index - offsetNumber;
        endIndex = index + pageSize + offsetNumber;
        this.setState({
            listControl: {
                paddingTop: this.calculateHeight(0, startIndex),
                paddingBottom: this.calculateHeight(endIndex + 1, rowCount),
                startIndex: startIndex,
                endIndex
            }
        });
    }
    calculateHeight(sIndex, endIndex) {
        let count = 0;
        if (endIndex > 0) {
            for (let i = sIndex; i < endIndex; i++) {
                let height = this.getHeight(i);
                count += height;
            }
        }
        return count;
    }
    startProtector() {
        let {openFromNumber, rowCount} = this.props;
        if (openFromNumber && openFromNumber > rowCount) {
            return false;
        }
        return true;
    }
    addHeight(index, height) {
        this.heightArr[index] = height;
    }
    get renderList() {
        let {rowCount, defaultRowHeight, rowRenderer} = this.props;
        let list = [];
        for (let i = 0; i < rowCount; i++) {
            list.push(h(ItemProtector, {
                defaultRowHeight,
                key: i,
                isStartProtector: this.startProtector(),
                index: i,
                listControl: this.state.listControl,
                addHeight: this.addHeight.bind(this, i),
            }, h(observer(rowRenderer), {
                index: i
            })));
        }
        return list;
    }

    getHeight(index) {
        return this.heightArr[index] || this.props.defaultRowHeight;
    }

    render() {
        let {listControl} = this.state;
        let {wrapTag = 'div', className} = this.props;
        let wrapClassName = classnames('list-protector', className);
        let style = {
            paddingTop: listControl.paddingTop,
            paddingBottom: listControl.paddingBottom
        };
        return <ul>{this.renderList}</ul>
        // return h[wrapTag](wrapClassName, {
        //         style,
        //         ref: domNode => this.wrapDom = domNode,
        //     },
        //     this.renderList
        // );
    }
}

// 节流
function throttle(method, duration, delay) {
    let timer = null;
    let begin = new Date();

    return function (...args) {
        let context = this;
        let current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        }
        else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    };
}

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

// 获取样式
function getStyle(dom, styleKey) {
    let styles = dom.currentStyle
        ? dom.currentStyle : window.getComputedStyle(dom);
    return styles[styleKey];
}
