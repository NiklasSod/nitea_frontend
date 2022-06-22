import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState } from 'react';

// import editIconMoving from '../Styles/icons/icons8-edit.gif';
import editIcon from '../Styles/icons/icons8-edit-64.png';
import deleteIcon from '../Styles/icons/icons8-remove-80.png';

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    const imageOnClick = (name, id) => {
        const answer = window.confirm(`Are you sure you want to remove ${name}?`);
        if(answer){
            axios.delete(`http://localhost/niklas/arbetsprov_nitea/product/${id}/delete`).then(res => {
                window.location.reload(true);
            });
        };
    };

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
                            <img id="deleteIcon" alt="delete" src={deleteIcon} onClick={ () => imageOnClick(product.name, product.id) } />
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )
};