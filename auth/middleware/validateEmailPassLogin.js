exports.validateEmailPassLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      return res.status(500).send('fill all fields');
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
