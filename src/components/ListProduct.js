import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState } from 'react';

// import editIconMoving from '../Styles/icons/icons8-edit.gif';
import editIcon from '../Styles/icons/icons8-edit-64.png';
import deleteIcon from '../Styles/icons/icons8-remove-80.png';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const imageOnClick = (name, id) => {
        const answer = window.confirm(`Are you sure you want to remove ${name}?`);
        if(answer){
            axios.delete(`http://localhost/niklas/arbetsprov_nitea/product/${id}/delete`).then(res => {
                window.location.reload(true);
            });
        };
    };

    const searchProduct = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        axios.get('http://localhost/niklas/arbetsprov_nitea/').then(res => {
            setProducts(res.data);
        });
    }, []);

    useEffect(() => {
        if(searchInput !== ''){
            const filteredProducts = products.filter((product) => {
                return Object.values(product.name).join('').toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredProducts);
        } else {
            setFilteredResults(products)
        };
    }, [searchInput, products]);

    return(
        <>
            {/* temp change products to filteredResults and complete work on searchbar */}
            <input onChange={(e) => searchProduct(e)}></input>
            <br />
            {filteredResults && filteredResults.map((product, key) => {
                return (
                <div id='card' key={key}>
                    <h1 id="card_title">{product.name}</h1>
                    <div id="content">
                        <div id='cover'>
                            <img id="game_img" src={product.product_url} alt={product.name} />
                            <p id={`game_${product.release_status === 0 ? "not_released" : "released"}`}></p>
                        </div>
                        <div id="info">
                            <p>{product.price} {product.currency}</p>
                            <p id="genres">{product.genre}</p>
                        </div>
                        <div id="icons">
                            <a href={`product/${product.id}/edit`}>
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