from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        completed = self.request.query_params.get('completed', None)
        order = self.request.query_params.get('order')
        priority = self.request.query_params.get('priority', None)

        # Filtrare după completed (finalizat/nefinalizat)
        if completed is not None:
            if completed.lower() in ['all', '']:
                pass
            else:
                completed = completed.lower() in ['true', '1', 'yes']
                queryset = queryset.filter(completed=completed)

        # Filtrare după priorități
        if priority:
            # priority poate fi o listă separată prin virgule (low,medium,high)
            priority_values = priority.split(',')
            queryset = queryset.filter(priority__in=priority_values)

        # Sortare
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
