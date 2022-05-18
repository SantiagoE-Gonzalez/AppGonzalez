import { createContext, useState } from 'react'

//Se crea el contexto.
export const Shop = createContext()

//Declaramos el ShopProvider con pascal case, es lo que vamos a exportar
const ShopProvider = ({ children }) => {

    const [cantidadItems, setCantidadItems] = useState(0)
    const [cart, setCart] = useState([])
    const [totalAPagar, setTotalAPagar] = useState(0)
    //Uso de funciones del context
    const addItem = (item, cantidadToAdd) => {
        const productoEnCarrito = isInCart(item)
        if (productoEnCarrito) {
            setCantidadItems(cantidadItems + cantidadToAdd)
            productoEnCarrito.cantidad += cantidadToAdd
            const cartFiltrado = cart.filter(itemCarrito => itemCarrito.id!==productoEnCarrito.id)
            cartFiltrado.push(productoEnCarrito)
            setCart(cartFiltrado)
        } else {
            setCantidadItems(cantidadItems + cantidadToAdd)
            setCart([...cart, { ...item, cantidad: cantidadToAdd }]) //{...item, cantidad} de esta forma añado la propiedad cantidad al objeto item
        }
        setTotalAPagar(totalAPagar + (cantidadToAdd*item.price))

    }
    const isInCart = (producto) => {
        return cart.find(elemento => elemento.id === producto.id)
    }

    const clear = () => {
        setTotalAPagar(0)
        setCart([])
        setCantidadItems(0)
    }

    const removeItem = (item) => {
        setCantidadItems(cantidadItems-item.cantidad)
        const carritoFiltrado = cart.filter(itemCarrito => itemCarrito.id !== item.id)
        setCart(carritoFiltrado)
        setTotalAPagar(totalAPagar-(item.price*item.cantidad))
    }

    return (
        <Shop.Provider value={{ cantidadItems, addItem, cart, totalAPagar, removeItem, clear}}>
            {children}
        </Shop.Provider>
    )
}

export default ShopProvider //exportamos el shopProvider. ShopProvider provee el contexto