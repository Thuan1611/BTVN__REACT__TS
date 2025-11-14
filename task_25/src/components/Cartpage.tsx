import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cartpage = () => {
    const { state, dispatch, total } = useContext(CartContext);
    const { carts } = state;
    return (
        <div>
            <p>Shopping Cart</p>
            <p>4 items in your cart</p>
            <div className="cart-page col-12 d-flex  gap-4 m-4 container">
                <div className="cart-content col-8 border rounded-2">
                    {carts.length > 0 ? (
                        carts?.map((item) => {
                            return (
                                <div className="cart-items d-flex justify-content-between m-4" key={item.id}>
                                    <div className="d-flex gap-2">
                                        <img src={item.thumbnail} className="rounded-2" width={100} alt="" />
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3 ">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => {
                                                dispatch({ type: 'DECREASE TO CART', payload: item });
                                            }}
                                        >
                                            -
                                        </button>
                                        <p className="pt-3  ">{item.quantity}</p>
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => {
                                                dispatch({ type: 'ADD TO CART', payload: item });
                                            }}
                                        >
                                            +
                                        </button>
                                        <p className=" pt-3"></p>
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => {
                                                dispatch({ type: 'REMOVE TO CART', payload: item });
                                            }}
                                        >
                                            <i className="fa-solid fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="d-flex justify-content-center">
                            <p>Không có sản phẩm trong giỏ hàng</p>
                        </div>
                    )}
                </div>
                <div className="payments col-4 text-dark bg-body-secondary " style={{ padding: 45, width: 700 }}>
                    <h5 className="mb-3">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <p className="fs-4">Subtotal</p>
                        <p className="fs-5">${total.toFixed(2)}</p>
                    </div>
                    <hr className="text-dark" />
                    <div className="d-flex justify-content-between mb-3">
                        <p className="fs-4 fw-bold">Total</p>
                        <p className="fs-3 text-danger">${total.toFixed(2)}</p>
                    </div>
                    <div className="text-center mb-3">
                        <button className="btn btn-primary">Proceed to Checkout</button>
                    </div>
                    <Link to={'/'}>Continued Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default Cartpage;
