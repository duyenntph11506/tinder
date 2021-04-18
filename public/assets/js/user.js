let images =
  "https://nhandaovadoisong.com.vn/wp-content/uploads/2019/05/hinh-anh-hoat-hinh-de-thuong-30.png";

var listUser = $(".listUser");
var userSearch = $(".userSearch");
var inputSearch = $("#inputSearch");
var buttonSearch = $("#btnSearch");
// tìm  kiếm
buttonSearch.click(function (ev) {
  ev.preventDefault();
  var users = arr.filter((user) => user.name === inputSearch.val().trim());
  if (users.length !== 0) {
    var p = "";
    $(".rowSearch").css({ display: "block" });
    users.forEach((element, index) => {
      p += `<tr>
                    <td>${index + 1}</td>
                            <td scope="row">${element.name}</td>
                            <td>${element.ngaySinh}</td>
                            <td >${element.email}</td>
                            <td >${element.gioiTinh}</td>
                            <td >${element.soThich}</td>
                            <td >${element.gioiThieu}</td>
                            <td><img class="img-avatar" src="${
                              element.images
                            }" /></td>
                        </tr> `;
    });
    userSearch.html(p);
  } else {
    $(".rowSearch").css({ display: "none" });
    alert("Không tìm thấy họ tên");
  }
});

var object = {
  name: "Abcxyz",
  ngaySinh: "1/1/2001",
  email: "uyiuyyut@gmail.com",
  gioiTinh: "nam",
  soThich: "abc",
  gioiThieu: "không có",
  images,
};
var object1 = {
  name: "111111",
  ngaySinh: "1/1/2001",
  email: "rưerty@gmail.com",
  gioiTinh: "nam",
  soThich: "abc",
  gioiThieu: "không có",
  images,
};
var object2 = {
  name: "222222",
  ngaySinh: "1/1/2001",
  email: "fafdsgfdsg@gmail.com",
  gioiTinh: "nữ",
  soThich: "abc",
  gioiThieu: "không có",
  images,
};

var arr = [object, object1, object2, object];

const updateArr = function () {
  arr.forEach(function (element, index) {
    listUser.append(`<tr class="tr">
                            <th  scope="row">${index}</th>
                            <td ><input class="input" name="name" type="text" value="${element.name}" disabled></td>
                            <td ><input class="input" name="ngaySinh" type="text" value="${element.ngaySinh}" disabled></td>
                            <td ><input class="input" name="email" type="text" value="${element.email}" disabled></td>
                            <td  ><input class="input" name="gioitinh" type="text" value="${element.gioiTinh}" disabled></td>
                            <td  ><input class="input" name="sothich" type="text" value="${element.soThich}" disabled></td>
                            <td  ><input class="input" name="gioithieu" type="text" value="${element.gioiThieu}" disabled></td>
                            <td  ><img class="img-avatar" src="${element.images}" /></td>
                            <td  ><button class="btn-remove">Delete</button><button class="btn-edit">Edit</button></td>
                        </tr> `);
  });
};
// danh sách
$(document).ready(function () {
  updateArr();
  // xóa
  const btnXoa = document.querySelectorAll(".btn-remove");
  const btnSua = document.querySelectorAll(".btn-edit");
  const tr = document.querySelectorAll(".tr");
  btnXoa.forEach((element, key) => {
    element.addEventListener("click", function (ev) {
      tr[key].style.display = "none";
      arr.splice(key, 1);
      console.log(arr);
    });
  });

  for (let index = 0; index < btnSua.length; index++) {
    btnSua[index].addEventListener("click", function () {
      if (btnSua[index].innerHTML === "Edit") {
        btnSua[index].innerHTML = "Save";
        $('input[name="name"]')[index].disabled = false;
        $('input[name="ngaySinh"]')[index].disabled = false;
        $('input[name="email"]')[index].disabled = false;
        $('input[name="gioitinh"]')[index].disabled = false;
        $('input[name="sothich"]')[index].disabled = false;
        $('input[name="gioithieu"]')[index].disabled = false;
      } else {
        btnSua[index].innerHTML = "Edit";
        $('input[name="name"]')[index].disabled = true;
        $('input[name="ngaySinh"]')[index].disabled = true;
        $('input[name="email"]')[index].disabled = true;
        $('input[name="gioitinh"]')[index].disabled = true;
        $('input[name="sothich"]')[index].disabled = true;
        $('input[name="gioithieu"]')[index].disabled = true;
      }
    });
  }
});

// khi nhấn vào thêm
const buttonThem = $("#add-user");
buttonThem.click(function (ev) {
  ev.preventDefault();
  const name = $("#ipName").val();
  const ngaySinh = $("#ipNgaySinh").val();
  const email = $("#ipEmail").val();
  const soThich = $("#textareaSoThich").val();
  const gioiThieu = $("#textareaGioiThieu").val();
  var a = document.getElementsByName("flexRadioDefault");
  let gioiTinh = "";
  if (a[0].checked) {
    gioiTinh = "nam";
  } else if (a[1].checked) {
    gioiTinh = "nữ";
  }
  var object = { name, ngaySinh, email, gioiTinh, soThich, gioiThieu, images };
  arr.push(object);
  listUser.append(`<tr>
                            <th scope="row">4</th>
                            <td ><input class="input" name="name" type="text" value="${object.name}" disabled></td>
                            <td ><input class="input" name="ngaySinh" type="text" value="${object.ngaySinh}" disabled></td>
                            <td ><input class="input" name="email" type="text" value="${object.email}" disabled></td>
                            <td  ><input class="input" name="gioitinh" type="text" value="${object.gioiTinh}" disabled></td>
                            <td  ><input class="input" name="sothich" type="text" value="${object.soThich}" disabled></td>
                            <td  ><input class="input" name="gioithieu" type="text" value="${object.gioiThieu}" disabled></td>
                            <td  ><img class="img-avatar" src="${object.images}" /></td>
                            <td  ><button class="btn-remove">Delete</button><button class="btn-edit">Edit</button></td>
                       </tr> `);
  alert("Thêm thành công");
});
