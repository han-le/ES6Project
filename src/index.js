import {
  callAPI,
  getListProductSerVice,
  removeItemFromAPI,
  addItemToAPI,
  getItemFromAPIbyID,
  updateInformationOfAPI,
} from "./utils/callapi.js";
import Product from "./models/products.js";

//Lay html body bang javascript -> tranh an cap du lieu
const renderHTML = () => {
  //Tao bien chua HTML
  const contentHTML = `
   <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <input
              id="maSP"
              class="form-control"
              placeholder="Mã SP"
              disabled
            />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input
              id="hinhAnh"
              class="form-control"
              placeholder="Link hình"
            />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá</th>
          <th>Hình ảnh</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham"></tbody>
    </table>
  </div>
   `;

  document.getElementById("root").innerHTML = contentHTML;
};

//Lay
const renderListProduct = () => {
  callAPI("SanPham", "GET", null)
    .then((response) => {
      //DOM <tbody>
      document.getElementById("tblDanhSachSanPham").innerHTML = renderTable(
        response.data
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

//Lay data va tao noi dung HTML la 1 table. Return 1 html content
const renderTable = (array) => {
  let contentTable = "";
  if (array && array.length > 0) {
    array.map((product_item) => {
      contentTable += `
            <tr>
                <td>${product_item.id}</td>
                <td>${product_item.tenSP}</td>
                <td>${product_item.gia}</td>
                <td><img src="${product_item.hinhAnh}" width="50"></td>
                <td>
                    <button class="btn btn-warning" onclick="editItem(${product_item.id})">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteItem(${product_item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
  }
  return contentTable;
};

renderHTML();
renderListProduct();

//-------FUCNTION TO DELETE INFORMATION OF A PRODUCT. Khong duoc dung arrow fucntion

window.deleteItem = deleteItem; //Gan them thuoc tinh moi cho window - 1 object lon nhat cua js
console.log(window);
function deleteItem(itemID) {
  callAPI(`SanPham/${itemID}`, "DELETE", null)
    .then((response) => {
      //DOM <tbody>
      document.getElementById("tblDanhSachSanPham").innerHTML = renderTable(
        response.data
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

//-------THEM SAN PHAM. 1) User click button "Edit" then data will be shown in the form

document.getElementById("btnThem").addEventListener("click", function () {
  //Get data user input
  let productName = document.getElementById("tenSP").value;
  let productPrice = document.getElementById("gia").value;
  let productImage = document.getElementById("hinhAnh").value;

  const product = new Product("", productName, productPrice, productImage);
  callAPI("SanPham", "POST", product)
    .then(() => {
      alert("Added successfully");
      renderListProduct();
      productName = "";
    })
    .catch((error) => {
      console.log(error);
    });
});

//-------EDIT SAN PHAM-----
window.editItem = editItem;
function editItem(itemID) {
  //Lay data from API and add it to HTML
  getItemFromAPIbyID(itemID)
    .then((response) => {
      console.log(response.data); //Lay duoc data la 1 item
      //Show it to the browser
      document.getElementById("maSP").value = response.data.id;
      document.getElementById("tenSP").value = response.data.tenSP;
      document.getElementById("gia").value = response.data.gia;
      document.getElementById("hinhAnh").value = response.data.hinhAnh;
    })
    .catch((error) => {
      console.log(error);
    });
}

//-------THEM SAN PHAM. 2) After user input new data, click button "Update" then send data to API
document.getElementById("btnCapNhat").addEventListener("click", function () {
  let productID = document.getElementById("maSP").value;
  let productName = document.getElementById("tenSP").value;
  let productPrice = document.getElementById("gia").value;
  let productImage = document.getElementById("hinhAnh").value;

  const product = new Product(
    productID,
    productName,
    productPrice,
    productImage
  );

  updateInformationOfAPI(product)
    .then(() => {
      alert("Updated successful");
      renderListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
});
