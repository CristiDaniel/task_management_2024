import { useState } from "react";
import useListOfTasks from "../hooks/useListOfTasks";

const AddTaskForm = () => {
    const {addTask, error, isError} = useListOfTasks()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low"
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previi trimiterea formularului către server
        console.log(formData); // Afișezi datele în consolă
        addTask(formData)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Task Title"
            />
            {/* {error.response.data['title'].length >=1 ? <div>{error.response.data['title']}</div> : ''} */}
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Task Description"
            ></textarea>
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
