const NAMESPACE = 'urn:x-cast:com.sandscon.euchre';

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

    let data = event.data;

    // Get the substrings as separate variables.
    let trumpSuit = data["trump"];
    let teamOneScore = data["teamOneScore"];
    let teamTwoScore = data["teamOneScore"];

    // Set the picture on screen depending on the suit sent. If null, make the
    // image transparent.
    switch(trumpSuit) {
        case "SPADE":
            break;
        case "HEART":
            break;
        case "DIAMOND":
            break;
        case "CLUB":
            break;
        default:
            // Make the image invisible because a trump suit has not been selected.
            break;
    }

    // Set the team scores.
    document.getElementById("team-one-score").innerHTML = teamOneScore;
    document.getElementById("team-two-score").innerHTML = teamTwoScore;
});

document.getElementById("team-one-score").innerHTML = "3";

context.start();