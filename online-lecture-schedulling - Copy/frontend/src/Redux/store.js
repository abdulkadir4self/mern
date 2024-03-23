import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseSlice from "./courseSlice";
import lectureSlice from "./lectureSlice";
import instructorSlice from "./instructorSlice";
import instructorAuthSlice from "./instructorAuthSlice";

const store = configureStore({
    reducer:{
        authSlice,
        courseSlice,
        lectureSlice,
        instructorSlice,
        instructorAuthSlice,
    }
})

export default store;
