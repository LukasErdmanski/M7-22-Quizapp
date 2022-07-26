function showInfoFktnNotExist() {
    document.getElementById('dialog').classList.remove('dNone')
}


function closeDialog() {
    document.getElementById('dialog').classList.add('dNone')
}

/* This fuction has to be added as the event listener to the onkeydown=""- attribute of the body HTML element in the following way:

onkeydown="closeDialogOnEscKey(event)"

in order the escape key works: closes the dialog window. */
function closeDialogOnEscKey(event) {
    let x = event.key;

    if (x == 'Escape') {
        closeDialog();
    }
}