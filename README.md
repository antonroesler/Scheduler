# Scheduler
Simulation of Scheduling Algorithms

This web application was created by me to visualize scheduling algorithms. The user can add processes in the bar at the bottom. A process needs a unique name, an arrival time and a burst time (duration). Random processes can also be created by clicking on ‘Create Random’.

![image](https://user-images.githubusercontent.com/45258920/159792542-9e26c6eb-26c4-4182-916a-653e88aeefbd.png)


In the upper dropdown menu one of six scheduling algorithms can be selected. The created processes are simulated according to the selected algorithm after a click on ‘Visualize’ and the resulting schedule is visualized.

![image](https://user-images.githubusercontent.com/45258920/159792660-f26687ff-5e84-4285-bc2c-c6b505eec1b2.png)

The ‘Compare’ button can be used to display statistical key figures of each of the algorithms on the current processes. These are respectively the mean and median for the waiting time and turnaround time of each scheduling algorithm on the processes.

![image](https://user-images.githubusercontent.com/45258920/159792716-595b6f06-45f5-4aea-bd51-b05f62d8d36a.png)

The core of the project is implemented with Python. The Django framework was used to make it an interactive web application. Additionally used: plotly, some JavaScript, html and css.
