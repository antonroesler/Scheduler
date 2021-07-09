const algorithms = {
    "fcfs": "First Come First Served",
    "hrrn": "Highest Response Ratio Next",
    "sjf": "Shortest Job First",
    "srtf": "Shortest Remaining Time First",
    "lrtf": "Longest Remaining Time First",
    "rr": "Round Robin"
}

function get_title(algo) {
    return algorithms[algo] + " visualized:"
}

function stylePlotlyGanttChart(plotly_data, algo) {
    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    plotly_data.layout.height = window.innerHeight - (upper + lower);
    plotly_data['layout']['title'] = get_title(algo);
    plotly_data['layout']['title_color'] = "#212121";
    plotly_data['layout']['paper_bgcolor'] = "#eeeeee";
    plotly_data['layout']['plot_bgcolor'] = "#FFF";
    plotly_data['layout']['xaxis']['rangeselector'] = null;
    plotly_data['layout']['template']['layout']['xaxis']['gridcolor'] = "#eeeeee";
    plotly_data['layout']['hovermode'] = false
}

async function loadDiagram() {
    const url = 'diagram/';
    const algo = document.getElementById("algo-dropdown").value;
    let res;
    if (algo==='rr'){
        const time_slice = document.getElementById('time-slice').innerText;
         res = await fetch(url + algo + '/' + time_slice);
    } else{
        res = await fetch(url + algo);
    }
    const data = await res.json();
    const obj = JSON.parse(data)
    let plotly_data = obj;
    stylePlotlyGanttChart(plotly_data, algo);
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: false, displayModeBar: false});
}


function getHeight(element) {
    return document.getElementById(element).offsetHeight;
}

function refreshDiagram() {
    setTimeout(loadDiagram, 50);
}


function sessionIdCall() {
    const url = "http://127.0.0.1:8000/sess"
    fetch(url)
}

async function clearX() {
    const url = "clear"
    await fetch(url)
    await loadDiagram()
}

async function addRandom() {
    const url = "random"
    await fetch(url)
    await loadDiagram()
}

function setTimeSliceInputVisibility() {
    let display_css = "none";
    if (document.getElementById('algo-dropdown').value === 'rr') {
        display_css = "flex";
    }
    document.getElementById('quantum-input').style.display = display_css;
}

document.addEventListener("click", setTimeSliceInputVisibility);

function rounded(arr) {
    const r = [];
    arr.forEach(value =>{
        r.push(Math.round(value))
    });
    return r;
}

async function makeComparison() {
    const url = "http://127.0.0.1:8000/comp"
    const res = await fetch(url)
    const json = await res.json()
    console.log(json)
    const x = ["Waiting Mean", "Waiting Median", "Turnaround Mean", "Turnaround Median"]

    var trace1 = {
        x: x,
        y: json['fcfs'],
        type: 'bar',
        name: 'First Come First Served',
        text:rounded(json['fcfs']),
        marker:{color: '#FEE715FF'},
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    var trace2 = {
        x: x,
        y: json['sjf'],
        type: 'bar',
        name: 'Shortest Job First',
        text:rounded(json['sjf']),
        marker: {color: '#FEE715FF'},
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    var trace3 = {
        x: x,
        y: json['rr'],
        type: 'bar',
        name: 'Round Robin',
        text:rounded(json['rr']),
        marker: {color: '#FEE715FF'},
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    var trace4 = {
        x: x,
        y: json['lrtf'],
        type: 'bar',
        name: 'Longest Remaining Time First',
        text:rounded(json['lrtf']),
        marker: {color: '#FEE715FF'},
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    var trace5 = {
        x: x,
        y: json['srtf'],
        type: 'bar',
        name: 'Shortest Remaining Time First',
        text:rounded(json['srtf']),
        marker: {color: '#FEE715FF'},
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    var trace6 = {
        x: x,
        y: json['hrrn'],
        type: 'bar',
        name: 'Highest Response Ratio Next',
        marker: {color: '#FEE715FF'},
        text:rounded(json['hrrn']),
        textposition: null,
        textfont: {
            family: 'Impact, monospace',
            color: '#FEE715FF'
        },
        hovertemplate: '<extra></extra>'
    };
    const data = [trace1, trace2, trace3, trace4, trace5, trace6]

    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    const layout = {hovermode: 'closest', hoverinfo: "skip", hover}
    layout.height = window.innerHeight - (upper + lower);
    layout['title'] = 'Compare Scheduling Algorithms';
    layout['title_color'] = "#212121";
    layout['paper_bgcolor'] = "#eeeeee";
    layout['plot_bgcolor'] = "#FFF";

    const canvas = document.getElementById('divPlotly');
    Plotly.newPlot(canvas, data, layout);
    canvas.on('plotly_hover', hover);
    canvas.on('plotly_unhover', unhover);
}

/**
 * Colors the the algorithms of tha bar that is hover over in black.
 */
function hover(data) {
    var update = {'marker': {color: '#101820FF'}, textposition: 'auto'}
    Plotly.restyle('divPlotly', update, [data.points[0].curveNumber])
}

/**
 * Colors all bars yellow
 */
function unhover(){
    var update = {'marker': {color: '#FEE715FF'}, textposition: null}
    Plotly.restyle('divPlotly', update)
}

function increaseTimeSlice(amount=1){
    setTimeSliceInHtml(getTimeSliceInHtml()+amount)
}

function decreaseTimeSlice(amount=1){
    const current = getTimeSliceInHtml();
    if (Number(current) > 1){
        setTimeSliceInHtml(current-amount)
    }

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


