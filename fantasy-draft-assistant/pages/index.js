import { useEffect, useState } from 'react';
import DraftTiers from "../components/DraftTiers";
import DraftToolUI from "../components/DraftToolUI";
import PlayerComparison from "../components/PlayerComparison";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/data/draft_data.json')
      .then(res => res.json())
      .then(data => {
        const combined = [...data.espn, ...data.fantasypros, ...data.draftsharks];
        const merged = Object.values(
          combined.reduce((acc, p) => {
            if (!acc[p.name]) acc[p.name] = { ...p };
            else acc[p.name] = { ...acc[p.name], ...p };
            return acc;
          }, {})
        );
        setPlayers(merged);
      });
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Fantasy Football Draft Center</h1>
      <DraftToolUI />
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Live Draft Tiers</h2>
        <DraftTiers />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Player Comparison Tool</h2>
        <PlayerComparison players={players} />
      </section>
    </div>
  );
}
