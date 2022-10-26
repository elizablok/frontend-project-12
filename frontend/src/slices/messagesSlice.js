import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.remove, (state, action) => {
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

export const messagesSelectors = {
  ...selectors,
};

export const messagesActions = { ...messagesSlice.actions };

export default messagesSlice.reducer;
