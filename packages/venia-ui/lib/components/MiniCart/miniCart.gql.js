import gql from 'graphql-tag';

import { ProductListFragment } from './ProductList/productList.gql';

export const MINI_CART_QUERY = gql`
    query MiniCartQuery($cartId: String!) {
        cart(cart_id: $cartId) @connection(key: "Cart") {
            id
            total_quantity
            prices {
                subtotal_excluding_tax {
                    currency
                    value
                }
            }
            ...ProductListFragment
        }
    }
    ${ProductListFragment}
`;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: Int!) {
        removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId })
            @connection(key: "removeItemFromCart") {
            cart {
                id
                total_quantity
                prices {
                    subtotal_excluding_tax {
                        currency
                        value
                    }
                }
                ...ProductListFragment
            }
        }
    }
    ${ProductListFragment}
`;

export default {
    queries: {
        miniCartQuery: MINI_CART_QUERY
    },
    mutations: {
        removeItemMutation: REMOVE_ITEM_MUTATION
    }
};
