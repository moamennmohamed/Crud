let productTitleInput = document.querySelector("#productTitle");
let productPriceInput = document.querySelector("#productPrice");
let productCategory = document.querySelector("#ProductCategory");
let productImageInput = document.querySelector("#productImage");
let productDescriptionInput = document.querySelector("#productDescription");
let btnAddProduct = document.querySelector("#AddProduct");
let UpdateProduct = document.querySelector("#UpdateProduct");

let productList = [];

if (JSON.parse(localStorage.getItem("allProduct")) != null) {
  productList = JSON.parse(localStorage.getItem("allProduct"));
  displayForm(productList);
}
// validateProductName
btnAddProduct.addEventListener("click", function () {
  if (
    validateProductName(productTitleInput) &&
    validateProductName(productPriceInput) &&
    validateProductName(productCategory) &&
    validateProductName(productDescriptionInput)
  ) {
    product = {
      title: productTitleInput.value,
      price: productPriceInput.value,
      category: productCategory.value,
      image: ` images/Product/${productImageInput.files[0]?.name}`,
      description: productDescriptionInput.value,
    };
    productList.push(product);
    console.log(productList);
    localStorage.setItem("allProduct", JSON.stringify(productList));
    clearPoroduct();
    displayForm(productList);
  } else {
    Swal.fire({
      title: "The data you entered is incorrect.",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }
});

function clearPoroduct() {
  productTitleInput.value = "";
  productPriceInput.value = "";
  productCategory.value = "";
  productImageInput.value = "";
  productDescriptionInput.value = "";

  btnAddProduct.classList.remove("d-none");
}

function displayForm(list) {
  var blackBox = "";
  for (let i = 0; i < list.length; i++) {
    blackBox += `
         <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="Product bg-light p-2 rounded-2">
                        <img src="${
                          list[i].image
                        }" class="img-fluid p-2" alt="image">
                        <div class="mt-2">
                            <h4 class="text-center">${
                              list[i].name ? list[i].name : list[i].title
                            }</h4>
                        </div>
                        <div class="d-flex justify-content-between mt-3 mb-2">
                            <div>
                                <span>${list[i].category}</span>
                            </div>
                            <div>
                                <span>${list[i].price}</span>
                            </div>
                        </div>

                        <div>
                            <p>${list[i].description}</p>
                        </div>


                        <div class="d-flex justify-content-between">

                            <button onclick="deleteProduct(${productList.indexOf(
                              list[i]
                            )})" id="deleteBtn" class="btn btn-outline-danger">Delete</button>

                            <button id="editBtn" onclick="editForm(${productList.indexOf(
                              list[i]
                            )})" class="btn btn-outline-success">Edit</button>

                        </div>
                    </div>
                </div>
  `;
  }
  document.getElementById("DispalyProductForm").innerHTML = blackBox;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("allProduct", JSON.stringify(productList));
  displayForm(productList);
}

let indexUpdate;
function editForm(indexEdit) {
  indexUpdate = indexEdit;
  productTitleInput.value = productList[indexEdit].title;
  productPriceInput.value = productList[indexEdit].price;
  productCategory.value = productList[indexEdit].category;
  // productImageInput.value = productList[indexEdit].image;
  productDescriptionInput.value = productList[indexEdit].description;

  btnAddProduct.classList.add("d-none");
  UpdateProduct.classList.remove("d-none");
}

UpdateProduct.addEventListener("click", function () {
  productList[indexUpdate].title = productTitleInput.value;
  productList[indexUpdate].price = productPriceInput.value;
  productList[indexUpdate].category = productCategory.value;
  // productList[indexUpdate].image = productImageInput.value;
  productList[indexUpdate].description = productDescriptionInput.value;
  displayForm(productList);
  btnAddProduct.classList.remove("d-none");
  UpdateProduct.classList.add("d-none");
  localStorage.setItem("allProduct", JSON.stringify(productList));
  clearPoroduct();
});


function searchProductByTitle(search) {
  let matched = [];

  const lowerSearch = search.toLowerCase();

  for (let i = 0; i < productList.length; i++) {
    const lowerTitle = productList[i].title.toLowerCase();

    if (lowerTitle.includes(lowerSearch)) {
      console.log("matched");

      productList[i].name = productList[i].title.replace(
        new RegExp(search, "gi"),
        (match) => `<span class="text-danger">${match}</span>`
      );

      matched.push(productList[i]);
    } else {
      console.log("unmatched");
    }
  }

  if (matched.length > 0) {
    displayForm(matched);
  } else {
    document.getElementById("DispalyProductForm").innerHTML = `
      <div class="text-center">
        <h3 class="text-danger">No Product Found</h3>
      </div>`;
  }
}

function validateProductName(input) {
  console.log(input);
  console.log(input.id);
  console.log(input.value);

  let regix = {
    productTitle: /^[A-Z][a-z]{3,15}$/,
    productPrice: /^(60000|[6-9]\d{3}|[1-5]\d{4})$/,
    ProductCategory: /^(TV|Mobile|Screen|Laptop|Watch|Electronics)$/,
    productDescription: /^\w{0,250}$/,
    productImage: /^.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)$/,
  };

  let isValid = regix[input.id].test(input.value);

  if (isValid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }
  return isValid;
}
