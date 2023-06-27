"use strict";

const allProducts = [];

let totalVotes = 0;
const maxVotesAllowed = 25;

function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.viewCount = 0;
  this.voteCount = 0;
  allProducts.push(this);
}
Product.prototype.render = function () {
  const containerElement = document.getElementById("productContainer");
  const div = document.createElement("div");
  div.classList.add("object");
  containerElement.appendChild(div);
  const image = document.createElement("img");
  image.src = this.imagePath;
  div.appendChild(image);
  this.viewCount++;
  div.addEventListener("click", this.handleProductClick.bind(this));
};

Product.prototype.handleProductClick = function () {
  if (totalVotes < maxVotesAllowed) {
    this.voteCount++;
    totalVotes++;
    const containerElement = document.getElementById("productContainer");
    containerElement.innerHTML = "";
    renderRandomProducts();
  }
};

const bag = new Product("Bag", "images/bag.jpg");
const banana = new Product("Banana", "images/banana.jpg");
const bathroom = new Product("Bathroom", "images/bathroom.jpg");
const boots = new Product("Boots", "images/boots.jpg");
const breakfast = new Product("Breakfast", "images/breakfast.jpg");
const bubblegum = new Product("Bubblegum", "images/bubblegum.jpg");
const chair = new Product("Chair", "images/chair.jpg");
const cthulhu = new Product("Cthulhu", "images/cthulhu.jpg");
const dogDuck = new Product("Dog-duck", "images/dog-duck.jpg");
const dragon = new Product("Dragon", "images/dragon.jpg");
const pen = new Product("Pen", "images/pen.jpg");
const petSweep = new Product("Pet-sweep", "images/pet-sweep.jpg");
const scissors = new Product("Scissors", "images/scissors.jpg");
const shark = new Product("Shark", "images/shark.jpg");
const sweep = new Product("Sweep", "images/sweep.png");
const tauntaun = new Product("tauntaun", "images/tauntaun.jpg");
const unicorn = new Product("Unicorn", "images/unicorn.jpg");
const waterCan = new Product("Water-can", "images/water-can.jpg");
const wineGlass = new Product("Wine-glass", "images/wine-glass.jpg");

// console.log('allProducts', allProducts);

// function generateImageSelection() {
//   allProducts
// }

function getRandomProducts(allProducts) {
  const uniqueProducts = new Set();
  while (uniqueProducts.size < 3) {
    const randomProductIndex = Math.floor(Math.random() * allProducts.length);
    uniqueProducts.add(allProducts[randomProductIndex]);
  }

  return Array.from(uniqueProducts);
}

function renderRandomProducts() {
  const randomProducts = getRandomProducts(allProducts);
  // console.log(randomProducts);
  for (const product of randomProducts) {
    product.render();
  }
}
renderRandomProducts();

const button = document.getElementById("viewResultBtn");
button.addEventListener("click", function () {
  // console.log(allProducts)
  const div = document.getElementById("resultContainer");
  const ul = document.createElement("ul");
  div.appendChild(ul);
  for (const product of allProducts) {
    // console.log(product.voteCount)
    const voteCount = product.voteCount;
    const li = document.createElement("li");
    li.textContent += `${product.name} was clicked ${voteCount} times`;
    ul.appendChild(li);
  }
  chartAppender();
  const button2 = document.getElementById("viewResuletBtn");
  button.style.display = "none";
});

function chartAppender() {
  const allProductsName = [];
  for (let i = 0; i < allProducts.length; i++) {
    const productName = allProducts[i].name;
    allProductsName.push(productName);
  }
  // console.log(allProductsName)

  const allVoteCounts = [];
  for (let i = 0; i < allProducts.length; i++) {
    const vote = allProducts[i].voteCount;
    // console.log(vote)
    allVoteCounts.push(vote);
  }
  // console.log(allVoteCounts)
  const allViewCounts = [];
  for (let i = 0; i < allProducts.length; i++) {
    const viewNumber = allProducts[i].viewCount;
    allViewCounts.push(viewNumber);
  }
  // console.log(allViewCounts);

  const data = {
    labels: allProductsName,
    datasets: [
      {
        label: "votes",
        data: allVoteCounts,
        backgroundColor: ["#42032C"],
        borderColor: ["#D36B00"],
        borderWidth: 1,
      },
      {
        label: "views",
        data: allViewCounts,
        backgroundColor: ["#D36B00"],
        borderColor: ["#42032C"],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };
  const votesCharts = document.getElementById("chart");
  const myChart = new Chart(votesCharts, config);
}
