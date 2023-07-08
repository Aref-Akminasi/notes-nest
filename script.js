const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
let trash = '';
let notes = '';
let selectedColor = 'rgb(85, 107, 47)';
let allNotes = [];

function updateNotes() {
  try {
    const oldNotes = JSON.parse(localStorage.getItem('notes'));
    for (let i = 0; i < oldNotes.length; i++) {
      allNotes.push(oldNotes[i]);
      nest.innerHTML += `<div class="note" style="background-color:${oldNotes[i][1]}" draggable="true">${oldNotes[i][0]} <i class="fa-sharp fa-solid fa-trash trash"></i></div>`;
    }
    notes = document.querySelectorAll('.note');
    trash = document.querySelectorAll('.trash');
  } catch {
    return false;
  }
}

updateNotes();

if (trash.length > 0) {
  trash.forEach((trash) => {
    trash.addEventListener('click', deleteNote);
  });
}

addNoteBtn.addEventListener('click', addNote);
colors.forEach((color) => {
  color.addEventListener('click', selectColor);
});

function deleteNote() {
  this.parentElement.remove();
  allNotes = [];
  notes = document.querySelectorAll('.note');
  notes.forEach((note) => {
    let data = [note.innerText, note.style.backgroundColor];
    allNotes.push(data);
  });
  localStorage.setItem('notes', JSON.stringify(allNotes));
}
function selectColor() {
  colors.forEach((color) => {
    color.style.border = 'solid 0.1rem #fff';
  });
  this.style.border = 'solid 0.3rem #fff';
  selectedColor = getComputedStyle(this).backgroundColor;
}

function addNote() {
  nest.innerHTML += `<div class="note" style="background-color:${selectedColor}" draggable="true">${noteInput.value} <i class="fa-sharp fa-solid fa-trash trash"></i></div>`;
  let note = [noteInput.value, selectedColor];
  allNotes.push(note);
  localStorage.setItem('notes', JSON.stringify(allNotes));
  notes = document.querySelectorAll('.note');
  trash = document.querySelectorAll('.trash');
  trash.forEach((trash) => {
    trash.addEventListener('click', deleteNote);
  });
}
