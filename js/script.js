// Variables
const employeeInfoArray = []
const employeeHTMLArray = [];
const gallery = document.querySelector('#gallery');
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');
const modal = document.getElementsByClassName('modal-container');
const search = document.querySelector('.search-container');
let modalContent;
let modalBtn;
let index = 0;
/*
* Fetching data from the API
*/

fetchData("https://randomuser.me/api/?results=12");

// Helpers Function
/*
* FETCH DATA
* Communicate to the API through fetch and display 12 users
*/
async function fetchData(url) {
    searchBuilder();
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
    searchListener();
    if(modal.length !== 0) {
        modalPrev = document.querySelector('#modal-prev');
        modalNext = document.querySelector('#modal-next');
        modalNext.addEventListener('click', () => {
            body.removeChild(body.lastElementChild);
            modalBuilder(employeeInfoArray[index + 1]);
            index += 1;
        });
        modalPrev.addEventListener('click', () => {
            body.removeChild(body.lastElementChild);
            modalBuilder = employeeInfoArray[index - 1];
            index -= 1;
        });
    }
}

/*
* HTMLBuilder
* Helper function that dynamically generate HTML
*/

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

/*
* Modal Builder
* Dynamically create modal on user click
*/
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

    const modalButton = document.querySelectorAll('.modal-btn-container button');
    const modalClose = document.getElementsByClassName('modal-close-btn');
    modalContent = document.querySelector('.modal');
    modalBtn = document.querySelector('.modal-btn-container');

    modalClose[0].addEventListener('click', () => {
        modalContent.style.animation = 'pull-up .3s ease-in-out forwards';
        modalBtn.style.display = 'none';
        setTimeout(() => body.removeChild(body.lastElementChild), 300); 
    });
    
    for(let i = 0; i < modalButton.length; i++) {
        modalButton[i].addEventListener('click', (e) => {
            if(e.target.textContent === 'Next'){
                if(index === cards.length - 1) {
                    index = 0
                    animationRight()
                } else {
                    findIndexForward();
                    animationRight()
                }
            } else {
                if(index === 0) {
                    index = cards.length - 1;
                    animationLeft();
                } else {
                    findIndexBackward();
                    animationLeft();
                }
            }
        })
    }
}


function animationRight() {
    setTimeout(() => {
        body.removeChild(body.lastElementChild);
        modalBuilder(employeeInfoArray[index]);
    }, 400)
    modalContent.style.animation = 'slide-right 0.5s ease-in-out forwards';
    modalBtn.style.animation = 'slide-right 0.5s ease-in-out forwards';
    setTimeout(() => {
        modalContent.style.animation = 'none';
        modalBtn.style.animation = 'none';
    }, 500);
}

function animationLeft() {
    setTimeout(() => {
        body.removeChild(body.lastElementChild);
        modalBuilder(employeeInfoArray[index]);
    }, 400)
    modalContent.style.animation = 'slide-left 0.5s ease-in-out forwards';
    modalBtn.style.animation = 'slide-left 0.5s ease-in-out forwards';
    setTimeout(() => {
        modalContent.style.animation = 'none';
        modalBtn.style.animation = 'none';
    }, 500);
}

function findIndexForward() {
    for(let i = index; i < cards.length; i++) {
        if(cards[i].style.display !== 'none' && i !== index){
            index = i;
            break;
        } 
    }
}

function findIndexBackward() {
    for(let i = index; i > -1; i--) {
        if(cards[i].style.display !== 'none' && i !== index){
            index = i;
            break;
        } 
    }
}

/*
* Search Builder
* Dynamically create search feature
*/
function searchBuilder() {
    const HTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `
    search.innerHTML = HTML;
}

function populateHTML(target, arr){
    let html = ""
    for(let i = 0; i < arr.length; i++){
        html += arr[i];
    }
    target.innerHTML = html;
}

/*
* EVENT LISTENER
*/
function modalListener() {
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            index = i;
            modalBuilder(employeeInfoArray[i])
            modalContent.style.animation = 'pull-down .3s ease-in-out forwards';
        });
    }
}

function searchListener() {
    const searchInput = document.querySelector('.search-input');
    const employeeName = document.querySelectorAll('#name');
    for(let i = 0; i < employeeName.length; i++) {
        searchInput.addEventListener('keyup', (e) => {
            if(employeeName[i].innerHTML.toLowerCase().includes(e.target.value.toLowerCase())){
                employeeName[i].parentElement.parentElement.style.display = '';
            }  else {
                employeeName[i].parentElement.parentElement.style.display = 'none';
            }
        });
    }
    
}





