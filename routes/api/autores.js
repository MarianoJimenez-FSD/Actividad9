const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { autorValidationSchema } = require('../../helpers/validators/autores.validator');
const { checkValidationsResult } = require('../../helpers/validator_utils');

const { getAll, getByPage, getById, create } = require('../../models/autores.model');

/**
 * @openapi
 * tags:
 *   - name: Autores
 *     description: "Peticiones relacionadas con autores"
 *
 * /api/autores:
 *   get:
 *     tags:
 *       - Autores
 *     description: Devuelve todos los autores, o una "página" de autores (si se especifican los parámetros page y limit).
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         description: Una lista de autores.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/autor'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 *   post:
 *     tags:
 *       - Autores
 *     description: Inserta el Autor recibido en el cuerpo de la petición. No es necesario que se indique el campo id.
 *     requestBody:
 *       description: Autor a añadir al sistema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/autor'
 *     responses:
 *       200:
 *         description: Objeto con el autor dado de alta en el sistema. La respuesta tendrá el campo id asignado al autor.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/autor'
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
 * /api/autores/{idAutor}:
 *   get:
 *     tags:
 *       - Autores
 *     description: Devuelve el autor con el id especificado en {idAutor}.
 *     parameters:
 *       - $ref: '#/components/parameters/idAutor'
 *     responses:
 *       200:
 *         description: Autor con el id especificado en la petición.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/autor'
 *       400:
 *         description: No se encontró ningún autor con el id especificado en la petición.
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
 *   
 *components:
 *  parameters:
 *    page:
 *      name: page
 *      in: query
 *      description: "**Número de página**. *Ejemplo: 2*. Si queremos recuperar solo un parte de los autores, podemos usar este parámetro junto con limit para recuperar los autores de manera paginada."
 *      schema:
 *        type: integer
 *    limit:
 *      name: limit
 *      in: query
 *      description: "**Número de autores por página**. *Ejemplo: 5*. Si queremos recuperar solo un parte de los autores, podemos usar este parámetro junto con page para recuperar los autores de manera paginada."
 *      schema:
 *        type: integer
 *    idAutor:
 *      name: idAutor
 *      in: path
 *      description: "**Idenfificador asignado al autor**. *Ejemplo: 2*. Identificador asignado al autor en el sistema."
 *      schema:
 *        type: integer
 *  schemas: 
 *    autor:
 *      title: Autor
 *      description: Datos de un autor
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador asignado al autor. No será necesario indicarlo al dar de alta a un autor, (el sistema normalmente le asignará otro).
 *          example: 2
 *        nombre:
 *          type: string
 *          description: Nombre del autor
 *          example: Mariano Frías del Pozo
 *        email:
 *          type: string
 *          description: Correo electrónico del autor
 *          example: mfrias@gmail.com
 *        imagen:
 *          type: string
 *          description: URL de la imagen asociada al autor
 *          example: https://picsum.photos/200
 *    error:
 *      title: Error
 *      description: Error producido al tratar una petición
 *      type: object
 *      properties:
 *        errorMessage:
 *          type: string
 *          description: Descripción del error que se ha producido
 *          example: No existe un autor con ese Id
 *    errorValidation:
 *      title: Error validación
 *      description: Error detectado al validar algún campo de la petición
 *      type: object
 *      properties:
 *        value:
 *          type: string
 *          description: Valor enviado en el campo/parámetro
 *          example: mfriasmar@gmail
 *        msg:
 *          type: string
 *          description: El campo email no es un correo electrónico válido
 *          example: mfriasmar@gmail
 *        param:
 *          type: string
 *          description: Nombre del campo/parámetro con el error
 *          example: email
 *        location: 
 *          type: string
 *          description: Lugar dónde se encuentra el parámetro
 *          example: body
 */

router.get(
    '/', 
    async (req, res) => {        
        try {
            const { page, limit } = req.query;

            let autores;
            if (page && limit) {
                autores = await getByPage(parseInt(page), parseInt(limit));
            }
            else {
                autores = await getAll();
            }
            
            res.json(autores);
        } catch (error) {            
            manageError(res, error);
        }
    }
);

// Recuperamos el autor con el id especificado.
router.get(
    '/:idAutor', 
    async (req, res) => {         
        try {
            const { idAutor } = req.params;

            const autor = await getById(idAutor);

            if (autor) {
                res.json(autor);
            } else {
                res.status(404)
                   .json({ errorMessage: 'No existe un autor con ese Id' });
            }
        } catch (error) {            
            manageError(res, error);
        }
    }
);

// Inserción de un autor.
router.post(
    '/', 
    checkSchema(autorValidationSchema),
    checkValidationsResult,
    async (req, res) => {
        try {
            const result = await create(req.body);
            const autor  = await getById(result.insertId);
            res.json(autor);
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