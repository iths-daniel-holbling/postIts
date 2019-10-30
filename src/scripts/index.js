import '../styles/index.scss';

let notes = [];

class Note {

    constructor(text, color) {
        this.text = text;
        this.color = color;
    }

    markup() {
        return `
            <div class="note-buttons">
                <i class="material-icons md-dark">edit</i>
                <i class="material-icons md-dark">colorize</i>

            </div>
            <textarea>${this.text}</textarea>
        `;
    }
}

function init(){
    const gridToggle = document.querySelector('#grid-toggle');
    const addBtn = document.querySelector('#add');
    let noteArr = [];
    gridToggle.addEventListener('click', function(){
        let notes = document.querySelectorAll('.note');
        for(let note of notes){
            note.classList.toggle("note-list");
        }
    });
    addBtn.addEventListener('click', function(){
        let newNote = new Note("Edit this waaaaah","rgba(255,255,0,0.5)");
        let notesDiv = document.querySelector(".notes");
        let noteMarkup = document.createElement('div');
        noteMarkup.className = "note";
        noteMarkup.innerHTML = newNote.markup();
        notesDiv.appendChild(noteMarkup);
        noteArr.push(newNote);
        console.log(noteArr);

    });
}

init();