

async function loadDiagram(){
    url = 'http://127.0.0.1:8000/diagram';
    const res = await fetch(url);
    const data = await res.json();
    const obj = JSON.parse(data)
    console.log(obj['layout']);
    let plotly_data = obj;
    const upper = getHeight("upper-bound");
    const lower = getHeight("add-section");
    plotly_data.layout.height = window.innerHeight - (upper+lower);
    console.log(plotly_data['layout']);

    plotly_data['layout']['paper_bgcolor'] = "#2F2fA2";
    plotly_data['layout']['plot_bgcolor'] = "#FFF";
    plotly_data['layout']['xaxis']['rangeselector'] = null;
    plotly_data['layout']['template']['layout']['xaxis']['gridcolor'] = "#2F2fA2";
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: true, displayModeBar: false});
}


function getHeight(element){
    return document.getElementById(element).offsetHeight;
}

function refreshDiagram(){
    setTimeout(loadDiagram,50);
}