import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getRoutes from '../routes';
import mappingLoadingState from '../mappingStates';

export const fetchData = createAsyncThunk(
  'channels/fetchChannels',
  (payload) => axios.get(getRoutes.dataPath(), {
    headers: payload,
  })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    }),
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  loading: {
    state: mappingLoadingState.initial,
    error: null,
  },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrent(state, { payload }) {
      return { ...state, currentChannelId: payload };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    add: channelsAdapter.addOne,
    remove: channelsAdapter.removeOne,
    update: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      const loading = {
        state: mappingLoadingState.pending,
        error: null,
      };
      return { ...state, loading };
    }).addCase(fetchData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      channelsAdapter.setAll(state, channels);
      const loading = {
        state: mappingLoadingState.done,
        error: null,
      };
      state.loading = loading; // eslint-disable-line
    }).addCase(fetchData.rejected, (state, { error }) => {
      const loading = {
        state: mappingLoadingState.failed,
        error,
      };

      return { ...state, loading };
    });
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const channelsSelectors = {
  ...selectors,
  selectCurrentId: (state) => state.channels.currentChannelId,
  selectNames: (state) => selectors.selectAll(state).map((channel) => channel.name),
  selectLoadingState: (state) => state.channels.loading.state,
  selectLoadingError: (state) => state.channels.loading.error,
  isLoading: (state) => state.channels.loading.state === mappingLoadingState.pending,
};

export const channelsActions = {
  ...channelsSlice.actions,
};

export default channelsSlice.reducer;
