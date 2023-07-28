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
    const edit = document.createElement('i');
    const trash = document.createElement('i');

    // Set properties and classes
    newNote.classList.add('note');
    newNote.style.backgroundColor = note_color;

    noteText.classList.add('note-text');
    noteText.innerText = note_text;

    edit.className = 'fa-solid fa-pen edit';
    trash.className = 'fa-sharp fa-solid fa-trash trash';

    // Append elements to the DOM
    newNote.appendChild(noteText);
    newNote.appendChild(edit);
    newNote.appendChild(trash);
    if (note) {
      nest.appendChild(newNote);
    } else {
      nest.insertBefore(newNote, nest.firstChild);
    }

    // Add Event Listeners to the edit and delete
    edit.addEventListener('click', (e) => editNote(e.target));
    trash.addEventListener('click', (e) => deleteNote(e.target));
    noteInput.value = '';
    updateLS();
  } else {
    // If noteText is not provided in any way, set error message
    setError("The content of a note can't be empty");
  }
}

function editNote(edit) {
  const note = edit.parentElement;
  const noteTextEl = note.querySelector('.note-text');
  const noteText = noteTextEl.innerText;

  if (!isEditing) {
    console.log(noteTextEl.innerText);
    console.log(noteText);
    isEditing = true;
    edit.classList.add('active');
    noteTextEl.classList.add('hidden');
    const textArea = document.createElement('textarea');
    textArea.value = noteText;
    note.insertBefore(textArea, note.firstChild);
    textArea.focus();
    currentEdit = note;
    // Check if the element is being edited is the same element
  } else if (note == currentEdit) {
    isEditing = false;
    noteTextEl.innerText = note.firstChild.value;
    noteTextEl.classList.remove('hidden');
    note.firstChild.remove();
    currentEdit = '';
    edit.classList.remove('active');
    updateLS();
  } else {
    setError('Please finish your edit first');
  }
}

function deleteNote(trash) {
  // If the user is editing a note, allow no deletations
  if (!isEditing) {
    const note = trash.parentElement;
    note.remove();
    updateLS();
  } else {
    setError('Please finish your edit first');
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

// Set an error message and remove it after 3 seconds
function setError(msg) {
  error.innerText = msg;
  error.style.visibility = 'visible';
  setTimeout(() => {
    error.style.visibility = 'hidden';
    error.innerText = '';
  }, 3000);
}

// Fetch notes from the LS when the window has loaded
fetchNotes();
