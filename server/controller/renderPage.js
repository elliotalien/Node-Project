const HomeRoute = (req, res) => {
  res.render("index", {
    title: "Employee Dashbord",
  });
};

const SignupRoute = (req, res) => {
  res.render("signup", { title: "Signup", userExists: false });
};

const LoginRoutes = (req, res) => {
  const userExists = req.flash("userExists")[0];
  res.render("login", { title: "Login", userExists });
};

const ViewEmployeeRoutes = (req, res) => {
  res.render("viewEmployee", { title: "View Employee" });
};

module.exports = { HomeRoute, SignupRoute, LoginRoutes, ViewEmployeeRoutes };
