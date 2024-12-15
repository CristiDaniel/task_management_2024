from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    """
    View to list or create tasks.
    Filters: priority (low, medium, high), status (pending, in_progress, completed, on_hold, cancelled)
    Sorts: date_added_asc, date_added_desc, title_asc, title_desc
    """
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        order = self.request.query_params.get('order')
        priority = self.request.query_params.get('priority', None)
        status = self.request.query_params.get('status', None)

        # Apply filters
        if priority:
            priority_values = priority.split(',')
            queryset = queryset.filter(priority__in=priority_values)

        if status:
            status_values = status.split(',')
            queryset = queryset.filter(status__in=status_values)

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
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TasksPrioritiesView(APIView):
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
    

class TasksStatusView(APIView):
    def get(self, request, *args, **kwargs):
        pending = Task.objects.filter(status="pending").count()
        in_progress = Task.objects.filter(status="in_progress").count()
        completed = Task.objects.filter(status="completed").count()
        on_hold = Task.objects.filter(status="on_hold").count()
        cancelled = Task.objects.filter(status="cancelled").count()

        response_data = {
            "pending": pending,
            "in_progress": in_progress,
            "completed": completed,
            "on_hold": on_hold,
            "cancelled": cancelled,
        }

        return Response(response_data)
