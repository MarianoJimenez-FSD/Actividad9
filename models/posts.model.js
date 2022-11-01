const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');
const no_key_columns_autores = require('./autores.model').no_key_columns;

const no_key_columns = 'titulo, descripcion, fecha_creacion, categoria, autores_id';

const join_columns   = 'p.id, titulo, descripcion, fecha_creacion, categoria, autores_id as autor_id, ' + no_key_columns_autores;
const join_from      = 'posts as p join autores as a on (p.autores_id = a.id)';

const getAll = () => {
    return executeQuery(`select ${join_columns} from ${join_from}`);
}

const getByPage = (page, limit) => {
    return executeQuery(`select ${join_columns} from ${join_from} order by p.id limit ? offset ?`, [ limit, (page - 1) * limit ]);
}

const getById = (idPost) => {
    return executeQueryOne(`select ${join_columns} from ${join_from} where (p.id = ?)`, [ idPost ]);
}

const getByIdAutor = (idAutor) => {
    return executeQuery(`select ${join_columns} from ${join_from} where (autores_id = ?)`, [ idAutor ]);
}

const create = ({ titulo, descripcion, fecha_creacion, categoria, autor_id }) => {
    return executeQuery(`insert into posts (${no_key_columns}) values (?, ?, ?, ?, ?)`, [ titulo, descripcion, fecha_creacion, categoria, autor_id ]);
}

module.exports = { getAll, getByPage, getById, getByIdAutor, create };