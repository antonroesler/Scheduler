

const algorithms = {
    "fcfs": "First Come First Served",
    "hrrn": "Highest Response Ratio Next",
    "sjf": "Shortest Job First",
    "srtf": "Shortest Remaining Time First",
    "lrtf": "Longest Remaining Time First",
    "rr": "Round Robin"
}

/**
 * Returns the user-readable title for a algorithms shortname.
 * @param algo
 * @returns {string}
 */
function getTitle(algo) {
    console.log(algo)
    return algorithms[algo] + " visualized:"
}

/**
 * Returns the height of the html element with the given id.
 * @param id of the html element
 * @returns {number}
 */
function getHeight(id) {
    return document.getElementById(id).offsetHeight;
}

/**
 * Returns the displayed time slice.
 * @returns {number}
 */
function getTimeSliceInHtml(){
    return Number(document.getElementById('time-slice').innerHTML)
}
/**
 * Sets the displayed value of the time slice.
 * @param value
 */
function setTimeSliceInHtml(value){
document.getElementById('time-slice').innerHTML = value
}