// Variables
const employeeInfoArray = []
const employeeHTMLArray = [];
const gallery = document.querySelector('#gallery');
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');
const modalClose = document.getElementsByClassName('modal-close-btn');
const modal = document.getElementsByClassName('modal-container');
/*
* Fetching data from the API
*/

fetchData("https://randomuser.me/api/?results=12");

// Helpers Function
async function fetchData(url) {
    await fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(employee => {
        for(let i = 0; i < employee.length; i++){
            employeeInfoArray.push(employee[i])
            HTMLBuilder(employee[i]);
        } 
        populateHTML(gallery, employeeHTMLArray);
    })
    .catch(err => {
        gallery.innerHTML('Something went wrong! :(');
        console.log(err);   
    });
    modalListener();
}
function HTMLBuilder(data) {
    const HTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
            </div>
        </div>
    `
    employeeHTMLArray.push(HTML);
}

function modalBuilder(data){
    const HTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.cell}</p>
                <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.nat} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>  
    `
    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = HTML;
    body.appendChild(div);
}

// function populateEmployee(data) {
//     employeeObj.picture = data.picture.medium;
//     employeeObj.first = data.name.first;
//     employeeObj.last = data.name.last;
//     employeeObj.email = data.email;
//     employeeObj.city = data.location.city;
//     employeeObj.state = data.location.state;
//     employeeObj.cell = data.cell;
//     employeeObj.streetNum = data.location.street.number;
//     employeeObj.streetName = data.location.street.name;
//     employeeObj.postal = data.location.postcode;
//     employeeObj.nat = data.nat
// }

function populateHTML(target, arr){
    let html = ""
    for(let i = 0; i < arr.length; i++){
        html += arr[i];
    }
    target.innerHTML = html;
}

// Event Listener
function modalListener() {
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            modalBuilder(employeeInfoArray[i])
            modalClose[0].addEventListener('click', () => body.removeChild(body.lastElementChild));
        })
    }
}



