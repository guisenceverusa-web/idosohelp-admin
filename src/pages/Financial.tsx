import React, { useState } from 'react';
import { DollarSign, TrendingUp, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../components/Sidebar';

interface Transaction {
  id: number;
  date: string;
  user: string;
  type: 'income' | 'expense' | 'commission';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

const Financial = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2026-02-24', user: 'Maria Silva', type: 'income', amount: 85.00, status: 'completed', description: 'Serviço de saúde' },
    { id: 2, date: '2026-02-24', user: 'Dr. Carlos', type: 'commission', amount: 59.50, status: 'completed', description: 'Comissão profissional' },
    { id: 3, date: '2026-02-23', user: 'João Santos', type: 'income', amount: 120.00, status: 'completed', description: 'Fisioterapia' },
    { id: 4, date: '2026-02-23', user: 'IdosoHelp', type: 'expense', amount: -25.50, status: 'completed', description: 'Taxa de processamento' },
  ]);

  const revenueData = [
    { name: 'Jan', revenue: 32000, commission: 9600 },
    { name: 'Fev', revenue: 35000, commission: 10500 },
    { name: 'Mar', revenue: 38000, commission: 11400 },
    { name: 'Abr', revenue: 42000, commission: 12600 },
    { name: 'Mai', revenue: 45230, commission: 13569 },
  ];

  const pieData = [
    { name: 'Comissão IdosoHelp', value: 35 },
    { name: 'Profissionais', value: 65 },
  ];

  const COLORS = ['#0a7ea4', '#4CAF50'];

  const metrics = [
    { label: 'Faturamento Total', value: 'R$ 192.230', change: '+12%', icon: '📊' },
    { label: 'Comissão Acumulada', value: 'R$ 57.669', change: '+8%', icon: '💰' },
    { label: 'Transações', value: '1.247', change: '+15%', icon: '💳' },
    { label: 'Pendentes', value: 'R$ 3.450', change: '-2%', icon: '⏳' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-1">Gerenciar receitas, comissões e transações</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <p className="text-green-600 text-sm mt-2">{metric.change}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Receita vs Comissão</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#0a7ea4" strokeWidth={2} />
                  <Line type="monotone" dataKey="commission" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Distribuição de Receita</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Transações Recentes</h2>
              <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <Download size={18} />
                <span>Exportar</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usuário</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Valor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">{tx.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{tx.user}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.type === 'income' ? 'bg-green-100 text-green-800' :
                          tx.type === 'commission' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tx.type === 'income' ? 'Receita' : tx.type === 'commission' ? 'Comissão' : 'Despesa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {tx.amount > 0 ? '+' : ''} R$ {Math.abs(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tx.status === 'completed' ? '✓ Completo' : tx.status === 'pending' ? '⏳ Pendente' : '✕ Falhou'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{tx.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financial;
