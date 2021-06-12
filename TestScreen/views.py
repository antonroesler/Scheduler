import datetime
import random
import time

import datetime
from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_POST, require_http_methods

from .forms import ProcessForm
from .models import Process
from .simulator import Simulator

import plotly.figure_factory as ff


def index(request):
    form = ProcessForm()
    return render(request, "testscreen/index.html", {
        "form": form
    })


def diagram(request, algo):
    if request.session.get("session_id") is None:
        request.session['session_id'] = random.randint(1000000000, 9999999999)
    s = Simulator(request.session.get("session_id"))
    s.load()
    s.scheduler.run(algo)
    data = s.scheduler.data_plotly_formatted()
    data = sorted(data, key=lambda i: i['Task'])
    print(data)
    print(s.scheduler.get_colors())
    fig = ff.create_gantt(data, group_tasks=True, showgrid_x=True, title="ALGO" + " visualized:",
                           index_col='time_type', colors=s.scheduler.get_colors(), show_colorbar=True)
    fig.update_layout(
        font_family="Menlo",
        font_color="#212121",
        title_font_family="Roboto",
        title_font_color="#212121",
        hovermode='y'
    )
    fig.layout.xaxis.tickformat = "%Mm %Ss"  # Show minutes and Seconds as '00m 00s'
    return JsonResponse(fig.to_json(), safe=False)


def addProcess(request):
    if request.method == "POST":
        form = ProcessForm(request.POST)
        if form.is_valid():
            process = Process(name=form.cleaned_data['name'], arrival=form.cleaned_data['arrival'],
                              burst=form.cleaned_data['burst'], session=request.session.get('session_id'))
            process.save()
            return HttpResponse(status=204)
    return HttpResponse(status=500)


def sess(request):
    print(request.session.get("session_id"))
    return HttpResponse(200)
