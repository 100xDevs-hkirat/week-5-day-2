import { Card } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

function Course() {
    let { courseId } = useParams();
    console.log("hi there from course")

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
    
    let course = null;
    for (let i = 0; i<courses.length; i++) {
        if (courses[i].id == courseId) [
            course = courses[i]
        ]
    }

    if (!course) {
        return <div>
            Loading....
        </div>
    }

    return <div>
        <CourseCard course={course} />
        <UpdateCard courses={courses} course={course} setCourses={setCourses} />
    </div>
}

function UpdateCard(props) {
    console.log("hi there from update card")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const course = props.course;

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{width: 400, padding: 20}}>
    <Typography>Update course details</Typography>
    <TextField
        onChange={(e) => {
            setTitle(e.target.value)
        }}
        fullWidth={true}
        label="Title"
        variant="outlined"
    />

    <TextField
        onChange={(e) => {
            setDescription(e.target.value)
        }}
        fullWidth={true}
        label="Description"
        variant="outlined"
    />

    <TextField
        onChange={(e) => {
            setImage(e.target.value)
        }}
        fullWidth={true}
        label="Image link"
        variant="outlined"
    />

    <Button
        size={"large"}
        variant="contained"
        onClick={() => {
            function callback2(data) {
                let updatedCourses = [];
                for (let i = 0; i<props.courses.length; i++) {
                    
                    if (props.courses[i].id == course.id) {
                        updatedCourses.push({
                            id: course.id,
                            title: title,
                            description: description,
                            imageLink: image
                        })
                    } else {
                        updatedCourses.push(props.courses[i]);
                    }
                }
                props.setCourses(updatedCourses);
            }
            function callback1(res) {
                res.json().then(callback2)
            }
            fetch("http://localhost:3000/admin/courses/" + course.id, {
                method: "PUT",
                body: JSON.stringify({
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(callback1)
        }}
    > Update course</Button>
    </Card>
</div>
}

function CourseCard(props) {
    console.log("hi there from update card")
    const course = props.course;
    return <div style={{display: "flex", justifyContent: "center"}}>
     <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200
    }}>

        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
    </Card>
    </div>
}

export default Course;