'use strict';

var nextImage = 0;
function showImages() {
  //have image 1 show up on page
  var image1 = Product.all[nextImage++];
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  img1.currentProduct = image1;

  var image2 = Product.all[nextImage++];
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentProduct = image2;

  var image3 = Product.all[nextImage++];
  var img3 = document.getElementById('product-3');
  img3.src = image1.src;
  img3.currentProduct = image3;
}



function Product(name, src) {
  this.name = name;
  this.src= src;

  Product.all.push(this);
}
Product.all = [];

new Product('R2-D2 Bag', 'img/bag.jpg');
new Product('Meat Gum', 'img/bubblegum.jpg');
new Product('InstaBreakfast', 'img/breakfast.jpg');

window.addEventListener('load', showImages);