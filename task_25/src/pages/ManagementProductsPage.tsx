/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from 'react';
import type { TProducts } from '../types/Products';
import { getProducts } from '../axios/products.api';
type Action =
    | {
          type: 'GET';
          payload: TProducts[];
      }
    | { type: 'PUT'; payload: TProducts }
    | { type: 'DELETE'; payload: TProducts }
    | { type: 'DETAIL'; payload: TProducts };
type State = {
    products: TProducts[];
    product: TProducts | null;
};
const initialState = {
    products: [],
    product: null,
};
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'GET':
            state.products = action.payload;
            return { ...state, products: action.payload };
        case 'PUT':
            // state.product = action.payload;
            const updatedProduct = { ...action.payload, title: 'Updated Title' };
            console.log(updatedProduct);
            const newProducts = state.products.map((item) => (item.id == updatedProduct.id ? updatedProduct : item));
            return { ...state, products: newProducts, product: updatedProduct };
        case 'DETAIL':
            return { ...state, product: action.payload };
        case 'DELETE':
            const DELETE_PRODUCTS = state.products.filter((item) => item.id !== action.payload.id);
            return { ...state, products: DELETE_PRODUCTS };

        default:
            return state;
    }
};
const ManagementProductsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products, product } = state;
    useEffect(() => {
        const loadData = async () => {
            const data = await getProducts();
            dispatch({ type: 'GET', payload: data.products });
        };
        loadData();
    }, []);
    return (
        <div>
            {product ? (
                <div>
                    <p>{product.id}</p>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <p>{product.thumbnail}</p>
                    <p>{product.description}</p>
                </div>
            ) : (
                'Không có sản phẩm chi tiết'
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Thumnail</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item: TProducts) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>
                                    <img src={item.thumbnail} width={50} alt="" />
                                </td>
                                <td>{item.description}</td>
                                <button
                                    onClick={() => {
                                        dispatch({ type: 'PUT', payload: item });
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch({ type: 'DELETE', payload: item });
                                    }}
                                >
                                    Xóa
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch({ type: 'DETAIL', payload: item });
                                    }}
                                >
                                    DETAILS
                                </button>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementProductsPage;
