import { useState } from 'react';

const teamCount = 12;
const totalRounds = 16;

function generateSnakeOrder(position) {
  const order = [];
  for (let round = 0; round < totalRounds; round++) {
    const thisRound = Array.from({ length: teamCount }, (_, i) =>
      round % 2 === 0 ? i : teamCount - 1 - i
    );
    order.push(...thisRound);
  }
  return order;
}

export default function DraftToolUI() {
  const [draftPosition, setDraftPosition] = useState(6);
  const [pickNumber, setPickNumber] = useState(0);
  const snakeOrder = generateSnakeOrder(draftPosition);

  return (
    <div className="space-y-4 border p-4 rounded">
      <label className="block text-lg font-semibold">Select Your Draft Position:</label>
      <select
        value={draftPosition}
        onChange={(e) => setDraftPosition(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {Array.from({ length: teamCount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <p className="text-md mt-2">You selected pick #{draftPosition}</p>
      <p className="text-sm text-gray-600">
        Next up: Team #{snakeOrder[pickNumber % (teamCount * totalRounds)] + 1}
      </p>
    </div>
  );
}
