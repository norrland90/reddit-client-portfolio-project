import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SubRedditButton from './SubredditButton';
import { useEffect } from 'react';
import { fetchSubreddits } from '@/state/subreddits/subredditsSlice';
import { useDispatch, useSelector } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';

const SubredditsList = ({ setMenuOpen }) => {
  const { subreddits, error, status } = useSelector(
    (state) => state.subreddits
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const request = dispatch(fetchSubreddits());

    return () => {
      request.abort();
    };
  }, [dispatch]);

  const renderContent = () => {
    if (status === 'loading') {
      return <BeatLoader />;
    }

    if (error) {
      return <p>There was an error loading subreddit links</p>;
    }

    return subreddits.map((subreddit) => {
      return (
        <SubRedditButton
          key={subreddit.data.id}
          name={subreddit.data.display_name_prefixed}
          iconUrl={subreddit.data.icon_img}
          setMenuOpen={setMenuOpen}
        />
      );
    });
  };

  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle>Subreddits</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-2">{renderContent()}</CardContent>
    </Card>
  );
};

export default SubredditsList;
