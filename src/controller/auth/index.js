import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../model/user/index.js";

const AuthController = {
  signup: async (req, res) => {
    try {
      const payload = req.body;

      const user = await UserModel.findOne({
        where: {
          email: payload.email,
        },
      });

      if (user) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const hPassword = await hash(payload.password, 10);

      await UserModel.create({
        ...payload,
        password: hPassword,
      });
      return res.status(201).json({ message: "User Registered" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user = user.toJSON();
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      delete user.password;
      console.log(user, "user");
      const token = jwt.sign(user, "asdbavsdasvd", {
        expiresIn: "1h",
      });

      res.status(200).json({ data: user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default AuthController;
