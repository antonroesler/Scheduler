import datetime
import time

import datetime as datetime
from django.http.response import JsonResponse
from django.shortcuts import render

from .forms import ProcessForm
# Create your views here.

import plotly.express as px
from plotly.offline import plot
import pandas as pd

df = pd.DataFrame([
    dict(Task="Job X", Start=datetime.datetime(1970, 1, 1, 1, 1, 0), Finish=datetime.datetime(1970, 1, 1, 1, 1, 15)),
    dict(Task="Job A", Start=datetime.datetime(1970, 1, 1, 1, 1, 15), Finish=datetime.datetime(1970, 1, 1, 1, 1, 19)),
    dict(Task="Job B", Start=datetime.datetime(1970, 1, 1, 1, 1, 30), Finish=datetime.datetime(1970, 1, 1, 1, 1, 35)),
    dict(Task="Job C", Start=datetime.datetime(1970, 1, 1, 1, 1, 19), Finish=datetime.datetime(1970, 1, 1, 1, 1, 30)),

])

fig = px.timeline(df, x_start="Start", x_end="Finish", y="Task", color="Task")
fig.update_yaxes(autorange="reversed") # otherwise tasks are listed from the bottom up
plt_div = plot(fig, output_type='div', config=dict(
                    displayModeBar=False
                ))

def index(request):
    form = ProcessForm()
    return render(request, "testscreen/index.html", {
        "fig": plt_div,
        "form": form
    })

def diagram(request):
    data = {
        'my_data': plt_div
    }
    return JsonResponse(data);
