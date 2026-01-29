import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Award, 
  DollarSign, 
  Shield, 
  BookOpen,
  CreditCard,
  Briefcase,
  Heart,
  Zap
} from 'lucide-react';
import { GovernmentScheme } from '../../types';

interface EnhancedGovernmentSchemesProps {
  schemes: GovernmentScheme[];
}

const EnhancedGovernmentSchemes: React.FC<EnhancedGovernmentSchemesProps> = ({ schemes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', label: 'सभी', labelEn: 'All', icon: Award, color: 'bg-gray-100 text-gray-800' },
    { key: 'subsidy', label: 'सब्सिडी', labelEn: 'Subsidy', icon: DollarSign, color: 'bg-green-100 text-green-800' },
    { key: 'loan', label: 'ऋण', labelEn: 'Loan', icon: CreditCard, color: 'bg-blue-100 text-blue-800' },
    { key: 'insurance', label: 'बीमा', labelEn: 'Insurance', icon: Shield, color: 'bg-purple-100 text-purple-800' },
    { key: 'training', label: 'प्रशिक्षण', labelEn: 'Training', icon: BookOpen, color: 'bg-orange-100 text-orange-800' },
  ];

  // Enhanced mock schemes with more variety
  const enhancedSchemes = [
    ...schemes,
    {
      id: '3',
      title: 'किसान क्रेडिट कार्ड योजना',
      description: 'किसानों को कम ब्याज दर पर ऋण प्रदान करने के लिए विशेष क्रेडिट कार्ड योजना।',
      category: 'loan' as const,
      eligibility: [
        'भूमि स्वामित्व प्रमाण पत्र',
        'आधार कार्ड और पैन कार्ड',
        'बैंक खाता विवरण',
        'फसल बीमा पॉलिसी'
      ],
      benefits: 'कम ब्याज दर पर ₹3 लाख तक का ऋण, आसान EMI विकल्प',
      applicationLink: 'https://kcc.gov.in',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg'
    },
    {
      id: '4',
      title: 'कृषि यंत्र सब्सिडी योजना',
      description: 'आधुनिक कृषि उपकरण खरीदने के लिए 50% तक की सब्सिडी प्रदान करती है।',
      category: 'subsidy' as const,
      eligibility: [
        'पंजीकृत किसान होना आवश्यक',
        '2 हेक्टेयर तक की भूमि',
        'पहले से कोई सब्सिडी न ली हो'
      ],
      benefits: 'ट्रैक्टर, हार्वेस्टर पर 50% सब्सिडी, अधिकतम ₹2 लाख',
      applicationLink: 'https://agrimachinery.nic.in',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg'
    },
    {
      id: '5',
      title: 'कृषि प्रशिक्षण कार्यक्रम',
      description: 'आधुनिक खेती की तकनीकों और नई फसलों की जानकारी के लिए निःशुल्क प्रशिक्षण।',
      category: 'training' as const,
      eligibility: [
        'सभी किसान पात्र हैं',
        'न्यूनतम शिक्षा की आवश्यकता नहीं',
        'ऑनलाइन और ऑफलाइन दोनों विकल्प'
      ],
      benefits: 'निःशुल्क प्रशिक्षण, प्रमाण पत्र, तकनीकी सहायता',
      applicationLink: 'https://agricoop.nic.in',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg'
    }
  ];

  const filteredSchemes = enhancedSchemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.key === category);
    if (!cat) return Award;
    return cat.icon;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      subsidy: 'bg-green-100 text-green-800 border-green-200',
      loan: 'bg-blue-100 text-blue-800 border-blue-200',
      insurance: 'bg-purple-100 text-purple-800 border-purple-200',
      training: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSchemeIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return '💰';
      case 'loan': return '🏦';
      case 'insurance': return '🛡️';
      case 'training': return '📚';
      default: return '📋';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">सरकारी योजनाएं</h2>
            <p className="text-purple-100 text-sm">Government Schemes</p>
            <p className="text-purple-200 text-xs mt-1">{filteredSchemes.length} schemes available</p>
          </div>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">
                {enhancedSchemes.filter(s => s.category === 'subsidy').length}
              </p>
              <p className="text-sm text-gray-600">सब्सिडी योजनाएं</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600">
                {enhancedSchemes.filter(s => s.category === 'loan').length}
              </p>
              <p className="text-sm text-gray-600">ऋण योजनाएं</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="योजना खोजें / Search schemes"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={16} />
              <span>{category.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Schemes */}
      {selectedCategory === 'all' && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">🌟 फीचर्ड योजनाएं</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">PM-KISAN</h4>
                  <p className="text-sm text-green-700">₹6,000 प्रति वर्ष सीधे खाते में</p>
                </div>
                <Zap size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const IconComponent = getCategoryIcon(scheme.category);
          return (
            <div key={scheme.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={scheme.image} 
                  alt={scheme.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(scheme.category)}`}>
                    <span>{getSchemeIcon(scheme.category)}</span>
                    <span className="capitalize">{scheme.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{scheme.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Shield size={14} className="mr-1" />
                      पात्रता / Eligibility:
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scheme.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Heart size={14} className="mr-1" />
                      लाभ / Benefits:
                    </h4>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-800 font-medium">{scheme.benefits}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(scheme.applicationLink, '_blank')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>आवेदन करें / Apply Now</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <Award size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई योजना नहीं मिली</p>
          <p className="text-sm text-gray-400">No schemes found</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            फिल्टर साफ़ करें / Clear Filters
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen size={20} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-blue-800">सहायता चाहिए?</p>
            <p className="text-sm text-blue-700">
              योजनाओं के बारे में अधिक जानकारी के लिए हेल्पलाइन: 1800-180-1551
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGovernmentSchemes;