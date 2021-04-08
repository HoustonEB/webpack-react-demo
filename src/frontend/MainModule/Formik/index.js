import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { 
    Formik, 
    Form,
    ErrorMessage
} from 'formik';
import Button from '@src/frontend/components/Button';
import './style.use.less';

@observer
export default class FormikView extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    @observable formData = {
        email: 'email1',
        password: 'ps1'
    }

    render() {
        console.log(this.formData, 'formData')
        return (
            <div className={'Formik-wrapper'}>
                {/* <span>{this.formData.email}</span> */}
                <div>
                    <h1>Anywhere in your app!</h1>
                    <Formik
                        initialValues={this.formData}
                        enableReinitialize={true} // initialValues改变是否重置表单reset
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            }
                            // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            //     errors.email = 'Invalid email address';
                            // }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                console.log(JSON.stringify(values, null, 2))
                                setSubmitting(false);
                            }, 400);
                        }}
                        onReset={() => {
                            console.log('reset')
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                            isSubmitting,
                            /* and other goodies */
                        }) => {
                            console.log(touched, 'touched')
                            return <Form
                                autoComplete='off'
                                onChange={({ target }) => {
                                    console.log(target.id, target.value, 'change')
                                }}
                                onBlur={({ target }) => {
                                    console.log(target.id, target.value, 'blur')
                                }}
                                // onSubmit={handleSubmit}
                                onReset={handleReset}
                            >
                                <div>
                                    <label htmlFor="email">邮箱</label>
                                    {/* label for会触发input的onclick */}
                                    <input
                                        type="text"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onClick={() => { console.log('click') }}
                                    />
                                    <ErrorMessage component="div" name="email" />
                                </div>
                                <div>
                                    <label htmlFor="password">密码</label>
                                    <input
                                        type="text"
                                        id="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <ErrorMessage component="div" name="password" />
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                        </button>
                                    <button type="reset">reset</button>
                                </div>
                            </Form>
                        }}
                    </Formik>
                    <Button
                        type="primary"
                        onClick={action(() => {
                            this.formData = { email: 'email3', password: 'ps2' };
                            console.log('initialize')
                        })}>
                        Reinitialize
                    </Button>
                </div>
            </div>
        )
    }
}