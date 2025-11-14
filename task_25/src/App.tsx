import './App.css';
import Header from './components/Header';
import ListProducts from './components/ListProducts';
import Cartpage from './components/Cartpage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Header />
            {/* <ListProducts /> */}
            {/* <ManagementProductsPage/> */}
            {/* <Cartpage/>  */}
            <Routes>
                <Route path='/' element={<ListProducts/>}/>
                <Route path='/cart' element={<Cartpage/>}/>
            </Routes>
        </>
    );
}

export default App;
