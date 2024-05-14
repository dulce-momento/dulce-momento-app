import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createInfo = async (info) => {
    const { data } = await $authHost.post('api/info', info);
    return data;
};

export const fetchInfos = async () => {
    const { data } = await $host.get('api/info');
    return data;
};

export const fetchInfosByProductId = async (id) => {
    const { data } = await $host.get('api/info/' + id);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/info/types');
    return data;
};

export const createRating = async (rating) => {
    const { data } = await $authHost.post('api/rating', rating);
    return data;
};

export const fetchRatings = async () => {
    const { data } = await $host.get('api/rating',);
    return data;
};

export const createProduct = async (product) => {
    //console.log(product.entries());
    for (var pair of product.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    const { data } = await $authHost.post('api/product', product);
    return data;
};

export const fetchProducts = async (typeId, page, limit = 12) => {
    const { data } = await $host.get('api/product', {
        params: {
            typeId, page, limit
        }
    });
    return data;
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id);
    return data;
}

export const createCartItem = async (clientId, productId) => {
    const { data } = await $authHost.post('api/cart', { productId: productId });
    return data;
}

export const fetchClientCart = async () => {
    const { data } = await $authHost.get('api/cart');
    return data;
}

export const deleteCartItem = async (id) => {
    const { data } = await $authHost.delete('api/cart/' + id);
    return data;
}

export const updateCartItemsDeliveryId = async (deliveryId, cart) => {
    const { data } = await $authHost.patch('api/cart', { deliveryId: deliveryId, cartItems: cart });
    return data;
}

export const createDelivery = async (formData, cart) => {
    const { data } = await $authHost.post('api/delivery', { delivery: formData, cart: cart });
    return data;
}

export const fetchClientDeliveries = async () => {
    const { data } = await $authHost.get('api/delivery');
    return data;
}

export const fetchAllDeliveries = async () => {
    const { data } = await $authHost.get('api/delivery/all');
    return data;
}

export const updateDeliveryDate = async (id) => {
    const {data} = await $authHost.patch('api/delivery', {id});
    return data;
}