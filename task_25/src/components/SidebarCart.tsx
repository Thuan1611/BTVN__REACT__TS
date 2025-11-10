import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

type Props = {
    openCart: boolean;
    setOpenCart: (value: boolean) => void;
};

const SidebarCart = ({ openCart, setOpenCart }: Props) => {
    const cartItem = useContext(CartContext);
    return (
        <div>
            {openCart && (
                <div
                    className="position-fixed top-0 end-0 bg-white border shadow p-3"
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
                        {cartItem.cart.map((item) => {
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
                                                onClick={() => cartItem.removeToCart(item)}
                                            >
                                                -
                                            </button>
                                            <span className="fw-semibold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => cartItem.handleAddToCart(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <span style={{ color: 'red' }}>{item.price}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-top pt-3">
                        <div className="d-flex justify-content-between fw-bold mb-2">
                            <span>Tổng:</span>
                            <span>{cartItem.total}</span>
                        </div>
                        <button className="btn btn-primary w-100">Thanh toán</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarCart;
