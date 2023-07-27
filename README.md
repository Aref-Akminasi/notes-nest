# Notes Nest

This is a self-designed and self-built project. drawing inspiration from Google Keep's versatile tool. After thoroughly studying its functionality, I successfully created my own unique interpretation of it.

## Table of contents

- [Overview](#overview)
  - [Functionality](#functionality)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### Functionality

Users should be able to:

- Add new notes.
- Choose the background color of the notes.
- Edit a note.
- Delete a note.
- Save notes.
- View errors

### Screenshots

![](/screenshots/screenshot1.jpg)

### Links

- Live Site URL: [GitHub Pages](https://aref-akminasi.github.io/notes-nest/)

## My process

### Built with

- HTML5
- CSS3
- CSS custom properties
- CSS grid
- JavaScript

### What I learned

Creating a separate function solely for rendering notes from local storage into the DOM seemed unnecessary and less efficient. Hence, I optimized the existing 'add note' function with a conditional check. This allows it to process values retrieved from local storage if such values are supplied as arguments. This approach streamlined the code and improved efficiency.

```js
function addNote(note) {
  let note_text = noteInput.value;
  let note_color = selectedColor;

  // If note is provided through LS, override
  if (note) {
    note_text = note.text;
    note_color = note.color;
  }
```

### Continued development

I'm interested in moving notes around by dragging and dropping. But right now, it would not work on phones. I want to look at some JavaScript libraries to see how to make it happen.

## Author

**Aref Akminasi**

- LinkedIn - [Aref Akminasi](https://www.linkedin.com/in/aref-akminasi-91412b207/)
- Twitter - [@aref_akminasi](https://twitter.com/aref_akminasi)
