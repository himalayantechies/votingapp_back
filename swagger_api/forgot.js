/**
 * @swagger
 * components:
 *  schemas:
 *   ForgotEmail:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *    required:
 *     - "productId"
 *     - "quantity"
 */


/**
 * @swagger
 * /forgot/send/email:
 *  post:
 *   tags:
 *    - 'cart'
 *   security:
 *    - bearerAuth: []
 *   summary: 'Forgot password: Enter email'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/ForgotEmail'
 *   responses:
 *    '200':
 *     description: Successful operation
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   ForgotCode:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     code:
 *      type: string
 *    required:
 *     - "productId"
 *     - "quantity"
 */

/**
 * @swagger
 * /forgot/send/code:
 *  post:
 *   tags:
 *    - 'cart'
 *   security:
 *    - bearerAuth: []
 *   summary: 'Forgot Password: Enter code'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/ForgotCode'
 *   responses:
 *    '200':
 *     description: Successful operation
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   ForgotPassword:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     password:
 *      type: string
 *      comfirm_password:
 *       type: string
 *    required:
 *     - "productId"
 *     - "quantity"
 */

/**
 * @swagger
 * /forgot/change/password:
 *  post:
 *   tags:
 *    - 'cart'
 *   security:
 *    - bearerAuth: []
 *   summary: 'Forgot Passwprd: Enter new password and comfirm password'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/ForgotPassword'
 *   responses:
 *    '200':
 *     description: Successful operation
 */
