import Product from '../../db/models/product';

export const listProducts = (req, res) => {
  try {
    const products = Product.find({ active: true });
    return res.send({
      success: true,
      message: 'Products returned successfully',
      data: {
        products
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};

export const fetchProduct = (req, res) => {
  try {
    const product = Product.findOne({
      active: true,
      _id: req.params.productId
    });
    return res.send({
      success: true,
      message: 'Products returned successfully',
      data: {
        product
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};
