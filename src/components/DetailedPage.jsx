import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import base_url from './../services/axios';
import Image1 from '../static/1.jpg'
import Image2 from '../static/2.jpg'

function DetailedPage() {

  const [detailed, setDetailed] = useState({})
  const { id } = useParams();
  const [images] = useState([
    { id: 1, image: Image1 },
    { id: 2, image: Image2 }
  ])

  useEffect(() => {
    base_url.get(`/products/${id}`)
      .then(res => setDetailed(res.data))
  }, [id])

  return (
    <div className='container py-4'>
      <div className="d-flex justify-content-around align-items-center">
        <div>
          <h1 className='mb-5 fw-bold'>{detailed.item}</h1>
          <p>Price: <b>{detailed.price}$</b> </p>
          <p>{detailed.measurement === "kg"
            ? 'Weight'
            : detailed.measurement === 'l'
              ? 'Volume'
              : 'Count'}
            : <b>{detailed.quantity}{detailed.measurement}</b>
          </p>
          <p>Category: <b>{detailed.category}</b></p>
          <p>Overall: <b>{(detailed.quantity * detailed.price).toFixed(2)}$</b></p>
        </div>
        <div>
          <img src={images[detailed?.image?.split('.')[0] - 1]?.image} width="350px" alt={detailed.item} />
        </div>
      </div>
    </div>
  )
}

export default DetailedPage