/* globals Chart */
'use strict';

window.addEventListener('load', function onLoad() {
  loadFromStorage();

  if (Product.all.length === 0) {
    initialize();
  }
  showImages();
});

//local storage stuff
function saveAll() {
  localStorage['voteHistory'] = JSON.stringify({ voteCount: Product.voteCount});
  localStorage['products'] = JSON.stringify(Product.all);
}

function loadFromStorage() {
  var jsonVoteHistoryString = localStorage['voteHistory'];
  if (jsonVoteHistoryString) {
    var voteHistory = JSON.parse(jsonVoteHistoryString);
    Product.voteCount = voteHistory.voteCount;
  }


  var jsonStringFromStorage = localStorage['products'];
  if (!jsonStringFromStorage)
    return;

  Product.all = [];
  var arrayFromStorage = JSON.parse(jsonStringFromStorage);
  for(var i = 0; i < arrayFromStorage.length; i++) {
    var arrayItem = arrayFromStorage[i];
    new Product(arrayItem.name, arrayItem.src, arrayItem.voteCount);
  }
}


function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Product.all.length);
  var image = Product.all[nextIndex];

  return image;
}

function showImages() {
  if (Product.voteCount >= 25) {
    showResults();
    return;
  }

  document.getElementById('resultsWrapper').style.display = 'none';

  var image1 = getNextImage();
  image1.showCount++;
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  img1.currentProduct = image1;

  var image2 = getNextImage();
  image2.showCount++;
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentProduct = image2;

  var image3 = getNextImage();
  image3.showCount++;
  var img3 = document.getElementById('product-3');
  img3.src = image3.src;
  img3.currentProduct = image3;
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event){
    Product.voteCount++;

    console.log('click #' + Product.voteCount, event.target.currentProduct);
    event.target.currentProduct.voteCount ++;

    saveAll();
    showImages();
  } );
}



function Product(name, src, testVoteCount, testShowCount) {
  this.name = name;
  this.src= src;
  this.voteCount = testVoteCount || 0;
  this.showCount = testShowCount || 0;

  Product.all.push(this);
}

function initialize() {
  Product.voteCount = 0;
  Product.all = [];


  new Product('R2-D2 Bag', 'img/bag.jpg');
  new Product('Meat Gum', 'img/bubblegum.jpg');
  new Product('InstaBreakfast', 'img/breakfast.jpg');
  new Product('Toilet iPad', 'img/bathroom.jpg');
  new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
  new Product('Pet Sweepers', 'img/pet-sweep.jpg');
  new Product('Unicorn Meat', 'img/unicorn.jpg');

  saveAll();
}

function showResults() {
  document.getElementById('resultsWrapper').style.display = 'block';
  var ul = document.getElementById('results');
  ul.innerHTML = '';

  for(var i = 0; i < Product.all.length; i++) {
    var current = Product.all[i];
    var li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.voteCount + ' votes and was shown ' + current.showCount + ' times.';
    ul.appendChild(li);
  }
  displayResultChart();
}

function displayResultChart() {
  var canvas = document.getElementById('voteResults');
  canvas.style.display = 'block';

  var labels = [];
  var voteCounts = [];
  var showCounts = [];

  for (var i = 0; i < Product.all.length; i++) {
    labels[i] = Product.all[i].name;
    voteCounts[i] = Product.all[i].voteCount;
    showCounts[i] = Product.all[i].showCount;
  }

  var ctx = canvas.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Votes',
          backgroundColor: 'rgb(66, 178, 135)',
          data: voteCounts
        },
        {
          label: 'Show Count',
          backgroundColor: 'rgb(151, 160, 49)',
          data: showCounts
        }
      ]
    },

    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    title: {
      display: true,
      text: 'Your Voting Results!'
    }
  });
}

var resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', function voteReset(event) {
  initialize();
  showImages();
});