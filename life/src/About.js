import React from "react";

const About = () => {

    return  (
        <div style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-evenly",
            backgroundColor: "#e8e8e8"
        }}>

        <div>
            <h2 style={{textAlign: "center"}}>Conway's Rules for Birth</h2>
            <h3>Each dead cell adjacent to exactly three live neighbors will become live in the next generation.</h3>
        </div>

        <div>
            <h2>Conway's Rules for Death</h2>
            <h3>Each live cell with one or fewer live neighbors will die in the next generation.</h3>
        </div>

        </div>
    )
}

export default About;