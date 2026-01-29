import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  MessageCircle, 
  IndianRupee as Rupee, 
  ArrowLeft,
  Phone,
  Shield,
  TrendingUp,
  Package,
  Check,
  X,
  Edit3
} from 'lucide-react';
import { Produce, Bid } from '../../types';

interface FarmerBidManagementProps {
  produce: Produce;
  onAcceptBid: (bidId: string) => void;
  onRejectBid: (bidId: string) => void;
  onNegotiate: (bidId: string) => void;
  onBack: () => void;
  onContactTrader: (traderId: string) => void;
}

const FarmerBidManagement: React.FC<FarmerBidManagementProps> = ({ 
  produce, 
  onAcceptBid,
  onRejectBid,
  onNegotiate,
  onBack,
  onContactTrader
}) => {
  const [selectedBid, setSelectedBid] = useState<string | null>(null);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [counterOffer, setCounterOffer] = useState('');

  const sortedBids = [...produce.bids].sort((a, b) => b.amount - a.amount);
  const highestBid = sortedBids[0];
  const averageBid = sortedBids.length > 0 
    ? Math.round(sortedBids.reduce((sum, bid) => sum + bid.amount, 0) / sortedBids.length)
    : 0;

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const bidTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - bidTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'अभी / Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} मिनट पहले / ${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} घंटे पहले / ${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)} दिन पहले / ${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleNegotiate = (bidId: string) => {
    setSelectedBid(bidId);
    setShowNegotiation(true);
  };

  const submitCounterOffer = () => {
    if (selectedBid && counterOffer) {
      onNegotiate(selectedBid);
      setShowNegotiation(false);
      setCounterOffer('');
      setSelectedBid(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">बोलियां प्रबंधित करें</h1>
            <p className="text-sm text-gray-600">Manage Bids</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Produce Details */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex space-x-4">
            <img 
              src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
              alt={produce.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{produce.name}</h3>
                <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                  <Shield size={12} className="text-green-600" />
                  <span className="text-xs text-green-700 font-medium">Active</span>
                </div>
              </div>
              
              {produce.variety && <p className="text-sm text-gray-600 mb-1">{produce.variety}</p>}
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-green-600">
                    ₹{produce.basePrice}/{produce.unit}
                  </p>
                  <p className="text-sm text-gray-500">आधार मूल्य / Base Price</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Package size={16} className="text-gray-500" />
                    <span className="font-medium">{produce.quantity} {produce.unit}</span>
                  </div>
                  <p className="text-sm text-gray-500">उपलब्ध / Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bidding Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-2xl font-bold text-green-600">
              {highestBid ? `₹${highestBid.amount}` : '₹0'}
            </p>
            <p className="text-sm text-gray-600">सर्वोच्च बोली</p>
            <p className="text-xs text-gray-500">Highest Bid</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-2xl font-bold text-blue-600">
              {averageBid ? `₹${averageBid}` : '₹0'}
            </p>
            <p className="text-sm text-gray-600">औसत बोली</p>
            <p className="text-xs text-gray-500">Average Bid</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-2xl font-bold text-orange-600">{sortedBids.length}</p>
            <p className="text-sm text-gray-600">कुल बोलियां</p>
            <p className="text-xs text-gray-500">Total Bids</p>
          </div>
        </div>

        {/* Bids List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800">प्राप्त बोलियां</h4>
            <p className="text-sm text-gray-600">Received Bids ({sortedBids.length})</p>
          </div>

          <div className="p-4 space-y-4">
            {sortedBids.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium">अभी तक कोई बोली नहीं</p>
                <p className="text-sm">No bids received yet</p>
              </div>
            ) : (
              sortedBids.map((bid, index) => (
                <div 
                  key={bid.id} 
                  className={`border rounded-xl p-4 ${
                    index === 0 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-800">{bid.traderName}</p>
                          <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                            <Shield size={12} className="text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Verified</span>
                          </div>
                          {index === 0 && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                              सर्वोच्च
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{formatTimeAgo(bid.timestamp)}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">₹{bid.amount}</p>
                      <p className="text-sm text-gray-600">{bid.quantity} {produce.unit}</p>
                    </div>
                  </div>
                  
                  {bid.message && (
                    <div className="mb-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-600">"{bid.message}"</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onAcceptBid(bid.id)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Check size={16} />
                      <span>स्वीकार करें / Accept</span>
                    </button>
                    
                    <button
                      onClick={() => handleNegotiate(bid.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit3 size={16} />
                      <span>बातचीत / Negotiate</span>
                    </button>
                    
                    <button
                      onClick={() => onContactTrader(bid.traderId)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      <MessageCircle size={16} />
                    </button>
                    
                    <button
                      onClick={() => onRejectBid(bid.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Negotiation Modal */}
      {showNegotiation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">मूल्य बातचीत</h3>
            <p className="text-sm text-gray-600 mb-4">Price Negotiation</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  आपका प्रस्ताव / Your Counter Offer
                </label>
                <div className="relative">
                  <Rupee size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    value={counterOffer}
                    onChange={(e) => setCounterOffer(e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNegotiation(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  रद्द करें / Cancel
                </button>
                
                <button
                  onClick={submitCounterOffer}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  भेजें / Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerBidManagement;