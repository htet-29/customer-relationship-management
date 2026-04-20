import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  Search,
  MoreVertical,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const App = () => {
  // Application State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([
    { id: 1, name: "ဦးမြိုင်", email: "myaing@email.com", phone: "09123456789", status: "Active", value: 1500000, company: "Myaing Co., Ltd" },
    { id: 2, name: "ဒေါ်လှလှ", email: "hlahla@email.com", phone: "09987654321", status: "Pending", value: 500000, company: "Golden Star" },
    { id: 3, name: "ကိုအောင်ဇော်", email: "aungzaw@email.com", phone: "09445566778", status: "Closed", value: 3200000, company: "Tech Solutions" },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Active',
    value: ''
  });

  // Dashboard Stats calculation
  const stats = useMemo(() => {
    const totalValue = customers.reduce((acc, curr) => acc + Number(curr.value), 0);
    const activeCount = customers.filter(c => c.status === 'Active').length;
    return { totalValue, activeCount, total: customers.length };
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      ...formData,
      id: Date.now(),
      value: Number(formData.value) || 0
    };
    setCustomers([newCustomer, ...customers]);
    setFormData({ name: '', email: '', phone: '', company: '', status: 'Active', value: '' });
    setActiveTab('list');
  };

  // Components
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <Users size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">CRM Pro</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span>ပင်မစာမျက်နှာ</span>
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'list' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <Users size={20} />
            <span>ဖောက်သည်စာရင်း</span>
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'add' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <UserPlus size={20} />
            <span>အသစ်ထည့်ရန်</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard အနှစ်ချုပ်'}
              {activeTab === 'list' && 'Customer များ'}
              {activeTab === 'add' && 'Customer အသစ်ထည့်သွင်းခြင်း'}
            </h2>
            <p className="text-gray-500 text-sm">ယနေ့အတွက် လုပ်ငန်းအခြေအနေများ</p>
          </div>
          <div className="flex gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="ရှာဖွေရန်..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="စုစုပေါင်း Customer" 
                value={stats.total} 
                icon={Users} 
                color="bg-blue-500" 
              />
              <StatCard 
                title="Active လုပ်ဆောင်ဆဲ" 
                value={stats.activeCount} 
                icon={TrendingUp} 
                color="bg-emerald-500" 
              />
              <StatCard 
                title="စုစုပေါင်း ရောင်းအားတန်ဖိုး" 
                value={`${stats.totalValue.toLocaleString()} ကျပ်`} 
                icon={DollarSign} 
                color="bg-amber-500" 
              />
            </div>

            {/* Recent Activity / Simple Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 text-gray-700">အရောင်းအခြေအနေ (Status)</h3>
                <div className="space-y-4">
                  {['Active', 'Pending', 'Closed'].map(status => {
                    const count = customers.filter(c => c.status === status).length;
                    const percent = (count / customers.length) * 100;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{status === 'Active' ? 'လုပ်ဆောင်ဆဲ' : status === 'Pending' ? 'စောင့်ဆိုင်းဆဲ' : 'အောင်မြင်သည်'}</span>
                          <span className="font-semibold">{count} ယောက်</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${status === 'Active' ? 'bg-blue-500' : status === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4 text-gray-700">နောက်ဆုံးထည့်သွင်းသူများ</h3>
                <div className="divide-y divide-gray-100">
                  {customers.slice(0, 3).map(customer => (
                    <div key={customer.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.company}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{customer.value.toLocaleString()} </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">နာမည်</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ကုမ္ပဏီ</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ဖုန်းနံပါတ်</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">အခြေအနေ</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">တန်ဖိုး</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {customer.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {customer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          customer.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                          customer.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {customer.status === 'Active' ? 'လုပ်ဆောင်ဆဲ' : customer.status === 'Pending' ? 'စောင့်ဆိုင်းဆဲ' : 'အောင်မြင်သည်'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {customer.value.toLocaleString()} 
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {customers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                Data မရှိသေးပါ။ အသစ်ထည့်သွင်းပါ။
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">အမည်</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="ဥပမာ- ဦးအောင်"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ကုမ္ပဏီအမည်</label>
                  <input 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="ဥပမာ- ABC Co.,Ltd"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">အီးမေးလ်</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ဖုန်းနံပါတ်</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="09..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Prospect">Prospect</option>
                    <option value="Demonstration">Demonstration</option>
                    <option value="Won">Won</option>
                    <option value="Loss">Loss</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Follow Up">Follow Up</option>
                    <option value="Pending">Pending</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input 
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
