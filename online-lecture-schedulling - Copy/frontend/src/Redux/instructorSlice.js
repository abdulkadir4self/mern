import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
const URL = 'http://localhost:5005/api/v1/instructor';

const initialState = {
    success : false,
    instructor : [],
    message : '',
    InstructorAssigned : false,

}


//view instructor
export const viewInstructor = createAsyncThunk('instructor/viewInstructor' , async function(){
    const token = localStorage.getItem('_token'); 
    try {
        const response = await fetch( URL , {
            method : 'GET',
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; 
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

//checking instructor is present or not in mongoDB
export const checkInstructor = createAsyncThunk('instructor/checkInstructor' , async function(){
    const token = localStorage.getItem('_token'); 
    try {
        const response = await fetch( 'http://localhost:5005/api/v1/check' , {
            method : 'GET',
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return data; 
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers : {},

    extraReducers: function(builder){

       
              //check instructor
        builder.addCase(checkInstructor.pending , function(state){
           state.InstructorAssigned = false;
        });
        builder.addCase(checkInstructor.fulfilled , function(state , action){
            state.InstructorAssigned = true;
        });
        builder.addCase(checkInstructor.rejected , function(state , action){
            state.InstructorAssigned = false;
        });

   //view employee request
        builder.addCase(viewInstructor.pending , function(state){
            state.instructor = [];
            state.message = 'loading ...please wait.';
            state.success = false;
        });
        builder.addCase(viewInstructor.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.instructor = action.payload.data;//kyonki backend se data object ke andar real wala data hai.
            //yeh data ko hum redux mein store kar rhe hai. state.employee = action.payload.data; yeh line likhke
            state.message = 'lecture fetched successfully';
            state.success = true;
           }
           else{
            state.instructor = [];
            state.message = 'pls try again';
            state.success = false;
           }
        });
        builder.addCase(viewInstructor.rejected , function(state , action){
            state.instructor = [];
            state.message = 'pls try again. server error';
            state.success = false;
      
        });
        
    }
})


export default instructorSlice.reducer;























//create lecture
// export const addLecture = createAsyncThunk('lecture/addLecture' , async function(lectureData){
//     const token = localStorage.getItem('_token'); 
//     console.log(lectureData);
//     try {
//         const response = await fetch( URL , {
//             method : 'POST',
//             body: JSON.stringify(lectureData),
//             headers : {
//                 'Authorization' : token,
//                 'Content-Type' : 'application/json'
//             }
//         })


//         const data = await response.json();
//         console.log(data);
//         return data; 
//     } 
//     catch (error) {
//         console.log(error);
//         console.log('api error');
//     }
// })


//addlecture
        // builder.addCase(addLecture.pending , function(state){
        //     state.message = 'please wait. we are adding lecture';
        //     state.success = false;
        // });
        // builder.addCase(addLecture.fulfilled , function(state , action){
        //     state.message = 'lecture added successfully';
        //     state.success = true;
        // });
        // builder.addCase(addLecture.rejected , function(state , action){
        //     state.message = 'lecture could not added successfully';
        //     state.success = false;
        // });