const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
let selectedColor = 'rgb(85, 107, 47)';
let notes = [];

function updateNotes() {
  try {
    const notes = JSON.parse(localStorage.getItem('notes'));
    for (let i = 0; i < notes.length; i++) {
      nest.innerHTML += `<div class=note style="background-color:${notes[i][1]}" draggable="true">${notes[i][0]}</div>`;
    }
  } catch {
    return false;
  }
}

updateNotes();

addNoteBtn.addEventListener('click', addNote);
colors.forEach((color) => {
  color.addEventListener('click', selectColor);
});

function selectColor() {
  colors.forEach((color) => {
    color.style.border = 'solid 0.1rem #fff';
  });
  this.style.border = 'solid 0.3rem #fff';
  selectedColor = getComputedStyle(this).backgroundColor;
}

function addNote() {
  nest.innerHTML += `<div class=note style="background-color:${selectedColor}" draggable="true">${noteInput.value}</div>`;
  let note = [noteInput.value, selectedColor];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}
