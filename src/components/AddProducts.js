import React, {useEffect, useState} from "react";
import useForm from "../hooks/useForm";

function AddProducts(props) {

    const [isSubmitted, setSubmitted] = useState(false);
    const {values, errors, resetValues, handleChange, doSubmit} = useForm({
        fields: {name: '', price: ''},
        callback: () => {
            doCreate()
        }
    });

    const handleFile = (event) => {
        console.log(event.target.files)
    }

    const doCreate = async () => {
        setSubmitted(!isSubmitted);
        if (Object.keys(errors).length === 0) {
            await props.createProduct(values.name, values.price);
        }
    }

    return(
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <p className="card-title font-weight-bold mb-4 h4">Add Smart Product</p>
                            <form onSubmit={doSubmit}>
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" onChange={handleChange} name="name" value={values.name || ''} className="form-control" placeholder="Name" />
                                    <p className="text-danger small">{errors.name ? 'Field is required' : ''}</p>
                                </div>

                                <div className="form-group">
                                    <label>Product Price</label>
                                    <input type="number" onChange={handleChange} name="price" value={values.price || ''} className="form-control" placeholder="Price" />
                                    <p className="text-danger small">{errors.price ? 'Field is required' : ''}</p>
                                </div>

                                <div className="form-group mb-5">
                                    <label>Logo</label><br/>
                                    <input type="file" onChange={handleFile}/>
                                </div>

                                <button className="btn btn-danger px-5">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts