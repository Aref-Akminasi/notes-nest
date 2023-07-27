// DOM element references
const colors = document.querySelectorAll('.color');
const addNoteBtn = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const nest = document.querySelector('.nest');
const error = document.querySelector('.error');
const deleteNotesBtn = document.getElementById('delete-notes');

// Global Variables
let selectedColor = 'rgb(85, 107, 47)';
let isEditing = false;
let currentEdit = '';

// Handle color selection
colors.forEach((color) => {
  color.addEventListener('click', (e) => selectColor(e.target));
});

function selectColor(colorEl) {
  // Reset all colors
  colors.forEach((color) => {
    color.style.border = 'solid 0.1rem #fff';
  });
  // Highlight selected color
  colorEl.style.border = 'solid 0.3rem #fff';
  selectedColor = getComputedStyle(colorEl).backgroundColor;
}

// Handle Add Note Button Click
addNoteBtn.addEventListener('click', () => addNote());

// Hide Error Message on Input Focus
noteInput.addEventListener('focus', () => (error.style.visibility = 'hidden'));

// Handle Delete Notes Button Click
deleteNotesBtn.addEventListener('click', () => {
  nest.innerHTML = '';
  updateLS();
});

function addNote(note) {
  let note_text = noteInput.value;
  let note_color = selectedColor;

  // If note is provided through LS, override
  if (note) {
    note_text = note.text;
    note_color = note.color;
  }

  // Only add note if noteText is present
  if (note_text) {
    // Create new elements
    const newNote = document.createElement('div');
    const noteText = document.createElement('p');
    const iconsContainer = document.createElement('div');
    const edit = document.createElement('i');
    const trash = document.createElement('i');

    // Set properties and classes
    newNote.classList.add('note');
    newNote.style.backgroundColor = note_color;

    noteText.classList.add('note-text');
    noteText.innerText = note_text;

    edit.className = 'fa-solid fa-pen edit';
    trash.className = 'fa-sharp fa-solid fa-trash trash';

    iconsContainer.classList.add('icons-container');

    // Append elements to the DOM
    newNote.appendChild(noteText);
    iconsContainer.appendChild(edit);
    iconsContainer.appendChild(trash);
    newNote.appendChild(iconsContainer);
    if (note) {
      nest.appendChild(newNote);
    } else {
      nest.insertBefore(newNote, nest.firstChild);
    }

    // Add Event Listeners
    edit.addEventListener('click', (e) => editNote(e.target));
    trash.addEventListener('click', (e) => deleteNote(e.target));
    noteInput.value = '';
    updateLS();
  } else {
    // If noteText is not provided in any way, set error message
    error.style.visibility = 'visible';
  }
}

function editNote(edit) {
  const note = edit.parentElement.parentElement;
  const p = note.firstChild;
  const noteText = p.innerText;

  // Check if not currently editing a note
  if (!isEditing) {
    isEditing = true;
    p.remove();
    const textArea = document.createElement('textarea');
    textArea.value = noteText;
    note.insertBefore(textArea, note.firstChild);
    textArea.focus();
    currentEdit = note;
    edit.classList.add('active');
    // Check if it's the current note being edited
  } else if (note == currentEdit) {
    isEditing = false;
    const p = document.createElement('p');
    p.innerText = note.firstChild.value;
    p.classList.add('note-text');
    note.firstChild.remove();
    note.insertBefore(p, note.firstChild);
    currentEdit = '';
    edit.classList.remove('active');
    updateLS();
  }
}

function deleteNote(trash) {
  // If the user is editing a note, allow no deletations
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

// Fetching Notes from LocalStorage
function fetchNotes() {
  const notesArr = JSON.parse(localStorage.getItem('notes'));
  if (notesArr) {
    notesArr.forEach((note) => addNote(note));
  }
}

// Fetch notes from the LS when the window has loaded
fetchNotes();
