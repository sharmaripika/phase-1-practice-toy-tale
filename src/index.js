let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyForm= document.querySelector(".add-toy-form")
  function createToyCard(toy){
 
  const toyCollection = document.getElementById("toy-collection");
    const card= document.createElement("div");
    const toyImage = document.createElement("img");
    toyImage.src= toy.image;
    toyImage.classList.add( "toy-avatar");
    const h2 = document.createElement("h2");
    h2.textContent = toy.name;
    const pTag = document.createElement("p");
    pTag.textContent= `${toy.likes} Likes`;
    const toyButton = document.createElement("button");
    toyButton.classList.add( "like-btn");
    toyButton.id = toy.id;
    toyButton.textContent =("Like ❤️");

    toyButton.addEventListener("click", function() {
      // Capture toy id
      const toyId = toy.id;
      // Calculate new number of likes
      const newNumberOfLikes = toy.likes + 1;
      // Submit PATCH request
      fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
          },
          body: JSON.stringify({
              likes: newNumberOfLikes
          })
      })
      .then(response => response.json())
      .then(updatedToy => {
          // Update toy's likes in the DOM
          pTag.textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error("Error updating likes:", error));
  });

    card.appendChild(toyImage);
    card.appendChild(h2);
    card.appendChild(pTag);
    card.appendChild(toyButton);
    toyCollection.appendChild(card);
  }

toyForm.addEventListener("submit", event =>
{ event.preventDefault();
  const name = toyForm.name.value;
  const image = toyForm.image.value;
  const likes =0;
const newToy= {name, image, likes};
fetch("http://localhost:3000/toys",{
method:"POST",
headers:{
  "Content-Type":"application/json",
  "Accept": "application/json",
},
body:JSON.stringify(newToy),
})
.then (response=>response.json())
.then(data=>{
  createToyCard(data);
  toyForm.reset();
})
.catch(error=>console.error("Error adding new toys:",error));

})
fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => data.forEach(toy => createToyCard(toy)))
    .catch(error => console.error('Error fetching toys:', error));
});


