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
    console.log(obj['layout']);
    let plotly_data = obj;
    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    plotly_data.layout.height = window.innerHeight - (upper+lower);
    console.log(plotly_data['layout']);
    plotly_data['layout']['title'] = get_title(algo);
    plotly_data['layout']['paper_bgcolor'] = "#7575d7";
    plotly_data['layout']['plot_bgcolor'] = "#FFF";
    plotly_data['layout']['xaxis']['rangeselector'] = null;
    plotly_data['layout']['template']['layout']['xaxis']['gridcolor'] = "#7575d7";
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: true, displayModeBar: false});
}


function getHeight(element){
    return document.getElementById(element).offsetHeight;
}

function refreshDiagram(){
    setTimeout(loadDiagram,50);
}