import React from 'react';
import { Users, DollarSign, TrendingUp, AlertCircle, BarChart3, MessageSquare } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  // Mock data
  const metrics = [
    { label: 'Usuários Ativos', value: '1,247', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Faturamento Mês', value: 'R$ 45.230', icon: DollarSign, color: 'bg-green-500', change: '+8%' },
    { label: 'Atendimentos', value: '3,421', icon: TrendingUp, color: 'bg-purple-500', change: '+23%' },
    { label: 'Alertas', value: '12', icon: AlertCircle, color: 'bg-red-500', change: '-5%' },
  ];

  const chartData = [
    { name: 'Jan', faturamento: 32000, atendimentos: 240 },
    { name: 'Fev', faturamento: 35000, atendimentos: 280 },
    { name: 'Mar', faturamento: 38000, atendimentos: 320 },
    { name: 'Abr', faturamento: 42000, atendimentos: 380 },
    { name: 'Mai', faturamento: 45230, atendimentos: 420 },
  ];

  const recentActivities = [
    { id: 1, user: 'Maria Silva', action: 'Novo cadastro', time: '5 min atrás', type: 'success' },
    { id: 2, user: 'João Santos', action: 'Avaliação baixa (2.0⭐)', time: '15 min atrás', type: 'warning' },
    { id: 3, user: 'Ana Costa', action: 'Pagamento processado', time: '1 hora atrás', type: 'success' },
    { id: 4, user: 'Carlos Oliveira', action: 'Documentos rejeitados', time: '2 horas atrás', type: 'danger' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bem-vindo ao painel administrativo do IdosoHelp</p>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <p className="text-green-600 text-sm mt-2">{metric.change} vs mês anterior</p>
                    </div>
                    <div className={`${metric.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Faturamento por Mês</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="faturamento" stroke="#0a7ea4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Atendimentos por Mês</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="atendimentos" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Atividades Recentes</h2>
              <MessageSquare className="text-gray-400" size={20} />
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{activity.time}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                      activity.type === 'success' ? 'bg-green-100 text-green-800' :
                      activity.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.type === 'success' ? '✓' : activity.type === 'warning' ? '⚠' : '✕'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
