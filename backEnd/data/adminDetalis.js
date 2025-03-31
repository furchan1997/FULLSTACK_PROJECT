// פרטי מנהל לצורך הרשמה אוטומטית

const userAdmin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  firstName: "John",
  lastName: "Doe",
  phone: "0521234567",
  address: {
    state: "Central District",
    country: "Israel",
    city: "Petah Tikva",
    street: "Herzl St",
    houseNumber: 42,
    zip: 4950500,
  },
};

module.exports = userAdmin;
