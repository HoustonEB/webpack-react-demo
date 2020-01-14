import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import 'animate.css';
import './style.use.less';

export default class Select extends Component {

    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        mode: PropTypes.oneOf(['single', 'multiple']),
        allowClear: PropTypes.bool,
        options: PropTypes.array,
        disabled: PropTypes.bool,
        valueKey: PropTypes.string,
        labelKey: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
        // 展开下拉菜单的回调
        onDropdownVisibleChange: PropTypes.func,
        // dropdown是否与selectd对齐
        shouldMatchWidth: PropTypes.bool
    }

    static defaultProps = {
        classPrefix: 'once',
        labelKey: 'label',
        valueKey: 'value',
    };

    selectionDom = '';
    dropdownDom = '';
    inputDom = '';
    searchMirrorDom = '';
    operateType = '';
    state = {
        isFocused: false,
        value: this.props.value,
        selectedValue: [],
        inputValue: '',
        options: this.props.options
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.syncSearchInputDomStyle();
    }

    componentDidUpdate() {
        this.syncSearchInputDomStyle();
        if (this.operateType === 'add') {
            this.addLabelAnimate();
        }
        this.operateType = '';
    }

    addLabelAnimate(callback) {
        let labelBoxDoms = document.querySelectorAll('.label-box');
        let addLabelDom = labelBoxDoms[labelBoxDoms.length - 1];
        addLabelDom && this.animateCSS(addLabelDom, 'zoomIn', callback);
    }

    delLabelAnimate(index, callback) {
        let labelBoxDoms = document.querySelectorAll('.label-box');
        let delLabelDom = labelBoxDoms[index];
        delLabelDom && this.animateCSS(delLabelDom, 'zoomOut', callback);
    }

    animateCSS(element, animationName, callback) {
        // const node = document.querySelector(element)
        console.log('animated')
        const node = element;
        node.classList.add('animated', 'faster', animationName)

        function handleAnimationEnd() {
            node.classList.remove('animated', 'faster', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd)
    }

    syncSearchInputDomStyle() {
        const {
            shouldMatchWidth,
            classPrefix
        } = this.props;
        this.inputDom.style.width = this.searchMirrorDom.offsetWidth + 'px';
        let widthProp = shouldMatchWidth ? 'width' : 'minWidth';
        if (this.dropdownDom) {
            this.dropdownDom.style[widthProp] = this.selectionDom.offsetWidth + 'px';
            this.dropdownDom.style.top = this.selectionDom.offsetHeight + 'px';
        }
    }

    setInputValue() {
        const {
            value,
            options,
            labelKey
        } = this.props;
        this.setState({
            value: options.filter(item => item.value === value).map(item => item[labelKey])
        });
    }

    getLabel() {
        const {
            value,
            options,
            labelKey
        } = this.props;
        return options.filter(item => value.includes(item.value)).map(item => item[labelKey]);
    }

    /*render start*/
    renderDropDown() {
        const {
            classPrefix,
            labelKey
        } = this.props;
        const {
            options
        } = this.state;
        return (
            <div
                className={c(classPrefix + '-select-content-wrapper')}
                ref={node => this.dropdownDom = node}>
                <ul>
                    {
                        options.map((item, index) => <li
                            className={c({
                                'selected': this.state.value.includes(item.value)
                            })}
                            key={index}
                            onClick={this.handleSelectedOptions.bind(this, item, index)}>
                            {item[labelKey]}
                        </li>)
                    }
                </ul>
            </div>
        )
    }

    renderLabel() {
        const { labelKey } = this.props;
        return this.renderLabelValue.map((item, index) => <span
            className={'label-box'}
            key={index}>
            <span className={'label-name'}>{item[labelKey]}</span>
            <span
                className={'label-close'}
                onClick={this.handleLabelDelSelected.bind(this, item, index)}>x</span>
        </span>);
    }

    /*render end*/

    /*get start*/

    get showDropDown() {
        return this.state.isFocused ? this.renderDropDown() : null
    }

    get renderLabelValue() {
        const {
            valueKey,
            options
        } = this.props;
        return this.state.value.map(item => options.find(itm => itm[valueKey] === item));
    }
    /*get end*/

    /*handle start*/
    handleFocus(e) {
        const {
            onDropdownVisibleChange
        } = this.props;
        if (this.state.isFocused) {
            return false;
        }
        this.handleSearch('');
        onDropdownVisibleChange && onDropdownVisibleChange();
        this.inputDom.focus();
        this.setState({ isFocused: true });
    }

    handleBlur() {
        if (!this.state.isFocused) {
            return false;
        }
        this.inputDom.blur();
        setTimeout(() => {
            this.setState({ isFocused: false, inputValue: '' });
        }, 10)
    }

    handleSearch(value) {
        let inputValue = value;
        let searchOptions = [];
        if (inputValue) {
            searchOptions = this.props.options.filter(item => item.value === inputValue);
        } else {
            searchOptions = this.props.options;
        }
        this.setState({
            inputValue,
            options: searchOptions
        });
    }

    handleSelectedOptions(item, index) {
        const {value} = this.state;
        const {
            mode
        } = this.props;
        if (value.includes(item.value)) {
            this.delLabelAnimate(this.findLabelIndex(item), this.delValue.bind(this, item));
        } else {
            this.addValue(item);
        }
        if (mode === 'multiple') {
            console.log(mode, '---')
            this.inputDom.focus();
        }
    }

    handleLabelDelSelected(item, index) {
        this.delLabelAnimate(index, this.delValue.bind(this, item));
    }

    findLabelIndex(item) {
        return this.renderLabelValue.findIndex(itm => itm.value === item.value);
    }

    addValue(item) {
        this.setState({value: this.state.value.concat([item.value])});
        this.operateType = 'add';
    }

    delValue(item) {
        this.setState({ value: this.state.value.filter(itm => itm !== item.value) });
        this.operateType = 'del';
    }
    /*handle end*/

    render() {
        const {
            classPrefix,
        } = this.props;
        const {
            isFocused,
            inputValue
        } = this.state;
        return (
            <div className={c(classPrefix + '-select-wrapper')}>
                <div
                    ref={(node) => this.selectionDom = node}
                    className={c(
                        classPrefix + '-select-input-wrapper',
                        {
                            'focused': isFocused
                        }
                    )}
                    onClick={this.handleFocus.bind(this)}>
                    <div className={'multiple-label-wrapper'}>
                        {this.renderLabel()}
                    </div>
                    <div className={'search-filed-wrapper'}>
                        <input
                            ref={node => this.inputDom = node}
                            autoComplete={'off'}
                            value={inputValue}
                            onBlur={this.handleBlur.bind(this)}
                            onChange={e => this.handleSearch(e.target.value)}>
                        </input>
                        <div
                            ref={node => this.searchMirrorDom = node}
                            className={'search-filed-mirror'}>{inputValue}</div>
                    </div>
                </div>
                {this.showDropDown}
            </div>
        )
    }
}