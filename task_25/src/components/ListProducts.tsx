import React, { useContext, useEffect, useState } from 'react';
import { getProducts } from '../axios/products.api';
import { CartContext } from '../context/CartContext';

export type TProducts = {
    id: string | number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
};

export type TCart = {
    id: string | number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    quantity: number;
};

const ListProducts = () => {
    const [products, setProducts] = useState<TProducts[]>([]);
    const context = useContext(CartContext);
    const loadData = async () => {
        const res = await getProducts();
        setProducts(res.products);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
            {products?.map((item) => {
                return (
                    <div key={item.id} style={{ display: 'flex', border: 'solid' }}>
                        <div>
                            <p>Title: {item.title}</p>
                            <p>Price: {item.price}</p>
                            <img src={item.thumbnail} alt="" width={50} />
                            <button className='btn btn-warning' onClick={() => context.handleAddToCart(item)}>ADD TO CART</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListProducts;
