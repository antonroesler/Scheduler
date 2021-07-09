from random import randint

from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import render


from main.forms import ProcessForm
from main.models import Process
from main.simulator import Simulator

import plotly.figure_factory as ff

def index(request):
    """Returns the index page."""
    form = ProcessForm()
    return render(request, "main/index.html", {
        "form": form
    })


def diagram(request, algo, time_slice=None):
    """Responds a plotly gantt chart in json format."""
    set_session_id(request)
    data, colors = run_simulation(algo, request.session.get("session_id"), time_slice)
    fig = generate_plotly_chart_as_json(data, colors)
    print(fig)
    return JsonResponse(fig, safe=False)


def generate_plotly_chart_as_json(data, colors):
    """Generates a plotly gantt chart and returns it in json format."""
    fig = ff.create_gantt(data, group_tasks=True, showgrid_x=True, title="ALGO" + " visualized:",
                          index_col='time_type', colors=colors, show_colorbar=True)
    fig.update_layout(
        font_family="Menlo",
        font_color="#000000",
        title_font_family="Roboto",
        title_font_color="#212121",
        hovermode='y'
    )
    fig.layout.xaxis.tickformat = "%Mm %Ss"  # Show minutes and Seconds as '00m 00s'
    fig = fig.to_json()
    return fig


def run_simulation(algo, sess_id, time_slice):
    """Runs the simulation with given algo and for a specific session."""
    s = Simulator(sess_id)
    s.load()
    if time_slice:
        s.scheduler.set_quantum(time_slice)
    s.scheduler.run(algo)
    data = s.scheduler.data_plotly_formatted()
    data = sorted(data, key=lambda i: i['Task'])
    return data, s.scheduler.get_colors()


def set_session_id(request):
    """Sets session id of an request if that request does not have a session id yet."""
    if request.session.get("session_id") is None:
        request.session['session_id'] = randint(1000000000, 9999999999)

def add_process(request):
    if request.method == "POST":
        form = ProcessForm(request.POST)
        if form.is_valid():
            process = Process(name=form.cleaned_data['name'], arrival=form.cleaned_data['arrival'],
                              burst=form.cleaned_data['burst'], session=request.session.get('session_id'))
            process.save()
            return HttpResponse(status=204)
    return HttpResponse(status=500)


def clear(request):
    try:
        s = Simulator(request.session.get("session_id"))
        s.delete_all_processes()
        return HttpResponse(status=204)
    except:
        return HttpResponse(status=500)


def random(request):
    try:
        s = Simulator(request.session.get("session_id"))
        s.add_random()
        return HttpResponse(status=204)
    except:
        return HttpResponse(status=500)


def comp(request):
    s = Simulator(request.session.get("session_id"))
    s.load()
    data = s.scheduler.run_all()
    return JsonResponse(data, safe=False)