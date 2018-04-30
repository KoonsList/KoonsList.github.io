// Ben Koons
// Spring 2017
// Web233 Javascript
// Date: 4/22/18
// Assignment #13
function get(name){
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel+num+1; //length of everything before the value
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");
    if(num>=0) return url.substr(0,num);
    if(num<0)  return url;
}
//vFinal ShareList via bitly api
function passlist()
{
   var getshorturl=0;
   var login = "o_6mu9bfgh6t";
   var api_key = "R_fb441d9cfa40439299314267e04bb404";
   var long_url = "https://koonslist.github.io/index.html?list="+ shoppinglist;
  try{
  $.getJSON(
             "https://api-ssl.bitly.com/v3/shorten?callback=?",
              {
             "format": "json",
              "apiKey": api_key,
             "login": login,
              "longUrl": long_url
              },
             function(response)
             {
                getshorturl = 1;
                document.getElementById("sharelist").innerHTML = 'Share List:\n' + response.data.url;
                copyToClipboard(response.data.url);
                // copyToClipboard('sharelist');
                 //alert("ShoppingList URL Copied");
             });
  } catch(err) {
   //alert("Error : "+ err);
    document.getElementById("sharelist").innerHTML = 'Share List:\n' + long_url;
    //copyToClipboard("sharelist");
    copyToClipboard(long_url);
    //alert("ShoppingList URL Copied");
}
}
//vFinal share function
function share()
{
   passlist();
}
//v4.1 prompt message to copy URL
function copyToClipboard(text) {
   window.prompt("Copy & Share List!", text);
}

window.onload = function() {
 alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Student: Ben Koons**");
 populateshoppinglistonload();
  displayShoppinglists();
    clearFocus();
};

function about()
{
     alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Student: Ben Koons**");

}

function remove_unwanted(str) {

  if ((str === null) || (str === ''))
    return false;
  else
    str = str.toString();
  str = str.replace(/%20/g, "");
  str = str.replace(/%24/g, "$");
  str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');
}


function populateshoppinglistonload() {
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('koonslist');
  y = remove_unwanted(y);
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
  }
}


function savecookie() {
  delete_cookie('koonslist');
  var date = new Date();
  //keeps for a year
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'koonsllist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


var MyItems = {
  name: "",
  price: ""
};

var shoppinglist = [];

var addtocart = [];

function changeShoppinglist(position) {
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g, '');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var ReplacedAmount = e2.replace(/\$/g, '');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  addtocart[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}

function addbacktoshoppinglist(item, num) {
  deleteShoppingCart(num);
  shoppinglist.push(item);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
  clearFocus();
}

function addtoshopcart(item, num) {
  deleteShoppinglists(num);
  addtocart.push(item);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
  clearFocus();
}

function addShoppinglist(item) {
  if (item != "")
  {
  shoppinglist.push(item);
  displayShoppinglists();
  displayShoppingCart(); 
  clearFocus();
  savecookie();
  }else
  {
  alert("Item Description Required: Please enter now");
  clearFocus();
  }
}

function clearFocus() {
  document.getElementById("item").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}


function displayShoppinglists() {
  var TheList = "";
  var TheRow = "";
  var arrayLength = shoppinglist.length;
  for (var i = 0; i < shoppinglist.length; i++) {
    var btndelete = ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
    var btnupdate = ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'" + arrays + "'";
    var btnaddcart = '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart(' + arrays + ',' + i + ')" />Add</label>';
    TheRow = '<li>' + shoppinglist[i] + btndelete + ' ' + btnaddcart + '</li>';
    TheList += TheRow;
  }
  if (arrayLength > 0) {
    document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
  } else {
    document.getElementById("MyList").innerHTML = '';
  }
}

function displayShoppingCart() {
  var TheList = "";
  var TheRow = "";
  var arrayLength = addtocart.length;
  for (var i = 0; i < arrayLength; i++) {
    var btndelete = ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
    var btnupdate = ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
    var arrays = addtocart[i];
    arrays = "'" + arrays + "'";
    var btnaddlist = '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist(' + arrays + ',' + i + ')" checked="checked"/>Add</label>';
    TheRow = "<li>" + addtocart[i] + btndelete + ' ' + ' ' + btnaddlist + '<br></li>';
    TheList += TheRow;
  }
  if (arrayLength > 0) {
    document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
  } else {
    document.getElementById("MyCart").innerHTML = '';
  }
}

//v3.1
function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}
//v3.1
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  savecookie();
}
