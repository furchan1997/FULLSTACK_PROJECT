export const alertDeleting = async (...fns) => {
  const confirmMsg = window.confirm(
    "האם את/ה בטוח שברצונך למחוק את החשבון הזה? פעולה זו אינה ניתנת לשחזור."
  );

  if (!confirmMsg) return;

  if (confirmMsg) {
    fns.forEach(async (fn) => {
      await fn();
    });
  }
};

export default alertDeleting;
