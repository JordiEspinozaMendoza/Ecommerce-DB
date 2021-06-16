export default function getRandomImage() {
    let srcURLs=[
      "https://images-na.ssl-images-amazon.com/images/I/51PEE8cXxFL._AC_SY355_.jpg",
      "https://images.unsplash.com/photo-1588619461335-b81119fee1b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=375&q=80",
      "https://www.officedepot.com.mx/medias/60844.gif-515ftw?context=bWFzdGVyfHJvb3R8MTQ2Mzh8aW1hZ2UvanBlZ3xoNmMvaDAwLzk0MTY1ODM5NzA4NDYuanBnfDY3OTRjYWM3ZDlkZTBhMTFmNGZkMmZiNzFlNGIwNmE3NzNlMjI2NjdhMDczOTdjYzA4NzAwYWRmNGMzYjE5Njk",
      "https://static.grainger.com/rp/s/is/image/Grainger/114Y91_AS01?$zmmain$",
      "https://boxito.com/wp-content/uploads/2020/04/TP44596.jpg",
      "https://static.grainger.com/rp/s/is/image/Grainger/6AHM7_AS01?$zmmain$",
      "https://cdn.homedepot.com.mx/productos/435511/435511-d.jpg"
    ]
    let rNumber = Math.floor(Math.random()*(srcURLs.length-1));
    return(srcURLs[Math.floor(rNumber)]);
  };