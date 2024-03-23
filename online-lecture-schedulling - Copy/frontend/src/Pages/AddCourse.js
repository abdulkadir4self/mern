import { useState } from "react";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addCourse } from "../Redux/courseSlice";
function AddCourse (){
const dispatch = useDispatch();
const [image , saveImage] = useState(null);

const [formData , updateFormdata] = useState({
  name: '',
 level: '',
 description: '',
})

const handleChange = (e)=>{
  
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const addCourseSubmit = (e)=>{
e.preventDefault();
const fd = new FormData();
fd.append('crsName' , formData.name);
fd.append('crsLevel' , formData.level);
fd.append('crsDescription' , formData.description); 
fd.append('coursePic' , image); 
dispatch( addCourse(fd) );
updateFormdata({
    name: '',
    level: '',
 description: '',
})
}


    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>AddCourse</h2>
        <form onSubmit={addCourseSubmit}>


    <div className="form-group">
    <label>Name</label>
    <input value={formData.name} type="text" className="form-control"  placeholder="Enter Name" name="name" onChange={handleChange} />
  </div>



  <div className="form-group">
    <label>Level</label>
    <input value={formData.level} type="text" className="form-control"  placeholder="Enter Level"  name="level" onChange={handleChange} />
  </div>

 <div className="form-group">
    <label>Description</label>
    <input value={formData.description} type="text" className="form-control"  placeholder="Enter Description" name="description" onChange={handleChange} />
  </div>


  <div className="form-group">
    <label>Image</label>
    <input type="file" className="form-control" name="image" onChange={(e)=>{
      console.log(e.target.files);
      saveImage(e.target.files[0]);
    }}    />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default React.memo(AddCourse);