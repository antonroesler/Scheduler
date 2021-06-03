from django import forms

class ProcessForm(forms.Form):
    Name = forms.CharField(max_length=5, label="Process Name")
    arrival = forms.IntegerField(label="Arrival Time", min_value=0, max_value=5000)
    burst = forms.IntegerField(label="Burst Time", min_value=1, max_value=1000)