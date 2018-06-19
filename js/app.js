'use strict';

function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Product.all.length);
  var image = Product.all[nextIndex];

  return image;
}

function showImages() {
  //have image 1 show up on page
  var image1 = getNextImage();
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  img1.currentProduct = image1;

  var image2 = getNextImage;
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentProduct = image2;

  var image3 = getNextImage;
  var img3 = document.getElementById('product-3');
  img3.src = image3.src;
  img3.currentProduct = image3;
}

//click event to have new product images show up, erros after first click
var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event){
    console.log('click', event.target.currentProduct);
    showImages();
  } );
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
new Product('Toilet iPad', 'img/bathroom.jpg');
new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Product('Pet Sweepers', 'img/pet-sweep.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');

window.addEventListener('load', showImages);