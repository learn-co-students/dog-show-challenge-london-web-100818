

const getDogs = () => fetch('http://localhost:3000/dogs').then(res => res.json())


const addDog = (dog) => {
const table = document.querySelector('#table-body')
const tableRow = document.createElement('tr')
tableRow.innerHTML = `
<td id="name">${dog.name}</td> 
<td id="breed">${dog.breed}</td>
<td id="sex">${dog.sex}</td> 
<td id="edit"><button id="edit-${dog.id}">Edit</button></td>
 `
 table.appendChild(tableRow)

 const dogForm = document.querySelector('#dog-form')
 const nameInput = document.querySelector('#name')
 const breedInput = document.querySelector('#breed')
 const sexInput = document.querySelector('#sex')
const editButton = document.querySelector(`#edit-${dog.id}`)

editButton.addEventListener("click", () => {
nameInput.value = `${dog.name}`
breedInput.value = `${dog.breed}`
sexInput.value = `${dog.sex}`


dogForm.addEventListener("click", (e) => {
event.preventDefault
tableRow.remove()
 dog.name = nameInput.value
 dog.breed = breedInput.value
 dog.sex = sexInput.value
 updateDog(dog).then(addDog)
 
})})


 



}

const addDogs = (dogs) => {
    dogs.forEach(dog => addDog(dog))
}


const updateDog = (dog) => {
fetch(`http://localhost:3000/dogs/${dog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(dog)
     }).then(resp => resp.json())}

document.addEventListener('DOMContentLoaded', () => getDogs().then(addDogs))