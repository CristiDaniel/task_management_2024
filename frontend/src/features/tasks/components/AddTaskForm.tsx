import { useState } from "react";
import useListOfTasks from "../hooks/useListOfTasks";
import PrioritySelector from "./PrioritySelector";

const AddTaskForm = () => {
    const {addTask, error, isError} = useListOfTasks()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low"
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault(); // Previi trimiterea formularului către server
        addTask(formData)
        resetForm()
    };

    function resetForm() {
        setFormData({
            title: "",
            description: "",
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
