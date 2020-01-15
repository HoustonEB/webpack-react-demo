import CssDemo from "./CssDemo";
import StructureTreeContrast from "./StructureTreeContrast";
import CardTree from "./CardTree";
import Tree from "./Tree";
import DragSort from "./DragSort";
import Canvas from "./Canvas";
import Draggable from "./Draggable";
import Collapse from "./Collapse";
import JsDemo from "./JsDemo";
import RegExr from "./RegExr";
import Transfer from "./Transfer";
import Carousel from "./Carousel";
import VirtualList from "./VirtualList";
import mobx from "./mobxExample";
import d3 from './d3-bar';
import BreadcrumbDemo from './Breadcrumb';
import AutoSave from './AutoSave';
import Select from './Select';
import Calendar from './Calendar';
import Message from './Message';
import Button from './Button';
import Popover from './Popover';

const routeConfig = [
    {
        path: '/',
        component: CssDemo,
        indexRoute: { component: CssDemo },
        exact: true,
        routes: [

        ]
    },
    {
        path: '/css-demo',
        component: CssDemo
    },
    {
        path: '/card-tree',
        component: CardTree
    },
    {
        path: '/tree',
        component: new Tree().defaultComp
    },
    {
        path: '/transfer',
        component: new Transfer().defaultComp
    },
    {
        path: '/structure-tree-contrast',
        component: new StructureTreeContrast().defaultComp
    },
    {
        path: '/js-demo',
        component: new JsDemo().defaultComp
    },
    {
        path: '/draggable',
        component: new Draggable().defaultComp
    },
    {
        path: '/reg-exr',
        component: new RegExr().defaultComp
    },
    {
        path: '/canvas',
        component: new Canvas().defaultComp
    },
    {
        path: '/drag-sort',
        component: new DragSort().defaultComp
    },
    {
        path: '/collapse',
        component: Collapse
    },

    {
        path: '/carousel',
        component: Carousel
    },
    {
        path: '/virtual-list',
        component: VirtualList
    },
    {
        path: '/mobx',
        component: mobx
    },
    {
        path: '/d3',
        component: d3
    },
    {
        path: '/breadcrumb',
        component: BreadcrumbDemo
    },
    {
        path: '/auto-save',
        component: AutoSave
    },
    {
        path: '/select',
        component: Select
    },
    {
        path: '/calendar',
        component: Calendar
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/button',
        component: Button
    },
    {
        path: '/popover',
        component: Popover
    }
];

export default routeConfig;