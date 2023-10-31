exports.validateEmailPassSignup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!name || !email || !password) {
      return res.status(500).send('fill all fields');
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      return res.status(500).send('invalid name entered');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(500).send('invalid email entered');
    } else if (password.length < 7) {
      return res
        .status(500)
        .send('password too short enter 6 characters or more');
    }
    // If none of the conditions are met, proceed to the next middleware or route handler.
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
