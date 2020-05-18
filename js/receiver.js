const NAMESPACE = 'urn:x-cast:com.sandscon.euchre';
const BASE_URL = "https://sandscon.github.io/";
const SPADE = "SPADE";
const SPADE_IMAGE_FILEPATH = "images/spade_final.png";
const HEART = "HEART";
const HEART_IMAGE_FILEPATH = "images/heart_final.png";
const DIAMOND = "DIAMOND";
const DIAMOND_IMAGE_FILEPATH = "images/diamond_final.png";
const CLUB = "CLUB";
const CLUB_IMAGE_FILEPATH = "images/club_final.png";
const TRUMP_JSON_KEY = "trump";
const TRUMP_TEAM_ONE_SCORE_KEY = "teamOneScore";
const TRUMP_TEAM_TWO_SCORE_KEY = "teamTwoScore";
const SUIT_IMAGE_ID = "suit-image";
const TEAM_ONE_SCORE_ID = "team-one-score";
const TEAM_TWO_SCORE_ID = "team-two-score";
const FADE_DURATION = 300;

function fadeOutSuitImage() {
    $('#' + SUIT_IMAGE_ID).fadeOut(FADE_DURATION);
    document.getElementById(SUIT_IMAGE_ID).style.opacity = 0;
}

function fadeInSuitImage(image_filepath) {
    $('#' + SUIT_IMAGE_ID).attr('src', image_filepath).bind('onreadystatechange load', 
    function() {
        if (this.complete) $(this).fadeIn(FADE_DURATION);
    });

    document.getElementById(SUIT_IMAGE_ID).style.opacity = 100;
}

function transitionSuitImage(image_filepath) {
    $('#' + SUIT_IMAGE_ID).fadeOut(FADE_DURATION, 
        function() {
            $(this).attr('src',image_filepath).bind('onreadystatechange load', 
            function() {
            if (this.complete) $(this).fadeIn(FADE_DURATION);
            });
     });
}
/**
 * Changes the suit image based on a filepath.
 * 
 * @param {string} image_filepath Filepath of image.
 */
function changeImage(image_filepath) {
    console.log(document.getElementById(SUIT_IMAGE_ID).src);
    console.log(document.getElementById(SUIT_IMAGE_ID).src == image_filepath);
    console.log("Opacity: " + document.getElementById(SUIT_IMAGE_ID).style.opacity);

    // If the image was previously transparent, fade in the new image.
    // Otherwise, transition the old image into the new image.
    if (document.getElementById(SUIT_IMAGE_ID).style.opacity == 0) {
        fadeInSuitImage(image_filepath);
    }
    else {
        if (document.getElementById(SUIT_IMAGE_ID).src != image_filepath) {
            transitionSuitImage(image_filepath);
        }
    }
}

/**
 * Makes the loading screen invisible and displays the euchre board.
 */
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("flex-parent").style.display = "flex";
}

// When page has fully loaded, display the scoreboard.
window.addEventListener('load', function () {
    showPage();
})

const context = cast.framework.CastReceiverContext.getInstance();

// Chromecast device is disconnected from sender app.
context.addEventListener(
    cast.framework.system.EventType.SENDER_DISCONNECTED, (event) => {
        window.close();
    }
);

// Receives messages from sender app. The message is a comma separated string
// where the first substring indicates the trump suit, the second substring is
// the first team's current score, and the third substring is the second team's
// score.
context.addCustomMessageListener(NAMESPACE, (event) => {
    // Get the data from the event.
    let data = event.data;

    // Get the substrings as separate variables.
    let trumpSuit = data[TRUMP_JSON_KEY];
    let teamOneScore = data[TRUMP_TEAM_ONE_SCORE_KEY];
    let teamTwoScore = data[TRUMP_TEAM_TWO_SCORE_KEY];

    // Set the picture on screen depending on the suit sent. If undefined, make 
    // the image transparent.
    switch(trumpSuit) {
        case SPADE:
            changeImage(BASE_URL + SPADE_IMAGE_FILEPATH);
            break;
        case HEART:
            changeImage(BASE_URL + HEART_IMAGE_FILEPATH);
            break;
        case DIAMOND:
            changeImage(BASE_URL + DIAMOND_IMAGE_FILEPATH);
            break;
        case CLUB:
            changeImage(BASE_URL + CLUB_IMAGE_FILEPATH);
            break;
        default:
            console.log("Opacity: " + document.getElementById(SUIT_IMAGE_ID).style.opacity);
            if (document.getElementById(SUIT_IMAGE_ID).style.opacity != 0) {
                fadeOutSuitImage();
            }
    }

    console.log(document.getElementById(TEAM_ONE_SCORE_ID).innerHTML);
    console.log(document.getElementById(TEAM_ONE_SCORE_ID).innerHTML == teamOneScore);

    // Set the team scores if they have changed.
    if (document.getElementById(TEAM_ONE_SCORE_ID).innerHTML != teamOneScore) {
        $(function() {
            $('#' + TEAM_ONE_SCORE_ID).fadeOut(FADE_DURATION, function() {
                $(this).text(teamOneScore).fadeIn(FADE_DURATION);
            });
        });
    }

    console.log(document.getElementById(TEAM_TWO_SCORE_ID).innerHTML);

    if (document.getElementById(TEAM_TWO_SCORE_ID).innerHTML != teamTwoScore) {
        $(function() {
            $('#' + TEAM_TWO_SCORE_ID).fadeOut(FADE_DURATION, function() {
                $(this).text(teamTwoScore).fadeIn(FADE_DURATION);
            });
        });
    }
});

context.start();