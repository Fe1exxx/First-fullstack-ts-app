import { useState, useEffect } from 'react';

type Team = {
  id: number;
  name: string;
  city: string;
};

export default function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/teams')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Ошибка при загрузке команд:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка команд...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Ошибка</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🏐 Команды по волейболу</h1>

      {teams.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Нет команд. Добавьте первую!</p>
      ) : (
        <ul className="space-y-3">
          {teams.map(team => (
            <li
              key={team.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <span className="font-semibold text-lg">{team.name}</span>
              <span className="text-gray-600 ml-2">— {team.city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}