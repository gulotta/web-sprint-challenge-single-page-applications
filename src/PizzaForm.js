import React, {useState, useEffect} from 'react'
import style from './App.css'
import * as yup from 'yup';
import axios from 'axios';

/* ---- Validation ----- */
// const formSchema = yup.object().shape ({
//     user: yup.string().required('Name is required!').min(2, "name must be at least 2 characters"),
//     sauce: yup.string().oneOf(['marinara', 'vodka', 'pesto'], 'you must select a sauce'),
//     size: yup.string().oneOf(['sm', 'md', 'lg', 'xl'], 'you must select a size'),
//     topping: yup.boolean()
// })

const formSchema = yup.object().shape({
    user: yup
    .string()
    .min(2, "name must be at least 2 characters")
    .required("name is required!"),
    sauce: yup
    .string()
    .oneOf(['marinara', 'vodka', 'pesto']),
    size: yup
    .string()
    .oneOf(['sm', 'md', 'lg', 'xl'], 'you must select a size'),
    topping: yup
    .boolean(),
    special: yup
    .string()


})


/* ---- Validation ---- */

export default function PizzaApp() {

    const [form, setForm] = useState ({user: '', size: '', sauce: '',topping: '', special: '',});
    
    const [errors, setErrors] = useState ({user: '', size: '', sauce: '',topping: '', special: '',  });
   
    const [disabled, setDisabled] = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(formSchema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch(err => setErrors({...errors, [name]: err.errors[0]}))
    }

    const change = event => {
        const {checked, value, name, type} = event.target
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name,  valueToUse)
        setForm ({ ...form, [name]: valueToUse })
    }

    const submit = event => {
        event.preventDefault()
        const newOrder = {user: form.user.trim(), size: form.value, sauce: form.sauce, topping: form.topping, special: form.special}
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                setForm({user: '', size: '', sauce: '',topping: '', special: '',})
            })
            .catch(err => {
                debugger
            })
    }
       
    useEffect (() => {
        formSchema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])


    return (
        <div className='PizzaForm'>
            <div style={{color: 'red'}}>
                <div>{errors.user}</div>
            </div>
            <form onSubmit={submit} id='pizza-form' >
                <label><br></br>Customer Name:
                    <input onChange={change} id= 'name-input' value={form.user} name='user' type='text' />
                </label><br></br>
                <label>Pizza Size:&nbsp;
                    <select
                    onChange={change} 
                    id='size-dropdown'
                    value={form.value}
                    name="size">
                        <option value=''>--Select value--</option>
                        <option value='sm'>Small - 10'</option>
                        <option value='md'>Medium - 12'</option>
                        <option value='lg'>Large - 14'</option>
                        <option value='xl'>Party Size - 18'</option>
                    </select>
                </label>
                <h2>Pizza Sauce</h2>
                    <h3>Choose One</h3>
                <label>Marinara Sauce
                    <input onChange={change}
                    checked={form.sauce === "marinara"}
                    value = "marinara" 
                    name='sauce' 
                    type='radio' 
                    />
                </label>
                <label>Vodka Sauce
                    <input onChange={change}
                    checked={form.sauce === "vodka"}
                    value = "vodka" 
                    name='sauce' 
                    type='radio' 
                    />
                </label>
                <label>Pesto Sauce
                    <input onChange={change}
                    checked={form.sauce === "pesto"}
                    value = "pesto" 
                    name='sauce' 
                    type='radio' 
                    />
                </label>
                <h2>Pizza Toppings</h2>
                <div class="toppings">
                <label>Extra Cheese
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='cheese' 
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Pepperoni
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='pepperoni' 
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Sausage
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='sausage' 
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Meatball
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='meatball' 
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Onions
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='onions' 
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Peppers
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='peppers'
                    name="topping"
                    type='checkbox' 
                    />
                </label>
                <label>Garlic
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='garlic'
                    name="topping" 
                    type='checkbox' 
                    />
                </label>
                <label>Arugula
                    <input onChange={change} 
                    checked={form.topping.value}
                    value='arugula'
                     name="topping"
                     type='checkbox' 
                     />
                </label>
                </div>&nbsp;
                <br></br>
                <label>Special Instructions:&nbsp;
                    <input onChange={change} 
                    id="special-text"
                    name='special' 
                    type='text' 
                    placeholder="Anything you'd like to add?" />
                </label><br></br><br></br>
               
                <button id='order-button'disabled={disabled}>Submit Your Order</button>
            </form>
        </div>
    )
}