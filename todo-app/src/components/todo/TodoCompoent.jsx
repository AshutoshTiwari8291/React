import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import { retriveTodoApi, updateTodoApi, createTodoApi } from './api/TodoApiService';
import { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import moment from 'moment';

export default function TodoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        retriveTodos();
    }, [id])

    function retriveTodos() {
        if (id != '-1') {
            retriveTodoApi(username, id).then((res) => {
                console.log(res.data.description);
                setDescription(res.data.description);
                setTargetDate(res.data.targetDate);
            });
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id == -1) {
            createTodoApi(username, todo).then((res) => {
                navigate(`/todos`)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            updateTodoApi(username, id, todo).then((res) => {
                navigate(`/todos`)

            }).catch((err) => {
                console.log(err);
            })
        }

    }

    function validate(values) {
        let errors = {};
        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters'
        }
        if (values.targetDate == null || values.targetDate == "") {
            errors.targetDate = 'Enter a target date'
        }
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>

            <div>
                <Formik initialValues={{ description, targetDate }} enableReinitialize={true} onSubmit={onSubmit} validate={validate} validateOnChange={false} validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name='description' component="div" className='alert alert-warning' />
                                <ErrorMessage name='targetDate' component="div" className='alert alert-warning' />
                                <fieldset className='form-group'>
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>

                                <fieldset className='form-group'>
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"></Field>
                                </fieldset>

                                <div>
                                    <button type='submit' className='btn btn-success m-5'>Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}