import React, { useContext } from 'react'
import MainContext from './../services/MainContext';
import {NavLink} from 'react-router-dom'

function ProductFooter({ product }) {

    const { handleDelete, handleEdit } = useContext(MainContext)

    return (
        <div className="card-footer btn-group text-end">
            <NavLink to={`/detail/${product.id}`}>
                <button className='btn btn-outline-success'>Details</button>
            </NavLink>
            <button onClick={() => handleEdit(product)} className='btn btn-outline-warning bi bi-pencil'></button>
            <button onClick={() => handleDelete(product.id)} className='btn btn-outline-danger bi bi-trash'></button>
        </div>
    )
}

export default ProductFooter