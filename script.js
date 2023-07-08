const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
const error = document.querySelector('.error');
let edit = '';
let trash = '';
let notes = '';
let selectedColor = 'rgb(85, 107, 47)';
let allNotes = [];

function updateNotes() {
  try {
    const oldNotes = JSON.parse(localStorage.getItem('notes'));
    for (let i = 0; i < oldNotes.length; i++) {
      allNotes.push(oldNotes[i]);
      nest.innerHTML += `<div class="note" style="background-color:${oldNotes[i][1]}">${oldNotes[i][0]} <div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div></div>`;
    }
    notes = document.querySelectorAll('.note');
    trash = document.querySelectorAll('.trash');
    edit = document.querySelectorAll('.edit');
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

if (edit.length > 0) {
  edit.forEach((edit) => {
    edit.addEventListener('click', editNote);
  });
}
edit.forEach((edit) => {
  edit.addEventListener('click', editNote);
});

addNoteBtn.addEventListener('click', addNote);
colors.forEach((color) => {
  color.addEventListener('click', selectColor);
});

function editNote() {
  console.log('note edited', this.parentElement.parentElement);
  let newContent = prompt(
    'Edit note',
    this.parentElement.parentElement.innerText
  );
  this.parentElement.parentElement.innerHTML = `${newContent}<div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div>`;
  trash = document.querySelectorAll('.trash');
  edit = document.querySelectorAll('.edit');
  edit.forEach((edit) => {
    edit.addEventListener('click', editNote);
  });
  trash.forEach((trash) => {
    trash.addEventListener('click', deleteNote);
  });
}
function deleteNote() {
  this.parentElement.parentElement.remove();
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
  if (noteInput.value == '') {
    error.style.visibility = 'visible';
  } else {
    error.style.visibility = 'hidden';
    nest.innerHTML += `<div class="note" style="background-color:${selectedColor}">${noteInput.value}<div class="icons-container"><i class="fa-solid fa-pen edit"></i><i class="fa-sharp fa-solid fa-trash trash"></i></div></div>`;
    let note = [noteInput.value, selectedColor];
    allNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(allNotes));
    notes = document.querySelectorAll('.note');
    trash = document.querySelectorAll('.trash');
    edit = document.querySelectorAll('.edit');
    trash.forEach((trash) => {
      trash.addEventListener('click', deleteNote);
    });
    edit.forEach((edit) => {
      edit.addEventListener('click', editNote);
    });
    noteInput.value = '';
  }
}
