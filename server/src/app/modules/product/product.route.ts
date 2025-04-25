import express, { Router } from 'express';

const router: Router = express.Router();

// Add product routes here
// Example routes:
// router.post(
//   '/',
//   auth(USER_ROLE_ENUM.ADMIN),
//   validateRequest(ProductValidation.create),
//   ProductController.createProduct
// );

// router.get(
//   '/',
//   ProductController.getAllProducts
// );

// router.get(
//   '/:id',
//   ProductController.getProductById
// );

// router.patch(
//   '/:id',
//   auth(USER_ROLE_ENUM.ADMIN),
//   validateRequest(ProductValidation.update),
//   ProductController.updateProduct
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE_ENUM.ADMIN),
//   ProductController.deleteProduct
// );

export const ProductRoute = router;
