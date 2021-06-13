import random

from TestScreen.models import Process
from TestScreen.scheduler.scheduler import Scheduler
from TestScreen.scheduler.process import ProcessListAdministration

from .demo_processes import processes


class Simulator:

    def __init__(self, session_id=None):
        self.process_list = ProcessListAdministration()
        self.scheduler = Scheduler(self.process_list)
        self.session_id = session_id
        self.demo = True

    def add(self, name, arrival, burst, dependency):
        self.process_list.add(name, burst, arrival, dependency)

    def load(self):
        all_processes = self.get_processes()
        print(self.demo)
        if all_processes:
            for p in all_processes:
                self.add(p.name, p.arrival, p.burst, p.dependency)

    def delete_all_processes(self):
        self.get_processes().delete()
        self.process_list.clear()
        self.demo = False
        print(self.demo)

    def get_processes(self):
        return Process.objects.filter(session=self.session_id)

    def add_random(self):
        name = "r"+str(random.randint(0,9999))
        arrival = random.randint(0,60)
        burst = random.randint(1,27)
        self.add(name, arrival, burst, None)
        p = Process(name=name, arrival=arrival, burst=burst, session=self.session_id)
        p.save()

    def load_demo(self):
        for (name, arrival, burst) in processes:
            self.add(name, arrival, burst, None)
            p = Process(name=name, arrival=arrival, burst=burst, session=self.session_id)
            p.save()

