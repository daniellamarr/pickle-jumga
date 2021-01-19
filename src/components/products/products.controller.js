import Product from '../../db/models/product';
import User from '../../db/models/user';
import { validateFields } from '../../helpers/validation';

export const listProducts = async (req, res) => {
  try {
    let products = await Product.find({ active: true }).populate('owner');
    products = products.map((product) => {
      const store = product.owner.store.name;
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        active: product.active,
        store,
      };
    });
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

export const fetchProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      active: true,
      _id: req.params.productId
    }).populate('owner');
    const store = product.owner.store.name;
    return res.send({
      success: true,
      message: 'Products returned successfully',
      data: {
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          active: product.active,
          store,
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

export const listSellerProducts = async (req, res) => {
  try {
    let products = await Product.find({ owner: req.user.id });
    products = products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      active: product.active,
    }));
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
    const product = await Product.create({ ...req.body, owner: req.user.id });
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
