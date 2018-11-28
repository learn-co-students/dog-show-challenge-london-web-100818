const table = document.querySelector('#table-body')
const form = document.querySelector('#dog-form')
const formName = document.querySelector('input[name="name"]')
const formBreed = document.querySelector('input[name="breed"]')
const formSex = document.querySelector('input[name="sex"]')
const formId = document.querySelector('input[name="id"]')

const renderDogs = (dogs) => {
    table.innerHTML = ''

    dogs.forEach(dog => renderDog(dog))
}

const renderDog = (dog) => {
    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `
        <td id="name">${dog.name}</td> 
        <td id="breed">${dog.breed}</td>
        <td id="sex">${dog.sex}</td> 
        <td id="edit"><button id="edit-dog">Edit</button></td>
    `
    table.appendChild(tableRow)

    clickAndEditDog(tableRow, dog)
}

const clickAndEditDog = (el, dog) => {
    const btn = el.querySelector(`#edit-dog`)
    btn.addEventListener('click', event => {

        formName.value = dog.name
        formBreed.value = dog.breed
        formSex.value = dog.sex
        formId.value = dog.id

    })
}

 form.addEventListener('submit', event => {
        event.preventDefault()
        dog = {
            name: formName.value,
            breed: formBreed.value,
            sex: formSex.value,
            id: formId.value
        
        }

        patchDog(dog)
            .then(() => 
                fetchDogs()
                    .then(renderDogs)
            )
      
    })

fetchDogs()
    .then(renderDogs)