import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  precoUnitario: {
    type: Number,
    required: false
  },
  subtotal: {
    type: Number,
    required: false
  },
  dataAdicao: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true, 
    unique: true 
  },
  items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;