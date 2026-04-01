'use client';

import { createContext, useEffect, useReducer } from 'react';
import { initialProducts, initialOrders, initialInvoices } from '@/lib/sampleData';

const AppDataContext = createContext({});

const STORAGE_KEY = 'fameo-dashboard-data';

const initialState = {
  products: initialProducts,
  orders: initialOrders,
  invoices: initialInvoices,
};

function appDataReducer(state, action) {
  switch (action.type) {
    case 'INIT_FROM_STORAGE':
      return action.payload;
    case 'CREATE_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)) };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter((p) => p.id !== action.payload) };
    case 'UPDATE_ORDER':
      return { ...state, orders: state.orders.map((o) => (o.id === action.payload.id ? { ...o, ...action.payload } : o)) };
    case 'UPDATE_INVOICE':
      return { ...state, invoices: state.invoices.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i)) };
    default:
      return state;
  }
}

export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loaded = window.localStorage.getItem(STORAGE_KEY);
    if (loaded) {
      try {
        const parsed = JSON.parse(loaded);
        if (parsed?.products && parsed?.orders && parsed?.invoices) {
          dispatch({ type: 'INIT_FROM_STORAGE', payload: parsed });
        }
      } catch (error) {
        console.error('AppDataContext parse error', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const actions = {
    createProduct: (product) => dispatch({ type: 'CREATE_PRODUCT', payload: product }),
    updateProduct: (product) => dispatch({ type: 'UPDATE_PRODUCT', payload: product }),
    deleteProduct: (productId) => dispatch({ type: 'DELETE_PRODUCT', payload: productId }),
    updateOrder: (order) => dispatch({ type: 'UPDATE_ORDER', payload: order }),
    updateInvoice: (invoice) => dispatch({ type: 'UPDATE_INVOICE', payload: invoice }),
  };

  return <AppDataContext.Provider value={{ state, actions }}>{children}</AppDataContext.Provider>;
}

export default AppDataContext;
