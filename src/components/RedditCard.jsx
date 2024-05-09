import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiaComments } from 'react-icons/lia';
import { formatDistanceToNow } from 'date-fns';
import VoteReddit from './VoteReddit';
import { useState } from 'react';
import Comments from './Comments';

const RedditCard = ({ reddit }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card>
      <CardHeader className="px-4 py-2">
        <CardDescription className="flex justify-between mb-2">
          <span>u/{reddit.data.author}</span>
          <span>
            {formatDistanceToNow(new Date(reddit.data.created_utc * 1000))} ago
          </span>
        </CardDescription>
        <CardTitle>{reddit.data.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2 rounded-lg">
        {reddit.data.url && (
          <div className="bg-neutral-100 rounded-lg">
            <img
              className="max-w-[22rem] sm:max-w-[30rem] md:max-w-[35rem] lg:max-w-[40rem] mx-auto"
              src={reddit.data.url}
              alt=""
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-4 px-4 py-2">
        <div className="flex gap-2 items-center rounded-full border border-input">
          <VoteReddit score={reddit.data.score} />
        </div>
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => setShowComments(!showComments)}
        >
          <LiaComments className="text-xl" />
          {reddit.data.num_comments}
        </Button>
      </CardFooter>
      {showComments && (
        <CardContent className="px-4 py-2 mt-2">
          <Comments reddit={reddit} />
        </CardContent>
      )}
    </Card>
  );
};

export default RedditCard;
