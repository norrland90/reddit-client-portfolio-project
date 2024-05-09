import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';
import { Button } from './ui/button';
import { useState } from 'react';

const VoteReddit = ({ score }) => {
  const [voteScore, setVoteScore] = useState(score);
  const [vote, setVote] = useState(null);

  function handleVoteClick(pressedVote) {
    if (pressedVote === vote) {
      setVote('');
      setVoteScore(score);
      return;
    }

    setVote(pressedVote);
    if (pressedVote === 'down') {
      setVoteScore(score - 1);
    }
    if (pressedVote === 'up') {
      setVoteScore(score + 1);
    }
  }

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className={`rounded-full border-0 hover:text-emerald-400 ${
          vote === 'up' && 'text-emerald-400'
        }`}
        onClick={() => handleVoteClick('up')}
      >
        <FaArrowUp className="text-xl" />
      </Button>
      <span className="text-sm">{voteScore}</span>
      <Button
        size="icon"
        variant="outline"
        className={`rounded-full border-0 hover:text-destructive ${
          vote === 'down' && 'text-destructive'
        }`}
        onClick={() => handleVoteClick('down')}
      >
        <FaArrowDown className="text-xl" />
      </Button>
    </>
  );
};

export default VoteReddit;
