const HomeRoute = (req, res) => {
  res.render("index", {
    title: "Employee Dashbord",
  });
};

const SignupRoute = (req, res) => {
    const notification = req.session.notification;
    res.render("signup", { title: "Signup",  notification});
};

const LoginRoutes = (req, res) => {
    const notification = req.session.notification;
    delete req.session.notification;
    res.render("login", { title: "Login", notification });
  };
  
  
  

const ViewEmployeeRoutes = (req, res) => {
  res.render("viewEmployee", { title: "View Employee" });
};

module.exports = { HomeRoute, SignupRoute, LoginRoutes, ViewEmployeeRoutes };
