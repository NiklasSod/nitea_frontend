import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState } from 'react';
// import editIconMoving from '../Styles/icons/icons8-edit.gif';
import editIcon from '../Styles/icons/icons8-edit-64.png';
import deleteIcon from '../Styles/icons/icons8-remove-80.png';

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/niklas/arbetsprov_nitea/').then(res => {
            setProducts(res.data);
        });
    }, []);
    
    return(
        <>
            {products && products.map((product, key) => {
                return (
                <div id="card" key={key}>
                    <h1 id="card_title">{product.name}</h1>
                    <div>
                        <img id="cover" src={product.product_url} alt={product.name} />
                        <div id="info">
                            <p>{product.price} {product.currency}</p>
                            <p>{product.genre}</p>
                            <a href={`product/${product.id}/edit`}>
                                {/* <img id="editIconMoving" alt="edit" src={editIconMoving} /> */}
                                <img id="editIcon" alt="edit" src={editIcon} />
                            </a>
                            {/* add delete functionality */}
                            <a href="temp">
                                <img id="deleteIcon" alt="delete" src={deleteIcon} />
                            </a>
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )
};