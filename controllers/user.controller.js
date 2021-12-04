const { User } = require("../models");

exports.getAllUsers = async (req, res, _next) => {
  try {
    const users = await User.findAll();
    if (!users) throw new Error("No user found");
    return res.json({ status: 200, message: "user found", users });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};

exports.login = async (req, res, _next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error("Please provide the username and password");
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user)
      return res.status(300).json({
        status: 300,
        message: "Username/password incorrect",
      });
    if (user.status === "pending")
      return res.status(300).json({
        status: 300,
        message:
          "We're reviewing your account we will notify you once your acccount is approved!",
      });
    user.password = null;
    return res.status(200).json({
      status: 200,
      message: "login successfully",
      user: user,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.signup = async (req, res, _next) => {
  try {
    const {
      first_name,
      last_name,
      CNIC,
      designation,
      department,
      username,
      password,
      status,
      mobile_number,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !CNIC ||
      !designation ||
      !department ||
      !username ||
      !password ||
      !status ||
      !mobile_number
    )
      throw new Error("please attach the body with proper details");
    const user_signup = await User.create(req.body);
    if (!user_signup) throw new Error("Unable to create user");
    return res.status(200).json({
      status: 200,
      message: "user created",
      user: user_signup,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getAllPendingAccounts = async (req, res, _next) => {
  try {
    const pendingAccounts = await User.findAll({
      where: {
        status: "pending",
      },
    });
    let message = "Accounts found";
    if (!pendingAccounts.length) message = "No pending account found";
    return res.status(200).json({
      status: 200,
      message,
      pendingAccounts,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.approveAccount = async (req, res, _next) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) throw new Error("Please attach the body");
    const approvedAccount = await User.update(
      {
        status: "approved",
      },
      {
        where: {
          id: id,
        },
      }
    );
    let message = "Account approved";
    if (!approvedAccount) message = "No account found";
    return res.status(200).json({ status: 200, message, approvedAccount });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getApprovedAccounts = async (req, res, _next) => {
  try {
    const approvedAccounts = await User.findAll({
      where: {
        status: "approved",
      },
    });
    let message = "Approved accounts reterived";
    if (!approvedAccounts.length) message = "No approved Accounts reterived";

    return res.status(200).json({ status: 200, message, approvedAccounts });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
