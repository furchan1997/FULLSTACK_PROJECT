// פונקציה עבור משתמש שנמחק על ידיי מנהל בעודו מחובר , והחזרת הודעה תואמת אליו

export function ruleManagement({ logOut, navigate, err }) {
  if (
    err?.response?.data?.message === "User not found." ||
    err?.response?.data === "User not found."
  ) {
    alert("Your account has been deleted by an admin.");
    logOut();
    navigate("/sign-in");
  }
}
