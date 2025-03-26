import leoProfanity from 'leo-profanity';
import { useMemo } from 'react';
import FilterContext from '../contexts/FilterContext.js';

const FilterProvider = ({ children }) => {
  const filter = useMemo(() => {
    const ru = leoProfanity.getDictionary('ru');
    const en = leoProfanity.getDictionary('en');
    leoProfanity.addDictionary('cleanWords', [...ru, ...en]);
    leoProfanity.loadDictionary('cleanWords');

    return {
      clean: (text) => leoProfanity.clean(text),
    };
  }, []);

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
