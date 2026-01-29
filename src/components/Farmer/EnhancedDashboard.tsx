import React from 'react';
import { 
  TrendingUp, 
  Package, 
  IndianRupee as Rupee, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  Plus,
  Eye,
  Gift,
  Bell,
  Users
} from 'lucide-react';
import { Produce, MarketPrice, Transaction } from '../../types';

interface EnhancedDashboardProps {
  produces: Produce[];
  marketPrices: MarketPrice[];
  transactions: Transaction[];
  onAddProduce: () => void;
  onViewPrices: () => void;
  onViewSchemes: () => void;
  onViewTraders: () => void;
  onViewBids: (produce: Produce) => void;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ 
  produces, 
  marketPrices, 
  transactions,
  onAddProduce,
  onViewPrices,
  onViewSchemes,
  onViewTraders
  onViewBids
}) => {
  const activeProduces = produces.filter(p => p.status === 'active');
  const totalBids = produces.reduce((sum, p) => sum + p.bids.length, 0);
  const pendingPayments = transactions.filter(t => t.status === 'pending').length;

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp size={16} className="text-green-600" />;
      case 'down': return <ArrowDown size={16} className="text-red-600" />;
      default: return <div className="w-4 h-0.5 bg-gray-400"></div>;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">नमस्ते किसान भाई!</h2>
            <p className="text-green-100 text-sm">Welcome Farmer!</p>
            <p className="text-green-200 text-xs mt-1">आज का दिन शुभ हो</p>
          </div>
          <div className="relative">
            <Bell size={24} />
            {(totalBids > 0 || pendingPayments > 0) && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{totalBids + pendingPayments}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{activeProduces.length}</p>
              <p className="text-sm text-gray-600 font-medium">सक्रिय उत्पाद</p>
              <p className="text-xs text-gray-500">Active Products</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{totalBids}</p>
              <p className="text-sm text-gray-600 font-medium">नई बोलियां</p>
              <p className="text-xs text-gray-500">New Bids</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">त्वरित कार्य / Quick Actions</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={onAddProduce}
            className="bg-green-600 text-white p-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Plus size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-lg">फसल बेचें</p>
                <p className="text-green-100 text-sm">Add Produce to Sell</p>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onViewPrices}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye size={24} className="text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800">मंडी भाव</p>
                <p className="text-xs text-gray-500">View Prices</p>
              </div>
            </button>

            <button
              onClick={onViewSchemes}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift size={24} className="text-purple-600" />
                </div>
                <p className="font-semibold text-gray-800">योजनाएं</p>
                <p className="text-xs text-gray-500">Schemes</p>
              </div>
            </button>

            <button
              onClick={onViewTraders}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <p className="font-semibold text-gray-800">व्यापारी</p>
                <p className="text-xs text-gray-500">Traders</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Current Market Prices */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">आज के बाज़ार भाव</h3>
              <p className="text-sm text-gray-600">Today's Market Prices</p>
            </div>
            <button
              onClick={onViewPrices}
              className="text-green-600 text-sm font-medium hover:text-green-700"
            >
              सभी देखें
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {marketPrices.slice(0, 3).map((price) => (
            <div key={price.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{price.produce}</p>
                <p className="text-sm text-gray-600">{price.mandi}</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{price.price}</p>
                <div className="flex items-center justify-end space-x-1">
                  {getTrendIcon(price.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(price.change)}`}>
                    {price.change > 0 ? '+' : ''}{price.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Listed Produce */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">मेरी सूचीबद्ध फसलें</h3>
          <p className="text-sm text-gray-600">My Listed Produce</p>
        </div>
        
        <div className="p-4">
          {activeProduces.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">कोई फसल सूचीबद्ध नहीं</p>
              <p className="text-sm text-gray-400 mb-4">No produce listed yet</p>
              <button
                onClick={onAddProduce}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                पहली फसल जोड़ें
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeProduces.slice(0, 3).map((produce) => (
                <div key={produce.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <img 
                    src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
                    alt={produce.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{produce.name}</p>
                    <p className="text-sm text-gray-600">{produce.quantity} {produce.unit}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{produce.currentPrice}</p>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onViewBids(produce)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {produce.bids.length} bids
                      </button>
                      {produce.bids.length > 0 && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Status */}
      {pendingPayments > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-yellow-800">भुगतान लंबित</p>
              <p className="text-sm text-yellow-700">
                {pendingPayments} payments pending / {pendingPayments} भुगतान लंबित
              </p>
            </div>
            <button className="text-yellow-700 font-medium text-sm hover:text-yellow-800">
              देखें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboard;