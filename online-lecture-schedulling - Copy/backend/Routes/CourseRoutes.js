const express = require('express');
const courseSchema = require('../Schema/CourseSchema.js');
const router = express.Router();
const upload = require('../middlewares/FileUploadMW.js');



router.post('/' ,upload.single('coursePic') ,async (req,res)=>{
    let { crsName , crsLevel, crsDescription, } = req.body;
try {
  const createCourse = await  courseSchema.create({
    name : crsName,
    level : crsLevel,
    description : crsDescription,
    coursePic : req.fileNewName,
  })
  res.json({
    status: 1,
    message: 'course created successfully',
    data: createCourse,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'course could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allCourse = await courseSchema.find({});
    res.json({
      status:1,
      message: 'Fetched course Successfully',
      data: allCourse,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching course Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleCourse = await courseSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single course fetched successfully',
    data: singleCourse,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single course fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deletedCourse = await courseSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'course deleted successfully',
    data: deletedCourse
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'course could not be deleted ',
      data: null
    })  
  }
})


router.put('/:id' , async function(req,res){
  try {
    let { crsName , crsLevel, crsDescription, } = req.body;
    let updatedCourse = await courseSchema.findByIdAndUpdate(req.params.id , {
        name : crsName,
        level : crsLevel,
        description : crsDescription,
    } , {new: true} , {insert:true})
    res.json({
      status:1,
      message: 'course updated successfully',
      data: updatedCourse
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'course could not updated ',
      data: null
    })
  }
})

module.exports = router;