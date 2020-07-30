import React, {Component} from 'react';
import {autoSave, listenChange} from '@src/frontend/global/utils/autoSave';
import {testClass} from '@src/frontend/global/utils/testClass';
import './style.use.less';

@autoSave
class AutoSave extends Component {
    static ui = 1
    state = {
        inputValue: '',
        textareaValue: ''
    };

    changed = false;

    constructor(props) {
        super(props);
        console.log(new testClass(), 'testClass');
    }

    componentDidMount() {
        this.startAutoSaving();
    }

    componentWillUnmount() {
        this.stopAutoSaving();
    }

    renderInput() {
        return <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInput.bind(this)}/>
    }

    renderTextarea() {
        return <textarea
            cols="30"
            rows="10"
            value={this.state.textareaValue}
            onChange={this.handleTextarea.bind(this)}></textarea>
    }

    @listenChange
    handleInput(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleTextarea(e) {
        this.setState({
            textareaValue: e.target.value
        });
    }

    renderSubmitBtn() {
        return (
            <button onClick={this.save.bind(this)}>保存</button>
        )
    }

    save() {
        console.log(this.state, 'state')
        // setTimeout(() => {
        //
        // }, 2000)
    }

    render() {
        return (
            <div>
                {this.renderInput()}
                {this.renderTextarea()}
                {this.renderSubmitBtn()}
            </div>
        )
    }
}

export default AutoSave;