import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { formatDistanceToNow } from 'date-fns';

const ReplyCard = ({ author, body, createdUtc, replies }) => {
  return (
    author && (
      <Card className="border-0 shadow-none">
        <CardHeader className="px-4 py-2">
          <CardDescription className="flex justify-between">
            <span>u/{author}</span>
            <span>
              {typeof createdUtc === 'number'
                ? `${formatDistanceToNow(new Date(createdUtc * 1000))} ago`
                : 'unknown time'}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <p className="overflow-auto break-words">{body}</p>
        </CardContent>
        {replies && (
          <CardContent className="px-4 py-2">
            {replies?.data.children.map((reply) => {
              return (
                <ReplyCard
                  key={reply.data.id}
                  author={reply.data.author}
                  body={reply.data.body}
                  createdUtc={reply.data.created_utc}
                  replies={reply.data.replies}
                />
              );
            })}
          </CardContent>
        )}
      </Card>
    )
  );
};

export default ReplyCard;
