from TestScreen.models import Process
from TestScreen.scheduler.scheduler import Scheduler
from TestScreen.scheduler.process import ProcessListAdministration

from .demo_processes import processes


class Simulator:

    def __init__(self, session_id=None):
        self.process_list = ProcessListAdministration()
        self.scheduler = Scheduler(self.process_list)
        self.session_id = session_id

    def add(self, name, arrival, burst):
        self.process_list.add(name, burst, arrival)

    def load(self, new_session=False):
        all_processes = self.get_processes()
        if all_processes:
            for p in all_processes:
                self.add(p.name, p.arrival, p.burst)
        else:
            self.load_demo()

    def delete_all_processes(self):
        self.get_processes().delete()
        self.process_list.clear()

    def get_processes(self):
        return Process.objects.filter(session=self.session_id)

    def load_demo(self):
        for (name, arrival, burst) in processes:
            self.add(name, arrival, burst)
            print(name, arrival, burst, self.session_id)
            p = Process(name=name, arrival=arrival, burst=burst, session=self.session_id)
            p.save()

