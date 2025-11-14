import  { useContext, useEffect, useState } from 'react';
import { getProducts } from '../axios/products.api';
import { CartContext } from '../context/CartContext';
import type { TProducts } from '../types/Products';

const ListProducts = () => {
    const [products, setProducts] = useState<TProducts[]>([]);
    const { dispatch } = useContext(CartContext);
    const loadData = async () => {
        const res = await getProducts();
        setProducts(res.products);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5 fw-bold">Our Products</h1>

            <div className="row g-4">
                {products?.map((item) => {
                    return (
                        <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                            <div
                                className="card h-100 shadow-sm border-0"
                                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                }}
                            >
                                <div
                                    className="position-relative overflow-hidden"
                                    style={{ height: '250px', backgroundColor: '#f8f9fa' }}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="card-img-top h-100 w-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-dark mb-3">{item.title}</h5>

                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="mb-0 text-primary fw-bold">${item.price}</h4>
                                        </div>

                                        <button
                                            className="btn btn-warning w-100 fw-semibold py-2"
                                            onClick={() => dispatch({ type: 'ADD TO CART', payload: item })}
                                            style={{ transition: 'all 0.2s ease' }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListProducts;
