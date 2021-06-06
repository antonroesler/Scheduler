import datetime
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
    s = Simulator()
    s.load()
    s.scheduler.run(algo)
    data = s.scheduler.data_plotly_formatted()
    data = sorted(data, key=lambda i: i['Task'])
    fig = ff.create_gantt(data, group_tasks=True, showgrid_x=True, title= "ALGO" + " visualized:",
                          colors=s.scheduler.get_colors(), index_col='Task', show_colorbar=False)
    fig.update_layout(
        font_family="Menlo",
        font_color="white",
        title_font_family="Roboto",
        title_font_color="white",
    )
    fig.layout.xaxis.tickformat = "%Mm %Ss"  # Show minutes and Seconds as '00m 00s'
    return JsonResponse(fig.to_json(), safe=False)

def addProcess(request):
    if request.method == "POST":
        form = ProcessForm(request.POST)
        if form.is_valid():
            process = Process(name=form.cleaned_data['name'], arrival=form.cleaned_data['arrival'], burst=form.cleaned_data['burst'], session=1)
            print(process.name)
            print(process.arrival)
            print(process.burst)
            process.save()
            return HttpResponse(status=204)
    return HttpResponse(status=500)
