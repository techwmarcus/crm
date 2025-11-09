import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, BarChart3, Plus, Search, Filter, Edit, Trash2, Eye, TrendingUp, DollarSign, Building, LogOut } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

 interface User {
  name: string;
  email: string;
  role: string;
}

const RealEstateCRM = () => {
  
  const [currentView, setCurrentView] = useState('dashboard');
  setIsAuthenticated(false);
  setCurrentUser({ name: '', email: '', role: '' }); 
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  
  // Sample data - in production, this would come from RDS via API Gateway
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '555-0101', status: 'New', source: 'Website', interest: 'Condo', budget: 450000, agent: 'Sarah Johnson', createdAt: '2025-11-01' },
    { id: 2, name: 'Emily Davis', email: 'emily@email.com', phone: '555-0102', status: 'Contacted', source: 'Referral', interest: 'House', budget: 650000, agent: 'Mike Chen', createdAt: '2025-11-02' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '555-0103', status: 'Qualified', source: 'Open House', interest: 'Townhouse', budget: 380000, agent: 'Sarah Johnson', createdAt: '2025-11-03' },
    { id: 4, name: 'Jessica Wilson', email: 'jessica@email.com', phone: '555-0104', status: 'Negotiation', source: 'Social Media', interest: 'House', budget: 720000, agent: 'Mike Chen', createdAt: '2025-11-04' },
    { id: 5, name: 'David Martinez', email: 'david@email.com', phone: '555-0105', status: 'New', source: 'Website', interest: 'Condo', budget: 420000, agent: 'Sarah Johnson', createdAt: '2025-11-05' },
  ]);

  const [properties, setProperties] = useState([
    { id: 1, address: '123 Oak Street', type: 'House', price: 675000, status: 'Available', beds: 3, baths: 2, sqft: 2100, agent: 'Sarah Johnson', listedDate: '2025-10-15' },
    { id: 2, address: '456 Maple Ave', type: 'Condo', price: 445000, status: 'Under Contract', beds: 2, baths: 2, sqft: 1400, agent: 'Mike Chen', listedDate: '2025-10-20' },
    { id: 3, address: '789 Pine Road', type: 'Townhouse', price: 385000, status: 'Available', beds: 3, baths: 2.5, sqft: 1800, agent: 'Sarah Johnson', listedDate: '2025-10-25' },
    { id: 4, address: '321 Elm Drive', type: 'House', price: 895000, status: 'Available', beds: 4, baths: 3, sqft: 3200, agent: 'Mike Chen', listedDate: '2025-11-01' },
    { id: 5, address: '654 Birch Lane', type: 'Condo', price: 520000, status: 'Sold', beds: 2, baths: 2, sqft: 1600, agent: 'Sarah Johnson', listedDate: '2025-09-15' },
  ]);

  const [openHouses, setOpenHouses] = useState([
    { id: 1, propertyId: 1, address: '123 Oak Street', date: '2025-11-10', time: '2:00 PM - 4:00 PM', attendees: 12, agent: 'Sarah Johnson' },
    { id: 2, propertyId: 3, address: '789 Pine Road', date: '2025-11-12', time: '1:00 PM - 3:00 PM', attendees: 8, agent: 'Sarah Johnson' },
    { id: 3, propertyId: 4, address: '321 Elm Drive', date: '2025-11-15', time: '3:00 PM - 5:00 PM', attendees: 0, agent: 'Mike Chen' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginForm({ email: '', password: '' });
  };

  

  // Login handler - simulates AWS Cognito authentication

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    // In production: call API Gateway endpoint that uses Cognito
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true); 
    }
  };

  
  // Analytics data for QuickSight-style visualizations
  const salesPerformanceData = [
    { month: 'Jun', sales: 2, revenue: 890000 },
    { month: 'Jul', sales: 3, revenue: 1250000 },
    { month: 'Aug', sales: 1, revenue: 445000 },
    { month: 'Sep', sales: 4, revenue: 1800000 },
    { month: 'Oct', sales: 2, revenue: 920000 },
    { month: 'Nov', sales: 3, revenue: 1450000 },
  ];

  const leadSourceData = [
    { name: 'Website', value: 35, color: '#3b82f6' },
    { name: 'Referral', value: 25, color: '#10b981' },
    { name: 'Open House', value: 20, color: '#f59e0b' },
    { name: 'Social Media', value: 20, color: '#8b5cf6' },
  ];

  const propertyTypeData = [
    { type: 'House', count: 2 },
    { type: 'Condo', count: 2 },
    { type: 'Townhouse', count: 1 },
  ];

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Real Estate CRM</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="agent@realestate.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In with Cognito
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo: Use any email/password to login</p>
            <p className="mt-2 text-xs">Powered by AWS Cognito</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{leads.length}</p>
              <p className="text-green-600 text-sm mt-2">+12% this month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Properties</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {properties.filter(p => p.status === 'Available').length}
              </p>
              <p className="text-blue-600 text-sm mt-2">3 new listings</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Building className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Open Houses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{openHouses.length}</p>
              <p className="text-orange-600 text-sm mt-2">2 this week</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">$1.45M</p>
              <p className="text-green-600 text-sm mt-2">+8% vs last month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts - QuickSight Style Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales Count" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => {
  const { name, percent } = props as { name?: string; percent?: number };
  return `${name ?? ''} ${percent ? (percent * 100).toFixed(0) : ''}%`;
}}

                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Property Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New lead added</p>
                <p className="text-xs text-gray-600">David Martinez - $420K budget</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="text-blue-600" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Open house scheduled</p>
                <p className="text-xs text-gray-600">321 Elm Drive - Nov 15</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <DollarSign className="text-purple-600" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Property sold</p>
                <p className="text-xs text-gray-600">654 Birch Lane - $520K</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Leads View
  const LeadsView = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Negotiation</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={20} />
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.interest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${lead.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.agent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Properties View
  const PropertiesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Properties</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Building className="text-white" size={64} />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{property.address}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  property.status === 'Available' ? 'bg-green-100 text-green-800' :
                  property.status === 'Under Contract' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {property.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-3">
                ${property.price.toLocaleString()}
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">{property.beds}</p>
                  <p className="text-xs">Beds</p>
                </div>
                <div>
                  <p className="font-medium">{property.baths}</p>
                  <p className="text-xs">Baths</p>
                </div>
                <div>
                  <p className="font-medium">{property.sqft}</p>
                  <p className="text-xs">Sq Ft</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-600">{property.agent}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Open Houses View
  const OpenHousesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Open Houses</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={20} />
          Schedule Open House
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {openHouses.map((house) => (
              <tr key={house.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{house.address}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{house.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{house.time}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {house.attendees} {house.attendees === 0 ? 'scheduled' : 'registered'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{house.agent}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Real Estate CRM</h1>
              <p className="text-xs text-gray-600">AWS Powered</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs text-gray-600">{currentUser?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'leads'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span className="font-medium">Leads</span>
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setCurrentView('properties')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'properties'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Building size={20} />
              <span className="font-medium">Properties</span>
              <span className="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {properties.filter(p => p.status === 'Available').length}
              </span>
            </button>

            <button
              onClick={() => setCurrentView('openhouses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'openhouses'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar size={20} />
              <span className="font-medium">Open Houses</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-semibold">AWS Services:</p>
              <p>✓ Cognito Auth</p>
              <p>✓ RDS Database</p>
              <p>✓ API Gateway</p>
              <p>✓ QuickSight Analytics</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'leads' && <LeadsView />}
          {currentView === 'properties' && <PropertiesView />}
          {currentView === 'openhouses' && <OpenHousesView />}
        </main>
      </div>
    </div>
  );
};

export default RealEstateCRM;
