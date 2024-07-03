import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSearch: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchShow: (state) => {
            state.showSearch = true;
        },
        searchHide: (state) => {
            state.showSearch = false;
        },
    },
});

export const { searchShow, searchHide } = searchSlice.actions;
export default searchSlice.reducer;
