import { useState } from 'react';

export default function useNgStyle(initialStyles) {
  const [styles, setStyles] = useState(initialStyles);

  function setStyle(property, value) {
    setStyles(prevStyles => ({
      ...prevStyles,
      [property]: value
    }));
  }

  return [styles, setStyle];
}
