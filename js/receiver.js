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
    console.log(event);

    message = event.data.split(';');

    // Get the substrings as separate variables.
    let trumpSuit = message[0];
    let teamOneScore = message[1];
    let teamTwoScore = message[2];

    // Set the picture on screen depending on the suit sent. If null, make the
    // image transparent.

    // Set the team scores.
    document.getElementById("team-one-score").innerHTML = teamOneScore;
    document.getElementById("team-two-score").innerHTML = teamTwoScore;
});

document.getElementById("team-one-score").innerHTML = "3";

context.start();