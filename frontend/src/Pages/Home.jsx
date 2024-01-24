import React, { useState } from 'react';
import ProjectCard from '../Components/ProjectCard/ProjectCard';
import { uploadFile } from '../Services/Api/api';

const projectData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 1',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 2',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 3',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 4',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 5',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 6',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 7',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 8',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 9',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 10',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 11,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 11',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
    {
        id: 12,
        image: 'https://images.unsplash.com/photo-1541363111435-5c1b7d867904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Your Amazing Project 12',
        dev: 'Sandeela Shameen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, corrupti eligendi ut odit impedit obcaecati fuga consequatur soluta sint nihil. Ducimus qui pariatur nulla corrupti ut ullam libero dignissimos ipsam expedita. Porro ipsum doloribus aut asperiores accusamus laborum, consectetur voluptatum possimus provident cum doloremque exercitationem ipsam nemo unde maiores dolores temporibus libero reiciendis repudiandae. Molestiae eum assumenda quia molestias deserunt? Suscipit cupiditate, provident vero ex nisi odio nostrum qui vel eaque placeat inventore officiis, aspernatur blanditiis fugit magnam, quae beatae corporis necessitatibus dolore maiores aliquam ut! Molestiae, doloribus reiciendis commodi ut beatae sit, quaerat harum quae cupiditate dolor nisi?',
        url: 'https://google.com'
    },
];

function Home() {
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setFormData] = useState({
        projectName: '',
        projectImage: null,
        projectDescription: '',
        projectUrl: '',
        developerName: '',
    });

    const [formErrors, setFormErrors] = useState({});

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

    const handleSubmit = async (e) => {
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
            // Use the uploadFile function to handle the form submission
            await uploadFile(formData);
    
            console.log('Form submitted with data:', formData);
            // Reset form data and errors after submission (optional)
            setFormData({
                projectName: '',
                projectImage: null,
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
                                <h2 className="secHeading">
                                    Welcome, Sandeela Shameen
                                </h2>
                                <button onClick={() => setIsVisible(!isVisible)} className='themeBtn'>
                                    Add Project
                                </button>
                            </div>
                        </div>
                        {projectData.map((project, index) => (
                            <div className="col-md-4" key={index}>
                                <ProjectCard
                                    image={project.image}
                                    title={project.title}
                                    dev={project.dev}
                                    description={project.description}
                                    url={project.url}
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
                                <label htmlFor="projectImage">Upload Project Image</label>
                                <input
                                    type="file"
                                    id="projectImage"
                                    onChange={handleImageUpload}
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
