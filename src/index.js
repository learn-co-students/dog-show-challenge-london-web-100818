// Step 1.    Assign Elements
// Step 2.1   renderThing(thing)
// Step 3.1   Listen for Form Submission
// Step 3.2   submitThingForm()
  // incl. Step 9.1
    // incl. Step 6.2 [storeThing(thing)]
    // incl. Step 2.2 [renderThing(thing)]
// Step 4.    Add state = {}
// Step 5.1   Clear & Render
  // incl. Step 2.2 [renderThing(thing)]
// Step 6.1   storeThing(thing) [local]
// Step 7     Create api.js
// Step 8.1   Fetch & Store Monsters
  // Step 8.2 [/api.js] fetchThings()
  // Step 8.3 [/index.js] storeThings(things) [local]
  // incl. Step 5.2
// Step 9.1   Create, Store & Render Thing
  // Step 9.2 [/api.js] createThing(thing)
    // incl. Step 6.2 [storeThing(thing)]
    // incl. Step 2.2 [renderThing(thing)]
// Step 10 [/api.js] updateThing(thingToUpdate)

// ***FORM***
const dogForm = document.querySelector('#dog-form')
const nameInput = dogForm.querySelector('#name-input')
const breedInput = dogForm.querySelector('#breed-input')
const sexInput = dogForm.querySelector('#sex-input')
// ***RENDER***
const dogTableBody = document.querySelector('#table-body')

const state = {
  "dogs": []
}

const storeDog = dog => {
  state.dogs.push(dog)
}

const storeDogs = dogs => {
  dogs.forEach(storeDog)
}


const renderDog = dog => {
  const dogRow = document.createElement('tr')
  dogRow.id = `dog-${dog.id}-row`
  dogRow.className = 'padding'
  dogRow.innerHTML = `
    <td id="name">${dog.name}</td>
    <td id="breed">${dog.breed}</td>
    <td id="sex">${dog.sex}</td>
    <td><button id="edit-btn">Edit Dog</button></td>
    `
  dogTableBody.appendChild(dogRow)

  clickAndEditDog(dogRow, dog)
}

const clickAndEditDog = (el, dog) => {
  const editDogBtn = el.querySelector('#edit-btn')
  editDogBtn.addEventListener('click', () => {
    nameInput.value = dog.name
    breedInput.value = dog.breed
    sexInput.value = dog.sex
    dogForm.addEventListener('submit', event => editDogForm(event, el, dog))
  })
}
  
const editDogForm = (event, el, dog) => {
  event.preventDefault()

  const dogToUpdate = {
    "name": nameInput.value,
    "breed": breedInput.value,
    "sex": sexInput.value,
    "id": dog.id
  }

  updateDog(dogToUpdate)
    .then(updatedDog => {
      const dogName = el.querySelector('#name')
      const dogBreed = el.querySelector('#breed')
      const dogSex = el.querySelector('#sex')

      dogName.innerText = updatedDog.name
      dogBreed.innerText = updatedDog.breed
      dogSex.innerText = updatedDog.sex
      
      let storedDog = state.dogs.find(dog => dog.id === updatedDog.id)
      
      storedDog.name = updatedDog.name
      storedDog.breed = updatedDog.breed
      storedDog.sex = updatedDog.sex
    })
}


const updateTable = () => {
  dogTableBody.innerHTML = ''
  state.dogs.forEach(renderDog)
}

getDogs()
  .then(dogs => {
    storeDogs(dogs)
    updateTable()
  })