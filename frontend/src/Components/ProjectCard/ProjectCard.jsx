import React from 'react'

function ProjectCard({ image, title, dev, description, url }) {
    return (
        <div className="projectCard">
            <div className="imgContainer">
                <img src={image} alt="" />
            </div>
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="projectCardFooter">
                <a href={url}>{url}</a>
                <h6>{dev}</h6>
            </div>
        </div>
    )
}

export default ProjectCard