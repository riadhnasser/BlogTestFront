import produce from 'immer';
import { FETCH_POST_ERROR, FTECH_POSTS_SUCCESS, SAVE_COMMENT_SUCCESS, SAVE_POST_SUCCESS } from './actions';

// The initial state of the App
export const initialState = {
  posts: [],
};

/* eslint-disable default-case, no-param-reassign */
const PostsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const {payload, postId} = action;
    switch (action.type) {
      case SAVE_POST_SUCCESS:
        draft.posts.unshift(payload);
        break;
      case FTECH_POSTS_SUCCESS:
        draft.posts = payload;
        break;
      case SAVE_COMMENT_SUCCESS:
        draft.posts.forEach(el => {
          el.commentsList = !el.commentsList ? []: el.commentsList;
          if (el && el.commentsList && el.id == postId) {
            el.commentsList.unshift(payload);
          }
        });
        break;
    }}

  );

export default PostsReducer;
