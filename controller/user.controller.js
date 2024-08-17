const user_model = require("../model/user.model.js");
const response = require("../helper/response");

const hashing = require("../helper/hashing.js");
const jwt_token = require("../helper/jwt_token.js");

module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      let account = await user_model.getAccount({ username });

      if (!account) {
        // account not found
        return response.unauthorized(
          {
            sign: "401",
          },
          res, "Username or Password not match!"
        );
      } else {
        let correct_password = await hashing.checkPass(
          password,
          account.password
        );
        if (correct_password) {
          // password match
          let token = await jwt_token.generateToken({
            id: account.id,
            username: account.username,
            is_admin: account.is_admin,
          });

          return response.ok(
            {
              sign: "0000",
              access_token: token,
              token_type: "bearer",
            },
            res, "Login Success!"
          );
        } else {
          // password not match
          return response.unauthorized(
            {
              sign: "401",
            },
            res, "Password and Username not match!"
          );
        }
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
            message: error.message,
          },
          res
        );
      } else {
        return response.error(
          {
            sign: "9999",
            message: "Ops... we have a problem, please try again later!",
          },
          res
        );
      }
    }
  },

  register: async (req, res, next) => {
    try {
      let { name, username, password } = req.body;

      let checkUsername = await user_model.getAccount({ username });

      if (checkUsername) {
        // account already exist
        return response.duplicated(
          {
            sign: "409",
          },
          res, "Username already exist!"
        );
      } else {
        let hashed_password = await hashing.hashPass(password);

        let new_account = await user_model.createAccount({
          name,
          username,
          password: hashed_password,
          is_admin: 0,
        });

        return response.created(
          {
            sign: "201",
            data: new_account[0],
          },
          res, "Register Success!"
        );
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
          },
          res, error.message
        );
      } else {
        return response.error(
          {
            sign: "9999",
          },
          res, "Ops... we have a problem, please try again later!"
        );
      }
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      let { new_password, password } = req.body;

      if (!password) {
        return response.bad(
          {
            sign: "400",
            header: "Required Password",
          },
          res, "Password must be filled"
        );
      } else if (!new_password) {
        return response.bad(
          {
            sign: "400",
            header: "Required New Password",
          },
          res, "New Password must be filled"
        );
      } else if (password == new_password) {
        return response.error(
          {
            sign: "500",
            header: "Not Same",
          },
          res, "New Password cannot be the same as the old password"
        );
      } else if (new_password.length < 7) {
        return response.error(
          {
            sign: "500",
            header: "Must be 7 characters",
          },
          res, "New password must be at least 7 characters long"
        );
      } else {
        let account = await user_model.getAccount({
          id: req.designd.id,
        });
        if (!account) {
          return response.notFound(
            {
              sign: "404",
              header: "Not Found",
            },
            res, "User not found"
          );
        }
        let correct_password = await hashing.checkPass(
          password,
          account.password
        );
        if (!correct_password) {
          return response.error(
            {
              sign: "500",
              header: "Incorrect Password",
            },
            res, "Old password is incorrect"
          );
        } else {
          // console.log("masuk", req.designd.id, hashing.hashPass(new_password));
          await user_model.updatePassword({
            user_id: req.designd.id,
            password: hashing.hashPass(new_password),
          });
          return response.ok(
            {
              sign: "200",
              header: "Success",
            },
            res, "Password successfully changed"
          );
        }
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
            header: "Error Localhost",
          },
          res, error.message
        );
      } else {
        return response.error(
          {
            sign: "9999",
            header: "Error Server",
          },
          res, "Ops... we have a problem, please try again later!"
        );
      }
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      let { page, limit } = req.query;
      let data = await user_model.getAllUser({ page, limit });
      return response.ok(data, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
            message: error.message,
          },
          res
        );
      } else {
        console.log(error.stack);
        if (process.env.NODE_ENV === "development") {
          return response.error(
            {
              sign: "9998",
              header: "Error Localhost",
            },
            res, error.message
          );
        } else {
          return response.error(
            {
              sign: "9999",
              header: "Error Server",
            },
            res, "Ops... we have a problem, please try again later!"
          );
        }
      }
    }
  },

  getUserById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let result = await user_model.getAccount({ hash:id });
      if (!result) {
        return response.notFound(
          {
            sign: "400",
            header: "Not Found",
          },
          res, "User not found"
        );
      }
      return response.ok(result, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
          },
          res, error.message
        );
      } else {
        return response.error(
          {
            sign: "9999",
          },
          res, "Ops... we have a problem, please try again later!"
        );
      }
    }
  },

  createUser: async (req, res, next) => {
    try {
      let { name, username, password } = req.body;

      let checkUsername = await user_model.getAccount({ username });

      if (checkUsername) {
        // account already exist
        return response.duplicated(
          {
            sign: "409",
            header: "Duplicated Data",
          },
          res, "Username already exist!"
        );
      } else {
        let hashed_password = await hashing.hashPass(password);

        let new_account = await user_model.createAccount({
          name,
          username,
          password: hashed_password,
          is_admin: 1
        });

        return response.created(
          {
            sign: "4003",
            header: "Success",
            data: new_account[0],
          },
          res, "Register Success!"
        );
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
            header: "Error Localhost",
          },
          res, error.message
        );
      } else {
        return response.error(
          {
            sign: "9999",
            header: "Error Server",
          },
          res, "Ops... we have a problem, please try again later!"
        );
      }
    }
  },


  updateUser: async (req, res, next) => {
    try {
      const { id }  = req.params;
      let { name, username, password } = req.body;
      let account = await user_model.getAccount({ hash:id });
      if (!account) {
        return response.notFound(
          {
            sign: "404",
            header: "Not Found",
          },
          res, "User not found"
        );
      }
      let payload = {};
      if (name) payload.name = name;
      if (username) payload.username = username;
      if (password) payload.password = hashing.hashPass(password);
      let update = await user_model.updateUser({ id, ...payload});
      if(update.length === 0){
        return response.error(
          {
            sign: "500",
            header: "Failed Update",
          },
          res, "User failed to update"
        );
      }else{
        return response.ok(
          {
            sign: "4004",
            header: "Success",
            data: update[0]
          },
          res, "User successfully updated"
        );
      }
    }catch(error){
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            sign: "9998",
            header: "Error Localhost",
          },
          res, error.message
        );
      } else {
        return response.error(
          {
            sign: "9999",
            header: "Error Server",
          },
          res, "Ops... we have a problem, please try again later!"
        );
      }
    }
  },


  deleteUser: async (req, res, next) => {
    try {
      let { id } = req.params;
      let account = await user_model.getAccount({ hash: id});
      if (!account) {
        return response.notFound(
          {
            sign: "400",
            header: "Not Found",
          },
          res, "User not found"
        );
      }
      let data=await user_model.deleteUser({ id });
      data = []
      if(data === 0){
        return response.error(
          {
            sign: "500",
            header: "Failed Delete",
          },
          res, "User failed to delete"
        );
      }else{
        return response.ok(
          {
            sign: "200",
            header: "Success",
          },
          res, "User successfully deleted"
        );
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        if(error.hasOwnProperty("sign")&&error.sign == "23503"){
          return response.error(
            {
              sign: "4046",
            },
            res, "Data cannot be deleted because it is used in other tables"
          );
        }else{
          return response.error(
            {
              sign: "9998",
              message: error.message,
            },
            res
          );
        }
      } else {
        if(error.hasOwnProperty("sign")&&error.sign == "23503"){
          return response.error(
            {
              sign: "4046",
            },
            res, "Data cannot be deleted because it is used in other tables"
          );
        }else{
          return response.error(
            {
              sign: "9999",
            },
            res, "Ops... we have a problem, please try again later!"
          );
        }
      }
    }
  },



};
