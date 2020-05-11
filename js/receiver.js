const context = cast.framework.CastReceiverContext.getInstance();

// Update style using javascript
let playerElement = document.getElementsByTagName("cast-media-player")[0];
playerElement.style.setProperty('--splash-image', 'url("https://images-na.ssl-images-amazon.com/images/I/51an3ywP53L.jpg")');

context.start();