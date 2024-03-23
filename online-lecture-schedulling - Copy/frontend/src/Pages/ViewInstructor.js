import React,{useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux";
import { viewInstructor } from '../Redux/instructorSlice'; 
import { editLecture } from '../Redux/lectureSlice';
import {useNavigate, useParams} from 'react-router';
import { checkInstructor } from '../Redux/instructorSlice';
function ViewInstructor(){
    const navigate = useNavigate();
    const params = useParams();
    const lectureDate = params.date
    
    const instructorSlice = useSelector((state)=>{
        return state.instructorSlice
    })

    const InstructorAssigned = useSelector((state)=>{
        return state.instructorSlice.isAssigned
    })


    const dispatch = useDispatch();

    useEffect(function(){
        dispatch( viewInstructor() )
    }, [])


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
                { instructorSlice.instructor.map(function(instructor,index){
                    return (
                        <tr key={index}>
                            <td>{instructor.name}</td>
                            <td>{instructor.salary}</td>
                            <td>{instructor.designation}</td>
                            <td>{instructor.phone}</td>
                            <td>{instructor.email}</td>

                            <td>
                                <button onClick={
                                    (e)=>{
                                        const editLectureData ={
                                            lectureID : params.id,
                                            lctInstructor : instructor._id,  
                                        }
                                        dispatch(editLecture(editLectureData));
                                        dispatch(checkInstructor())
                                    }
                                }
                                 className='btn btn-warning mr-2'>
{InstructorAssigned ? <p>assign</p> : <p>assigned</p>}

                                </button>

                            </td>


                        </tr>
                    )
                }) }

                </tbody>
            </table>
        </div>
    
    </>)
}

export default React.memo(ViewInstructor)