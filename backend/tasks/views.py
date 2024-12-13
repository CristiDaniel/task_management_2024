from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    """
    View to list or create tasks.
    Filters: completed (true/false), priority (low, medium, high)
    Sorts: date_added_asc, date_added_desc, title_asc, title_desc
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        completed = self.request.query_params.get('completed', None)
        order = self.request.query_params.get('order')
        priority = self.request.query_params.get('priority', None)

        # Apply filters
        if completed is not None:
            completed = completed.lower() in ['true', '1', 'yes']
            queryset = queryset.filter(completed=completed)

        if priority:
            priority_values = priority.split(',')
            queryset = queryset.filter(priority__in=priority_values)

        # Apply sorting
        if order == 'date_added_asc':
            queryset = queryset.order_by('created_at')
        elif order == 'date_added_desc':
            queryset = queryset.order_by('-created_at')
        elif order == 'title_asc':
            queryset = queryset.order_by('title')
        elif order == 'title_desc':
            queryset = queryset.order_by('-title')
        else:
            queryset = queryset.order_by('-created_at')

        return queryset

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a specific task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TasksPrioritiesView(APIView):
    """
    View to count tasks based on priority.
    Returns: low, medium, high
    """
    def get(self, request, *args, **kwargs):
        low_count = Task.objects.filter(priority="low").count()
        medium_count = Task.objects.filter(priority="medium").count()
        high_count = Task.objects.filter(priority="high").count()

        response_data = {
            "low": low_count,
            "medium": medium_count,
            "high": high_count,
        }

        return Response(response_data)
