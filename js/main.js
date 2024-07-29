"use strict";

//global letiables
const category = document.getElementById('category');
const productName = document.getElementById('name');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const addProductBtn = document.getElementById('addProduct');
const updateProductBtn = document.getElementById('updateProduct');
const search = document.getElementById('search');
const nameAlert = document.getElementById('nameAlert')
const priceAlert = document.getElementById('priceAlert')
const quantityAlert = document.getElementById('quantityAlert')
const btnExport = document.getElementById('btnExport')
let productList;
let currentIndex;

//events
category.addEventListener('change',categoryValidation);
productName.addEventListener('keyup',nameValidation);
quantity.addEventListener('keyup',quantityValidation);
price.addEventListener('keyup',priceValidation);
addProductBtn.addEventListener('click',addProduct);
updateProductBtn.addEventListener('click',updateProduct);


// local storage
if (localStorage.getItem('list') != null) {
  productList = JSON.parse(localStorage.getItem('list'));
  displayProduct(productList);
} else {
  productList = [];
}

function storeList() {
  localStorage.setItem('list', JSON.stringify(productList));
}



//clear form / update Value
function formValue(categoryValue = 'Television', productNameValue = '', quantityValue = '', priceValue = '') {
  category.value = categoryValue;
  productName.value = productNameValue;
  quantity.value = quantityValue;
  price.value = priceValue;
}

//1-create
//1-1 validation 
function categoryValidation() {
  let categoryPattern = /^Television$|^Phone$|^Laptop$|^Camera$|^Tablet$|/g;
  if (categoryPattern.test(category.value)) {
    category.classList.add('is-valid')
    category.classList.remove('is-invalid')
    return true
  } else {
    category.classList.remove('is-valid')
    category.classList.add('is-invalid')

    return false
  }
}

function nameValidation() {
  let nameAlert = document.getElementById('nameAlert')
  let namePattern = /^[A-Z]{1}[a-zA-Z1-9]{1,14}$/g;
  if (namePattern.test(productName.value)) {
    productName.classList.add('is-valid')
    productName.classList.remove('is-invalid')
    nameAlert.classList.add('invisible')

    return true
  } else {
    productName.classList.remove('is-valid')
    productName.classList.add('is-invalid')
    nameAlert.classList.remove('invisible')

    return false
  }
}
function quantityValidation() {
  let quantityPattern = /^[1-9]{1}[0-9]{0,1}$|^100$/g;
  //from 1 to 100
  if (quantityPattern.test(quantity.value)) {
    quantity.classList.add('is-valid')
    quantity.classList.remove('is-invalid')
    quantityAlert.classList.add('invisible')

    return true
  } else {
    quantity.classList.remove('is-valid')
    quantity.classList.add('is-invalid')
    quantityAlert.classList.remove('invisible')

    return false
  }
}
function priceValidation() {
  let priceAlert = document.getElementById('priceAlert')
  let pricePattern = /^[1-9]{1}[0-9]{3}$|^[1-4]{1}[0-9]{4}$|^50000$/g;
  //from 1000 to 50000
  if (pricePattern.test(price.value)) {
    price.classList.add('is-valid')
    price.classList.remove('is-invalid')
    priceAlert.classList.add('invisible')

    return true
  } else {
    price.classList.remove('is-valid')
    price.classList.add('is-invalid')
    priceAlert.classList.remove('invisible')

    return false

  }
}
function removeValidationClass() {
  productName.classList.remove('is-valid')
  productName.classList.remove('is-invalid')
  category.classList.remove('is-valid')
  category.classList.remove('is-invalid')
  quantity.classList.remove('is-valid')
  quantity.classList.remove('is-invalid')
  price.classList.remove('is-valid')
  price.classList.remove('is-invalid')
}

//1-2 Add Product
function addProduct() {
  if (categoryValidation() == true && nameValidation() == true && priceValidation() == true && quantityValidation() == true) {
   let product = {
      category: category.value,
      productName: productName.value,
      quantity: quantity.value,
      price: price.value
    }
    productList.push(product);
    displayProduct(productList);
    storeList();
    formValue();
    removeValidationClass();
  }
}


//2-display
function displayProduct(list) {
  let table = ``;
  for (let i = 0; i < list.length; i++) {


    table += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${list[i].category}</td>
        <td>${list[i].productName}</td>
        <td>${list[i].quantity}</td>
        <td>${list[i].price}</td>
        <td>
          <button
            class="btn border-0 py-0 px-2 d-block m-auto bg-color2 text-color4" id="update" onclick="update(${i})"
          >
            <i class="fa-regular fa-pen-to-square fa-1x"></i>
          </button>
        </td>
        <td>
          <button
            class="btn border-1 py-0 px-2 d-block m-auto bg-color2 text-color4" id="delete" onclick="deleteProduct(${i})"
          >
            <i class="fa-regular fa-trash-can fa-1x"></i>
          </button>
        </td>
      </tr
`

  }
  document.getElementById('productTable').innerHTML = table;
}

//3-Update
function update(index) {
  addProductBtn.classList.add("d-none")
  updateProductBtn.classList.remove("d-none")
  currentIndex = index
  formValue(productList[index].category, productList[index].productName, productList[index].quantity, productList[index].price)

}
function updateProduct() {
  if (categoryValidation() == true && nameValidation() == true && priceValidation() == true && quantityValidation() == true) {
    productList[currentIndex].category = category.value
    productList[currentIndex].productName = productName.value
    productList[currentIndex].quantity = quantity.value
    productList[currentIndex].price = price.value
    displayProduct(productList);
    storeList();
    formValue();
    removeValidationClass();
    addProductBtn.classList.remove("d-none")
    updateProductBtn.classList.add("d-none")
  }
}

//4-delete
function deleteProduct(index) {
  formValue();
  removeValidationClass();
  addProductBtn.classList.remove("d-none")
  updateProductBtn.classList.add("d-none")
  productList.splice(index, 1);
  displayProduct(productList);
  storeList();
}
//5-search

function searchProduct() {
  let searchList = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].productName.toLowerCase().includes(search.value.toLowerCase())) {

      searchList.push(productList[i]);
      document.getElementById('noData').classList.add('d-none')

    }
  }
  if (searchList.length == 0) {
    document.getElementById('noData').classList.remove('d-none')

  }
  displayProduct(searchList);
}






// sort
function sortProductByName() {
  let sortList = []
  for (let i = 0; i < productList.length; i++) {
    sortList.push(productList[i])
  }
  sortList.sort((a, b) => {
    const nameA = a.productName.toUpperCase();
    const nameB = b.productName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  displayProduct(sortList)
}




function sortProductByPrice() {
  let sortList = []
  for (let i = 0; i < productList.length; i++) {
    sortList.push(productList[i])
  }
  sortList.sort((a, b) => { return a.price - b.price; });
  displayProduct(sortList)
}

function sortProductByQuantity() {
  let sortList = []
  for (let i = 0; i < productList.length; i++) {
    sortList.push(productList[i])
  }
  sortList.sort((a, b) => { return a.quantity - b.quantity; });
  displayProduct(sortList)
}


//filter
function ProductFilter(productCategory) {

  if (productCategory == 'All') {
    displayProduct(productList)
    document.getElementById('noData').classList.add('d-none')
  } else {
    let filterList = []
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].category == productCategory) {
        filterList.push(productList[i])
        document.getElementById('noData').classList.add('d-none')
      }
      displayProduct(filterList)

    }
    if (filterList.length == 0) {
      document.getElementById('noData').classList.remove('d-none')
    }
  }
}



btnExport.addEventListener('click',exportToExcel)

function exportToExcel(){
  let htmltable= document.getElementById('table');
  let html = htmltable.outerHTML;
  window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}
