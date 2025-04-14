import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label, ResponsiveContainer } from 'recharts';

const CrecimientoSoja = () => {
  const [timeRange, setTimeRange] = useState(20);
  
  const calcularAltura = (t) => {
    return (15 * t * t) / (t * t + 10);
  };

  const calcularTiempoNoventa = () => {
    const targetHeight = 15 * 0.9;
    const t2 = (10 * targetHeight) / (15 - targetHeight);
    return Math.sqrt(t2);
  };
  
  const tiempoNoventa = calcularTiempoNoventa();
  const alturaNoventa = 15 * 0.9;

  const generarDatos = () => {
    const datos = [];
    const step = timeRange / 40;
    for (let t = 0; t <= timeRange; t += step) {
      datos.push({
        dia: t,
        altura: calcularAltura(t)
      });
    }
    return datos;
  };

  const datos = generarDatos();
  
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
        Modelo de Crecimiento de Soja
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
        h(t) = (15t²)/(t²+10)
      </p>
      
      <div style={{ backgroundColor: '#ebf5ff', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="timeRange" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Rango de tiempo (días): {timeRange}
          </label>
          <input 
            type="range" 
            id="timeRange" 
            min="5" 
            max="50" 
            value={timeRange} 
            onChange={(e) => setTimeRange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <LineChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="dia" tickCount={10}>
                <Label value="Tiempo (días)" position="bottom" offset={0} />
              </XAxis>
              <YAxis domain={[0, 16]}>
                <Label value="Altura (cm)" position="left" angle={-90} offset={-5} />
              </YAxis>
              <Tooltip 
                formatter={(value) => [value.toFixed(2) + ' cm', 'Altura']} 
                labelFormatter={(label) => 'Día ' + label} 
                contentStyle={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #ddd' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="altura" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Altura de la planta"
                dot={false}
                activeDot={{ r: 6, fill: '#2563eb' }}
              />
              
              <ReferenceLine y={15} stroke="#dc2626" strokeDasharray="5 5" strokeWidth={1.5}>
                <Label value="Altura máxima: 15 cm" position="right" fill="#dc2626" />
              </ReferenceLine>
              
              <ReferenceLine y={alturaNoventa} stroke="#16a34a" strokeDasharray="5 5" strokeWidth={1.5}>
                <Label value="90% de altura máxima: 13.5 cm" position="insideBottomRight" fill="#16a34a" />
              </ReferenceLine>
              
              <ReferenceLine x={tiempoNoventa} stroke="#ea580c" strokeDasharray="5 5" strokeWidth={1.5}>
                <Label value={`t ≈ ${tiempoNoventa.toFixed(2)} días`} position="top" fill="#ea580c" />
              </ReferenceLine>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <p style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Altura máxima teórica:</p>
          <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#2563eb', marginBottom: '0.25rem' }}>15 cm</p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>lím[t→∞] h(t) = 15</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <p style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Tiempo para alcanzar el 90%:</p>
          <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#ea580c', marginBottom: '0.25rem' }}>{tiempoNoventa.toFixed(2)} días</p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>h({tiempoNoventa.toFixed(2)}) = {alturaNoventa.toFixed(2)} cm</p>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Análisis del modelo:</h3>
        <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
          Este modelo logístico muestra que la planta de soja tiene un crecimiento lento al inicio, 
          un período de crecimiento rápido en la fase intermedia, y luego se estabiliza al acercarse al límite máximo de 15 cm.
        </p>
        <p style={{ color: '#4b5563' }}>
          La planta alcanza el 90% de su altura máxima ({alturaNoventa.toFixed(2)} cm) 
          después de {tiempoNoventa.toFixed(2)} días de crecimiento.
        </p>
      </div>
    </div>
  );
};

export default CrecimientoSoja;