const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { postValidationSchema } = require('../../helpers/validators/posts.validator');
const { getAll, getByPage, getById, getByIdAutor, create } = require('../../models/posts.model');
const { checkValidationsResult } = require('../../helpers/validator_utils');

/**
 * @openapi
 * tags:
 *   - name: Posts
 *     description: "Peticiones relacionadas con posts"
 *
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     description: Devuelve todos los posts, o una "página" de posts (si se especifican los parámetros page y limit).
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: Una lista de posts.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 *   post:
 *     tags:
 *       - Posts
 *     description: Inserta el Post recibido en el cuerpo de la petición. No es necesario que se indique el campo id.
 *     requestBody:
 *       description: Post a añadir al sistema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postAlta'
 *     responses:
 *       200:
 *         description: Objeto con el post dado de alta en el sistema. La respuesta tendrá el campo id asignado al post.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/post'
 *       400:
 *         description: Alguno de los campos enviados es incorrecto.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/errorValidation'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 * /api/posts/{idPost}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Devuelve el post con el id especificado en {idPost}.
 *     parameters:
 *       - $ref: '#/components/parameters/idPost'
 *     responses:
 *       200:
 *         description: Post con el id especificado en la petición.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/post'
 *       400:
 *         description: No se encontró ningún post con el id especificado en la petición.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 *       500:
 *         description: Se produjo un error al tratar la petición en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 * /api/posts/autor/{idAutor}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Devuelve todos los post del autor con el id especificado en {idAutor}.
 *     parameters:
 *       - $ref: '#/components/parameters/idAutor'
 *     responses:
 *       200:
 *         description: Lista de posts del autor especificado.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post' 
 *       500:
 *         description: Se produjo un error al tratar la petición en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 *   
 *components:
 *  parameters:
 *    idPost:
 *      name: idPost
 *      in: path
 *      description: "**Idenfificador asignado al post**. *Ejemplo: 3*. Identificador asignado al post en el sistema."
 *      schema:
 *        type: integer
 *  schemas: 
 *    post:
 *      title: Post
 *      description: Datos de un post
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador asignado al post. No será necesario indicarlo al dar de alta a un post, (el sistema normalmente le asignará otro).
 *          example: 2
 *        titulo:
 *          type: string
 *          description: Título del post
 *          example: "OpenSSL November Security Release"
 *        descripcion:
 *          type: string
 *          description: Descripción del post
 *          example: "The Node.js project may be releasing new versions across all of its supported release lines in the first week of November to incorporate upstream patches from OpenSSL. Please read on for full details."
 *        fecha_creacion:
 *          type: string
 *          description: Fecha de creación del post en formato ISO 8601
 *          example: "2022-10-31"
 *        categoria:
 *          type: string
 *          description: Categoría asignada al post
 *          example: "News"
 *        autor_id:
 *          type: integer
 *          description: Identificador del autor que creó el post
 *          example: 1
 *        nombre:
 *          type: string
 *          description: Nombre del autor que creó el post
 *          example: "Mariano Frías del Pozo"
 *        email:
 *          type: string
 *          description: Correo electrónico del autor del post
 *          example: "mfrias@gmail.com"
 *        imagen:
 *          type: string
 *          description: URL de la imagen asociada al autor del post
 *          example: "https://picsum.photos/200"
 *    postAlta:
 *      title: PostAlta
 *      description: Datos de un post a enviar en el momento de darlo de alta en el sistema
 *      type: object
 *      properties:
 *        titulo:
 *          type: string
 *          description: Título del post
 *          example: "OpenSSL November Security Release"
 *        descripcion:
 *          type: string
 *          description: Descripción del post
 *          example: "The Node.js project may be releasing new versions across all of its supported release lines in the first week of November to incorporate upstream patches from OpenSSL. Please read on for full details."
 *        fecha_creacion:
 *          type: string
 *          description: Fecha de creación del post en formato ISO 8601
 *          example: "2022-10-31"
 *        categoria:
 *          type: string
 *          description: Categoría asignada al post
 *          example: "News"
 *        autor_id:
 *          type: integer
 *          description: Identificador del autor que creó el post
 *          example: 1
 */

// Recuperamos todos los posts (o la página indicada por parámetros).
router.get(
    '/', 
    async (req, res) => {        
        try {
            const { page, limit } = req.query;

            let posts;
            if (page && limit) {
                posts = await getByPage(parseInt(page), parseInt(limit));
            }
            else {
                posts = await getAll();
            }
            
            res.json(posts);
        } catch (error) {            
            manageError(res, error);
        }
    }
);

// Recuperamos un post por su id.
router.get(
    '/:idPost', 
    async (req, res) => {
        try {
            const { idPost } = req.params;

            const post = await getById(idPost);

            if (post) {
                res.json(post);
            } else {
                res.status(404)
                   .json({ errorMessage: 'No existe un autor con ese Id' });
            }
        } catch (error) {            
            manageError(res, error);
        }
    }
);

// Recuperamos los posts de un autor.
router.get(
    '/autor/:idAutor', 
    async (req, res) => {        
        try {
            const { idAutor } = req.params;

            const posts = await getByIdAutor(idAutor);
            
            res.json(posts);
        } catch (error) {            
            manageError(res, error);
        }
    }
);

// Inserción de un post.
router.post(
    '/', 
    checkSchema(postValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            const result = await create(req.body);
            const post   = await getById(result.insertId);
            res.json(post);
        } catch (error) {
            manageError(res, error);
        }
    }
);

const manageError = (res, error) => {
    console.log(error); // --> Habría que volcarlo a fichero de log.
    res.status(500)
       .json({ errorMessage: error.message });
}

module.exports = router;