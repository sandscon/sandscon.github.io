const NAMESPACE = 'urn:x-cast:com.sandscon.euchre';
const SPADE = "SPADE";
const SPADE_IMAGE_FILEPATH = "../images/spade_final.png";
const HEART = "HEART";
const HEART_IMAGE_FILEPATH = "../images/heart_final.png";
const DIAMOND = "DIAMOND";
const DIAMOND_IMAGE_FILEPATH = "../images/diamond_final.png";
const CLUB = "CLUB";
const CLUB_IMAGE_FILEPATH = "../images/club_final.png";
const TRUMP_JSON_KEY = "trump";
const TRUMP_TEAM_ONE_SCORE_KEY = "teamOneScore";
const TRUMP_TEAM_TWO_SCORE_KEY = "teamOneScore";
const SUIT_IMAGE_ID = "suit-image";
const TEAM_ONE_SCORE_ID = "team-one-score";
const TEAM_TWO_SCORE_ID = "team-two-score";

/**
 * Changes the suit image based on a filepath.
 * 
 * @param {string} image_filepath Filepath of image.
 */
function changeImage(image_filepath) {
    // Set the image opacity to 100.
    document.getElementById(SUIT_IMAGE_ID).style.opacity = 100;

    // Change the image based on the passed-in filepath.
    document.getElementById(SUIT_IMAGE_ID).src = image_filepath;
}

const context = cast.framework.CastReceiverContext.getInstance();

// Chromecast device is disconnected from sender app.
context.addEventListener(
    cast.framework.system.EventType.SENDER_DISCONNECTED, (event) => {
        window.close();
    });

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
            changeImage(SPADE_IMAGE_FILEPATH);
            break;
        case HEART:
            changeImage(HEART_IMAGE_FILEPATH);
            break;
        case DIAMOND:
            changeImage(DIAMOND_IMAGE_FILEPATH);
            break;
        case CLUB:
            changeImage(CLUB_IMAGE_FILEPATH);
            break;
        default:
            document.getElementById(SUIT_IMAGE_ID).style.opacity = 0;
    }

    // Set the team scores.
    document.getElementById(TEAM_ONE_SCORE_ID).innerHTML = teamOneScore;
    document.getElementById(TEAM_TWO_SCORE_ID).innerHTML = teamTwoScore;
});

context.start();