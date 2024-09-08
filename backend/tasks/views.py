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
        order = self.request.query_params.get('order')


        # Filter phase
        if completed is not None:
            if completed.lower() in ['all', '']:
                pass
            else:
                completed = completed.lower() in ['true', '1', 'yes']
                queryset = queryset.filter(completed=completed)


        # Order phase
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
