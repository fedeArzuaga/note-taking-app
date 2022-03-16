export function createNoteStructure( noteName, noteContent ) {

    const id = Date.now();

    /* <div data-id="${id}" class="theme-card theme-card-default"> */

    const structure = `
        <a class="options-button" href="#"></a>

        <div class="more-options-panel">
            ${morePanel}
        </div>

        <h4>
            ${noteName}
        </h4>

        <p>
            ${noteContent}
        </p>

    </div>`;

    return {
        id,
        structure
    }

}

const morePanel = `<ul>
<li>
    <a class="change-color" href="#" data-color="#20639B"></a>
</li>
<li>
    <a class="change-color" href="#" data-color="#3CAEA3"></a>
</li>
<li>
    <a class="change-color" href="#" data-color="#F6D55C"></a>
</li>
<li>
    <a class="change-color" href="#" data-color="#ED553B"></a>
</li>
<li>
    <a class="change-color" href="#" data-color="#B3B3B3"></a>
</li>
<li>
    <a href="#">
        <img class="edit-note" src="images/icons/edit.png" alt="">
    </a>
</li>
<li>
    <a href="#">
        <img class="delete-note" src="images/icons/trash.png" alt="">
    </a>
</li>
</ul>`;