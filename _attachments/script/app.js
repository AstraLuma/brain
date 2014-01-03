$(function() {
//    $.couchProfile.templates.profileReady = $("#new-message").html();
    $("#account").couchLogin({
        loggedIn : function(r) {
			$('#profile').hide();
        },
        loggedOut : function() {
            $("#profile").html('<p>Please log in to see your profile.</p>').show();
        }
    });
 });
