const dogs= 'http://localhost:3000/dogs'
const name=document.querySelectorAll('input')[0]
const breed=document.querySelectorAll('input')[1]
const sex=document.querySelectorAll('input')[2]
const id=document.querySelectorAll('input')[3]
const form=document.querySelector('#dog-form')
let table=document.querySelector('#table-body')



document.addEventListener('DOMContentLoaded', () => {
  getDogs()


})

function getDogs(){
  fetch(dogs)
  .then(res=>res.json())
  .then(dogs=>showDogs(dogs))
}

function showDog(dog){
    let tr= document.createElement('tr')
    tr.innerHTML=`<tr><td>Dog ${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td></tr>`
    let td=document.createElement('td')
    let button=document.createElement('button')
    button.innerText="Edit"
    button.addEventListener('click',()=>{populateForm(dog)})
    tr.appendChild(td)
    td.appendChild(button)
    table.appendChild(tr)
}

function showDogs(dogs){
  for(dog of dogs){
    showDog(dog)
  }
}

function updateDog(){
  let new_dog ={
    name: name.value,
    breed: breed.value,
    sex: sex.value
  }
  fetch(`${dogs}/${id.value}`,{
    method: "PATCH",
    headers: {
      "content-type": "application/json"
      },
    body: JSON.stringify(new_dog)
  })
  .then (dog =>console.log(dog))

}









function populateForm(dog){

name.value=dog.name
breed.value=dog.breed
sex.value=dog.sex
id.value=dog.id

}

form.addEventListener('submit', updateDog)
