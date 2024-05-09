import { fetchComments } from '@/state/comments/commentsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import CommentCard from './CommentCard';

const Comments = ({ reddit }) => {
  const { comments, error, status } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reddit.data.num_comments > 0) {
      const request = dispatch(fetchComments(reddit.data.permalink));

      return () => {
        request.abort();
      };
    }
  }, [dispatch, reddit.data.permalink, reddit.data.num_comments]);

  const renderContent = () => {
    if (status === 'loading') {
      return <BeatLoader />;
    }

    if (error) {
      return <p>There was an error loading the comments</p>;
    }

    return (
      <div className="space-y-4">
        {comments[reddit.data.name] ? (
          comments[reddit.data.name]?.map((comment) => {
            return (
              <CommentCard
                key={comment.data.id}
                author={comment.data.author}
                body={comment.data.body}
                createdUtc={comment.data.created_utc}
                replies={comment.data.replies && comment.data.replies}
              />
            );
          })
        ) : (
          <p className="italic my-4">No comments to show</p>
        )}
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default Comments;
