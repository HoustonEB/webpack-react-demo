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

const routeConfig = [
    {
        path: '/',
        component: CssDemo,
        indexRoute: { component: CssDemo },
        routes: [
            { path: '/css-demo', component: CssDemo },
            { path: '/card-tree', component: CardTree },
            { path: '/tree', component: new Tree().defaultComp },
            { path: '/transfer', component: new Transfer().defaultComp },
            { path: '/structure-tree-contrast', component: new StructureTreeContrast().defaultComp },
            { path: '/js-demo', component: new JsDemo().defaultComp },
            { path: '/draggable', component: new Draggable().defaultComp },
            { path: '/reg-exr', component: new RegExr().defaultComp },
            { path: '/canvas', component: new Canvas().defaultComp},
            { path: '/drag-sort', component: new DragSort().defaultComp},
            { path: '/collapse', component: Collapse}
        ]
    }
];

export default routeConfig;