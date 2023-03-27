
import './styles.css'

import ProductsCategories from '../../components/ProductsCategories';
import { ProductDTO } from '../../models/product';


type Props = {
    product: ProductDTO;
}
export default function ProductDetailsCard({ product }: Props) {

    return (

        <div className="dsc-card dsc-mb20">
            <div className="dsc-product-details-top dsc-line-bottom">
                <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="dsc-product-details-bottom">
                <h3>{product.price.toFixed(2)}</h3>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <ProductsCategories name=" Eletrônicos" />
                <ProductsCategories name=" Computadores" />
            </div>
        </div>



    );
}