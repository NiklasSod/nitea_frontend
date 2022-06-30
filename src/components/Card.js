import axios from 'axios';
import editIcon from '../Styles/icons/icons8-edit-64.png';
import deleteIcon from '../Styles/icons/icons8-remove-80.png';

export default function ListProduct({ products }) {

    const imageOnClick = (name, id) => {
        const answer = window.confirm(`Are you sure you want to remove ${name}?`);
        if(answer){
            axios.delete(`http://localhost/niklas/arbetsprov_nitea/product/${id}/delete`).then(res => {
                window.location.reload(true);
            });
        };
    };

    return (
        <>
        {products && products.map((product, key) => {
            return (
            <div id='card' key={key}>
                <h1 id="card_title">{product.name}</h1>
                <div id="content">
                    <div id='cover'>
                        <img id="game_img" src={product.product_url} alt={product.name} />
                        <p id={`game_${product.release_status === 0 ? "not_released" : "released"}`}></p>
                    </div>
                    <div id="info">
                        <p id="price">{product.price} {product.currency}</p>
                        {product.genre.map((g, k) => {
                            return (
                                <p key={k} id="genres">{g.charAt(0).toUpperCase() + g.slice(1)}</p>
                            )
                        })}
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