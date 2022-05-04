import React, { useContext } from 'react'
import MainContext from './../services/MainContext';
import ProductBody from './ProductBody';
import ProductFooter from './ProductFooter';
import ProductHeader from './ProductHeader';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductCards() {

    const { products, setProducts } = useContext(MainContext)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Slider {...settings}>
                        {products.map(product => {
                            return (
                                <div key={product.id} className="col-3 py-5 px-2">
                                    <div className="card">
                                        <ProductHeader item={product.item} />
                                        <ProductBody
                                            price={product.price}
                                            quantity={product.quantity}
                                            measurement={product.measurement}
                                            category={product.category}
                                        />
                                        <ProductFooter product={product} />
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default ProductCards