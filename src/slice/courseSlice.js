import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course: null,
    editCourse:false,
}

const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        setCourse(state,payload) {
            state.course = payload
        },
        setEditCourse(state,payload) {
            state.editCourse = payload
        }
    }
})

export const { setCourse,setEditCourse } = courseSlice.actions;
export default courseSlice.reducer