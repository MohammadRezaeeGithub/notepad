//making custome element with javascript
class newNode extends HTMLElement {
    connectedCallback() {
        const id = generateString(5);
        this.innerHTML = `<div class="accordion-item position-relative">
        <a class="remove">Remove</a>
        <div class="accordion-header collapsed" data-toggle="collapse" data-target="#${id}">
            <h3>${subject}</h3>
        </div>
        <div class="collapse" id="${id}" data-parent="#accordion">
            <div class="accordion-body">
                <p>
                ${text}
                </p>
            </div>
        </div>
    </div>`;
    }
}

// variables
const root = document.querySelector('#accordion');//geeting the root of notes
customElements.define("accordionitem-element", newNode);//definding new custom elements
//definding variables
let subject;
let text;


// eventlisteners
eventlisteners()
function eventlisteners(){
    //adding event listener when client wants to submit
    document.querySelector('#form').addEventListener('submit',newNote)
    
    //removing notes
    root.addEventListener('click',removeNote);

    //getting notes from local storage onload
    document.addEventListener('DOMContentLoaded', localStorageOnLoad )
}



// functions
function newNote(e){
    e.preventDefault()
    //getting the text of inputs
    subject = document.querySelector('#subject').value
    text = document.querySelector('#text').value
    //creating new elemetn and adding to the root
    const li = document.createElement('accordionitem-element');
    root.appendChild(li);

    this.reset();

    alert('Your note has been succcessfully added.');
    //adding new note to the localstorage
    addNoteToLocalStorage()
}

//remove a note from ui
function removeNote(e){

    let noteSub ;

    if(e.target.classList.contains('remove')){
        noteSub = e.target.nextElementSibling.firstElementChild.innerHTML;
        e.target.parentElement.remove();
    }

    removeNoteFromLocalStorage(noteSub)
}

//removing note from local storage
function removeNoteFromLocalStorage(noteSub){

    const notes = getNotesFromLocalStorage();

    notes.forEach(function(note , index) {
        if(note.sub === noteSub){
            notes.splice(index , 1);
        }
    });

    localStorage.setItem('notes',JSON.stringify(notes));
}

//adding new note to local strorage
function addNoteToLocalStorage(){

    //getting previous notes
    let notes = getNotesFromLocalStorage();

    //making new object and adding to the array
    let newNote ={
        sub: subject,
        msg: text
    }
    notes.push(newNote);

    //adding array to the local strage
    localStorage.setItem('notes',JSON.stringify(notes))
}

//getting previous notes from local storage
function getNotesFromLocalStorage(){
    let notes;
    //checking if there is any notes already in the storage
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }

    return notes;
}

//getting data from local storage onload
function localStorageOnLoad(){

    let notes = getNotesFromLocalStorage();

    //adding data from local storage to ui
    notes.forEach(function(note) {
        subject = note.sub;
        text = note.msg;
            //creating new elemetn and adding to the root
            const li = document.createElement('accordionitem-element');
            root.appendChild(li);
    });
}



function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}