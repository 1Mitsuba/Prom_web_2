// Configuración de Supabase
const SUPABASE_URL = 'https://fqxjajxbjlnyrdvdofrq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeGphanhiamxueXJkdmRvZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDg1OTUsImV4cCI6MjA2MjYyNDU5NX0.tmC35WfvvFGwfYaOvBDLLmKVmGtq9cU-ojk2H4EHyV8';
const HEADER = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Estadísticas de clientes
const estadisticasClientes = async () => {
    try {
        // Obtener conteo de clientes
        const clientesResponse = await fetch(`${SUPABASE_URL}/rest/v1/cliente?select=count`, {
            headers: HEADER
        });
        
        if (!clientesResponse.ok) {
            throw new Error(`Error al obtener conteo de clientes: ${clientesResponse.status}`);
        }
        
        const clientesData = await clientesResponse.json();
        const totalClientes = clientesData[0]?.count || 0;
        
        // Obtener conteo y promedio de edad de mascotas
        const mascotasResponse = await fetch(`${SUPABASE_URL}/rest/v1/pet?select=count,edad`, {
            headers: HEADER
        });
        
        if (!mascotasResponse.ok) {
            throw new Error(`Error al obtener datos de mascotas: ${mascotasResponse.status}`);
        }
        
        const mascotasData = await mascotasResponse.json();
        const totalMascotas = mascotasData.length || 0;
        
        // Calcular el promedio de edad
        let edadPromedio = 0;
        if (totalMascotas > 0) {
            const edades = mascotasData.map(pet => parseInt(pet.edad) || 0).filter(edad => !isNaN(edad));
            const sumaEdades = edades.reduce((total, edad) => total + edad, 0);
            edadPromedio = sumaEdades / edades.length || 0;
        }
        
        return {
            total_clientes: totalClientes,
            total_mascotas: totalMascotas,
            edad_promedio_mascotas: edadPromedio
        };
    } catch (error) {
        console.error('Error en estadisticasClientes:', error);
        throw error;
    }
};

export const databaseService = {
    estadisticasClientes
};