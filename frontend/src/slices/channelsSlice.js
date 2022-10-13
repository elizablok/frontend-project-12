import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoutes from '../routes';

export const fetchData = createAsyncThunk(
  'channels/fetchChannels',
  async (payload) => {
    const { data } = await axios.get(getRoutes.dataPath(), {
      headers: payload,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  isLoading: true,
  loadingError: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      const currentChannelId = payload;
      return { ...state, currentChannelId };
    },
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
    changeChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      const isLoading = true;
      const loadingError = null;
      return { ...state, isLoading, loadingError };
    }).addCase(fetchData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      const ids = channels.map(({ id }) => id);
      const entries = channels.map(({ id, name, removable }) => [id, { id, name, removable }]);
      const entities = Object.fromEntries(entries);
      const isLoading = false;
      const loadingError = null;
      return {
        ...state, ids, entities, isLoading, loadingError,
      };
    }).addCase(fetchData.rejected, (state, { error }) => {
      const isLoading = false;
      const loadingError = error;
      return { ...state, isLoading, loadingError };
    });
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channels);

const getChannels = (state) => selectors.selectAll(state);
const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getChannelById = (state, id) => selectors.selectById(state, id);
const getChannelsName = (state) => getChannels(state).map((channel) => channel.name);

const getLoading = (state) => state.channels.isLoading;
const getError = (state) => state.channels.loadingError;

export const {
  setChannels,
  setCurrentChannel,
  addChannel,
  deleteChannel,
  changeChannel,
} = channelsSlice.actions;

export {
  selectors,
  getChannels,
  getCurrentChannelId,
  getChannelById,
  getChannelsName,
  getLoading,
  getError,
};

export default channelsSlice.reducer;
