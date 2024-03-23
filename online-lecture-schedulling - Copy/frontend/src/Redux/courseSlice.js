import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
const URL = 'http://localhost:5005/api/v1/course';

const initialState = {
    success : false,
    course: [],
    message : '',

}


//create course
export const addCourse = createAsyncThunk('course/addCourse' , async function(courseData){
    const token = localStorage.getItem('_token'); 
    console.log(courseData);
    try {
        const response = await fetch( URL , {
            method : 'POST',
            body: courseData,
            headers : {
                'Authorization' : token
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


const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers : {
        clearcourse : function(state , action){
            state.employee = [];
        },
        clearMessage : function(state , action){
            state.message = '';
        }
    },
    extraReducers: function(builder){
        //addcourse
        builder.addCase(addCourse.pending , function(state){
            state.message = 'please wait. we are adding employee';
            state.success = false;
        });
        builder.addCase(addCourse.fulfilled , function(state , action){
            state.message = 'employee added successfully';
            state.success = true;
        });
        builder.addCase(addCourse.rejected , function(state , action){
            state.message = 'employee could not added successfully';
            state.success = false;
        });

        
    }
})



const {clearcourse , clearMessage} = courseSlice.actions;
export default courseSlice.reducer;