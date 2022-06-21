import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState } from 'react';

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/niklas/arbetsprov_nitea/').then(res => {
            setProducts(res.data);
            console.log(res.data);
        });
    }, [setProducts]);
    
    return(
        <>
            {products.map((product, key) => {
                return (
                <div id="card">
                    <div key={key}>
                        <img id="cover" scr={product.product_url} alt="game cover" />
                        <div>
                            <h1>{product.name}</h1>
                            <p>{product.price} {product.currency}</p>
                            <p>{product.genre}</p>
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )
};