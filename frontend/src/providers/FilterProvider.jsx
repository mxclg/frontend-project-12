import leoProfanity from 'leo-profanity';
import FilterContext from '../contexts/FilterContext.js';

const filter = {
  clean: (text) => leoProfanity.clean(text),
};

const FilterProvider = ({ children }) => (
  <FilterContext.Provider value={filter}>
    {children}
  </FilterContext.Provider>
);

export default FilterProvider;
