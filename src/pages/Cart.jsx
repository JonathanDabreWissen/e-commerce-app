import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../reduxContainer/cartSlice';
import { IoMdAdd, IoMdRemove, IoMdTrash } from 'react-icons/io';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleAddToCart = (item) => {
    dispatch(cartActions.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      brand: item.brand,
      category: item.category
    }));
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className='p-8 bg-white mt-10 rounded-3xl'>
      <div className="text-3xl font-semibold mb-5 flex justify-between items-center">
        <span>Shopping Cart</span>
        {cartItems.length > 0 && (
          <button 
            onClick={handleClearCart}
            className='text-sm bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'
          >
            <IoMdTrash /> Clear Cart
          </button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>Your cart is empty</div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className='flex justify-between items-center border-b pb-4'>
                <div className='flex gap-4 items-center'>
                  <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center'>
                    <img className='w-12 h-12' src="https://e7.pngegg.com/pngimages/789/115/png-clipart-computer-icons-box-icon-design-product-box-miscellaneous-angle.png" alt="" />
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg'>{item.name}</h3>
                    <p className='text-sm text-gray-500'>{item.brand} • {item.category}</p>
                    <p className='font-bold'>₹ {item.price}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2 border rounded-lg p-1'>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md'
                    >
                      <IoMdRemove />
                    </button>
                    <span className='w-8 text-center'>{item.quantity}</span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md'
                    >
                      <IoMdAdd />
                    </button>
                  </div>
                  <div className='font-bold text-lg'>
                    ₹ {item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className='mt-8 border-t pt-4'>
            <div className='flex justify-between text-lg font-semibold'>
              <span>Subtotal</span>
              <span>₹ {totalAmount.toFixed(2)}</span>
            </div>
            <button className='w-full bg-[#2b3446] text-white py-3 rounded-xl mt-4 font-semibold'>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;