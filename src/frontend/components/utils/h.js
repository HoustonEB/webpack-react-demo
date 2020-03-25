import { createElement } from 'react';

const helper = function (tagOrComp, classNameOrProps, props = undefined, ...content) {
    if (typeof tagOrComp === 'undefined' || tagOrComp === null) {
        return null;
    }
    if (typeof classNameOrProps === 'object') {
        return createElement(tagOrComp, classNameOrProps, props, ...content);
    } else {
        props = props || {};
        props.className = props.className || classNameOrProps;
        return createElement(tagOrComp, props, ...content);
    }
}
const tagMap = [
    'div',
    'span',
    'a',
    'img',
    'pre',
    'br',
    'hr',

    // 标题
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',

    // 表格相关
    'table',
    'thead',
    'tbody',
    'th',
    'tr',
    'td',

    // 文档语义化
    'aside',
    'header',
    'footer',
    'section',
    'article',

    // 行内样式
    'em',
    'strong',

    // 不建议使用
    'i',
    'b',

    // 表单
    'label',
    'input',
    'button',
    'textarea',
    'p',
    'select',
    'option',
    'form',

    // 列表
    'ul',
    'ol',
    'li',

    // media
    'video',
    'audio',

    // other
    'canvas',
    'iframe',
    'colgroup',
    'col',
    'area',
    'link'
];
tagMap.forEach(tag => {
    helper[tag] = helper.bind(null, tag);
});

export default helper;