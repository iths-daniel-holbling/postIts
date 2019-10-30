import '../styles/index.scss';

class Note {
    constructor() {

    }

    render() {
        const wrapper = document.querySelector('.notes');
        
    }
}

function init(){
    const gridToggle = document.querySelector('#grid-toggle');
    const addBtn = document.querySelector('#add');
    gridToggle.addEventListener('click', function(){
        let notes = document.querySelectorAll('.note');
        for(let note of notes){
            note.classList.toggle("note-list");
        }
    });
    addBtn.addEventListener('click', function(){

    });
}

init();