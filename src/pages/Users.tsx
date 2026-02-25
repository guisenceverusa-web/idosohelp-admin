import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface User {
  id: number;
  name: string;
  email: string;
  type: 'elderly' | 'professional';
  status: 'active' | 'inactive' | 'blocked';
  joinDate: string;
  rating?: number;
  earnings?: number;
}

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'elderly' | 'professional'>('all');
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      type: 'elderly',
      status: 'active',
      joinDate: '2026-01-15',
    },
    {
      id: 2,
      name: 'Dr. Carlos Oliveira',
      email: 'carlos@email.com',
      type: 'professional',
      status: 'active',
      joinDate: '2026-01-20',
      rating: 4.8,
      earnings: 8500,
    },
    {
      id: 3,
      name: 'João Santos',
      email: 'joao@email.com',
      type: 'elderly',
      status: 'inactive',
      joinDate: '2026-02-01',
    },
    {
      id: 4,
      name: 'Patricia Gomes',
      email: 'patricia@email.com',
      type: 'professional',
      status: 'blocked',
      joinDate: '2026-01-25',
      rating: 2.1,
      earnings: 3200,
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || user.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'blocked':
        return 'Bloqueado';
      default:
        return status;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600 mt-1">Gerenciar idosos e profissionais</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos</option>
                <option value="elderly">Idosos</option>
                <option value="professional">Profissionais</option>
              </select>

              {/* Export */}
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                📥 Exportar
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cadastro</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {user.type === 'elderly' ? '👴 Idoso' : '👨‍⚕️ Profissional'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                      <td className="px-6 py-4 text-sm space-x-2 flex">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando <strong>{filteredUsers.length}</strong> de <strong>{users.length}</strong> usuários
            </p>
            <div className="space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">← Anterior</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Próximo →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
