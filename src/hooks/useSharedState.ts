import { useState } from 'react';

export const createSharedState = (defaultValue: any) => {
  let listeners = [] as any;

  const setSharedState = (value: any) => {
    listeners.forEach((listener: any) => listener(value));
    listeners = [];
  }

  return () => {
    const [value, setVal] = useState(defaultValue);
    listeners.push(setVal);

    return [value, setSharedState]
  }
}
