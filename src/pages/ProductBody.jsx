import React from 'react'

function ProductBody({ price, quantity, measurement, category }) {
    return (
        <div className="card-body">
            <p>Price: <b>{price}$</b></p>
            <p>{measurement === "kg"
                ? 'Weight'
                : measurement === 'l'
                    ? 'Volume'
                    : 'Count'}
                : <b>{quantity}{measurement}</b>
            </p>
            <p>Category: <b>{category}</b></p>
            <p>Overall: <b>{(quantity * price).toFixed(2)}$</b></p>
        </div>
    )
}

export default ProductBody