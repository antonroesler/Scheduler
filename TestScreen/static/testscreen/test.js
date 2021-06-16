function get_title(algo) {
    let title = "";
    if (algo === "hrrn") {
        title += "Highest Response Ratio Next"
    } else if (algo === "sjf") {
        title += "Shortest Job First"
    } else if (algo === "srtf") {
        title += "Shortest Remaining Time First"
    } else if (algo === "lrtf") {
        title += "Longest Remaining Time First"
    } else if (algo === "rr") {
        title += "Round Robin"
    } else {
        title += "First Come First Served"
    }
    title += " visualized:"
    return title;

}

async function loadDiagram() {
    const url = 'http://127.0.0.1:8000/diagram/';
    const algo = document.getElementById("algo-dropdown").value;
    const res = await fetch(url + algo);
    const data = await res.json();
    const obj = JSON.parse(data)
    let plotly_data = obj;
    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    plotly_data.layout.height = window.innerHeight - (upper + lower);
    plotly_data['layout']['title'] = get_title(algo);
    plotly_data['layout']['title_color'] = "#212121";
    plotly_data['layout']['paper_bgcolor'] = "#eeeeee";
    plotly_data['layout']['plot_bgcolor'] = "#FFF";
    plotly_data['layout']['xaxis']['rangeselector'] = null;
    plotly_data['layout']['template']['layout']['xaxis']['gridcolor'] = "#eeeeee";
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: true, displayModeBar: false});
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
    const url = "http://127.0.0.1:8000/clear"
    await fetch(url)
    await loadDiagram()
}

async function addRandom() {
    const url = "http://127.0.0.1:8000/random"
    await fetch(url)
    await loadDiagram()
}

function setTimeSliceInputVisibility() {
    let display_css = "none";
    if (document.getElementById('algo-dropdown').value === 'rr') {
        display_css = "block";
    }
    document.getElementById('quantum-input').style.display = display_css;
}

document.addEventListener("click", setTimeSliceInputVisibility);
var X = null;

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
        marker:{color: '#FEE715FF'}
    };
    var trace2 = {
        x: x,
        y: json['sjf'],
        type: 'bar',
        name: 'Shortest Job First',
        marker: {color: '#FEE715FF'}
    };
    var trace3 = {
        x: x,
        y: json['rr'],
        type: 'bar',
        name: 'Round Robin',
        marker: {color: '#FEE715FF'}
    };
    var trace4 = {
        x: x,
        y: json['lrtf'],
        type: 'bar',
        name: 'Longest Remaining Time First',
        marker: {color: '#FEE715FF'}
    };
    var trace5 = {
        x: x,
        y: json['srtf'],
        type: 'bar',
        name: 'Shortest Remaining Time First',
        marker: {color: '#FEE715FF'}
    };
    var trace6 = {
        x: x,
        y: json['hrrn'],
        type: 'bar',
        name: 'Highest Response Ratio Next',
        marker: {color: '#FEE715FF'}
    };
    const data = [trace1, trace2, trace3, trace4, trace5, trace6]

    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    const layout = {hovermode: 'closest'}
    layout.height = window.innerHeight - (upper + lower);
    layout['title'] = 'Compare Scheduling Algorithms';
    layout['title_color'] = "#212121";
    layout['paper_bgcolor'] = "#eeeeee";
    layout['plot_bgcolor'] = "#FFF";

    const canvas = document.getElementById('divPlotly');
    X = Plotly.newPlot(canvas, data, layout);
    canvas.on('plotly_hover', clickHandler);
    canvas.on('plotly_unhover', unhover);
    console.log(data)
}

/**
 * Handles click events on the histogram.
 * @param evt
 */
function clickHandler(data) {
    console.log(data)
    console.log(data.points[0].data.name)

    var update = {'marker': {color: '#101820FF'}}


    Plotly.restyle('divPlotly', update, [data.points[0].curveNumber])

}

function unhover(){
        const names = ["F"]

    var update = {'marker': {color: '#FEE715FF'}}


    Plotly.restyle('divPlotly', update)
}