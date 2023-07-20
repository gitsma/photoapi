const place = document.getElementById("place");

const gallery = async () => {
  try {
    const response = await fetch("https://api.unsplash.com/photos/random/?client_id=-SXBf8mz5ckLD1eDdENq5UvXs6YbBl1EXjTp4EQAbvQ&count=24&orientation=landscape");
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < 15; i++) {
      const myImg = document.createElement("img");
      myImg.classList.add('allimages');
      myImg.src = data[i].urls.small;
      place.appendChild(myImg);
    }
  }
  catch (err) {
    console.log(err);
  }
}
place.style.backgroundColor
gallery();

const form = document.getElementById('form')

const searchImages = async (e) => {
    e.preventDefault();
  while (place.firstChild) {
    place.removeChild(place.firstChild);
  }

  let query = document.getElementById("search").value;
  console.log(query)
  try {
   const response_search = await fetch(`https://api.unsplash.com/search/photos/?client_id=-SXBf8mz5ckLD1eDdENq5UvXs6YbBl1EXjTp4EQAbvQ&query=${query}&page=1&per_page=24&orientation=landscape`);
    const data_search = await response_search.json();
    console.log(data_search);
    for (let i = 0; i < 15; i++) {
      const findedImage = document.createElement("img");
      findedImage.src = data_search.results[i].urls.small;
      console.log(findedImage);
      place.appendChild(findedImage);

    }
  } catch (err) {
    console.log(err);
  }
}
form.addEventListener("submit", searchImages);


const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

let int = setInterval(blurring, 20)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 70, 100, 100, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 20, 0)}px)`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}