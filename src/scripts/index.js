import '../styles/index.scss';
let notes = [];
let jsonNotes = "";

class Note {

    constructor(text, color, notenumber) {
        this.text = text;
        this.color = color;
        this.notenumber = notenumber;
    }

    markup() {
        return `
            <div class="note-buttons">
                <i class="material-icons md-dark edit">edit</i>
                <i class="material-icons md-dark color">colorize</i>
                <i class="material-icons md-dark delete">delete</i>
            </div>
            <textarea>${this.text}</textarea>
        `;
    }
}
function createEventListeners(notenumber){
    let noteObj = notes[notenumber];
    let noteElem = document.querySelectorAll('.note')[notenumber];
    let delNote = noteElem.querySelector('.delete');
    let textArea = noteElem.querySelector('textarea');
    delNote.addEventListener('click', function(){
        notes = notes.filter(function(obj) {
            return obj.notenumber !== notenumber;
        });
        noteElem.remove();
        console.log(notes);
    });
    textArea.addEventListener('keyup',function(){
        noteObj.text = textArea.value;
        saveNotes();
    });
}

function loadSavedNotes(){
    if(localStorage.notes !== 'undefined'){
        let parsedNotes = JSON.parse(localStorage.notes);
        console.log(parsedNotes);
        notes = parsedNotes;
        for(let note of notes){
            let newNote = note;
            let notesDiv = document.querySelector(".notes");
            let noteMarkup = document.createElement('div');
            noteMarkup.className = "note";
            noteMarkup.setAttribute('notenumber',newNote.notenumber);
            noteMarkup.innerHTML = `
            <div class="note-buttons">
                <i class="material-icons md-dark edit">edit</i>
                <i class="material-icons md-dark color">colorize</i>
                <i class="material-icons md-dark delete">delete</i>
            </div>
            <textarea>${newNote.text}</textarea>
        `;
            notesDiv.appendChild(noteMarkup);
            // notes.push(newNote);
            createEventListeners(newNote.notenumber);
        }
    }
}
function saveNotes(){
    jsonNotes = JSON.stringify(notes);
    localStorage.setItem('notes',jsonNotes);
}

function init(){
    loadSavedNotes();
    const gridToggle = document.querySelector('#grid-toggle');
    const addBtn = document.querySelector('#add');
    gridToggle.addEventListener('click', function(){
        let notes = document.querySelectorAll('.note');
        for(let note of notes){
            note.classList.toggle("note-list");
        }
    });
    addBtn.addEventListener('click', function(){
        let newNote = new Note("Edit this waaaaah","rgba(255,255,0,0.5)",notes.length);
        let notesDiv = document.querySelector(".notes");
        let noteMarkup = document.createElement('div');
        noteMarkup.className = "note";
        noteMarkup.setAttribute('notenumber',newNote.notenumber);
        noteMarkup.innerHTML = newNote.markup();
        notesDiv.appendChild(noteMarkup);
        notes.push(newNote);
        createEventListeners(newNote.notenumber);
    });
}

init();