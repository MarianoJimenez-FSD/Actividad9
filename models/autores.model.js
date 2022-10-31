const { executeQuery, executeQueryOne } = require('../helpers/mysql_utils');

const key_columns     = 'id';
const no_key_columns = 'nombre, email, imagen';
const columns        = `${key_columns}, ${no_key_columns}`;

const getAll = () => {
    return executeQuery(`select ${columns} from autores`);
}

const getByPage = (page, limit) => {
    return executeQuery(`select ${columns} from autores order by id limit ? offset ?`, [ limit, (page - 1) * limit ]);
}

const getById = (idAutor) => {
    return executeQueryOne(`select ${columns} from autores where (id = ?)`, [ idAutor ]);
}

const create = ({ nombre, email, imagen }) => {
    return executeQuery(`insert into autores (${no_key_columns}) values (?, ?, ?)`, [nombre, email, imagen]);
}

module.exports = { no_key_columns, getAll, getByPage, getById, create };