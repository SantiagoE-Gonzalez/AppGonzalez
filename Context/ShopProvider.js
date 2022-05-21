import { createContext, useState, useEffect } from 'react'
import { db } from "../Firebase/config";
import { collection,where, getDocs, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//Se crea el contexto.
export const Shop = createContext()

//Declaramos el ShopProvider con pascal case, es lo que vamos a exportar
const ShopProvider = ({ children }) => {

    const [cantidadItems, setCantidadItems] = useState(0)
    const [cart, setCart] = useState([])
    const [totalAPagar, setTotalAPagar] = useState(0)
    const [ordenesRealizadas, setOrdenesRealizadas] = useState([])
    const [uid, setUid] = useState("")
    const [compraRealizadaOK, setCompraRealizadaOK] = useState(false)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } 
        });

    }, [])

    useEffect(() => {

        (async () => {
            const queryCollectionOrdenes = query(collection(db, "orders"), where("uid", "==", uid))
            
            const querySnapshotOrdenes = await getDocs(queryCollectionOrdenes);
            
            const ordenes = []
            querySnapshotOrdenes.forEach((doc) => {
                const orden = { id: doc.id, ...doc.data() }
                ordenes.push(orden)
            })

            setOrdenesRealizadas([...ordenes])
            setCompraRealizadaOK(false)
        })()

    }, [uid, compraRealizadaOK])

    const cerrarSesion = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    }

    //Uso de funciones del context
    const addItem = (item, cantidadToAdd) => {
        const productoEnCarrito = isInCart(item)
        if (productoEnCarrito) {
            setCantidadItems(cantidadItems + cantidadToAdd)
            productoEnCarrito.cantidad += cantidadToAdd
            const cartFiltrado = cart.filter(itemCarrito => itemCarrito.id !== productoEnCarrito.id)
            cartFiltrado.push(productoEnCarrito)
            setCart(cartFiltrado)
        } else {
            setCantidadItems(cantidadItems + cantidadToAdd)
            setCart([...cart, { ...item, cantidad: cantidadToAdd }]) //{...item, cantidad} de esta forma añado la propiedad cantidad al objeto item
        }
        setTotalAPagar(totalAPagar + (cantidadToAdd * item.price))

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
        setCantidadItems(cantidadItems - item.cantidad)
        const carritoFiltrado = cart.filter(itemCarrito => itemCarrito.id !== item.id)
        setCart(carritoFiltrado)
        setTotalAPagar(totalAPagar - (item.price * item.cantidad))
    }

    return (
        <Shop.Provider value={{ cantidadItems, addItem, cart, totalAPagar,
         removeItem, clear, ordenesRealizadas,uid,setCompraRealizadaOK,cerrarSesion}}>
            {children}
        </Shop.Provider>
    )
}

export default ShopProvider //exportamos el shopProvider. ShopProvider provee el contexto
