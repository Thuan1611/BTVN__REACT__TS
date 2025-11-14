import  { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import type { TCart } from '../types/Carts';
import { Link } from 'react-router-dom';

type Props = {
    openCart: boolean;
    setOpenCart: (value: boolean) => void;
};

const SidebarCart = ({ openCart, setOpenCart }: Props) => {
    const { state, dispatch } = useContext(CartContext);
    const subTotal = state.carts.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
    }, 0).toFixed(2);
    return (
        <div>
            {openCart && (
                <div
                    className="position-fixed top-4 end-0 bg-white border shadow p-3"
                    style={{ width: '350px', height: '100vh', zIndex: 1050 }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="m-0">Giỏ hàng</h5>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenCart(false)}>
                            X
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="mb-3">
                        {state.carts.map((item: TCart) => {
                            const total = (item.price * item.quantity).toFixed(2);
                            return (
                                <div className="d-flex justify-content-between mb-3" key={item.id}>
                                    <img
                                        src={item.thumbnail}
                                        alt="product"
                                        className="rounded border"
                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                    <div className="flex-grow-1 ms-2">
                                        <div className="fw-semibold">{item.title}</div>

                                        <div className="d-flex align-items-center gap-2 mt-1">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => dispatch({ type: 'DECREASE TO CART', payload: item })}
                                            >
                                                -
                                            </button>
                                            <span className="fw-semibold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => dispatch({ type: 'ADD TO CART', payload: item })}
                                            >
                                                +
                                            </button>

                                            <button
                                                className="btn btn-sm btn btn-danger"
                                                onClick={() => dispatch({ type: 'REMOVE TO CART', payload: item })}
                                            >
                                                <i className="fa-solid fa-trash "></i>
                                            </button>
                                        </div>
                                    </div>
                                    <span style={{ color: 'red' }}>{total}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-top pt-3">
                        <div className="d-flex justify-content-between fw-bold mb-2">
                            <span>Tổng:</span>
                            <span>{subTotal}</span>
                        </div>
                        <button className="btn btn-primary w-100"><Link className="text-white " to={'/cart'}>Thanh toán</Link></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarCart;
