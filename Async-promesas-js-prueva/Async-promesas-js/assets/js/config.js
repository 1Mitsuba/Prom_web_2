export const CONFIG = {
    SUPABASE_URL: 'https://fqxjajxbjlnyrdvdofrq.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeGphanhiamxueXJkdmRvZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDg1OTUsImV4cCI6MjA2MjYyNDU5NX0.tmC35WfvvFGwfYaOvBDLLmKVmGtq9cU-ojk2H4EHyV8',
    
    // Función para crear un header estándar
    getHeaders() {
        return {
            apikey: this.SUPABASE_KEY,
            Authorization: `Bearer ${this.SUPABASE_KEY}`,
            'Content-Type': 'application/json'
        };
    }
};