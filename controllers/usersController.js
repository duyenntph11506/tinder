const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      return cb(null, true);
    }
    cb("Only image files (jpg,gif,png) are accepted!", false);
  },
}).array("avatars");

function statusCode(code = undefined, message = undefined, data = undefined) {
  return (baseJson = {
    code: code,
    message: message,
    data: data,
  });
}

class UsersController {
  readUsers(req, res, next) {
    userSchema.find({}, function (err, users) {
      if (err) {
        return console.log(err);
      }
      res.render("users", { users });
    });
  }

  updateUser(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        var update = {
          userName: req.body.userName,
          password: req.body.password,
          birthDay: req.body.birthDay,
          email: req.body.email,
          gender: req.body.gender,
          hobbies: req.body.hobbies,
          description: req.body.description,
          avatars: req.files.map((file) => "upload/" + file.filename),
        };
        userSchema
          .findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), update)
          .then(function (user) {
            res.redirect("/users");
          })
          .catch((err) => console.log(err));
      }
    });
  }

  deleteUser(req, res, next) {
    userSchema.deleteOne({ _id: req.body._id }, function (err, user) {
      console.log("Deleted");
      res.redirect("/users");
    });
  }

  insertUser(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        const user = new userSchema({
          userName: req.body.userName,
          password: req.body.password,
          birthDay: req.body.birthDay,
          email: req.body.email,
          gender: req.body.gender,
          hobbies: req.body.hobbies,
          description: req.body.description,
          avatars: req.files.map((file) => "upload/" + file.filename),
        });
        user.save(function (err) {
          if (err) console.log(err);
          else res.redirect("/users");
        });
      }
    });
  }

  findUsers(req, res, next) {
    userSchema
      .find({ userName: req.query.user })
      .exec()
      .then((users) => {
        if (users.length === 0) {
          return res.render("listUserSearch", {
            userName: req.query.user,
            error: 404,
          });
        }
        res.render("listUserSearch", {
          users,
          userName: req.query.user,
        });
      })
      .catch((err) => console.log(err));
  }

  findUser(req, res, next) {
    userSchema.findById(
      mongoose.Types.ObjectId(req.params.id),
      function (err, user) {
        if (err) console.log(err);
        else res.render("detailUser", { user, avatars: user.avatars });
      }
    );
  }

  readUsersApi(req, res, next) {
    userSchema.find({}, function (err, users) {
      if (err) {
        return res.json(statusCode(500, "Server Error", err));
      }
      res.json(statusCode(200, "Success", users));
    });
  }

  insertUserApi(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.json(statusCode(400, err));
      } else {
        const user = new userSchema({
          userName: req.body.userName,
          password: req.body.password,
          birthDay: req.body.birthDay,
          email: req.body.email,
          gender: req.body.gender,
          hobbies: req.body.hobbies,
          description: req.body.description,
          avatars: req.files.map((file) => "upload/" + file.filename),
        });
        user.save(function (err) {
          if (err) res.json(statusCode(500, "Server Error", err));
          else res.json(statusCode(200, "Success", user));
        });
      }
    });
  }

  updateUserApi(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.json(statusCode(400, err));
      } else {
        var update = {
          userName: req.body.userName,
          password: req.body.password,
          birthDay: req.body.birthDay,
          email: req.body.email,
          gender: req.body.gender,
          hobbies: req.body.hobbies,
          description: req.body.description,
          avatars: req.files.map((file) => "upload/" + file.filename),
        };
        userSchema
          .findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), update)
          .then(function (user) {
            if (user) {
              res.json(statusCode(200, "Success", user));
            } else {
              res.json(statusCode(404, "Not Found", err));
            }
          })
          .catch((err) => {
            res.json(statusCode(500, "Server Error", err));
          });
      }
    });
  }

  deleteUserApi(req, res, next) {
    userSchema.deleteOne({ _id: req.body._id }, function (err, user) {
      return err
        ? res.json(statusCode(404, "Not Found", err))
        : res.json(statusCode(200, "Success", user));
    });
  }

  findUserApi(req, res, next) {
    userSchema.findById(
      mongoose.Types.ObjectId(req.body._id),
      function (err, user) {
        return err
          ? res.json(statusCode(404, "Not Found", err))
          : res.json(statusCode(200, "Success", user));
      }
    );
  }

}

module.exports = new UsersController();
