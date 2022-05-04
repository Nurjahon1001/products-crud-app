import React, { useRef } from 'react'
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import base_url from './../services/axios';
import MainContext from './../services/MainContext';

function AddProduct() {

    const { handleSubmit, editedProduct, edit } = useContext(MainContext)
    const [measurements, setMeasurements] = useState([])
    const [categories, setCategories] = useState([])
    const [isCategory, setCategory] = useState(false)
    const formRef = useRef()

    useEffect(() => {
        base_url.get('/categories')
            .then(res => setCategories(res.data))

        base_url.get('/measurements')
            .then(res => setMeasurements(res.data))
    }, [])

    useEffect(() => {
        if (edit) {
            formRef.current[0].value = editedProduct.item;
            // formRef.current[1].value = editedProduct.image
            formRef.current[2].value = editedProduct.price;
            formRef.current[3].value = editedProduct.quantity;
            formRef.current[4].value = editedProduct.measurement;
            formRef.current[5].value = editedProduct.category;
        } else {
            formRef.current.reset()
        }
    }, [editedProduct, edit])

    const catchSubmit = (e) => {
        e.preventDefault()
        let obj = {
            id: Date.now(),
            title: e.target[0].value
        }

        if (isCategory) {
            base_url.post('/categories', obj)
                .then(res => setCategories([...categories, res.data]))
        } else {
            base_url.post('/measurements', obj)
                .then(res => setMeasurements([...measurements, res.data]))
        }
        e.target.reset()
    }

    return (
        <div className="row">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add {isCategory ? "Category" : "Measurement"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={catchSubmit}>
                            <div className="modal-body">
                                <input type="text" className='form-control' id='title' />
                            </div>
                            <div className="modal-footer">
                                <button data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 offset-3 mt-3">
                <div className="card">
                    <div className="card-header">
                        <h4>Add a product</h4>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="mb-2">
                                <label htmlFor="item" className='form-label'>Item</label>
                                <input required type="text" className='form-control' id='item' />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="file" className='form-label'>Image</label>
                                <input type="file" className='form-control' id='file' />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price" className='form-label'>Price</label>
                                <input required type="text" className='form-control' id='price' />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="quantity" className='form-label'>Quantity</label>
                                <input type="text" className='form-control' id='quantity' />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="measurement" className='form-label'>Measurement</label>
                                <div className="input-group">
                                    <select className='form-select' id='measurement'>
                                        <option>Choose one...</option>
                                        {measurements.map(measurement => {
                                            return (
                                                <option key={measurement.id} value={measurement.title}>{measurement.title}</option>
                                            )
                                        })}
                                    </select>
                                    <button onClick={() => setCategory(false)} type="button" className="btn btn-outline-dark border" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        &#65291; Add
                                    </button>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="category" className='form-label'>Category</label>
                                <div className="input-group">
                                    <select className='form-select' id='category'>
                                        <option>Choose one...</option>
                                        {categories.map(category => {
                                            return (
                                                <option key={category.id} value={category.title}>{category.title}</option>
                                            )
                                        })}
                                    </select>
                                    <button onClick={() => setCategory(true)} type="button" className="btn btn-outline-dark border" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        &#65291; Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-end">
                            <button type='submit' className='btn btn-outline-dark'>{edit ? "Edit" : "Add"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct