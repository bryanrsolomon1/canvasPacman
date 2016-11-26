/**
 * Created by bryansolomon on 11/20/16.
 */

var modalShowing = false;

$("#resume-modal").on("shown.bs.modal", function() {
    resume.start();
});
$("#resume-modal").on("hide.bs.modal", function() {
   resume.stop();
});

function showModal(modalType, callback) {
    switch(modalType) {
        case "Résumé":
            show("#resume-modal", callback);
            break;
        case " About":
            show("#about-modal", callback);
            break;
        case "Contact":
            show("#contact-modal", callback);
            break;
        case "Welcome":
            show("#welcome-modal", callback);
            break;
    }
}

function show(id, callback) {
    modalShowing = true;
    var modal = $(id);
    modal.modal();
    /* remove previous handler */
    modal.off('hidden.bs.modal');
    modal.on('hidden.bs.modal', function () {
        modalClosed();
        if (callback) {
            callback();
        }
    });
}

function modalClosed() {
    modalShowing = false;
}