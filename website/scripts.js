async function getAnimals() {
    let url = 'http://localhost:3000/animals';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

async function renderAnimals() {
    let animals = await getAnimals();
    let html = '';
    animals.forEach(animal => {
        let htmlSegment = `<div class="animal">
                            <h1>${animal.first_name}</h1>
                            <h2>${animal.app_name}</h2>
                            </div>`
                            html += htmlSegment
    });
    let box = document.querySelector('.box');
    box.innerHTML = html;
}

getAnimals();
renderAnimals();