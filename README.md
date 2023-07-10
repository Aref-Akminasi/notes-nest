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

![](/screenshots/screenshot1.png)

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

It was hard to keep updating the event listeners every time a new note was made or when notes were loaded from local storage. I saw I was doing the same thing over and over in each function. So, I made a different function just for updating the event listeners and call it whenever needed.

```js
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
```

### Continued development

I'm interested in moving notes around by dragging and dropping. But right now, it would not work on phones. I want to look at some JavaScript libraries to see how to make it happen.

## Author

**Aref Akminasi**

- LinkedIn - [Aref Akminasi](https://www.linkedin.com/in/aref-akminasi-91412b207/)
- Twitter - [@aref_akminasi](https://twitter.com/aref_akminasi)
