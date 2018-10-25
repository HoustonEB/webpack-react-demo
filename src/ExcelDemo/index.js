import React, {Component} from 'react';
import './style.use.less';

export default class ExcelDemo extends Component {
    constructor(props) {
        super(props)
        // let workbook = new Excel.Workbook();
    }

    render() {
        console.log(1);
        return (
            <div id={'excel-demo'}>
                {/*{this.workbook()}*/}
            </div>
        )
    }
}
