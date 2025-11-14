import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import { cartReducer, type Action, type State } from '../reducer/cartReducer';

type CartContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
    total: number;
};

const initialState: State = {
    carts: [],
    cartItem: null,
};

export const CartContext = createContext<CartContextType>({
    state: initialState,
    dispatch: () => {},
    total: 0,
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log(data);
        dispatch({ type: 'GET', payload: data });
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.carts));
    }, [state.carts]);

    const total = state.carts.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
    }, 0);
    const value = {
        state,
        dispatch,
        total,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
