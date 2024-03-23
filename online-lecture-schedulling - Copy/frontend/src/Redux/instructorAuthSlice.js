import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    token: null,
    user: {},
    message : '',
    success : false,
    loginSuccess : false,
    loginMessage : '',
}

export const instructorRegister = createAsyncThunk('instructorAuth/instructorRegister' , async function(registerformData){
    try {
        const registerResponse = await fetch('http://localhost:5005/api/v1/instructorRegister' , {
            method : 'POST',
            body: JSON.stringify(registerformData),
            headers : {
                'Content-Type' : 'application/json'
            }
        })


        const registerResponseData = await registerResponse.json();
        console.log(registerResponseData);
        return registerResponseData;
    } 
    catch (error) {
        console.log(error);
        console.log('api error');
    }
})


export const instructorLoginAction = createAsyncThunk('instructorAuth/instructorLoginAction' , async function(loginData){
    try {
        const response = await fetch('http://localhost:5005/api/v1/instructorLogin' , {
            method : 'POST',
            body: JSON.stringify(loginData),
            headers : {
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


const instructorAuthSlice = createSlice({
    name: 'instructorAuth',
    initialState,
    reducers:{
        logout : function(state){
            state.token = null;
            state.isLoggedIn = false;
            state.user = {};
            state.message = '';
        },
        login : function(state , action){
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.user = action.payload.user;
        }
    },
    extraReducers: function(builder){
        builder.addCase(instructorRegister.pending , function(state){
            state.message = 'please wait...';
            state.success = false;
        });
        
        builder.addCase(instructorRegister.fulfilled , function(state , action){
            state.message = 'user resgistered successfully';
            state.success = true;
        });

        builder.addCase(instructorRegister.rejected , function(state , action){
            state.message = 'failed to register';
            state.success = false;
        });


        // login starts here
        builder.addCase(instructorLoginAction.pending , function(state){
            state.loginMessage = 'please wait...';
            state.loginSuccess = false;
            state.isLoggedIn = false;
        });
        
        builder.addCase(instructorLoginAction.fulfilled , function(state , action){
            if(action.payload.status == 1){
                state.loginMessage = 'user logged in successfully';
            state.loginSuccess = true;
            state.token = action.payload.token;
            console.log(action.payload);
            localStorage.setItem('_token' , state.token);
            state.isLoggedIn = true;
            }
            else{
            state.loginMessage = 'failed to login';
            state.loginSuccess = false;
            state.isLoggedIn = false;

            }
        });

        builder.addCase(instructorLoginAction.rejected , function(state , action){
            state.loginMessage = 'failed to login';
            state.loginSuccess = false;
            state.isLoggedIn = false;

        });
    }

    
})


export const {login , logout  } = instructorAuthSlice.actions;
export default instructorAuthSlice.reducer;