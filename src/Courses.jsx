import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        function callback2(data) {
            setCourses(data.courses);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

export function Course(props) {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200
    }}>

        <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <img src={props.course.imageLink} style={{width: 300}} ></img>
    </Card>

}



export default Courses;