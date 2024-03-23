import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
const URL = 'http://localhost:5005/api/v1/lecture';

const initialState = {
    success : false,
    lecture : [],
    message : '',
    isAssigned : false,
    // lectureID : ''
}


//create lecture
export const addLecture = createAsyncThunk('lecture/addLecture' , async function(lectureData){
    const token = localStorage.getItem('_token'); 
    console.log(lectureData);
    try {
        const response = await fetch( URL , {
            method : 'POST',
            body: JSON.stringify(lectureData),
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

//view lectures
export const viewLecture = createAsyncThunk('lecture/viewLecture' , async function(){
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


//edit employee
export const editLecture = createAsyncThunk('lecture/editLecture' , async function(editLectureData){
    console.log(editLecture);
    const token = localStorage.getItem('_token');
    try {
        
        const response = await fetch( `${URL}/${editLectureData.lectureID}` , {
            method : 'PUT',
            body: JSON.stringify(editLectureData), 
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        })


        const data = await response.json();
        console.log(data);
        return {data};
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})


const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers : {
        storeLectureId : function(state , action){
            // state.lectureID = action.payload;
            console.log(action.payload);
        },
        clearMessage : function(state , action){
            state.message = '';
        }
    },
    extraReducers: function(builder){
        //addlecture
        builder.addCase(addLecture.pending , function(state){
            state.message = 'please wait. we are adding lecture';
            state.success = false;
        });
        builder.addCase(addLecture.fulfilled , function(state , action){
            state.message = 'lecture added successfully';
            state.success = true;
        });
        builder.addCase(addLecture.rejected , function(state , action){
            state.message = 'lecture could not added successfully';
            state.success = false;
        });



        //view employee request
        builder.addCase(viewLecture.pending , function(state){
            state.lecture = [];
            state.message = 'loading ...please wait.';
            state.success = false;
            state.isAssigned = false
        });
        builder.addCase(viewLecture.fulfilled , function(state , action){
           if(action.payload.status == 1){
            state.lecture = action.payload.data;
            state.message = 'lecture fetched successfully';
            state.success = true;
            state.isAssigned = true
           }
           else{
            state.employee = [];
            state.message = 'pls try again';
            state.success = false;
            state.isAssigned = false
           }
        });
        builder.addCase(viewLecture.rejected , function(state , action){
            state.lecture = [];
            state.message = 'pls try again. server error';
            state.success = false;
            state.isAssigned = false
        });

        // edit lecture
        builder.addCase(editLecture.pending , function(state){
             
                        state.message = 'getting lecture ...please wait.';
                        state.success = false;
                        state.isAssigned = false
                    });
                    builder.addCase(editLecture.fulfilled , function(state , action){
                       if(action.payload.status == 1){

                        state.message = 'got lecture  successfully';
                        state.success = true;
                        state.isAssigned = true
                       }
                       else{
                        state.message = 'pls try again';
                        state.success = false;
                        state.isAssigned = false
                       }
                    });
                    builder.addCase(editLecture.rejected , function(state , action){
                        state.message = 'pls try again. server error';
                        state.success = false;
                        state.isAssigned = false
                    });
               
                
        
    }
})



export const  {storeLectureId , clearMessage} = lectureSlice.actions;
export default lectureSlice.reducer;