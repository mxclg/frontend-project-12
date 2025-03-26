const useUser = () => {
  try {
    const userData = localStorage.getItem('userId');
    if (!userData) return null;
    const parsed = JSON.parse(userData);
    return parsed.username || null;
  } catch (error) {
    console.error('Ошибка чтения user из localStorage:', error);
    return null;
  }
};

export default useUser;
