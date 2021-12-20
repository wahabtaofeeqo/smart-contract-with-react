import React, {useState} from "react";
import {omit} from 'lodash'

const useForm = (options) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.persist();
        let name = event.target.name;
        let value = event.target.value;

        validate(name, value);
        setValues((values => ({...values, [name]: value})))
    };

    const resetValues = () => {
        setValues({});
    }

    const validate = (field, value) => {
        if (value) {
            let e = omit(errors, field);
            setErrors(e);
        }
        else {
            let e = errors;
            e[field] = true;
            setErrors(e);
        }
    }

    const doSubmit = (event) => {
        event.preventDefault();
        Object.keys(options.fields).map(f => {
            validate(f, values[f]);
        })

        options.callback()
    }

    return {
        values,
        errors,
        doSubmit,
        resetValues,
        handleChange
    };
}

export default useForm;