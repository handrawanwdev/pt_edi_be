const biodata_model = require("../model/biodata.model.js");
const response = require("../helper/response");

module.exports = {
  getAllData: async (req, res) => {
    try {
      let data = await biodata_model.getAllData(req.query);

      return response.ok(data, res, "Sukses menampilkan data");
    } catch (error) {
      console.log(error);
      return response.error({}, res, error.message);
    }
  },

  getDataById: async (req, res) => {
    try {
      let data = await biodata_model.getDataById(req.params.id);

      if(data){
        return response.ok(data, res, "Sukses menampilkan data by id");
      }else{
        return response.notFound({}, res, "Data tidak ditemukan");
      }

    } catch (error) {
      console.log(error);
      return response.error({}, res, error.message);
    }
  },

  insertData: async (req, res) => {
    try {
      await biodata_model.insertData(req.body);

      return response.created(req.body, res, "Data berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      return response.error({}, res, error.message);
    }
  },

  updateData: async (req, res) => {
    try {
      await biodata_model.updateData(req.params.id, req.body);

      return response.ok(req.body, res, "Data berhasil diupdate");
    } catch (error) {
      console.log(error);
      return response.error({}, res, error.message);
    }
  },

  deleteData: async (req, res) => {
    try {
      let data = await biodata_model.deleteData(req.params.id);

      if (data == 0) {
        return response.notFound({}, res, "Data tidak ditemukan");
      } else {
        return response.ok(req.body, res, "Data berhasil dihapus");
      }
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        if (error.hasOwnProperty("code") && error.code == "23503") {
          return response.error(
            {
              code: "4046",
              message:
                "Data cannot be deleted because it is used in other tables",
            },
            res
          );
        } else {
          return response.error(
            {
              code: "9998",
              message: error.message,
            },
            res
          );
        }
      } else {
        if (error.hasOwnProperty("code") && error.code == "23503") {
          return response.error(
            {
              code: "4046",
              message:
                "Data cannot be deleted because it is used in other tables",
            },
            res
          );
        } else {
          return response.error(
            {
              code: "9999",
              message: "Ops... we have a problem, please try again later!",
            },
            res
          );
        }
      }
    }
  },
};
