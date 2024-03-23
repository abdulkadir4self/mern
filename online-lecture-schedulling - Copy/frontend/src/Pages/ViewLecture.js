import React,{useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux";
import { editLecture, viewLecture } from '../Redux/lectureSlice';
import {useNavigate} from 'react-router';
import {storeLectureId} from '../Redux/lectureSlice';

function ViewLecture(){
    const navigate = useNavigate();
    const lectureSlice = useSelector((state)=>{
        return state.lectureSlice
    })

    // const instructorSlice = useSelector((state)=>{
    //     return state.instructorSlice
    // })
    const dispatch = useDispatch();

    useEffect(function(){
        dispatch( viewLecture() )
    }, [])
    return(<>
        <div className='mt-5 p-4'>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Lecture Name</th>
                        <th>Date</th>
                        <th>Actions</th>
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
                                <button onClick={
                                    (e)=>{
                                        navigate(`/viewinst/${lecture._id}/${lecture.date}`)
                                    }
                                }
                                 className='btn btn-warning mr-2'>
                                    Assign
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

export default React.memo(ViewLecture)