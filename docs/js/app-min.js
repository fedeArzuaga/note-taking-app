import{createNoteStructure,createInternalFormInputs}from"./helpers/card-structure.js";import{toggleOptionPanelVisibility}from"./helpers/generic-functions.js";import{validateForm}from"./helpers/validate-form.js";const mainForm=document.querySelector("#main-form"),notesContainer=document.querySelector("#notes-container");mainForm.addEventListener("submit",e=>{if(e.preventDefault(),validateForm(e)){const t={noteName:e.target.name.value,noteContent:e.target.description.value};notesContainer.classList.remove("empty"),createNote(t.noteName,t.noteContent),e.target.reset()}});const createNote=(e,t)=>{const{id:n,structure:r}=createNoteStructure(e,t),a=document.createElement("div");a.dataset.id=n,a.classList.add("theme-card"),a.classList.add("theme-card-default"),a.innerHTML=r,notesContainer.append(a);const o=Array.from(document.querySelectorAll(".options-button")),i=Array.from(document.querySelectorAll(".more-options-panel"));o.forEach(e=>e.addEventListener("click",toggleOptionPanel)),i.forEach(e=>e.addEventListener("click",noteActions))};function toggleOptionPanel(e){e.stopPropagation();const t=e.target.nextElementSibling;e.target.classList&&toggleOptionPanelVisibility(t)}function noteActions(e){const t=e.target.className,n=e.target.parentElement.parentElement.parentElement;let r;switch(t){case"change-color":(r=e.target.parentElement.parentElement.parentElement.parentElement).style.borderColor=e.target.dataset.color,toggleOptionPanelVisibility(n);break;case"delete-note":(r=e.target.parentElement.parentElement.parentElement.parentElement.parentElement).remove(),0==notesContainer.children.length&&notesContainer.classList.add("empty");break;case"edit-note":editContent(r=e.target.parentElement.parentElement.parentElement.parentElement.parentElement)}}function editContent(e){toggleOptionPanelVisibility(e.children[1]);const t=e.children[2],n=e.children[3],r=document.createElement("form");r.id="edit-note",r.classList.add("theme-form");const a=createInternalFormInputs(t.textContent.trim(),n.textContent.trim());t.remove(),n.remove(),r.innerHTML=a,e.append(r),r.addEventListener("submit",saveChanges)}function saveChanges(e){if(e.preventDefault(),validateForm(e)){const t=e.target.parentElement,n={newTitle:e.target.name.value,newContent:e.target.description.value},r=document.createElement("h4"),a=document.createElement("p");r.textContent=n.newTitle,a.textContent=n.newContent,t.append(r),t.append(a),e.target.remove()}}