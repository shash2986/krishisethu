import React from 'react';
import { Package, TrendingUp, Clock, CheckCircle, Eye, MessageCircle } from 'lucide-react';
import { Produce, Transaction } from '../../types';

interface TraderDashboardProps {
  availableProduce: Produce[];
  myTransactions: Transaction[];
}

const TraderDashboard: React.FC<TraderDashboardProps> = ({ 
  availableProduce, 
  myTransactions 
}) => {
  const activeBids = myTransactions.filter(t => t.status === 'pending').length;
  const completedDeals = myTransactions.filter(t => t.status === 'completed').length;
  const totalProduce = availableProduce.length;

  return (
    <div className="p-4 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalProduce}</p>
              <p className="text-sm text-gray-600">उपलब्ध फसलें</p>
              <p className="text-xs text-gray-500">Available Produce</p>
            </div>
            <Package className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{activeBids}</p>
              <p className="text-sm text-gray-600">सक्रिय बोलियां</p>
              <p className="text-xs text-gray-500">Active Bids</p>
            </div>
            <Clock className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Latest Produce */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">नवीनतम फसलें</h3>
          <p className="text-sm text-gray-600">Latest Produce</p>
        </div>
        
        <div className="p-4 space-y-3">
          {availableProduce.slice(0, 4).map((produce) => (
            <div key={produce.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
              <img 
                src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
                alt={produce.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{produce.name}</p>
                <p className="text-sm text-gray-600">{produce.location}</p>
                <p className="text-xs text-gray-500">{produce.quantity} {produce.unit}</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-green-600">₹{produce.currentPrice}</p>
                <p className="text-xs text-gray-500">{produce.bids.length} bids</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">हाल के लेन-देन</h3>
          <p className="text-sm text-gray-600">Recent Transactions</p>
        </div>
        
        <div className="p-4">
          {myTransactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Transaction #{transaction.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">₹{transaction.amount} - {transaction.quantity}kg</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {transaction.status === 'completed' ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <Clock size={16} className="text-orange-500" />
                )}
                <span className={`text-sm font-medium capitalize ${
                  transaction.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {transaction.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraderDashboard;