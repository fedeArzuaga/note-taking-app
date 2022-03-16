import { createNoteStructure } from "./helpers/card-structure.js";

const mainForm = document.querySelector("#main-form");
const notesContainer = document.querySelector("#notes-container");

mainForm.addEventListener('submit', e => {

    e.preventDefault();

    const data = {
        noteName: e.target.name.value,
        noteContent: e.target.description.value
    }

    if ( data.noteName.length > 0 && data.noteContent.length > 0 ) {
        renderNote( data.noteName, data.noteContent );
    }

});

/**
 * Functions
 */

const renderNote = ( noteName, noteContent ) => {

    const { id, structure } = createNoteStructure( noteName, noteContent ),
          div = document.createElement('div');

    div.dataset.id = id;
    div.classList.add('theme-card');
    div.classList.add('theme-card-default')
    div.innerHTML = structure

    notesContainer.append(div);

    const optionButtons = Array.from(document.querySelectorAll(".options-button"));
    const panelsOptions = Array.from(document.querySelectorAll(".more-options-panel"));

    optionButtons.forEach( element => element.addEventListener('click', toggleOptionPanel) );
    panelsOptions.forEach( element => element.addEventListener('click', noteActions) );

}

function toggleOptionPanel( e ) {

    e.stopPropagation();

    const optionsPanel = e.target.nextElementSibling;
    
    if ( e.target.classList ) {
        toggleOptionPanelVisibility( optionsPanel );
    }

}

function noteActions( e ) {
    
    const clickedElement = e.target.className;
    const optionsPanel = e.target.parentElement.parentElement.parentElement
    let note;

    if ( clickedElement == "change-color" ) {

        note = e.target.parentElement.parentElement.parentElement.parentElement;
        note.style.borderColor = e.target.dataset.color;

        toggleOptionPanelVisibility( optionsPanel );

    } else if ( clickedElement == "delete-note" ) {

        note = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        note.remove();

    } else if ( clickedElement == "edit-note" ) {

        note = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        const noteTitle = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].textContent.trim();
        const noteText = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[3].textContent.trim();

        editContent( note )

    }

}

function toggleOptionPanelVisibility ( element ) {
    element.classList.toggle('more-options-panel-visible')
}

function editContent ( note ) {

    const title = note.children[2],
          content = note.children[3],
          form = document.createElement('form');
    
    form.id = "edit-note";
    form.classList.add('theme-form');

    const formInputs = `
            <label class="theme-label" for="name">
                <input class="theme-input" type="text" id="name" name="name" value="${title.textContent.trim()}">
            </label>

            <label class="theme-label" for="description">
                <textarea class="theme-textarea" name="description" id="description" cols="30">${content.textContent.trim()}</textarea>
            </label>

            <input class="theme-submit" type="submit" value="Save">
    `;

    title.remove();
    content.remove();

    form.innerHTML = formInputs;

    note.append(form);

    form.addEventListener('submit', saveChanges);

}

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