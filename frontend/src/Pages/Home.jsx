import React, { useEffect, useState } from 'react';
import ProjectCard from '../Components/ProjectCard/ProjectCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        projectName: '',
        projectImageURL: '', // Change to projectImageURL
        projectDescription: '',
        projectUrl: '',
        developerName: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [projectData, setProjectData] = useState([]);

    const addProject = async (newProject) => {
        try {
            // Get the authentication token from your authentication logic
            const authToken = localStorage.getItem('authToken');

            // Make a POST request to add a new project with the authentication token
            await axios.post('http://localhost:5000/api/addProject', newProject, {
                headers: {
                    Authorization: authToken,
                },
            });

            // Fetch all projects after adding a new one
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error.message);
            // Handle error adding project
        }
    };

    const fetchProjects = async () => {
        try {
            // Make a GET request to fetch all projects
            const response = await axios.get('http://localhost:5000/api/getAllProjects');
            // Update the state with the fetched projects
            setProjectData(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            // Handle error fetching projects
        }
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        // Generate a unique name for the image
        const imageName = `${Date.now()}-${file.name}`;

        setFormData({
            ...formData,
            projectImage: {
                file,
                name: imageName,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        const errors = {};
        if (!formData.projectName.trim()) {
            errors.projectName = 'Project name is required';
        }
        if (!formData.developerName.trim()) {
            errors.developerName = 'Developer name is required';
        }

        if (Object.keys(errors).length > 0) {
            // Set validation errors and prevent form submission
            setFormErrors(errors);
            return;
        }

        try {
            // Add the new project to the projectData array
            addProject({
                id: projectData.length + 1,
                image: formData.projectImageURL, // Change to projectImageURL
                title: formData.projectName,
                developerName: formData.developerName,
                description: formData.projectDescription,
                url: formData.projectUrl,
            });

            console.log('Form submitted with data:', formData);
            // Reset form data and errors after submission (optional)
            setFormData({
                projectName: '',
                projectImageURL: '', // Change to projectImageURL
                projectDescription: '',
                projectUrl: '',
                developerName: '',
            });
            setFormErrors({});
        } catch (error) {
            // Handle API request errors
            console.error('Error submitting form:', error.message);
            // You can set an error state or display a user-friendly error message
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                const response = await axios.get('http://localhost:5000/api/currentUser', {
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Set the currentUser state with the user data
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error.message);
                // Handle error fetching current user
            }
        };

        fetchCurrentUser();
    }, []);


    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint
            await axios.post('http://localhost:5000/api/logout');

            // Remove the authentication token from localStorage
            localStorage.removeItem('authToken');

            // Perform any client-side logout logic, e.g., redirect to login page
            navigate('/');
            // Example: history.push('/login');

        } catch (error) {
            console.error('Error during logout:', error.message);
            // Handle logout error, e.g., display a message to the user
        }
    };
    useEffect(() => {
        // Fetch all projects when the component mounts
        fetchProjects();
    }, []);
    return (
        <>
            <section className='projectSec'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="mainHeading">
                                Project Sharing Application
                            </h1>
                            <div className="headerBar">
                                {currentUser && (
                                    <h2 className="secHeading">
                                        Welcome, {currentUser.firstName} {currentUser.lastName}
                                    </h2>
                                )}
                                <button onClick={() => setIsVisible(!isVisible)} className='themeBtn'>
                                    Add Project
                                </button>
                                <button onClick={handleLogout} className='themeBtn'>
                                    Logout
                                </button>
                            </div>
                        </div>
                        {projectData.map((project, index) => (
                            <div className="col-md-4" key={index}>
                                <ProjectCard
                                    image={project.image} // Update to project.projectImageURL
                                    title={project.title} // Update to project.projectName
                                    dev={project.developerName}
                                    description={project.description} // Update to project.projectDescription
                                    url={project.url} // Update to project.projectUrl
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isVisible && (
                <div className="backdrop">
                    <div className="addProject">
                        <button
                            className='dismissBtn'
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            X
                        </button>
                        <h2 className="secHeading">Add Your Project</h2>
                        <form onSubmit={handleSubmit} className="addProjectForm">
                            <div className="inputCont">
                                <label htmlFor="projectName">Enter Project Name</label>
                                <input
                                    type="text"
                                    id="projectName"
                                    placeholder="Project Name"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                />
                                {formErrors.projectName && <span className="error">{formErrors.projectName}</span>}
                            </div>
                            <div className="inputCont">
                                <label htmlFor="projectImage">Upload Project Image URL</label>
                                <input
                                    type="text"
                                    id="projectImageURL"
                                    placeholder="Project Image URL"
                                    value={formData.projectImageURL}
                                    onChange={(e) => setFormData({ ...formData, projectImageURL: e.target.value })}
                                />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="projectDescription">Enter Project Description</label>
                                <textarea
                                    id="projectDescription"
                                    rows="5"
                                    placeholder="Project Description"
                                    value={formData.projectDescription}
                                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="inputCont">
                                <label htmlFor="projectUrl">Enter Project Url</label>
                                <input
                                    type="text"
                                    id="projectUrl"
                                    placeholder="Project Url"
                                    value={formData.projectUrl}
                                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="developerName">Enter Developer Name</label>
                                <input
                                    type="text"
                                    id="developerName"
                                    placeholder="Developer Name"
                                    value={formData.developerName}
                                    onChange={(e) => setFormData({ ...formData, developerName: e.target.value })}
                                />
                                {formErrors.developerName && <span className="error">{formErrors.developerName}</span>}
                            </div>
                            <button type="submit" className="themeBtn mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
