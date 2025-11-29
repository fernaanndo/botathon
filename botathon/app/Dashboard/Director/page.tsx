import Navbar from '../../components/Navbar';
import StatsGrid from '../../components/Statsgrid';

export default function DirectorDashboard() {
  
  // SIMULACIÓN DE DATOS DE LA DB PARA EL DIRECTOR
  const directorUser = {
    name: "Director General",
    role: "Vista General",
    email: "director@teleton.cl",
    location: "Casa Central - Santiago"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Pasamos los datos específicos al Navbar */}
      <Navbar user={directorUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vista Nacional</h1>
            <p className="text-gray-500">Panel de Control Estratégico</p>
          </div>
          <span className="bg-teleton-red text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            Todas las Regiones
          </span>
        </div>

        <StatsGrid />

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Mapa de Calor Nacional (Simulado)</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Aquí se cargará el Mapa de Chile interactivo]
          </div>
        </div>
      </main>
    </div>
  );
}