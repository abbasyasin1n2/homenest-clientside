import { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState(() => {
    const saved = localStorage.getItem('propertyComparison');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('propertyComparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (property) => {
    if (comparisonList.length >= 3) {
      return { success: false, message: 'You can only compare up to 3 properties' };
    }
    
    const exists = comparisonList.find(p => p._id === property._id);
    if (exists) {
      return { success: false, message: 'Property already in comparison' };
    }

    setComparisonList([...comparisonList, property]);
    return { success: true, message: 'Added to comparison' };
  };

  const removeFromComparison = (propertyId) => {
    setComparisonList(comparisonList.filter(p => p._id !== propertyId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (propertyId) => {
    return comparisonList.some(p => p._id === propertyId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};







