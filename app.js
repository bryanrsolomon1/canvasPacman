/**
 * Created by bryansolomon on 11/20/16.
 */

function showModal(modalType) {
    switch(modalType) {
        case "Résumé":
            showResume();
            break;
        case " About":
            showAbout();
            break;
        case "Contact":
            showContact();
            break;
        case "Welcome":
            showWelcome();
    }
}

function showResume() {
    $('#resume-modal').modal();
}

function showAbout() {
    $('#about-modal').modal();
}

function showContact() {
    $('#contact-modal').modal();
}

function showWelcome() {
    $('#welcome-modal').modal();
}