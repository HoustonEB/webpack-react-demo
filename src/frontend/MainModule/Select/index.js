import Select from '../../components/Select';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class View extends Component {
    constructor(props) {
        super(props);
    }
    data = [
        {
            label: 'name1',
            value: '1'
        },
        {
            label: 'name2',
            value: '2'
        },
        {
            label: 'name3',
            value: '3'
        },
        {
            label: 'name4',
            value: '4'
        },
        {
            label: 'name5',
            value: '5'
        }
    ];
    onDropdownVisibleChange = () => {
        console.log('展开')
    }

    render() {
        return (
            <Select 
            value={['1']}
            mode={'single'}
            options={this.data}
            onDropdownVisibleChange={this.onDropdownVisibleChange.bind(this)}
            ></Select>  
        )
    }
}