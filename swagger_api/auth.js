/**
 * @swagger
 * components:
 *  schemas:
 *   Signin:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     password:
 *      type: string
 *    required:
 *     - "productId"
 *     - "quantity"
 */


/**
 * @swagger
 * /api/signin:
 *  post:
 *   tags:
 *    - 'cart'
 *   security:
 *    - bearerAuth: []
 *   summary: 'Signin customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Signin'
 *   responses:
 *    '200':
 *     description: Successful operation
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   SignUp:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     password:
 *      type: string
 *    required:
 *     - "productId"
 *     - "quantity"
 */

/**
 * @swagger
 * /api/signup:
 *  post:
 *   tags:
 *    - 'cart'
 *   security:
 *    - bearerAuth: []
 *   summary: 'Signup customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SignUp'
 *   responses:
 *    '200':
 *     description: Successful operation
 */
