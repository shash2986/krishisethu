import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  CreditCard, 
  Package,
  MapPin,
  Phone,
  ArrowLeft,
  AlertTriangle,
  Camera,
  FileText,
  Star
} from 'lucide-react';
import { Transaction } from '../../types';

interface EnhancedTransactionTrackingProps {
  transaction: Transaction;
  onBack: () => void;
  onContactSupport: () => void;
  onRaiseDispute?: () => void;
  onRateTransaction?: (rating: number, review: string) => void;
}

const EnhancedTransactionTracking: React.FC<EnhancedTransactionTrackingProps> = ({
  transaction,
  onBack,
  onContactSupport,
  onRaiseDispute,
  onRateTransaction
}) => {
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeImages, setDisputeImages] = useState<string[]>([]);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'in_transit': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'delivered': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित / Pending';
      case 'confirmed': return 'पुष्ट / Confirmed';
      case 'in_transit': return 'ट्रांजिट में / In Transit';
      case 'delivered': return 'डिलीवर / Delivered';
      case 'completed': return 'पूर्ण / Completed';
      default: return status;
    }
  };

  const timelineSteps = [
    {
      id: 'deal_accepted',
      title: 'बोली स्वीकार',
      titleEn: 'Deal Accepted',
      description: 'किसान ने आपकी बोली स्वीकार की',
      descriptionEn: 'Farmer accepted your bid',
      icon: CheckCircle,
      completed: true,
      timestamp: '2024-01-15 10:30 AM'
    },
    {
      id: 'payment_initiated',
      title: 'भुगतान शुरू',
      titleEn: 'Payment Initiated',
      description: 'भुगतान प्रक्रिया शुरू की गई',
      descriptionEn: 'Payment process started',
      icon: CreditCard,
      completed: true,
      timestamp: '2024-01-15 11:00 AM'
    },
    {
      id: 'produce_ready',
      title: 'फसल तैयार',
      titleEn: 'Produce Ready',
      description: 'फसल पिकअप के लिए तैयार',
      descriptionEn: 'Produce ready for pickup',
      icon: Package,
      completed: transaction.status !== 'pending',
      timestamp: transaction.status !== 'pending' ? '2024-01-15 02:00 PM' : ''
    },
    {
      id: 'pickup_scheduled',
      title: 'पिकअप निर्धारित',
      titleEn: 'Pickup Scheduled',
      description: 'ट्रांसपोर्ट व्यवस्था की गई',
      descriptionEn: 'Transport arranged',
      icon: Truck,
      completed: ['confirmed', 'in_transit', 'delivered', 'completed'].includes(transaction.status),
      timestamp: ['confirmed', 'in_transit', 'delivered', 'completed'].includes(transaction.status) ? '2024-01-15 03:30 PM' : ''
    },
    {
      id: 'in_transit',
      title: 'ट्रांसपोर्ट',
      titleEn: 'In Transit',
      description: 'फसल ट्रांसपोर्ट में है',
      descriptionEn: 'Produce is being transported',
      icon: Truck,
      completed: ['in_transit', 'delivered', 'completed'].includes(transaction.status),
      timestamp: ['in_transit', 'delivered', 'completed'].includes(transaction.status) ? '2024-01-15 04:00 PM' : ''
    },
    {
      id: 'delivered',
      title: 'डिलीवर',
      titleEn: 'Delivered',
      description: 'फसल सफलतापूर्वक डिलीवर',
      descriptionEn: 'Produce successfully delivered',
      icon: CheckCircle,
      completed: ['delivered', 'completed'].includes(transaction.status),
      timestamp: ['delivered', 'completed'].includes(transaction.status) ? '2024-01-15 06:00 PM' : ''
    }
  ];

  const handleDisputeSubmit = () => {
    if (disputeReason && onRaiseDispute) {
      onRaiseDispute();
      setShowDispute(false);
      setDisputeReason('');
      setDisputeImages([]);
    }
  };

  const handleRatingSubmit = () => {
    if (rating > 0 && onRateTransaction) {
      onRateTransaction(rating, review);
      setShowRating(false);
      setRating(0);
      setReview('');
    }
  };

  const addDisputeImage = () => {
    const dummyImage = 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg';
    setDisputeImages([...disputeImages, dummyImage]);
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
            <h1 className="text-lg font-semibold text-gray-800">लेन-देन ट्रैकिंग</h1>
            <p className="text-sm text-gray-600">Transaction Tracking</p>
          </div>
          <button
            onClick={onContactSupport}
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Phone size={20} className="text-blue-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Transaction Summary */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Transaction #{transaction.id.slice(0, 8)}</h3>
              <p className="text-sm text-gray-600">Order ID: {transaction.id}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
              {getStatusText(transaction.status)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">कुल राशि / Total Amount</p>
              <p className="text-xl font-bold text-green-600">₹{transaction.amount.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">मात्रा / Quantity</p>
              <p className="text-xl font-bold text-gray-800">{transaction.quantity} kg</p>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-6">प्रगति / Progress</h4>
          
          <div className="space-y-6">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === timelineSteps.length - 1;
              
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon size={20} />
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 h-8 mt-2 ${
                        step.completed ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between">
                      <h5 className={`font-medium ${
                        step.completed ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h5>
                      {step.timestamp && (
                        <span className="text-xs text-gray-500">{step.timestamp}</span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${
                      step.completed ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    <p className={`text-xs mt-1 ${
                      step.completed ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {step.descriptionEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logistics Information */}
        {['confirmed', 'in_transit', 'delivered', 'completed'].includes(transaction.status) && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">लॉजिस्टिक्स जानकारी</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <MapPin size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">पिकअप स्थान / Pickup Location</p>
                  <p className="text-sm text-blue-700">Khadakwasla, Pune, Maharashtra</p>
                  <p className="text-xs text-blue-600">Scheduled: Today 3:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Truck size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">वाहन नंबर / Vehicle Number</p>
                  <p className="text-sm text-green-700">MH 12 AB 1234</p>
                  <p className="text-xs text-green-600">Driver: राम कुमार / Ram Kumar</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Phone size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">ड्राइवर संपर्क / Driver Contact</p>
                  <p className="text-sm text-orange-700">+91 98765 43210</p>
                  <p className="text-xs text-orange-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">भुगतान विवरण</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">फसल मूल्य / Produce Value:</span>
              <span className="font-medium">₹{(transaction.amount * 0.95).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">प्लेटफॉर्म शुल्क / Platform Fee:</span>
              <span className="font-medium">₹{(transaction.amount * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold text-lg">
              <span className="text-gray-800">कुल राशि / Total Amount:</span>
              <span className="text-green-600">₹{transaction.amount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">
                भुगतान सुरक्षित / Payment Secured
              </span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              डिलीवरी पूर्ण होने पर किसान को भुगतान किया जाएगा
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {transaction.status === 'completed' && (
            <button
              onClick={() => setShowRating(true)}
              className="w-full bg-yellow-600 text-white py-3 rounded-xl font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Star size={20} />
              <span>रेटिंग दें / Rate Transaction</span>
            </button>
          )}
          
          {!['completed'].includes(transaction.status) && (
            <button
              onClick={() => setShowDispute(true)}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <AlertTriangle size={20} />
              <span>विवाद दर्ज करें / Raise Dispute</span>
            </button>
          )}
        </div>

        {/* Support Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Phone size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-yellow-800">सहायता चाहिए?</p>
              <p className="text-sm text-yellow-700">Need Help?</p>
            </div>
            <button
              onClick={onContactSupport}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              संपर्क करें
            </button>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {showDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">विवाद दर्ज करें</h3>
            <p className="text-sm text-gray-600 mb-4">Raise Dispute</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  विवाद का कारण / Dispute Reason
                </label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="कृपया विस्तार से बताएं..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  सबूत की तस्वीरें / Evidence Images
                </label>
                <button
                  onClick={addDisputeImage}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-red-500 transition-colors"
                >
                  <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">तस्वीर जोड़ें / Add Image</p>
                </button>
                
                {disputeImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {disputeImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDispute(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  रद्द करें / Cancel
                </button>
                
                <button
                  onClick={handleDisputeSubmit}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  जमा करें / Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">लेन-देन की रेटिंग</h3>
            <p className="text-sm text-gray-600 mb-4">Rate this Transaction</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  रेटिंग / Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 ${
                        star <= rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  समीक्षा / Review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="अपना अनुभव साझा करें..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-20 resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRating(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  रद्द करें / Cancel
                </button>
                
                <button
                  onClick={handleRatingSubmit}
                  className="flex-1 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  जमा करें / Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTransactionTracking;