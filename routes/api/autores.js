const router = require('express').Router();

// Recuperamos todos los autores (o la página indicada por parámetros).
router.get(
    '/', 
    (req, res) => {
        res.send('AUTORES -> GET');
    }
);

// Recuperamos el autor con el id especificado.
router.get(
    '/:idAutor', 
    (req, res) => {         
        res.send('AUTORES -> GET con idAutor');
    }
);

// Inserción de un autor.
router.post(
    '/', 
    (req, res) => {
        res.send('AUTORES -> POST');
    }
);

module.exports = router;