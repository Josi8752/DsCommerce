import './styles.css';
import cartIcon from '../../assets/cart.svg';

import { useContext } from 'react';
import { ContextCartCount } from '../../utils/context-cart';
import { Link } from 'react-router-dom';

export default function CartIcon() {

    const { contextCartCount } = useContext(ContextCartCount);

    return (
        <>

            <Link to="/login">
                <img src={cartIcon} alt="Carrinho de compras" /></Link>
            {
                contextCartCount > 0 &&

                <div className="dsc-cart-count">{contextCartCount}</div>
            }

        </>

    );
}