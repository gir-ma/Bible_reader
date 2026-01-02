import React from 'react';

const Navigation = ({ onTodayClick, isTodayActive }) => {
  const navItems = [
    { 
      label: 'Today', 
      icon: '📖', 
      active: isTodayActive,
      onClick: onTodayClick
    },
    { label: 'Calendar', icon: '📅', active: false },
    { label: 'Progress', icon: '📊', active: false },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-full h-full ${
                item.active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <div className="hidden md:flex justify-center bg-white border-b border-gray-200 py-2">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;