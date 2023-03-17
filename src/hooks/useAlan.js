import { useEffect, useState, useCallback } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import { useCart } from "../context/CartContext"
import {storeItems} from "../items"

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
  CLEAR_CART:'clear-cart'
}

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState()
  const {
    setShowCartItems,
    isCartEmpty,
    addToCart,
    removeFromCart,
    cart,
    checkout,
    clearCart
  } = useCart()

  const openCart = useCallback(() => {
    if (isCartEmpty) {
      alanInstance.playText("You have no items in your cart")
    } else {
      alanInstance.playText("Opening cart")
      setShowCartItems(true)
    }
  }, [alanInstance, isCartEmpty, setShowCartItems])

  const closeCart = useCallback(() => {
    if (isCartEmpty) {
      alanInstance.playText("You have no items in your cart")
    } else {
      alanInstance.playText("Closing cart")
      setShowCartItems(false)
    }
  }, [alanInstance, isCartEmpty, setShowCartItems])

  const addItem = useCallback(
    ({ detail: { name, quantity } }) => {
      const item = storeItems.find(
        i => i.name.toLowerCase() === name.toLowerCase()
      )
      if (item == null) {
        alanInstance.playText(`I cannot find the ${name} item`)
      } else {
        addToCart(item.id, quantity)
        alanInstance.playText(
          `Add ${quantity} of the ${name} item to your cart`
        )
      }
    },
    [alanInstance, addToCart]
  )

  const removeItem = useCallback(
    ({ detail: { name } }) => {
      const entry = cart.find(
        e => e.item.name.toLowerCase() === name.toLowerCase()
      )
      if (entry == null) {
        alanInstance.playText(`I cannot find the ${name} item in your cart`)
      } else {
        removeFromCart(entry.item.id)
        alanInstance.playText(`Removed the ${name} item from your cart`)
      }
    },
    [alanInstance, removeFromCart, cart]
  )

  const purchaseItems = useCallback(() => {
    if (isCartEmpty) {
      alanInstance.playText("Your cart is empty")
    } else {
      alanInstance.playText("Checking out")
      checkout()
    }
  }, [alanInstance, isCartEmpty, checkout])

  const clearrCart=useCallback(()=>{
    if (isCartEmpty) {
      alanInstance.playText("Your cart is already empty")
    } else {
      clearCart()
      alanInstance.playText("Your cart is empty")
    }
  }, [alanInstance, isCartEmpty, clearCart])


  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart)
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart)
    window.addEventListener(COMMANDS.ADD_ITEM, addItem)
    window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem)
    window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)
    window.addEventListener(COMMANDS.CLEAR_CART, clearrCart)

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart)
      window.removeEventListener(COMMANDS.CLOSE_CART, closeCart)
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem)
      window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem)
      window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)
      window.removeEventListener(COMMANDS.CLEAR_CART, clearrCart)
    }
  }, [openCart, closeCart, addItem, removeItem, purchaseItems,clearrCart])

  useEffect(() => {
    if (alanInstance != null) return

    setAlanInstance(
      alanBtn({
        top: "15px",
        left: "15px",
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }))
        }
      })
    )
  }, [])

  return null
}
