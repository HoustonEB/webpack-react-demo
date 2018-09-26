import React, {Component} from 'react';
import AssetProcess, {test1, test2, sum as change} from './AssetProcess';
import './style.main.less';

console.log(test1, test2, change(test1, test2));

// 引入的文件==>模块中改变值后,在延迟获取会获取到最新值
setTimeout(() => {
    console.log(test1, 'delay')
}, 1000);

export default class App extends Component {
    render() {
        return (
            <div className={'text-color'}>
                dasd
                <AssetProcess/>
            </div>
        )
    }
}
