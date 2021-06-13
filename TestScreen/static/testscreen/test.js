function get_title(algo){
    let title = "";
    if (algo==="hrrn"){
        title += "Highest Response Ratio Next"
    } else if (algo==="sjf"){
        title += "Shortest Job First"
    } else if (algo==="srtf"){
        title += "Shortest Remaining Time First"
    } else if (algo==="lrtf"){
        title += "Longest Remaining Time First"
    } else if (algo==="rr"){
        title += "Round Robin"
    } else {
        title += "First Come First Served"
    }
    title += " visualized:"
    return title;

}

async function loadDiagram(){
    const url = 'http://127.0.0.1:8000/diagram/';
    const algo = document.getElementById("algo-dropdown").value;
    const res = await fetch(url+algo);
    const data = await res.json();
    const obj = JSON.parse(data)
    let plotly_data = obj;
    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    plotly_data.layout.height = window.innerHeight - (upper+lower);
    plotly_data['layout']['title'] = get_title(algo);
    plotly_data['layout']['title_color'] = "#212121";
    plotly_data['layout']['paper_bgcolor'] = "#eeeeee";
    plotly_data['layout']['plot_bgcolor'] = "#FFF";
    plotly_data['layout']['xaxis']['rangeselector'] = null;
    plotly_data['layout']['template']['layout']['xaxis']['gridcolor'] = "#eeeeee";
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: true, displayModeBar: false});
}


function getHeight(element){
    return document.getElementById(element).offsetHeight;
}

function refreshDiagram(){
    setTimeout(loadDiagram,50);
}


function sessionIdCall(){
    const url = "http://127.0.0.1:8000/sess"
    fetch(url)
}

async function clearX(){
    const url = "http://127.0.0.1:8000/clear"
    await fetch(url)
    await loadDiagram()
}

async function addRandom(){
    const url = "http://127.0.0.1:8000/random"
    await fetch(url)
    await loadDiagram()
}

function setTimeSliceInputVisibility() {
    let display_css = "none";
    if (document.getElementById('algo-dropdown').value === 'rr'){
        display_css = "block";
    }
    document.getElementById('quantum-input').style.display = display_css;
}

document.addEventListener("click", setTimeSliceInputVisibility);