const data=
[
  {
    name:"鴨頭(葷)",
    num:0,
    pic:"head.jpg",
    unit:"4個",
    price:100,
    spicy:"小辣",
    NotSpicy:true
  },{
    name:"鴨脖子(葷)",
    num:0,
    pic:"neck.jpg",
    unit:"1份",
    price:100,
    spicy:"大辣",
    NotSpicy:true
  },{
    name:"鴨腳(葷)",
    num:0,
    pic:"leg.jpg",
    unit:"10支",
    price:100,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"鴨翅(葷)",
    num:0,
    pic:"wing.jpg",
    unit:"4支",
    price:100,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"鴨胗(葷)",
    num:0,
    pic:"gizzard.jpg",
    unit:"5個",
    price:100,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"鴨舌(葷)",
    num:0,
    pic:"tongue.jpg",
    unit:"10支",
    price:100,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"豬嘴邊肉(葷)",
    num:0,
    pic:"mouth.jpg",
    unit:"1份",
    price:150,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"豬腳(葷)",
    num:0,
    pic:"tongue.jpg",
    unit:"1份",
    price:250,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"泡椒鴨爪(葷)",
    num:0,
    pic:"hotleg.jpg",
    unit:"1份",
    price:150,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"豆干(素)",
    num:0,
    pic:"beans.jpg",
    unit:"1份",
    price:50,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"蓮藕(素)",
    num:0,
    pic:"Lotus.jpg",
    unit:"1份",
    price:50,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"土豆片(素)",
    num:0,
    pic:"potato.jpg",
    unit:"1份",
    price:50,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"海帶(素)",
    num:0,
    pic:"kelp.jpg",
    unit:"1份",
    price:50,
    spicy:"小辣",
    NotSpicy:false
  },{
    name:"千張豆皮(素)",
    num:0,
    pic:"picepotato.jpg",
    unit:"1份",
    price:50,
    spicy:"小辣",
    NotSpicy:false
  }
]
let itemDom = document.getElementById('item');

function renderHTML() {
  let str = '';
  for (let i = 0; i < data.length; i++) {
    // str = str + '<h3>' + data[i].name + '</h3>';
    str += `
    <div class="col-6">
      <div class="product" style="background-image: url('img/${data[i].pic}')">
      </div>
      <div class="title">
        <p>${data[i].name}</p>
        <p>$${data[i].price}</p>
      </div>
      <div class="chose" id="chose-${i}" data-id="${i}">
        <div class="d-flex">數量:
          <input type="button" value="-" class="button button_minus">
          <input type="number" id="quantity${i}" data-id="${i}" class="quantity" name="quantity" min="1" max="5" >
          <input type="button" value="+" class="button button_add" >
          </div>
        <div>單位:${data[i].unit}</div>
        <div class="hot d-none">辣度:
          <select selected="${data[i].spicy}" class="selectdata" data-id="${i}">
            <option value ="微辣">微辣</option>
            <option value ="小辣">小辣</option>
            <option value="大辣">大辣</option>
          </select>
        </div>
      </div>
    </div>
    `
    
  }
  // console.log(str)
  itemDom.innerHTML = str
}
renderHTML()
$(document).ready(function(){
  $('.col-6').click(function() {
    $('.col-6').removeClass('display');
    $(this).toggleClass('display');
  });
});

// let order = {}
// $('.submit').click(function() {
//   const id = $(this).attr('data-id');
//   const quantity = `#chose-${id} .quantity`
//   const selectVal = `#chose-${id} select`
//   const response = {
//     name: data[id].name,
//     num: $(quantity).val(),
//     unit: data[id].unit,
//     price: data[id].price * $(quantity).val(),
//     spicy:$(selectVal).val()
//   }
//   if($(quantity).val() < 1) {
//     alert('尚未填寫數量')
//   } else {
//     // if (response.indexOf)
//     order[data[id].name] = response
//   }
//   console.log(Object.keys(order).length, order);
// })
let order = {}
$(".quantity, .selectdata").change(function(){
  
  const id = $(this).attr('data-id');
  const quantity = `#chose-${id} .quantity`
  const selectVal = `#chose-${id} select`
  

  const response = {
    name: data[id].name,
    num: $(quantity).val(),
    unit: data[id].unit,
    price: data[id].price * $(quantity).val(),
    spicy:$(selectVal).val()
  }
  updataOrder(quantity,id,response)
});

$('.chose').each(function(){
  let _this=$(this);
  let add=$(_this).find(".button_add");//添加数量  
  let reduce=$(_this).find(".button_minus");//减少数量  
  let num=1;//数量初始值  
  let num_txt=$(_this).find(".quantity");//接受数量的文本框 
  let num_select=$(_this).find(".selectdata");
  let id = $(_this).attr('data-id')
  
  $(add).click(function(){  
    num = $(num_txt).val();      
    num++;  
    num_txt.val(num);   
      const response = {
        name: data[id].name,
        num: $(num_txt).val(),
        unit: data[id].unit,
        price: data[id].price * $(num_txt).val(),
        spicy:$(num_select).val()
      }
      updataOrder(num_txt,id,response)
    });
  $(reduce).click(function(){
    num = $(num_txt).val(); 
      if (num >0){
        num--;
        num_txt.val(num);
      }
      else{
        alert('不能於0')
      }
      const response = {
        name: data[id].name,
        num: $(num_txt).val(),
        unit: data[id].unit,
        price: data[id].price * $(num_txt).val(),
        spicy:$(num_select).val()
      }
      updataOrder(num_txt,id,response)
  });
});
  

function updataOrder(quantity,id,response){
  if($(quantity).val() < 1) {
    delete order[data[id].name]
    $(`#chose-${id} .hot`).addClass('d-none')
    sumPrice()
  } else {
    // if (response.indexOf)
    order[data[id].name] = response
    $(`#chose-${id} .hot`).removeClass('d-none')
    sumPrice()
  }
  // console.log(Object.keys(order).length, order);
}

function sumPrice() {
  let sum = 0
  const newList = Object.values(order).map(item => {
   sum = sum + item.price
  });
  $('#price').text(sum)
  return sum
}

function sumOrder(){
  let str=''
  const allorder = Object.values(order).map((item) => {
    str = str + `<p>共${item.price}元, ${item.name}, ${item.num}個</p>`
    console.log(str)
  });
  $('.modal-body').html(str)
  $('#sum span').text(sumPrice())
}

$('#buttons').click(function() {
  if (Object.keys(order).length >0){
    sumOrder()
  }
  else
  {
    $('.modal-body').text('請點餐')
    $('#sum span').text(sumPrice())
  }
})

