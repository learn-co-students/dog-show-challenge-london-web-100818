const baseUrl = 'http://localhost:3000/dogs';
const dogForm = document.querySelector("#dog-form");

dogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateDog(makeDogObj());  
})

const updateDog = (dog) => {
    fetch(`${baseUrl}/${dog.id}`,{
        method: "PATCH",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
    .then(showDogs);
}

const makeDogObj = () =>{
    return dog = {
        name: document.querySelector("#name").value,
        breed: document.querySelector("#breed").value,
        sex: document.querySelector("#sex").value,
        id: document.querySelector("#id").value
    };
}

const fetchDogs = () => fetch(baseUrl).then(resp => resp.json());

const makeEditButton = (dog) =>{
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
        document.querySelector("#name").value = dog.name;
        document.querySelector("#breed").value = dog.breed;
        document.querySelector("#sex").value = dog.sex;
        document.querySelector("#id").value = dog.id;
    })
    btn.innerText = "Edit";
    return btn;
}



const showDogs = () => {
    fetchDogs().then(dogs => {
        const table = document.querySelector("#table-body");
        table.innerHTML = "";
        for(const dog of dogs){
            const row = document.createElement("tr");
            for(const data in dog){
                if(data !== "id"){
                    const info = document.createElement("td");
                    info.innerText = dog[data];
                    row.appendChild(info);
                }
            }
            const buttonRow = document.createElement("td");
            buttonRow.appendChild(makeEditButton(dog));
            row.appendChild(buttonRow);
            table.appendChild(row);
        }
    })
}

showDogs();
