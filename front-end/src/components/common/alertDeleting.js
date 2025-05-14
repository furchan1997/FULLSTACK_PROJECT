export const alertDeleting = async (...fns) => {
  const confirmMsg = window.confirm(
    "האם את/ה בטוח שברצונך למחוק? פעולה זו אינה ניתנת לשחזור."
  );

  if (!confirmMsg) return false;

  for (const fn of fns) {
    await fn();
  }

  return true;
};

export default alertDeleting;
