import { useState } from "react";
import useListOfTasks from "../hooks/useListOfTasks";
import { toast } from "react-toastify";

const AddTaskForm = () => {
    const {addTask, error, isError} = useListOfTasks()
    const [formData, setFormData] = useState({
        title: "",
        priority: "low"
    });
    const {title} = formData;

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault(); 
        if(title.trim() === '') {
            toast.error('Task-ul trebuie sa aiba o denumire.')
            return;
        }
        addTask(formData)
        resetForm()
    };

    function resetForm() {
        setFormData({
            title: "",
            priority: "low"
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Task Title"
            />
            <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            
            <input type="submit" value="Add Task" />
        </form>
    );
};

export default AddTaskForm;
