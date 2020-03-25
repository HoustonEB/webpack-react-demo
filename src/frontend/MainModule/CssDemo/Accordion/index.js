import React, {Component} from 'react';
import './style.use.less';

export default class Accordion extends Component {

    renderAccordion() {
        return (
            <div className={'accordion-wrapper'}>
                <div className={'wrapper'}></div>
                <div className={'content-1'}>1</div>
                <div className={'wrapper'}></div>
                <div className={'content-2'}>2</div>
                <div className={'wrapper'}></div>
                <div className={'content-3'}>3</div>
                <div className={'wrapper'}></div>
                <div className={'content-4'}>4</div>
            </div>
        )
    }

    handleAccordionClick() {
        let doms = document.querySelectorAll('.accordion-wrapper .wrapper');
        Array.from(doms).forEach(item => {
            item.addEventListener('click', e => {

                console.log(e.target.innerHTML, 'value')
            })
        })
    }

    componentDidMount() {
        this.handleAccordionClick();
    }

    render() {
        return (
            this.renderAccordion()
        )
    }
}