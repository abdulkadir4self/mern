const express = require('express');
const instructorSchema = require('../Schema/InstructorSchema');
const router = express.Router();


router.post('/'  , async (req,res)=>{
    let { insName , insSalary, insDesignation, insPhone, insEmail } = req.body;
try {
  const createInstructor = await  instructorSchema.create({
    name : insName,
    salary: insSalary,
    designation: insDesignation,
    phone: insPhone,
    email: insEmail,
  })
  res.json({
    status: 1,
    message: 'instructor created successfully',
    data: createInstructor,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'intructor could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allInstructor = await instructorSchema.find({});
    res.json({
      status:1,
      message: 'Instructor fetched Successfully',
      data: allInstructor,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching Instructor Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleInstructor = await instructorSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single Instructor fetched successfully',
    data: singleInstructor,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single Instructor fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deletedInstructor = await instructorSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'Instructor deleted successfully',
    data: deletedInstructor
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'employee could not be deleted ',
      data: null
    })  
  }
})


router.put('/:id' , async function(req,res){
  try {
    let { insName , insSalary, insDesignation, insPhone, insEmail } = req.body;
    let updatedInstructor = await instructorSchema.findByIdAndUpdate(req.params.id , {
    name : insName,
    salary: insSalary,
    designation: insDesignation,
    phone: insPhone,
    email: insEmail,
    } , {new: true} , {insert:true})
    res.json({
      status:1,
      message: 'Instructor updated successfully',
      data: updatedInstructor
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Instructor could not updated ',
      data: null
    })
  }
})




module.exports = router;