import { useDispatch, useSelector } from 'react-redux';
import RedditCard from './RedditCard';
import { useEffect } from 'react';
import { fetchReddits, getFilteredReddits } from '@/state/reddits/redditsSlice';
import { BeatLoader } from 'react-spinners';

const RedditList = () => {
  const { selectedSubreddit, error, status } = useSelector(
    (state) => state.reddits
  );
  const reddits = useSelector(getFilteredReddits);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = dispatch(fetchReddits(selectedSubreddit));

    return () => {
      request.abort();
    };
  }, [dispatch, selectedSubreddit]);

  const renderContent = () => {
    if (status === 'loading') {
      return <BeatLoader />;
    }

    if (error) {
      return <p>There was an error loading the reddits</p>;
    }

    return reddits.map((reddit) => {
      return <RedditCard key={reddit.data.id} reddit={reddit} />;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{selectedSubreddit}</h2>
      {renderContent()}
    </div>
  );
};

export default RedditList;
