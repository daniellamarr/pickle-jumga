import Cart from '../../db/models/cart';
import Product from '../../db/models/product';

export const createCart = async (req, res) => {
  try {
    const { items } = req.body;
    const findCart = await Cart.findOne({ owner: req.user.id, active: true });
    const itemsSearch = items.map(async (item) => {
      const findItems = await Product.findById(item.productId);
      return {
        id: findItems._id,
        name: findItems.name,
        price: findItems.price,
        category: findItems.category,
        image: findItems.image,
        active: findItems.active,
        quantity: item.quantity
      };
    });
    const searchResults = await Promise.all(itemsSearch);
    const getPrices = searchResults.map(
      (result) => result.price * result.quantity
    );
    const totalPrice = getPrices.reduce((prev, curr) => prev + curr, 0);
    if (findCart) {
      await Cart.updateOne({
        owner: req.user.id, active: true
      }, {
        price: totalPrice,
        items
      });
    } else {
      await Cart.create({
        owner: req.user.id,
        price: totalPrice,
        items
      });
    }
    return res.send({
      success: true,
      message: 'Added to cart',
      data: {
        cart: {
          price: totalPrice,
          items: searchResults,
        }
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};

export const fetchCart = async (req, res) => {
  try {
    const findCart = await Cart.findOne({ owner: req.user.id, active: true })
      .populate('items.productId');

    if (!findCart) {
      return res.status(404).send({
        success: false,
        message: 'You have no item in your cart',
      });
    }
    return res.send({
      success: true,
      message: 'Cart returned successfully',
      data: {
        cart: findCart
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const findCart = await Cart.findOne({ owner: req.user.id, active: true });

    if (!findCart) {
      return res.status(404).send({
        success: false,
        message: 'You have no item in your cart',
      });
    }

    await Cart.deleteOne({ owner: req.user.id, active: true });

    return res.send({
      success: true,
      message: 'Cart deleted successfully'
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};
