import {observable} from 'mobx';
import Comp from './Comp';

export default class IndexPage {
    @observable io = 1;

}

IndexPage.prototype.defaultComp = Comp;