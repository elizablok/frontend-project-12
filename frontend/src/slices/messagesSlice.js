import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, deleteChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const filteredMessages = Object.values(state.entities)
        .filter(({ channelId }) => channelId === action.payload)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, filteredMessages);
    }).addCase(fetchData.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      messagesAdapter.setAll(state, messages);
    });
  },
});

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const getMessages = (state) => selectors.selectAll(state);

export { selectors, getMessages };

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
