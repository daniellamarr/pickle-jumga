import Product from '../../db/models/product';
import User from '../../db/models/user';
import { validateFields } from '../../helpers/validation';

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

export const listSellerProducts = (req, res) => {
  try {
    const products = Product.find({ owner: req.query.owner });
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

export const createProduct = async (req, res) => {
  try {
    const {
      name, price, category, image
    } = req.body;
    const requiredFields = [
      {
        name: 'product name',
        value: name,
      },
      {
        name: 'product price',
        value: price,
      },
      {
        name: 'product category',
        value: category,
      },
      {
        name: 'product image',
        value: image,
      },
    ];

    const validate = validateFields(requiredFields);
    if (!validate.status) {
      return res.status(400).send({
        success: false,
        message: validate.message
      });
    }

    const findUser = await User.findOne({
      _id: req.user.id,
      type: 'merchant'
    });

    if (!findUser) {
      return res.status(400).send({
        success: false,
        message: 'Owner is invalid/not a seller'
      });
    }
    const product = Product.create(req.body);
    return res.send({
      success: true,
      message: 'Product created successfully',
      data: {
        product
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured',
      error: err
    });
  }
};
