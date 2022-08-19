
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productsList=[[
    {
      "name": "Toshiba Screen 43''",
      "price": "7000",
      "category": "Screen LED",
      "desc": "screen LED 43 inches"
    },
    {
      "name": "Fresh Fan shaba7",
      "price": "999",
      "category": "Fans",
      "desc": "Fresh Fan shaba7"
    },
    {
      "name": "Sharp Freezer",
      "price": "8000",
      "category": "freezer",
      "desc": "Deep freezer 5 drawers"
    },
    {
      "name": "Tornado screen 50'' Smart",
      "price": "9000",
      "category": "Screen LED",
      "desc": "Tornado screen 50'' Smart"
    }
  ]];
var mainBtn = document.querySelector('.maintBtn');
var updateBtn = document.querySelector('.updateBtn');
var updateBtnContainer = document.querySelector('.updateBtnContainer')


// display products from local storage of previous session if exist
if(localStorage.getItem('productsList')){
    displayProducts(JSON.parse(localStorage.getItem('productsList')));
    productsList = JSON.parse(localStorage.getItem('productsList'));
}
else{
    productsList = productsList;
}


// adding new product from form 

function addProduct(){
     let product = {
        name : productName.value,
        price :productPrice.value,
        category : productCategory.value,
        desc : productDesc.value
    }
    productsList.push(product);
    //console.log(productsList);


    // displaying products table after update
    displayProducts(productsList);
    
    // update browsers's local storage
    updateLocalStorage(productsList);
    // clear form
    clearForm()

}


// clearing form after perform fucntion 
function clearForm(){
    productName.value ="";
    productPrice.value ="";
    productCategory.value ="";
    productDesc.value ="";
}


// display products after update

function displayProducts(list){
    let cartona = "";
    let resultToDisplay = ""
    for (let i = 0; i< list.length; i++){

        cartona = 
        `
    <tr>
                    <td>${i+1}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].desc}</td>
                    <td><button onclick = "updateProduct(${i})" type="button" class="btn-info rounded-3">update</button></td>
                    <td><button onclick = "deleteProduct(${i})"  type="button" class="btn-danger rounded-3">delete</button></td>
                </tr>


    
    `;
    resultToDisplay += cartona;


    }
    //console.log(resultToDisplay)
    document.getElementById('myData').innerHTML = resultToDisplay;
}




// set - update local storage
function updateLocalStorage(list){
    localStorage.setItem('productsList', JSON.stringify(list));
}

// delete product

function deleteProduct(id){
    productsList.splice(id,1);
     // displaying products table after update
     displayProducts(productsList);
    
     // update browsers's local storage
     updateLocalStorage(productsList);
     // clear form
     clearForm()

}


function updateProduct(id){
    // display button of update product and hide main BTN
    mainBtn.classList.add('d-none');
    updateBtnContainer.innerHTML = `<button class="btn btn-outline-danger updateBtn" onclick="commitUpdate(${id})">Update</button>`;
    // append values in input fields 
    productName.value =productsList[id].name;
    productPrice.value =productsList[id].price;
    productCategory.value = productsList[id].category;
    productDesc.value =productsList[id].desc;
}

// commit updates and apply
function commitUpdate(id){
    // display button of main btn and hide update btn
    mainBtn.classList.remove('d-none');
    updateBtnContainer.innerHTML ="";

    // append values in input fields 
    productsList[id].name = productName.value;
    productsList[id].price = productPrice.value;
    productsList[id].category = productCategory.value ;
    productsList[id].desc = productDesc.value;

    // displayProducts after update
    displayProducts(productsList);
    
    // update local storage
    updateLocalStorage(productsList);

    //clearing form after update 
    clearForm();
}

// searching function 

function searchItems(searchValue){
    let searchedItems = [];
    for (let i = 0; i < productsList.length ; i++){
        if (productsList[i].name.toLowerCase().includes(searchValue.toLowerCase())){
            searchedItems.push(productsList[i])
        }
    }
    
    displayProducts(searchedItems);
}






