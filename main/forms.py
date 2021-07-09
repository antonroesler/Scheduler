from django import forms

class ProcessForm(forms.Form):
    name = forms.CharField(max_length=5, label="Process Name", widget=forms.TextInput(attrs={'placeholder': 'Process Name', 'class':"txtf"}))
    arrival = forms.IntegerField(label="Arrival Time", min_value=0, max_value=5000)
    burst = forms.IntegerField(label="Burst Time", min_value=1, max_value=1000)
    dependency = forms.CharField(max_length=5, label="Dependency Name", required=False, widget=forms.TextInput(attrs={'placeholder': 'Process Name', 'class':"txtf"}))