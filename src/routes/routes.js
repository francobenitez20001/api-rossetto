const router = require("express").Router();

const db = require("../database/database");

const password = "ZAQ12wsx";

router.get("/", (req, res) => {
  res.send("Servidor funcionando con exito");
});

router.get("/quienes_somos", (req, res) => {
  db.query(
    "SELECT contenido FROM recursos WHERE id = 1",
    (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          data: rows,
          info: "Se ejecuto con exito la peticion",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    }
  );
});

router.put("/quienes_somos_modificar", (req, res) => {
  const { contenido, pass } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE recursos SET contenido = ? WHERE id = 1",
      [contenido],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "Se ejecuto con exito la peticion",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "La contraseña ingresada no es compatible.",
    });
  }
});
// FILTERS ------------------------------------

router.get("/filtrar_operacion/:idOperacion/:order", (req, res) => {
  let { idOperacion, order } = req.params;
  if (order == "normal") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idOperacion = ?",
      [idOperacion],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "low") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idOperacion = ? ORDER BY precio ASC",
      [idOperacion],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "high") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idOperacion = ? ORDER BY precio DESC",
      [idOperacion],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  }
});

router.get("/filtrar_categoria/:idCategoria/:order", (req, res) => {
  const { idCategoria, order } = req.params;
  if (order == "normal") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ?",
      [idCategoria],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "high") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ? ORDER BY precio DESC",
      [idCategoria],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "low") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ? ORDER BY precio ASC",
      [idCategoria],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  }
});

router.get("/filtrar_ubicacion/:idLocalidad/:order", (req, res) => {
  const { idLocalidad, order } = req.params;
  if (order == "normal") {
    db.query(
      "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ?",
      [idLocalidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "high") {
    db.query(
      "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ? ORDER BY precio DESC",
      [idLocalidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "low") {
    db.query(
      "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ? ORDER BY precio ASC",
      [idLocalidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  }
});

router.get(
  "/filtrar_todo/:idLocalidad/:idCategoria/:idOperacion/:order/:moneda",
  (req, res) => {
    const { idLocalidad, idCategoria, idOperacion, order, moneda } = req.params;
    if (order == "normal") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ? AND idCategoria = ? AND idOperacion = ? AND moneda = ?",
        [idLocalidad, idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    } else if (order == "high") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ? AND idCategoria = ? AND idOperacion = ? AND moneda = ? ORDER BY precio DESC",
        [idLocalidad, idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    } else if (order == "low") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idLocalidad = ? AND idCategoria = ? AND idOperacion = ? AND moneda = ? ORDER BY precio ASC",
        [idLocalidad, idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    }
  }
);

router.get(
  "/filtrar_categoria_operacion/:idCategoria/:idOperacion/:order/:moneda",
  (req, res) => {
    const { idCategoria, idOperacion, order, moneda } = req.params;
    if (order == "normal") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ? AND idOperacion = ? AND moneda = ?",
        [idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    } else if (order == "low") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ? AND idOperacion = ? AND moneda = ? ORDER BY precio ASC",
        [idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    } else if (order == "high") {
      db.query(
        "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE idCategoria = ? AND idOperacion = ? AND moneda = ? ORDER BY precio DESC",
        [idCategoria, idOperacion, moneda],
        (err, rows, fields) => {
          if (!err) {
            casas = [];
            rows.forEach((inmueble) => {
              casas.push(inmueble.id);
            });
            db.query(
              "SELECT * FROM imagenes WHERE idCasa = ? AND header = true",
              [casas],
              (error, imagen, celdas) => {
                if (!error) {
                  rows.forEach((propiedad) => {
                    imagen.forEach((header) => {
                      if (propiedad.id == header.idCasa) {
                        propiedad.header = header.nombre;
                      }
                    });
                  });

                  res.send({
                    status: true,
                    data: rows,
                    info: "se muestran todas los inmuebles que hay en la DB",
                  });
                } else {
                  res.send({
                    status: false,
                    info: error,
                  });
                }
              }
            );
          } else {
            res.send({
              status: false,
              info: err,
            });
          }
        }
      );
    }
  }
);

// !FILTERS ------------------------------------

// IMAGES

router.post("/insertar_imagen", (req, res) => {
  const { idCasa, nombre, header, pass } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO imagenes(idCasa, nombre, header) VALUES (?, ?, ?)",
      [idCasa, nombre, header],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "imagen insertada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.put("/modificar_imagen", (req, res) => {
  const { id, nombre, header, idCasa, pass } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE imagenes SET idCasa =?, nombre =?, header =? WHERE id = ?",
      [idCasa, nombre, header, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "Imagen modificada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.delete("/borrar_imagen/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query("DELETE FROM imagenes WHERE id=?", [id], (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          info: "se ha borrado con éxito el registro",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    });
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.get("/imagenes", (req, res) => {
  db.query("SELECT * FROM imagenes", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todas las imagenes que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

// IMAGES

//SERVICES

router.post("/insertar_servicio", (req, res) => {
  const {
    idCasa,
    luz,
    agua,
    calefaccion,
    telefono,
    gas,
    internet,
    pass,
  } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO servicios(idCasa, luz, agua, calefaccion, telefono, gas, internet) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idCasa, luz, agua, calefaccion, telefono, gas, internet],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "servicio insertado con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.put("/modificar_servicio", (req, res) => {
  const {
    id,
    idCasa,
    luz,
    agua,
    calefaccion,
    telefono,
    gas,
    internet,
    pass,
  } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE servicios SET idCasa =?, luz =?, agua =?, calefaccion =?, telefono=?, gas=?, internet=? WHERE id = ?",
      [idCasa, luz, agua, calefaccion, telefono, gas, internet, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "Servicio modificado con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.delete("/borrar_servcio/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query("DELETE FROM servicios WHERE id=?", [id], (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          info: "se ha borrado con éxito el registro",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    });
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

router.get("/servicios", (req, res) => {
  db.query("SELECT * FROM servicios", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todos los servicios que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

//SERVICES

// INICIO FUNCIÓN ----- MODIFICAR DATO TECNICO -----

router.put("/modificar_dato_tecnico", (req, res) => {
  const {
    id,
    pass,
    idCasa,
    dormitorios,
    s_terreno,
    s_cubierta,
    s_semicubierta,
    cochera,
    pileta,
  } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE datos_tecnicos SET idCasa =?, dormitorios =?, s_terreno =?, s_cubierta =?, s_semicubierta =?, cochera =?, pileta =? WHERE id = ?",
      [
        idCasa,
        dormitorios,
        s_terreno,
        s_cubierta,
        s_semicubierta,
        cochera,
        pileta,
        id,
      ],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "Dato tecnico modificado con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- MODIFICAR DATO TECNICO -----

// INICIO FUNCIÓN ----- BORRAR DATO TECNICO -----

router.delete("/borrar_dato_tecnico/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query(
      "DELETE FROM datos_tecnicos WHERE id=?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "se ha borrado con éxito el registro",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- BORRAR DATO TECNICO -----

// INICIO FUNCIÓN ----- MOSTRAR DATOS TECNICOS -----

router.get("/datos_tecnicos", (req, res) => {
  db.query("SELECT * FROM datos_tecnicos", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todos los datos tecnicos que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

// FINAL FUNCIÓN ----- MOSTRAR DATOS TECNICOS -----

// INICIO FUNCIÓN ----- INSERTAR DATOS TECNICOS -----

router.post("/insertar_dato_tecnico", (req, res) => {
  const {
    pass,
    idCasa,
    dormitorios,
    s_terreno,
    s_cubierta,
    s_semicubierta,
    cochera,
    pileta,
  } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO datos_tecnicos(idCasa, dormitorios, s_terreno, s_cubierta, s_semicubierta, cochera, pileta) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        idCasa,
        dormitorios,
        s_terreno,
        s_cubierta,
        s_semicubierta,
        cochera,
        pileta,
      ],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "operacion insertada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- INSERTAR DATOS TECNICOS -----

// INICIO FUNCIÓN ----- INSERTAR INMUEBLES -----

router.post("/insertar_inmueble", (req, res) => {
  const {
    idOperacion,
    precio,
    idLocalidad,
    direccion,
    idCategoria,
    descripcion,
    estado,
    moneda,
    pass,
  } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO inmuebles(idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado, moneda) VALUES (? , ?, ?, ? , ?, ?, ?, ?)",
      [
        idOperacion,
        precio,
        idLocalidad,
        direccion,
        idCategoria,
        descripcion,
        estado,
        moneda,
      ],
      (err, rows, fields) => {
        if (!err) {
          db.query(
            "SELECT id FROM inmuebles ORDER BY id DESC LIMIT 1",
            [
              idOperacion,
              precio,
              idLocalidad,
              direccion,
              idCategoria,
              descripcion,
              estado,
              moneda,
            ],
            (error, filas, celdas) => {
              if (!error) {
                res.send({
                  status: true,
                  data: filas,
                  info: "operacion insertada con éxito",
                });
              } else {
                res.send({
                  status: false,
                  info: err,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- INSERTAR INMUEBLES -----

// INICIO FUNCIÓN ----- MOSTRAR INMUEBLES -----

router.get("/listar_inmuebles/:cantidad/:order", (req, res) => {
  const cantidad = parseInt(req.params.cantidad);
  const order = req.params.order;
  if (order == "normal") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id ORDER BY inmuebles.id DESC LIMIT ?",
      [cantidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa IN (?) AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "high") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id ORDER BY inmuebles.precio DESC LIMIT ?",
      [cantidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa IN (?) AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else if (order == "low") {
    db.query(
      "SELECT  ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id ORDER BY inmuebles.precio ASC LIMIT ?",
      [cantidad],
      (err, rows, fields) => {
        if (!err) {
          casas = [];
          rows.forEach((inmueble) => {
            casas.push(inmueble.id);
          });
          db.query(
            "SELECT * FROM imagenes WHERE idCasa IN (?) AND header = true",
            [casas],
            (error, imagen, celdas) => {
              if (!error) {
                rows.forEach((propiedad) => {
                  imagen.forEach((header) => {
                    if (propiedad.id == header.idCasa) {
                      propiedad.header = header.nombre;
                    }
                  });
                });

                res.send({
                  status: true,
                  data: rows,
                  info: "se muestran todas los inmuebles que hay en la DB",
                });
              } else {
                res.send({
                  status: false,
                  info: error,
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  }
});

// FINAL FUNCIÓN ----- MOSTRAR INMUEBLES -----

// INICIO FUNCIÓN ----- DETALLAR INMUEBLE X ID-----

router.get("/detallar_inmueble_id/:id", (req, res) => {
  const id = req.params.id;
  if (id != undefined) {
    db.query(
      "SELECT ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria,servicios.*, datos_tecnicos.*, inmuebles.* FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id LEFT JOIN servicios ON inmuebles.id = servicios.idCasa LEFT JOIN datos_tecnicos ON inmuebles.id = datos_tecnicos.idCasa WHERE inmuebles.id = ?;",
      [id],
      (err, rows, fields) => {
        if (!err) {
          db.query(
            "SELECT * FROM imagenes WHERE idCasa = ?",
            [id],
            (error, images, celdas) => {
              if (!error) {
                res.send({
                  status: true,
                  data: rows,
                  imagenes: images,
                  info: "Se muestran todos los detalles de la casa con ese id",
                });
              } else {
                res.send({
                  status: false,
                  info: "Problemas en el segundo Query (Imagenes)",
                });
              }
            }
          );
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "No has ingresado ningun id para buscar",
    });
  }
});

// FINAL FUNCIÓN ----- DETALLAR INMUEBLE X ID -----

// INICIO FUNCIÓN ----- MODIFICAR INMUEBLE -----

router.put("/modificar_inmueble", (req, res) => {
  const {
    id,
    pass,
    idOperacion,
    precio,
    idLocalidad,
    direccion,
    idCategoria,
    descripcion,
    estado,
    moneda,
  } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE inmuebles SET idOperacion = ?, precio = ?, idLocalidad = ?, direccion = ?, idCategoria = ?, descripcion = ?, estado = ?, moneda = ? WHERE id = ?",
      [
        idOperacion,
        precio,
        idLocalidad,
        direccion,
        idCategoria,
        descripcion,
        estado,
        moneda,
        id,
      ],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "inmueble modificado con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- MODIFICAR INMUEBLE -----

// INICIO FUNCIÓN ----- BORRAR INMUEBLE -----

router.delete("/borrar_inmueble/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query(
      "DELETE FROM datos_tecnicos WHERE idCasa = ?;DELETE FROM servicios WHERE idCasa = ?;DELETE FROM imagenes WHERE idCasa = ?;DELETE FROM inmuebles WHERE id = ?;",
      [id, id, id, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "se ha borrado con éxito el registro",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- BORRAR INMUEBLE -----

// INICIO FUNCIÓN ----- BORRAR UBICACIÓN -----

router.delete("/borrar_ubicacion/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query("DELETE FROM ubicacion WHERE id=?", [id], (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          info: "se ha borrado con éxito el registro",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    });
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- BORRAR UBICACIÓN -----

// INICIO FUNCIÓN ----- MOSTRAR UBICACIÓN -----

router.get("/ubicaciones", (req, res) => {
  db.query("SELECT * FROM ubicacion", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todas las ubicaciones que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

// FINAL FUNCIÓN ----- MOSTRAR UBICACIÓN -----

// INICIO FUNCIÓN ----- BUSCAR LOCALIDADES -----

router.get("/buscar_localidades/:partido", (req, res) => {
  const partido = req.params.partido;
  if (partido != undefined) {
    db.query(
      "SELECT * FROM ubicacion WHERE partido LIKE ? ",
      [partido],
      (err, rows, fields) => {
        if (!err) {
          console.log(rows);
          res.send({
            status: true,
            data: rows,
            info:
              "se muestran todas las categorias con ese id que hay en la DB",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "No has ingresado ningun id para buscar",
    });
  }
});

// FINAL FUNCIÓN ----- BUSCAR LOCALIDADES -----

// INICIO FUNCIÓN ----- BUSCAR UBICACION -----

router.get("/buscar_ubicacion/:id", (req, res) => {
  const id = req.params.id;
  if (id != undefined) {
    db.query(
      "SELECT * FROM ubicacion WHERE id LIKE ? ",
      [id],
      (err, rows, fields) => {
        if (!err) {
          console.log(rows);
          res.send({
            status: true,
            data: rows,
            info:
              "se muestran todas las categorias con ese id que hay en la DB",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "No has ingresado ningun id para buscar",
    });
  }
});

// FINAL FUNCIÓN ----- BUSCAR UBICACION -----

// INICIO FUNCIÓN ----- INSERTAR UBICACIÓN -----

router.post("/insertar_ubicacion", (req, res) => {
  const { partido, localidad, pass } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO ubicacion(partido, localidad) VALUES (? , ?)",
      [partido, localidad],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "operacion insertada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- INSERTAR UBICACIÓN -----

// INICIO FUNCIÓN ----- MODIFICAR UBICACIÓN -----

router.put("/modificar_ubicacion", (req, res) => {
  const { id, partido, localidad, pass } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE ubicacion SET partido = ? , localidad = ? WHERE id = ?",
      [partido, localidad, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "ubicacion modificada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- MODIFICAR UBICACIÓN -----

// INICIO FUNCIÓN ----- BORRAR TIPO DE OPERACIÓN -----

router.delete("/borrar_operacion/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query(
      "DELETE FROM tipo_operacion WHERE id=?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "se ha borrado con éxito el registro",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- BORRAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----

router.get("/operaciones", (req, res) => {
  db.query("SELECT * FROM tipo_operacion", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todas las operaciones que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

// FINAL FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----

router.get("/buscar_operacion/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM tipo_operacion WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          data: rows,
          info: "se muestran todas las operaciones que hay en la DB",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    }
  );
});

// FINAL FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- INSERTAR TIPO DE OPERACIÓN -----

router.post("/insertar_operacion", (req, res) => {
  const { operacion, pass } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO tipo_operacion(operacion) VALUES (?)",
      [operacion],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "operacion insertada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- INSERTAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- MODIFICAR TIPO DE OPERACIÓN -----

router.put("/modificar_operacion", (req, res) => {
  const { id, operacion, pass } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE tipo_operacion SET operacion = ? WHERE id = ?",
      [operacion, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "operacion modificada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- MODIFICAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- BORRAR CATEGORIA -----

router.delete("/borrar_categoria/:id/:pass", (req, res) => {
  const { id, pass } = req.params;
  if (pass == password) {
    db.query("DELETE FROM categorias WHERE id=?", [id], (err, rows, fields) => {
      if (!err) {
        res.send({
          status: true,
          info: "se ha borrado con éxito el registro",
        });
      } else {
        res.send({
          status: false,
          info: err,
        });
      }
    });
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- BORRAR CATEGORIA -----

// INICIO FUNCIÓN ----- MOSTRAR CATEGORIAS -----

router.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categorias", (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows,
        info: "se muestran todas las categorias que hay en la DB",
      });
    } else {
      res.send({
        status: false,
        info: err,
      });
    }
  });
});

// FINAL FUNCIÓN ----- MOSTRAR CATEGORIAS -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

router.get("/buscar_categoria_id/:id", (req, res) => {
  const id = req.params.id;
  if (id != undefined) {
    db.query(
      "SELECT * FROM categorias WHERE id LIKE ? ",
      [id],
      (err, rows, fields) => {
        if (!err) {
          console.log(rows);
          res.send({
            status: true,
            data: rows,
            info:
              "se muestran todas las categorias con ese id que hay en la DB",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "No has ingresado ningun id para buscar",
    });
  }
});

// FINAL FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X NOMBRE -----

router.get("/buscar_categoria_nombre/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  if (categoria != undefined) {
    db.query(
      "SELECT * FROM categorias WHERE categoria LIKE ? ",
      [categoria],
      (err, rows, fields) => {
        if (!err) {
          console.log(rows);
          res.send({
            status: true,
            data: rows,
            info:
              "se muestran todas las categorias con ese nombre que hay en la DB",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "No has ingresado ningun nombre de categoria para buscar",
    });
  }
});

// FINAL FUNCIÓN ----- BUSCAR CATEGORIA X NOMBRE -----

// INICIO FUNCIÓN ----- INSERTAR CATEGORIA -----

router.post("/insertar_categoria", (req, res) => {
  const { categoria, pass } = req.body;
  if (pass == password) {
    db.query(
      "INSERT INTO categorias(categoria) VALUES (?)",
      [categoria],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "categoria insertada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- INSERTAR CATEGORIA -----

// INICIO FUNCIÓN ----- MODIFICAR CATEGORIA -----

router.put("/modificar_categoria", (req, res) => {
  const { id, categoria, pass } = req.body;
  if (pass == password) {
    db.query(
      "UPDATE categorias SET categoria = ? WHERE id = ?",
      [categoria, id],
      (err, rows, fields) => {
        if (!err) {
          res.send({
            status: true,
            info: "categoria modificada con éxito",
          });
        } else {
          res.send({
            status: false,
            info: err,
          });
        }
      }
    );
  } else {
    res.send({
      status: false,
      info: "la contraseña ingresada no es compatible",
    });
  }
});

// FINAL FUNCIÓN ----- MODIFICAR CATEGORIA -----

module.exports = router;
