import { toast } from 'react-toastify';

export const SAVE_POST = 'post/save_post';
export const SAVE_POST_SUCCESS = 'post/save_post_success';
export const SAVE_POST_ERROR = 'post/save_post_error';

export const FTECH_POSTS = 'post/fetch_posts';
export const FTECH_POSTS_SUCCESS = 'post/fetch_posts_success';
export const FETCH_POSTS_ERROR = 'post/fetch_posts_error';

export const SAVE_COMMENT = 'post/save_comment';
export const SAVE_COMMENT_SUCCESS = 'post/save_comment_success';
export const SAVE_COMMENT_ERROR = 'post/save_comment_error';


export function savePost(newPost) {
  return {
    types: [SAVE_POST, SAVE_POST_SUCCESS, SAVE_POST_ERROR],
    promise: client => client.post('/post', newPost),
    afterError: () => {
      toast.error('Erreur');
    },
    afterSuccess: () => {
      toast.success('Post créé avec succés');
    }
  };
}

export function fetchPosts() {
  return {
    types: [FTECH_POSTS, FTECH_POSTS_SUCCESS, FETCH_POSTS_ERROR],
    promise: client => client.get('/posts'),
  };
}

export function saveComment(newComment, postId) {
  return {
    types: [SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_ERROR],
    promise: client => client.post('/comment', newComment),
    postId,
    afterError: () => {
      toast.error('Erreur');
    },
    afterSuccess: () => {
      toast.success('Commentaire ajouté avec succés');
    }
  };
}
