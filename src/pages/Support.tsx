import React, { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface Ticket {
  id: number;
  user: string;
  subject: string;
  category: 'technical' | 'billing' | 'complaint' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      user: 'Maria Silva',
      subject: 'Não consigo fazer login',
      category: 'technical',
      status: 'open',
      priority: 'high',
      createdAt: '2026-02-24 10:30',
      updatedAt: '2026-02-24 10:30',
    },
    {
      id: 2,
      user: 'João Santos',
      subject: 'Cobrança indevida',
      category: 'billing',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2026-02-23 14:15',
      updatedAt: '2026-02-24 09:00',
    },
    {
      id: 3,
      user: 'Ana Costa',
      subject: 'Profissional não apareceu',
      category: 'complaint',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2026-02-22 16:45',
      updatedAt: '2026-02-24 11:20',
    },
    {
      id: 4,
      user: 'Carlos Oliveira',
      subject: 'Dúvida sobre documentos',
      category: 'other',
      status: 'closed',
      priority: 'low',
      createdAt: '2026-02-20 08:30',
      updatedAt: '2026-02-22 15:00',
    },
  ]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'technical':
        return '🔧 Técnico';
      case 'billing':
        return '💳 Cobrança';
      case 'complaint':
        return '⚠️ Reclamação';
      case 'other':
        return '❓ Outro';
      default:
        return category;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Suporte</h1>
          <p className="text-gray-600 mt-1">Gerenciar tickets de suporte</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Abertos</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {tickets.filter(t => t.status === 'open').length}
                  </p>
                </div>
                <AlertCircle className="text-red-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Em Progresso</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {tickets.filter(t => t.status === 'in_progress').length}
                  </p>
                </div>
                <Clock className="text-yellow-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Resolvidos</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {tickets.filter(t => t.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{tickets.length}</p>
                </div>
                <MessageSquare className="text-gray-600" size={32} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por usuário ou assunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos os Status</option>
                <option value="open">Abertos</option>
                <option value="in_progress">Em Progresso</option>
                <option value="resolved">Resolvidos</option>
              </select>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{ticket.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status === 'open' ? 'Aberto' :
                         ticket.status === 'in_progress' ? 'Em Progresso' :
                         ticket.status === 'resolved' ? 'Resolvido' : 'Fechado'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      <strong>Usuário:</strong> {ticket.user}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{getCategoryLabel(ticket.category)}</span>
                      <span className={`font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority === 'high' ? '🔴 Alta' :
                         ticket.priority === 'medium' ? '🟡 Média' : '🟢 Baixa'} Prioridade
                      </span>
                      <span>Criado: {ticket.createdAt}</span>
                    </div>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ml-4">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Nenhum ticket encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
