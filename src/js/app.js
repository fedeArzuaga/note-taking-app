import { createNoteStructure, createInternalFormInputs } from "./helpers/card-structure.js";
import { toggleOptionPanelVisibility } from "./helpers/generic-functions.js";

const mainForm = document.querySelector("#main-form");
const notesContainer = document.querySelector("#notes-container");

/**
 * Event listener to add new notes
*/
mainForm.addEventListener('submit', e => {

    e.preventDefault();

    const data = {
        noteName: e.target.name.value,
        noteContent: e.target.description.value
    }

    if ( data.noteName.length > 0 && data.noteContent.length > 0 ) {
        createNote( data.noteName, data.noteContent );
    }

});

/**
 * ===================
 * Functions
 * ===================
 */

const createNote = ( noteName, noteContent ) => {
    
    /* Getting the content of general HTML structure of a card */
    const { id, structure } = createNoteStructure( noteName, noteContent ),
          div = document.createElement('div');

    /* Creating the 'theme-card' template and appenging it to the card panel */          
    div.dataset.id = id;
    div.classList.add('theme-card');
    div.classList.add('theme-card-default')
    div.innerHTML = structure;

    notesContainer.append(div);

    /* Adding an event listener to the needed elements to make the cards functional */
    const optionButtons = Array.from(document.querySelectorAll(".options-button"));
    const panelsOptions = Array.from(document.querySelectorAll(".more-options-panel"));

    optionButtons.forEach( element => element.addEventListener('click', toggleOptionPanel) );
    panelsOptions.forEach( element => element.addEventListener('click', noteActions) );

}

// Hide/Show the options panel to the user
function toggleOptionPanel( e ) {

    e.stopPropagation();

    const optionsPanel = e.target.nextElementSibling;
    
    if ( e.target.classList ) {
        toggleOptionPanelVisibility( optionsPanel );
    }

}

// Function to execute several actions, including colorize, edit or delete them
function noteActions( e ) {
    
    const clickedElement = e.target.className;
    const optionsPanel = e.target.parentElement.parentElement.parentElement
    let note;

    switch( clickedElement ) {

        case "change-color":
            note = e.target.parentElement.parentElement.parentElement.parentElement;
            note.style.borderColor = e.target.dataset.color;
            toggleOptionPanelVisibility( optionsPanel );
        break;

        case "delete-note":
            note = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            note.remove();
        break;

        case "edit-note":
            note = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            editContent( note );
        break;

    }

}

// Function that creates a new form with the current data in the note to edit it.
function editContent ( note ) {

    toggleOptionPanelVisibility( note.children[1] );

    const title = note.children[2],
          content = note.children[3],
          form = document.createElement('form');
    
    form.id = "edit-note";
    form.classList.add('theme-form');

    const formInputs = createInternalFormInputs(title.textContent.trim(), content.textContent.trim());

    title.remove();
    content.remove();

    form.innerHTML = formInputs;

    note.append(form);

    form.addEventListener('submit', saveChanges);

}

// Function that is executed once "Save changes" button is pressed
function saveChanges( e ) {

    e.preventDefault();

    const note = e.target.parentElement;

    const data = {
        newTitle: e.target.name.value,
        newContent: e.target.description.value
    }

    const h4 = document.createElement('h4'),
          p = document.createElement('p');
    
    h4.textContent = data.newTitle;
    p.textContent = data.newContent;
          
    note.append(h4);
    note.append(p);

    e.target.remove();      

}