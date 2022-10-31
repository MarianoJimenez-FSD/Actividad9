const router = require('express').Router();

// Recuperamos todos los posts (o la página indicada por parámetros).
router.get(
    '/', 
    (req, res) => {
        res.send('POSTS -> GET');
    }
);

// Recuperamos un post por su id.
router.get(
    '/:idPost', 
    (req, res) => {
        res.send('POSTS -> GET con idPost');
    }
);

// Recuperamos los posts de un autor.
router.get(
    '/autor/:idAutor', 
    (req, res) => {
        res.send('POSTS -> GET por autor');
    }
);

// Inserción de un post.
router.post(
    '/', 
    (req, res) => {
        res.send('POSTS -> POST');
    }
);

module.exports = router;