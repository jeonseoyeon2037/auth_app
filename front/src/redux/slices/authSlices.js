import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_REGISTER_API_URL, POST_LOGIN_API_URL } from '../../utils/apiUrl';
import { postRequest, postFormRequest } from '../../utils/methods';

const postRegisterRequest = (actionType, apiUrl) => {
  // rejectWithValue는 에러 시 상태 코드와 메시지를 포함한 값을 가짐
  return createAsyncThunk(actionType, async (postData, { rejectWithValue }) => {
    try {
      const options = {
        method: 'POST',
        body: postData,
      };

      const response = await postFormRequest(apiUrl, options);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  });
};

export const fetchRegister = postRegisterRequest(
  'fetchRegister',
  POST_REGISTER_API_URL
);

const postLoginRequest = (actionType, apiUrl) => {
  return createAsyncThunk(actionType, async (postData, {rejectWithValue}) => {
    try {
      const options = {
        body: JSON.stringify(postData)
      }
      const response = await postRequest(apiUrl, options);
      return response;

    } catch (error) {
      return rejectWithValue(error);
    }
  })
};

export const fetchLogin = postLoginRequest(
  'fetchLogin',
  POST_LOGIN_API_URL
);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // 응답 데이터
};

const handleRejected = (state, action) => {
  state.isError = true;
  state.errorMessage = action.payload?.msg || 'Error Occured';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    postRegisterStatus: null,
    postLoginRequest: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, handleFulfilled('postRegisterStatus'))
      .addCase(fetchRegister.rejected, handleRejected)
      .addCase(fetchLogin.fulfilled, handleFulfilled('postLoginStatus'))
      .addCase(fetchLogin.rejected, handleRejected);
  },
});


export default authSlice.reducer;
