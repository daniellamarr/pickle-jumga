import Order from '../../db/models/order';
import Product from '../../db/models/product';
import settlement from '../../helpers/settlement';

export const createOrder = async (req, res) => {
  try {
    const {
      items, deliveryMethod
    } = req.body;
    const itemsSearch = items.map(async (item) => {
      const findItems = await Product.findById(item.productId);
      return {
        id: findItems._id,
        name: findItems.name,
        price: findItems.price,
        quantity: item.quantity,
        total: findItems.price * item.quantity,
        owner: findItems.owner
      };
    });
    const searchResults = await Promise.all(itemsSearch);
    const getPrices = searchResults.map(
      (result) => result.price * result.quantity
    );
    const totalPrice = getPrices.reduce((prev, curr) => prev + curr, 0);
    settlement(totalPrice, searchResults);
    const order = await Order.create({
      items,
      price: totalPrice,
      owner: req.user.id,
      deliveryMethod,
      status: 'Processing'
    });

    return res.send({
      success: true,
      message: 'Order created',
      data: {
        order
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};

export const fetchOrders = async (req, res) => {};
