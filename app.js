const sourceImg = [];
const body = document.querySelector('body');
const toggle = document.getElementById('day-night');
const toTop = document.querySelector('.to-top');
const toBottom = document.querySelector('.to-bottom');
const container = document.querySelector('.container');

// Day-night mode
{
  toggle.addEventListener('click', function () {
    this.classList.toggle('bi-moon');
    if (this.classList.toggle('bi-brightness-high-fill')) {
      body.style.background = 'rgb(214, 211, 211)';
      body.style.color = 'black';
      body.style.transition = '3s';
    } else {
      body.style.background = 'rgb(59, 62, 53)';
      body.style.color = 'white';
      body.style.transition = '3s';
    }
  });
}

// Create sourceImg
function rand() {
  return Math.floor(Math.random() * 90);
}

for (let i = 0; i < 150; i++) {
  let item = {
    counter: i + 1,
    image:
      'https://picsum.photos/' +
      (200 + rand()) +
      '/' +
      (300 + rand()) +
      '?random=1'
  };
  sourceImg.push(item);
}

// Create Grid

function createGrid(columns, sourceImg) {
  container.innerHTML = '';
  let columnContainer = {};
  for (let i = 0; i < columns; i++) {
    columnContainer[`column${i}`] = [];
  }
  for (let i = 0; i < sourceImg.length; i++) {
    const column = i % columns;
    columnContainer[`column${column}`].push(sourceImg[i]);
  }
  for (let i = 0; i < columns; i++) {
    let columnsourceImg = columnContainer[`column${i}`];
    let column = document.createElement('div');
    column.classList.add('column');
    columnsourceImg.forEach((post) => {
      let postDiv = document.createElement('div');
      postDiv.classList.add('post');
      let image = document.createElement('img');
      image.src = post.image;
      let count = document.createElement('div');
      count.classList.add('count');
      let counter = document.createElement('h1');
      counter.innerText = post.counter;
      count.appendChild(counter);
      postDiv.append(image, count);
      column.appendChild(postDiv);
    });
    container.appendChild(column);
  }
}

// Scrollbars
{
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      toTop.classList.add('active');
      toBottom.classList.add('active');
    } else {
      toTop.classList.remove('active');
      toBottom.classList.remove('active');
    }
  });
}

// Responsive

let originalSize = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth < 550 && originalSize >= 550) {
    createGrid(1, sourceImg);
  } else if (
    window.innerWidth >= 550 &&
    window.innerWidth < 900 &&
    (originalSize < 550 || originalSize >= 900)
  ) {
    createGrid(2, sourceImg);
  } else if (window.innerWidth >= 900 && originalSize < 900) {
    createGrid(4, sourceImg);
  }
  originalSize = window.innerWidth;
});

if (originalSize < 550) {
  createGrid(1, sourceImg);
} else if (originalSize >= 550 && originalSize < 900) {
  createGrid(2, sourceImg);
} else {
  createGrid(4, sourceImg);
}
