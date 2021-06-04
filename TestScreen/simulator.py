
import plotly


import plotly.express as px
from plotly.offline import plot
import pandas as pd
import datetime

from TestScreen.models import Process
from TestScreen.scheduler.scheduler import Scheduler
from TestScreen.scheduler.process import ProcessListAdministration
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

class Simulator:
    def __init__(self):
        self.process_list = ProcessListAdministration()
        self.scheduler = Scheduler(self.process_list)

    def add(self, name, arrival, burst, session=1):
        self.process_list.add(name, burst, arrival)

    def load(self, session=1):
        processes = Process.objects.filter(session=session)
        for p in processes:
            self.add(p.name, p.arrival, p.burst, p.session)
