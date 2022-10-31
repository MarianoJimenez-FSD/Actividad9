const router = require('express').Router();
const { getAll, getByPage, getById, create } = require('../../models/autores.model');

// Recuperamos todos los autores (o la página indicada por parámetros).
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
            console.log(error); // --> Habría que volcarlo a fichero de log.
            res.status(500)
               .json({ errorMessage: error.message });
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
            console.log(error); // --> Habría que volcarlo a fichero de log.
            res.status(500)
               .json({ errorMessage: error.message });
        }
    }
);

// Inserción de un autor.
router.post(
    '/', 
    async (req, res) => {
        try {
            const result = await create(req.body);
            const autor  = await getById(result.insertId);
            res.json(autor);
        } catch (error) {
            console.log(error); // --> Habría que volcarlo a fichero de log.
            res.status(500)
               .json({ errorMessage: error.message });
        }
    }
);

module.exports = router;