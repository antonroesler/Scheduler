"""Processes are implemented as objects. This class represents theses Processes as Objects. They include all functions
for the calculation of stats."""

from copy import deepcopy

__author__ = "Anton Roesler"
__email__ = "anton.roesler@stud.fra-uas.de"

from typing import List


class Process:
    def __init__(self, name: str, duration: int, arrival_time: int, dependency: str = None):
        self.name = name
        self.duration = duration
        self.arrival_time = arrival_time
        self.remaining_time = duration  # Number of time units left until a process is done, starts with the duration.
        self.starting_time = None  # Number of time units when the process starts, with 0 being the start of simulation.
        self.end_time = None  # Number of time units when the process ends, with 0 being the start of the simulation.
        self.row = 0  # A Measure needed for lrtf, indicates how many time units the process was processed continuously.
        self.row_start_time = None  # Indicates at what time unit the current row started.
        self.dependency = dependency

    def finished(self) -> bool:
        """A quick check if a process is finished. The remaining time indicates how many time units are left until the
        process is done. That means a process with a remaining time of 0 is considered finished."""
        if self.remaining_time <= 0:
            return True
        return False

    def get_response_ratio(self, passed_time: int) -> float:
        """Calculates and returns the response ratio."""
        waiting_time = passed_time - self.arrival_time
        response_ratio = (waiting_time+self.duration)/self.duration
        return response_ratio

    def process(self, time_units: int, current_time: int):
        """This functions simulates that the process gets processed 'time_units' time units. Everything that happens
        is, that the remaining_time gets shortend by int 'time_units'."""
        self.remaining_time -= time_units

        if self.remaining_time <= 0:  # If the process is finished with this step, the end time gets set.
            self.end_time = current_time

    def get_waiting_time(self):
        """The total waiting time is the total turnaround time minus the duration."""
        return self.end_time - self.arrival_time - self.duration

    def get_turnaround_time(self):
        """The total turnaround time is the end time minus the start time."""
        return self.end_time - self.arrival_time

    def info(self):
        print(f'{self}\n{self.name}\nstart: {self.starting_time}\nend: {self.end_time}\nrem: {self.remaining_time}'
              f'\ndur: {self.duration}\nwait:{self.get_waiting_time()} ')



class ProcessListAdministration:
    def __init__(self):
        self.processes = []

    def add(self, name: str, duration: int, arrival_time: int, dependency: str):
        """Builds a new process object from given args. This new process is added to the process list."""
        self.processes.append(Process(name, duration, arrival_time, dependency))

    def add_process(self, process: Process):
        """Adds a given process to the process list"""
        self.processes.append(process)

    def remove(self, process: Process):
        """Removes a given process."""
        self.processes.remove(process)

    def clear(self):
        """Empties the process list"""
        self.processes = []

    def get_process_list(self):
        """Returns a deepcopy of the process list."""
        if len(self.processes) == 0:
            return [Process('null', 1, 0)]  # if the list is completely empty a pseudo process will be returned.
        return deepcopy(self.processes)

    def read_csv(self, filepath):
        """Reads a csv file formatted as 'name, duration, arrival_time' and adds every line as a new process to the
        process list."""


        file = open(filepath, 'r')
        file.readline()  # Skip the first row inside csv file.
        #file = [['a',11,0],['b',17,0],['c',3,0],['x',19,57]]
        for line in file:
            if not line:
                break  # if the row is empty, the last row is reached and the for loop is done.
            line = line.split(',')  # Separate row into its 3 parts, at the comma.
            if len(line) >= 3:  # Only precede if all the arguments are available.
                self.processes.append(Process(line[0], int(line[1]), int(line[2])))  # Add as a new process to the list.
        file.close()

