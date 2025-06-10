import { useEffect, useState } from 'react';
const positions = ['QB', 'RB', 'WR', 'TE', 'FLEX'];

function computeValueScore(p) {
  const proj = p.projection ?? 0;
  const adp = p.adp ?? 999;
  return proj - (adp * 0.5);
}

function getTags(p) {
  const sleeper = p.value > 100 && (p.adp ?? 999) > 100;
  const breakout = (p.boomRisk ?? 0) > 0.35 && (p.projection ?? 0) > 250;
  return [sleeper ? '🛌 Sleeper' : null, breakout ? '🚀 Breakout' : null].filter(Boolean);
}

export default function DraftTiers() {
  const [draftData, setDraftData] = useState(null);
  const [sortedTiers, setSortedTiers] = useState({});

  useEffect(() => {
    fetch('/data/draft_data.json')
      .then((res) => res.json())
      .then((data) => {
        const merged = [...data.espn, ...data.fantasypros, ...data.draftsharks];
        const tiers = {};

        positions.forEach((pos) => {
          const players = merged.filter(p => p.position === pos);
          const unique = Object.values(players.reduce((acc, p) => {
            acc[p.name] = { ...acc[p.name], ...p };
            return acc;
          }, {}));

          tiers[pos] = unique.map(p => {
            const value = computeValueScore(p);
            const tags = getTags({ ...p, value });
            return { ...p, value, tags };
          }).sort((a, b) => b.value - a.value);
        });

        setSortedTiers(tiers);
      });
  }, []);

  return (
    <div className="grid gap-4">
      {positions.map(pos => (
        <div key={pos} className="border rounded p-4">
          <h2 className="text-xl font-semibold">Top {pos}s</h2>
          <ul className="list-disc pl-5">
            {sortedTiers[pos]?.slice(0, 10).map((p, i) => (
              <li key={i}>
                {p.name} - Proj: {p.projection}, ADP: {p.adp}, Value: {p.value.toFixed(1)}
                {p.tags?.length > 0 && <span className="ml-2 text-green-600">({p.tags.join(', ')})</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
