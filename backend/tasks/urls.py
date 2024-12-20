from django.urls import path
from .views import TaskListCreateView, TaskDetailView, TasksPrioritiesView, TasksStatusView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/count-priorities', TasksPrioritiesView.as_view(), name='tasks-priorities'),
    path('tasks/count-status', TasksStatusView.as_view(), name='tasks-status'),
]
