import { useState } from "react";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addLecture } from "../Redux/lectureSlice"; 

function AddLecture (){
const dispatch = useDispatch();


const [formData , updateFormdata] = useState({
  crseName: '',
 lectName : '',
 lectDate : '',
})

const handleChange = (e)=>{

    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const addLectureSubmit = (e)=>{
e.preventDefault();
const sendLectData = {
  lctCourseName : formData.crseName,
  lctLectureName : formData.lectName,
  lctDate : formData.lectDate
}
console.log(sendLectData);
dispatch( addLecture(sendLectData) );
updateFormdata({
  crseName: '',
  lectName : '',
  lectDate : '',
})
}


    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>AddLecture</h2>
        <form onSubmit={addLectureSubmit}>


    <div className="form-group">
    <label>Course Name</label>
    <input value={formData.crseName} type="text" className="form-control"  placeholder="Enter Course Name" name="crseName" onChange={handleChange} />
  </div>



  <div className="form-group">
    <label>Lecture Name</label>
    <input value={formData.lectName} type="text" className="form-control"  placeholder="Enter Lecture Name"  name="lectName" onChange={handleChange} />
  </div>

 <div className="form-group">
    <label>Date</label>
    <input value={formData.lectDate} type="date" className="form-control"  placeholder="Enter Date" name="lectDate" onChange={handleChange} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}


export default React.memo(AddLecture);