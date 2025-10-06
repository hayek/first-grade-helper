// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomExcluding(min, max, exclude) {
    let num;
    do {
        num = getRandomInt(min, max);
    } while (num === exclude);
    return num;
}

function updateProgressBar(progressId, current, total) {
    const percentage = (current / total) * 100;
    document.getElementById(progressId).style.width = percentage + '%';
}
