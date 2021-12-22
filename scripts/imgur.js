let parent = document.getElementById("image-container");
let input = document.getElementById("input-data").value;
let inputShowParent = document.getElementById("show-search-parent");
let page = 3;
let limit = 4;

const getImageData = async () => {
    let data = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    let res = await data.json();

    res.forEach(({ author, download_url }) => {
        const htmlData = `
        <div id="image-child">
            <image  src=${download_url} />
            <div>${author}</div>
        </div>
      `
        parent.insertAdjacentHTML("beforeend", htmlData)
    })

}

getImageData()

const showData = () => {
    // setTimeout(() => {
    page++
    getImageData()
    // }, 300)
}

//this is for infinite scroll or lazy load 
window.addEventListener("scroll", () => {
    const { scrollHeight } = document.documentElement;
    if (window.scrollY + window.innerHeight >= scrollHeight) {
        showData();
    }
})

const getApiData = async () => {
    let input = document.getElementById("input-data").value;
    let data = await fetch(`https://pixabay.com/api/?key=24937450-3140d3a5cdff2b44e2ded9e83&q=${input}`);
    let res = await data.json();
    let { hits } = res;
    hits.forEach(({ tags, likes, comments, largeImageURL, views }) => {
        const htmlData = `
            <div id="tags">${tags}</div>
            <div id="heart-likes">
               <div>likes - ${likes}</div>
               <div>comments - ${comments}</div>
               <div>views - ${views}</div>
               <a href=${largeImageURL} target="_blank">See Now</a>
            </div>
      `
        inputShowParent.insertAdjacentHTML("beforeend", htmlData)
    })

    if (input.length >= 2) {
        inputShowParent.style.visibility = "visible"
    }else{
        inputShowParent.style.visibility = "hidden"  
    }

}

let time;

//this function delay the api call
const debounce = (fun, delay) => {
    let input = document.getElementById("input-data").value;
    if (input.length <= 2) {
        return false
    }

    if (time) {
        clearTimeout(time);
    }

    time = setTimeout(() => {
        fun()
    }, delay)
}
