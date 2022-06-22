import { useEffect, useState } from 'react';
import '../Styles/CreateProduct.scss';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate(); 
    const {id} = useParams();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.product_name && inputs.product_name.length < 3){
            alert('Name the game!');
        } else if (inputs.product_url && inputs.product_url.length < 3){
            alert('Add a cover picture!');
        } else if (inputs.product_price && inputs.product_price === Number){
            alert('Add a price!');
        } else if (inputs.currency_id === 'select'){
            alert('Select a currency!');
        } else if (inputs.category_id === 'select'){
            alert('Select a category!');
        } else {
            let jsonInputs = JSON.stringify(inputs);
            axios.put(`http://localhost/niklas/arbetsprov_nitea/product/${id}/edit`, jsonInputs);
            navigate("/");
            window.location.reload(true);
        };
    };

    useEffect(() => {
        axios.get(`http://localhost/niklas/arbetsprov_nitea/product/${id}/edit`).then(res => {
            setInputs(res.data);
        });
    }, []);

    return(
        <>
            <h1>Edit</h1>
            <form id="create_form">
                <table>
                    <tbody>
                        <tr>
                            <th><label>Name: </label></th>
                            <td><input defaultValue={inputs.name} type="text" name="name" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Picture: </label></th>
                            <td><input defaultValue={inputs.product_url} type="text" name="product_url" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Price: </label></th>
                            <td>
                            <input defaultValue={inputs.price} type="number" name="price" id="tiny_input" onChange={handleChange} />
                            <select defaultValue={1} name="currency" id="currency" onChange={handleChange}>
                                <option value="select">Select a currency</option>
                                <option value="1">Sek</option>
                                <option value="2">Euro</option>
                                <option value="3">Dollar</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label>Category: </label></th>
                            <td>
                            <select name="genre" id="category" onChange={handleChange}>
                                <option value="select">Select a category</option>
                                <option value="1">Action</option>
                                <option value="2">Adventure</option>
                                <option value="3">Puzzle</option>
                                <option value="4">Racing</option>
                                <option value="5">Simulation</option>
                                <option value="6">Party</option>
                            </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <input type="submit" value="Submit" id="submit" onClick={handleSubmit} />
            </form>
        </>
    )
};