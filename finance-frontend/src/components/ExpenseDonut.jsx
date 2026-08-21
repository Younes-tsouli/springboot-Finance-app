import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function ExpenseDonut({ data }) {
  // Optionnel : Ajoute une sécurité si data est vide
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    /* On définit une hauteur fixe sur le container parent. 
       Le ResponsiveContainer prendra 100% de ces 300px.
    */
    <div style={{ width: '100%', height: '300px', minWidth: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            // Pour éviter certains warnings, on peut nommer les entrées
            nameKey="name" 
          >
            {data.map((entry, index) => (
              <Cell className='cell' key={`cell-${index}`} fill={entry.color || "#8884d8"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}