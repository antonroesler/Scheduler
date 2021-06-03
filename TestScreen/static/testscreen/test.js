

async function loadDiagram(){
    url = 'http://127.0.0.1:8000/diagram';

    const res = await fetch(url);
    res.json().then(diagram => {
    console.log(diagram)
    const parent = document.getElementById("container")
    parent.appendChild(diagram);
    })
}