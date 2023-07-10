//Defining the static elements of the HTML
const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
const error = document.querySelector('.error');
//Defining the variable elements that will change through time by adding or deleting notes
let edits = '';
let trash = '';
let note = '';
let allNotes = [];
let selectedColor = 'rgb(85, 107, 47)';

//Defining the event listeners for the static elements
addNoteBtn.addEventListener('click', addNote);
colors.forEach((color) => {
  color.addEventListener('click', selectColor);
});
noteInput.addEventListener('focus', () => (error.style.visibility = 'hidden'));

importNotes(); //Importing notes that are saved in the local storage

//Changing the color of the note that is being written based on the user's choice
function selectColor() {
  colors.forEach((color) => {
    color.style.border = 'solid 0.1rem #fff';
  });
  this.style.border = 'solid 0.3rem #fff';
  selectedColor = getComputedStyle(this).backgroundColor;
}

function addNote() {
  if (noteInput.value == '') {
    error.style.visibility = 'visible';
  } else {
    error.style.visibility = 'hidden';
    nest.innerHTML += `<div class="note" style="background-color:${selectedColor}">${noteInput.value}<div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div></div>`;
    let note = [noteInput.value, selectedColor];
    allNotes.push(note); //Notes are added in the HTML and also in an array who contains the note input value and color value
    noteInput.value = '';
    initialize(); //For defining the event listeners for the edit and trash for the new note
    updateLocalStorage(); //For adding the new note to the local storage
  }
}

function editNote() {
  let newContent = prompt(
    'Edit note',
    this.parentElement.parentElement.innerText
  );
  if (newContent) {
    this.parentElement.parentElement.innerHTML = `${newContent}<div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div>`;
  } else {
    //If the user left the prompt empty, the original text will re-appear
    return false;
  }
  updateAllNotes();
  initialize();
  updateLocalStorage();
}

function deleteNote() {
  this.parentElement.parentElement.remove();
  updateAllNotes();
  updateLocalStorage();
}

function updateAllNotes() {
  //This function takes all HTML elements that has the class of note on it and parse their text value and color into the all notes array
  allNotes = [];
  notes = document.querySelectorAll('.note');
  notes.forEach((note) => {
    let data = [note.innerText, note.style.backgroundColor];
    allNotes.push(data);
  });
  return false;
}

function initialize() {
  notes = document.querySelectorAll('.note');
  trash = document.querySelectorAll('.trash');
  edits = document.querySelectorAll('.edit');
  trash.forEach((trash) => {
    trash.addEventListener('click', deleteNote);
  });
  edits.forEach((edit) => {
    edit.addEventListener('click', editNote);
  });
  return false;
}

function updateLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(allNotes));
  return false;
}

function importNotes() {
  //Used try and catch because there are 0 notes in the local storage
  try {
    const oldNotes = JSON.parse(localStorage.getItem('notes'));
    for (let i = 0; i < oldNotes.length; i++) {
      allNotes.push(oldNotes[i]);
      nest.innerHTML += `<div class="note" style="background-color:${oldNotes[i][1]}">${oldNotes[i][0]} <div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div></div>`;
    }
    initialize();
  } catch {
    return false;
  }
}
