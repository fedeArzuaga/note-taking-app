export function validateForm( e ) {

    e.target.name.classList.remove('theme-error');
    e.target.name.placeholder = "Ex: Supermarket";
    e.target.description.classList.remove('theme-error');
    e.target.description.placeholder = "Ex: Potato, Milk, Bread, Butter, etc";

    let validate;

    if ( e.target.name.value.length < 3 ) {
        e.target.name.value = "";
        e.target.name.classList.add('theme-error');
        e.target.name.placeholder = "This field must have at least 3 characters";
        validate = false;
        return validate;
    } 
    
    if ( e.target.description.value.length < 3 ) {
        e.target.description.value = "";
        e.target.description.classList.add('theme-error');
        e.target.description.placeholder = "This field must have at least 3 characters";
        validate = false;
        return validate;
    }

    validate = true;
    return validate;



}