import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import SidebarCart from './SidebarCart';

const Header = () => {
    const cartItem = useContext(CartContext);
    const [openCart, setOpenCart] = useState(false);
    return (
        <div>
            <header className="container-fluid shadow-sm bg-light py-3 d-flex align-items-center justify-content-between">
                {/* Logo */}
                <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-store fs-4"></i>
                    <span className="fs-4 fw-bold">MyShop</span>
                </div>

                {/* Search */}
                <div className="col-5">
                    <input type="text" className="form-control" placeholder="Search products..." />
                </div>

                {/* Right icons */}
                <div className="d-flex align-items-center gap-4 fs-5">
                    <div
                        className="position-relative d-flex align-items-center gap-1 cursor-pointer"
                        onClick={() => setOpenCart(true)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="d-none d-sm-block small">Cart</span>
                        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                            {cartItem.cart.length}
                        </span>
                    </div>
                </div>
            </header>
            <SidebarCart openCart={openCart} setOpenCart={setOpenCart} />
        </div>
    );
};
export default Header;
