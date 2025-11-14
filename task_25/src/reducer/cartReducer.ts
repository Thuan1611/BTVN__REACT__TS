import type { TCart } from '../types/Carts';
import type { TProducts } from '../types/Products';

export type State = {
    carts: TCart[];
    cartItem: TCart | null;
};
export type Action =
    | {
          type: 'GET';
          payload: TCart[];
      }
    | {
          type: 'ADD TO CART';
          payload: TCart | TProducts;
      }
    | {
          type: 'REMOVE TO CART';
          payload: TCart;
      }
    | {
          type: 'DECREASE TO CART';
          payload: TCart;
      };
export const cartReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'GET':
            return { ...state, carts: action.payload };

        case 'ADD TO CART': {
            const newCart = state.carts.find((item) => item.id == action.payload.id);
            if (newCart) {
                const UpdateCart = state.carts.map((item) =>
                    item.id == action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
                return { ...state, carts: UpdateCart };
            } else {
                const UpdateCart = { ...action.payload, quantity: 1 };
                return { ...state, carts: [...state.carts, UpdateCart] };
            }
        }

        case 'DECREASE TO CART': {
            const newCart = state.carts.find((item: TCart) => item.id === action.payload.id);
            if (!newCart) return state;
            if (newCart?.quantity > 1) {
                const updateData = state.carts.map((item) => {
                    return item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item;
                });
                return { ...state, carts: updateData };
            }
            const data = state.carts.filter((item: TCart) => item.id !== action.payload.id);
            return { ...state, carts: data };
        }

        case 'REMOVE TO CART': {
            const newCart = state.carts.filter((item) => item.id !== action.payload.id);
            return { ...state, carts: newCart };
        }
        default:
            return state;
    }
};
