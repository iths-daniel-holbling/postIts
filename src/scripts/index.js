import '../styles/index.scss';
let notes = [];
let jsonNotes = "";

class Note {
    constructor(text, color, notenumber) {
        this.text = text;
        this.color = color;
        this.notenumber = notenumber;
    }

    // markup() {
    //     return `
    //         <div class="note-buttons">
    //             <i class="material-icons md-dark edit">edit</i>
    //             <i class="material-icons md-dark color">colorize</i>
    //             <i class="material-icons md-dark delete">delete</i>
    //         </div>
    //         <textarea>${this.text}</textarea>
    //     `;
    // }

    markup() {
        return `
            <div class="note-buttons">
                <input type="color" class="colorpicker" name="colorpicker" value="${this.color}">
                <i class="material-icons md-dark delete">delete</i>
            </div>
            <textarea>${this.text}</textarea>
        `;
    }
}



function createEventListeners(notenumber){
    let index = notes.findIndex(x => x.notenumber === notenumber);
    let noteObj = notes[index];
    let noteElem = document.querySelectorAll('.note')[index];
    let delNote = noteElem.querySelector('.delete');
    let textArea = noteElem.querySelector('textarea');
    let colorPicker = noteElem.querySelector('input');

    delNote.addEventListener('click', function(){
        notes = notes.filter(function(obj) {
            return obj.notenumber !== notenumber;
        });
        noteElem.remove();
        console.log(notes);
        saveNotes();
    });

    textArea.addEventListener('keyup',function(){
        noteObj.text = textArea.value;
        saveNotes();
    });

    colorPicker.addEventListener('change', function (){
        noteObj.color = colorPicker.value;
        noteElem.style = `background-color: ${noteObj.color};`;
        saveNotes();
    });
}



function loadSavedNotes(){
    console.log(localStorage.notes);
    if(typeof localStorage.notes !== 'undefined'){
        let parsedNotes = JSON.parse(localStorage.notes);
        console.log(parsedNotes);
        notes = parsedNotes;
        for(let note of notes){
            let newNote = note;
            let notesDiv = document.querySelector(".notes");
            let noteMarkup = document.createElement('div');
            noteMarkup.className = "note";
            noteMarkup.setAttribute('notenumber',newNote.notenumber);
            noteMarkup.style = `background-color: ${newNote.color};`;
            noteMarkup.innerHTML = `
            <div class="note-buttons">
                <input type="color" class="colorpicker" name="colorpicker" value="${newNote.color}">
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



function randomColor(){
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
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
        console.log(notes);
        let newNote;
        if(notes === undefined || notes.length == 0){
            newNote = new Note("Edit this waaaaah",randomColor(),notes.length);
        }else{
            newNote = new Note("Edit this waaaaah",randomColor(),(notes[notes.length-1].notenumber+1));
        }
        
        let notesDiv = document.querySelector(".notes");
        let noteMarkup = document.createElement('div');
        noteMarkup.className = "note";
        noteMarkup.setAttribute('notenumber', newNote.notenumber);
        noteMarkup.style = `background-color: ${newNote.color};`;
        noteMarkup.innerHTML = newNote.markup();
        notesDiv.appendChild(noteMarkup);
        notes.push(newNote);
        createEventListeners(newNote.notenumber);
    });
}

init();