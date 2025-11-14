import  { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import SidebarCart from './SidebarCart';
import { Link } from 'react-router-dom';

const Header = () => {
    const { state } = useContext(CartContext);
    const [openCart, setOpenCart] = useState(false);
    return (
        <div>
            <header className="container-fluid shadow-sm position-fixed  bg-light py-3 d-flex align-items-center justify-content-between z-3">
                {/* Logo */}
                <div className="d-flex align-items-center gap-2">
                    
                    <i className="fa-solid fa-store fs-4"><Link to={"/"}>MyShop</Link></i>
                    <span className="fs-4 fw-bold"></span>
                </div>

                {/* Search */}
                <div className="col-5">
                    <input type="text" className="form-control" placeholder="Search products..." />
                </div>

                {/* Right icons */}
                <div className="d-flex align-items-center gap-4 fs-5">
                    <div
                        className="position-relative"
                        onMouseEnter={() => setOpenCart(true)}
                        onMouseLeave={() => {
                            setOpenCart(false);
                        }}
                    >
                        <div className="d-flex align-items-center gap-1 cursor-pointer">
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>

                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                                {state.carts.length}
                            </span>
                        </div>
                        <SidebarCart openCart={openCart} setOpenCart={setOpenCart} />
                    </div>
                </div>
            </header>
        </div>
    );
};
export default Header;
