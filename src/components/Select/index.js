import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import 'animate.css';
import './style.use.less';

export default class Select extends Component {

    static propTypes = {
        prefixClass: PropTypes.string,
        className: PropTypes.string,
        mode: PropTypes.oneOf(['single', 'multiple']),
        allowClear: PropTypes.bool,
        options: PropTypes.array,
        disabled: PropTypes.bool,
        valueKey: PropTypes.string,
        labelKey: PropTypes.string,
        defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.object]),
        value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.object]),
        // 展开下拉菜单的回调
        onDropdownVisibleChange: PropTypes.func,
        // dropdown是否与selectd对齐
        shouldMatchWidth: PropTypes.bool
    }

    static defaultProps = {
        prefixClass: 'once',
        labelKey: 'label',
        valueKey: 'value',
    };

    selectionDom = '';
    dropdownDom = '';
    inputDom = '';
    searchMirrorDom = '';
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
        // this.setInputValue();
        // const {
        //     shouldMatchWidth
        // } = this.props;
        // let widthProp = this.shouldMatchWidth ? 'width' : 'minWidth';
        // this.dropdownDom && (this.dropdownDom.style[widthProp] = this.selectionDom.offsetWidth);
        this.syncSearchInputDomStyle();
    }

    componentDidUpdate() {
        this.syncSearchInputDomStyle();
        let node = document.querySelectorAll('.label-box')[0];
        setTimeout(() => {
            this.animateCSS(node, 'bounce');
        }, 1000);
    }

    animateCSS(element, animationName, callback) {
        // const node = document.querySelector(element)
        const node = element;
        node.classList.add('animated', animationName)
    
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)
    
            if (typeof callback === 'function') callback()
        }
    
        node.addEventListener('animationend', handleAnimationEnd)
    }

    syncSearchInputDomStyle() {
        const {
            shouldMatchWidth
        } = this.props;
        let widthProp = shouldMatchWidth ? 'width' : 'minWidth';
        if (this.dropdownDom) {
            this.dropdownDom.style[widthProp] = this.selectionDom.offsetWidth + 'px';
            this.dropdownDom.style.top = this.selectionDom.offsetHeight + 'px';
        }
        this.inputDom.style.width = this.searchMirrorDom.offsetWidth + 'px';
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
            prefixClass,
            labelKey
        } = this.props;
        const {
            options
        } = this.state;
        return (
            <div
                className={c(prefixClass + '-select-content-wrapper')}
                ref={node => this.dropdownDom = node}>
                <ul>
                    {
                        options.map((item, index) => <li
                            className={c({
                                'selected': this.state.value.includes(item.value)
                            })}
                            key={index}
                            onClick={this.handleSelectedOptions.bind(this, item)}>
                            {item[labelKey]}
                        </li>)
                    }
                </ul>
            </div>
        )
    }

    renderLabel() {
        return this.renderLabelValue.map((item, index) => <span
            className={'label-box'}
            key={index}>
            <span className={'label-name'}>{item.label}</span>
            <span
                className={'label-close'}
                onClick={this.handleLabelDelSelected.bind(this, item)}>x</span>
        </span>);
    }

    addClassName() {
        setTimeout(() => {
            return true;
        }, 20)
    }
    /*render end*/

    /*get start*/

    get showDropDown() {
        return this.state.isFocused ? this.renderDropDown() : null
    }

    get renderLabelValue() {
        return this.props.options.filter((item, index) => this.state.value.includes(item.value))
    }
    /*get end*/

    /*handle start*/
    handleFocus(e) {
        const {
            onDropdownVisibleChange
        } = this.props;
        onDropdownVisibleChange && onDropdownVisibleChange();
        this.inputDom.focus();
        this.setState({ isFocused: true });
    }

    handleBlur() {
        this.inputDom.blur();
        setTimeout(() => {
            this.setState({ isFocused: false, inputValue: '' });
        }, 10)
    }

    handleSearch(e) {
        let inputValue = e.target.value;
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

    handleSelectedOptions(item) {
        let { value } = this.state;
        let selectedItem = [];
        if (value.includes(item.value)) {
            selectedItem = value.filter(itm => itm !== item.value);
        } else {
            selectedItem = value.concat([item.value]);
        }
        this.setState({ value: selectedItem });
    }

    handleLabelDelSelected(item) {
        this.setState({ value: this.state.value.filter(itm => itm !== item.value) });
    }
    /*handle end*/

    render() {
        const {
            prefixClass,
        } = this.props;
        const {
            isFocused,
            inputValue
        } = this.state;
        return (
            <div className={c(prefixClass + '-select-wrapper')}>
                <div
                    ref={(node) => this.selectionDom = node}
                    className={c(
                        prefixClass + '-select-input-wrapper',
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
                            onChange={this.handleSearch.bind(this)}>
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