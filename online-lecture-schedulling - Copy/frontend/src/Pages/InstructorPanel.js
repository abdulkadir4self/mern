import React,{useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux";
import { viewInstructor } from '../Redux/instructorSlice'; 
import {viewLecture} from '../Redux/lectureSlice';
import {useNavigate, useParams} from 'react-router';
import { checkInstructor } from '../Redux/instructorSlice';

function InstructorPanel(){
    const navigate = useNavigate();
    const params = useParams();
    const lectureDate = params.date
    
    const instructorSlice = useSelector((state)=>{
        return state.instructorSlice
    })

    const lectureSlice = useSelector((state)=>{
        return state.lectureSlice
    })


    const dispatch = useDispatch();

    useEffect(function(){
        dispatch( viewInstructor() )
        dispatch( viewLecture() )
    }, [])

console.log(instructorSlice.instructor);
console.log(params.id.replace(':' , ""));
console.log(lectureSlice.lecture);
    return(<>
        <div className='mt-5 p-4'>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Designation</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                   
                { 
  instructorSlice.instructor.filter(function(instructor) {
    return instructor.email.toString() == params.id.replace(':' , "");
  }).map(function(instructor, index) {
    return (
      <tr key={index}>
        <td>{instructor.name}</td>
        <td>{instructor.salary}</td>
        <td>{instructor.designation}</td>
        <td>{instructor.phone}</td>
        <td>{instructor.email}</td>
      </tr>
    );
  })
}

                </tbody>
            </table>
        </div>
    

        <div className='mt-5 p-4'>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Lecture Name</th>
                        <th>Date</th>

                    </tr>
                </thead>
                <tbody>
                { lectureSlice.lecture.map(function(lecture,index){
                    return (
                        <tr key={index}>
                            <td>{lecture.courseName}</td>
                            <td>{lecture.lectureName}</td>
                            <td>{lecture.date}</td>
                            <td>
                            </td>

                        </tr>
                    )
                }) }

                </tbody>
            </table>
        </div>
    
    </>)
}

export default React.memo(InstructorPanel);