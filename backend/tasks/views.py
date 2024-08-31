from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

# class TaskListCreateView(generics.ListCreateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        completed = self.request.query_params.get('completed', None)
        description = self.request.query_params.get('description', None)

        if completed is not None:
            completed = completed.lower() in ['true', '1', 'yes']
            queryset = queryset.filter(completed=completed)

        if description is not None:
            queryset = queryset.filter(description__icontains=description)

        queryset = queryset.order_by('-created_at')

        return queryset

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
