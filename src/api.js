const fetchDogs = () => 
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())


const patchDog = (dog) =>
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())