const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d.*\d.*\d.*\d))(?=(.*[!@%$#^&*\-_()])).{8,}$/;
const phoneRegex = /^(0[2-47-9]\d{6}|05\d{8})$/;

module.exports = { emailRegex, passwordRegex, phoneRegex };
