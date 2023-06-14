const URL = 'https://ecommerce-noqj.onrender.com/api'
const selectCategoryHTML = document.getElementById('id del html donde tengo el select de categories')
async function createCategory(res, res) {
try{
const response = await axios.get(`${URL}/category`);
// console.log(response.data.categories)
const categories = response.data.categories;
categories.array.forEach((cat) => {
selectCategoryHTML.innerHTML = '<option value="" selected></option>';
selectCategoryHTML.innerHTML +=`<option value= "${cat._id}" selected>${cat.name}</option>
                                <option value= "ghghhgf" selected>accesorios</option>`
});
} catch (error) {
console.log(error)
} 
}
createCategory()