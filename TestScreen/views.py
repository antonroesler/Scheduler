import time

from django.http.response import JsonResponse
from django.shortcuts import render

from .forms import ProcessForm
# Create your views here.

import plotly.express as px
from plotly.offline import plot
import pandas as pd

df = pd.DataFrame([
    dict(Task="Job X", Start='2009-01-01', Finish='2009-02-28'),
    dict(Task="Job B", Start='2009-03-05', Finish='2009-04-15'),
    dict(Task="Job C", Start='2009-02-20', Finish='2009-05-30')
])

fig = px.timeline(df, x_start="Start", x_end="Finish", y="Task")
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
