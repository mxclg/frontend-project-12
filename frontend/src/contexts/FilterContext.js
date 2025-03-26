import { createContext } from 'react';

const FilterContext = createContext({
  clean: (text) => text,
});

export default FilterContext;
