export const loadFromLocalStorage = <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  };
  
  export const saveToLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };