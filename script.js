const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
const error = document.querySelector('.error');
const deleteNotesBtn = document.getElementById('delete-notes');
let selectedColor = 'rgb(85, 107, 47)';
let isEditing = false;
let currentEdit = '';

colors.forEach((color) => {
  color.addEventListener('click', selectColor);
});

deleteNotesBtn.addEventListener('click', () => {
  nest.innerHTML = '';
  updateLS();
});

noteInput.addEventListener('focus', () => (error.style.visibility = 'hidden'));

function selectColor() {
  colors.forEach((color) => {
    color.style.border = 'solid 0.1rem #fff';
  });
  this.style.border = 'solid 0.3rem #fff';
  selectedColor = getComputedStyle(this).backgroundColor;
}

function addNote(note) {
  let note_text = noteInput.value;
  let note_color = selectedColor;
  if (note) {
    note_text = note.text;
    note_color = note.color;
  }
  if (note_text) {
    const newNote = document.createElement('div');
    const noteText = document.createElement('p');
    const iconsContainer = document.createElement('div');
    const edit = document.createElement('i');
    const trash = document.createElement('i');

    newNote.classList.add('note');
    newNote.style.backgroundColor = note_color;

    noteText.classList.add('note-text');
    noteText.innerText = note_text;

    edit.className = 'fa-solid fa-pen edit';
    trash.className = 'fa-sharp fa-solid fa-trash trash';

    iconsContainer.classList.add('icons-container');

    newNote.appendChild(noteText);
    iconsContainer.appendChild(edit);
    iconsContainer.appendChild(trash);
    newNote.appendChild(iconsContainer);
    nest.appendChild(newNote);

    edit.addEventListener('click', (e) => editNote(e.target));
    trash.addEventListener('click', (e) => deleteNote(e.target));
    noteInput.value = '';
    updateLS();
  } else {
    error.style.visibility = 'visible';
  }
}

addNoteBtn.addEventListener('click', () => addNote());

function editNote(edit) {
  const note = edit.parentElement.parentElement;
  const p = note.firstChild;
  const noteText = p.innerText;
  if (!isEditing) {
    isEditing = true;
    p.remove();
    const textArea = document.createElement('textarea');
    textArea.value = noteText;
    note.insertBefore(textArea, note.firstChild);
    textArea.focus();
    currentEdit = note;
  } else if (note == currentEdit) {
    isEditing = false;
    const p = document.createElement('p');
    p.innerText = note.firstChild.value;
    p.classList.add('note-text');
    note.firstChild.remove();
    note.insertBefore(p, note.firstChild);
    currentEdit = '';
    updateLS();
  }
}

function deleteNote(trash) {
  if (!isEditing) {
    const note = trash.parentElement.parentElement;
    note.remove();
    updateLS();
  }
}

function updateLS() {
  const notesArr = [];
  const notes = document.querySelectorAll('.note');
  notes.forEach((note) => {
    const noteObj = {
      text: note.firstChild.innerText,
      color: getComputedStyle(note).getPropertyValue('background-color'),
    };
    notesArr.push(noteObj);
  });
  localStorage.setItem('notes', JSON.stringify(notesArr));
}

function fetchNotes() {
  const notesArr = JSON.parse(localStorage.getItem('notes'));
  if (notesArr) {
    notesArr.forEach((note) => addNote(note));
  }
}

fetchNotes();
