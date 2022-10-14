async function getData() {
  let result = await fetch(
    "https://johannela.dk/wp-bikeshop/wp-json/wp/v2/product?_embed"
  );
  dataReceived(await result.json());
}

function dataReceived(data) {
  //do something with the data
  console.log(data);

  data.forEach(showSingleBike);
  //postMessage.forEach((post) => {
  //console.log(hello, post);
}

function showSingleBike(bike) {
  //template
  const template = document.querySelector("template").content;
  //clone
  const clone = template.cloneNode(true);
  console.log(bike);
  //put the content into it
  //title
  clone.querySelector(".name").textContent = bike.title.rendered;
  //price
  clone.querySelector(".price span").textContent = bike.price;
  //colour
  console.log("hey", bike.colours.length);
  if (bike.colours[0]) {
    clone.querySelector(".colour-list").textContent = "";
    bike.colours.forEach((colour) => {
      const spanEl = document.createElement("span");
      spanEl.style.background = colour;
      console.log(spanEl);
      clone.querySelector(".colour-list").appendChild(spanEl);
    });
  }
  //   clone.querySelector(".colour div").textContent = bike.colours;
  //in stock
  clone.querySelector(".inStock span").textContent = bike.in_stock;
  //image
  clone.querySelector("img").src =
    bike._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  //brand
  //   clone.querySelector(".brand").textContent =
  //     bike._embedded["wp:term"][0][0].taxonomy.category;
  //append it to the dom
  //clone.querySelector("img").src =;
  const parent = document.querySelector("main");
  parent.appendChild(clone);
}

getData();
