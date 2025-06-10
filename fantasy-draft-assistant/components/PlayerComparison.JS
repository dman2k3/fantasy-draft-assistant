import { useState } from 'react';

const sampleWeeks = Array.from({ length: 17 }, (_, i) => `Week ${i + 1}`);
const hardest = ['SF', 'NYJ', 'DAL', 'PHI', 'PIT'];
const weakest = ['CHI', 'ATL', 'LAR', 'TEN', 'SEA'];
const weather = ['Clear', 'Rain', 'Windy', 'Dome', 'Snow'];
const defenses = ['ATL', 'BUF', 'CHI', 'DAL', 'DEN', 'GB', 'KC', 'LAR', 'MIA', 'NE', 'NO', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TEN'];

function getAlert(def, condition) {
  const alerts = [];
  if (hardest.includes(def)) alerts.push('🔥 Tough Matchup');
  if (weakest.includes(def)) alerts.push('🍭 Easy Matchup');
  if (['Rain', 'Windy', 'Snow'].includes(condition)) alerts.push('⚠️ Weather Risk');
  return alerts.join(' | ');
}

export default function PlayerComparison({ players }) {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  const getPlayer = (name) => players.find(p => p.name === name);

  const p1 = getPlayer(playerOne);
  const p2 = getPlayer(playerTwo);

  return (
    <div className="border rounded p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">Compare Players</h2>
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setPlayerOne(e.target.value)} className="border p-2">
          <option>Select Player One</option>
          {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>
        <select onChange={(e) => setPlayerTwo(e.target.value)} className="border p-2">
          <option>Select Player Two</option>
          {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>
      </div>

      {p1 && p2 && (
        <div className="text-sm">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div></div>
            <div className="font-semibold">{p1.name}</div>
            <div className="font-semibold">{p2.name}</div>
            <div>Projection</div>
            <div>{p1.projection}</div>
            <div>{p2.projection}</div>
            <div>ADP</div>
            <div>{p1.adp}</div>
            <div>{p2.adp}</div>
            <div>Bye Week</div>
            <div>{p1.bye}</div>
            <div>{p2.bye}</div>
            <div>Bust Risk</div>
            <div>{(p1.bustRisk * 100).toFixed(0)}%</div>
            <div>{(p2.bustRisk * 100).toFixed(0)}%</div>
            <div>Boom Risk</div>
            <div>{(p1.boomRisk * 100).toFixed(0)}%</div>
            <div>{(p2.boomRisk * 100).toFixed(0)}%</div>
          </div>

          <h3 className="text-md font-semibold mt-4">Weekly Projections</h3>
          <div className="grid grid-cols-5 text-xs mt-2 text-center">
            <div>Week</div><div>{p1.name}</div><div>{p2.name}</div><div>Alerts</div><div>Alerts</div>
            {sampleWeeks.map((week, i) => {
              const def1 = p1.defense?.[i] ?? defenses[Math.floor(Math.random() * defenses.length)];
              const def2 = p2.defense?.[i] ?? defenses[Math.floor(Math.random() * defenses.length)];
              const w1 = p1.weather?.[i] ?? weather[Math.floor(Math.random() * weather.length)];
              const w2 = p2.weather?.[i] ?? weather[Math.floor(Math.random() * weather.length)];
              return (
                <>
                  <div>{week}</div>
                  <div>{p1.weekly?.[i] ?? '-'} pts<br /><small>{w1} @ {def1}</small></div>
                  <div>{p2.weekly?.[i] ?? '-'} pts<br /><small>{w2} @ {def2}</small></div>
                  <div className="text-red-600">{getAlert(def1, w1)}</div>
                  <div className="text-red-600">{getAlert(def2, w2)}</div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
