const { responseCreator } = require('../utils/utils');
const Category = require('../schemas/category.schema');

async function getCategory(req, res) {
    try{
    const categories = await Category.find();
    if(!categories) { return responseCreator(res, 404,'No se encontro la categoria ' )};
    return responseCreator(res, 200, 'categorias obtenidas correctamente', {categories});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500,'Error al obetener categorias' )
    }
};


async function createCategory(req, res) {
    try{
    const category = new Category(req.body);
    const newCategory = await category.save() ;
    return responseCreator(res, 200, 'categoria creada correctamente', {newCategory} );
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500,'Error al crear categorias' );
    }
}

async function deleteCategory(req, res) {
    try {
    const id = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if(!deleteCategory) return responseCreator(res, 404, 'No se encontro la categoria a borrar');
    return responseCreator(res, 200 , 'Categoria borrada correctamente', { deleteCategory })
    }catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'Error No se pudo hacer el borrado de la categoria');

    };
}

async function updateCategory(req, res) {
    try{
    const id = req.query.id;
    const data = req.body;
    const newCategory = await Category.findByIdAndUpdate(id, data, {new:true});
    if(!newCategory){
        return responseCreator(res, 404, 'La categoria no se pudo modificar');
    }
    return responseCreator(res, 200, 'Categoria modificada correctamente', { newCategory });
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al modificar la categoria', );
    }
};


module.exports = {
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
}
