import Admin from "./pages/Admin";
import {ADMIN_ROUTE, CART_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PROFILE_ROUTE, FAQ_ROUTE} from "./utils/consts";
import Cart from "./pages/CartPage";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import FAQ from "./pages/FAQ";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
   
];
export const unauthRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
];
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: FAQ_ROUTE,
        Component: FAQ
    }
];
