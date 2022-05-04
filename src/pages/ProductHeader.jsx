import React from 'react'

function ProductHeader({item}) {
    return (
        <div className="card-header">
            <h5>{item}</h5>
        </div>
    )
}

export default ProductHeader