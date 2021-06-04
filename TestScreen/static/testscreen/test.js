

async function loadDiagram(){
    url = 'http://127.0.0.1:8000/diagram';

    const res = await fetch(url);
    const data = await res.json();
    const obj = JSON.parse(data)
    console.log(obj['data']);
    let plotly_data = obj;
    Plotly.react('divPlotly', plotly_data.data, plotly_data.layout);
}