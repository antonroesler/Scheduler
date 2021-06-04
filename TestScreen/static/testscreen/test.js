

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
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout, {responsive: true});
}


function getHeight(element){
    return document.getElementById(element).offsetHeight;
}

function refreshDiagram(){
    setTimeout(loadDiagram,50);
}