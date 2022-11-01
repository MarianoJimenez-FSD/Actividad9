const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { postValidationSchema } = require('../../helpers/validators/posts.validator');
const { getAll, getByPage, getById, getByIdAutor, create } = require('../../models/posts.model');
const { checkValidationsResult } = require('../../helpers/validator_utils');

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