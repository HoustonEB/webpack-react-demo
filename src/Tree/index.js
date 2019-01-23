import {observable} from 'mobx';
import {observer} from 'mobx-react'; // mobx-react提供将react组件转换为响应式组件
import Comp from './Comp';

export default class IndexPage {
    constructor() {
         // console.log(this, 12)
    }
}

IndexPage.prototype.defaultComp = Comp;