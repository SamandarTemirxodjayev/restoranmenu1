const Banner = require("../models/Banner");
const Catalog = require("../models/Catalog");
const Menu = require("../models/Menu");

exports.index = (req, res) => {
  res.json({ message: "Hello World!" });
};
exports.addCatalog = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Catalog name is required" });
  }
  const newCatalog = new Catalog({ name });
  newCatalog
    .save()
    .then((catalog) => {
      res.json({catalog});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error creating new catalog" });
    });
};
exports.getCatalogs = (req, res) => {
  Catalog.find()
    .then((catalogs) => {
      res.json({catalogs});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error retrieving catalogs" });
    });
};
exports.deleteCatalog = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Catalog id is required" });
  }
  Catalog.findByIdAndDelete(id)
    .then((catalog) => {
      res.json(catalog);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error deleting catalog" });
    });
};
exports.updateCatalog = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Catalog id is required" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Catalog name is required" });
  }
  Catalog.findByIdAndUpdate(id, { name }).then((catalog) => {
    return res.status(200).json(catalog);
  });
};

exports.addBanner = (req, res) => {
  const { photo_url } = req.body;
  if (!photo_url) {
    return res.status(400).json({ message: "Banner photo_url is required" });
  }
  const newBanner = new Banner({ photo_url });
  newBanner
    .save()
    .then((banner) => {
      res.json({banner});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error creating new banner" });
    });
};
exports.getBanners = (req, res) => {
  Banner.find().then((banners) => {
    res.json({banners});
  });
};
exports.updateBanner = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Banner id is required" });
  }
  const { photo_url } = req.body;
  if (!photo_url) {
    return res.status(400).json({ message: "Banner photo_url is required" });
  }
  Banner.findByIdAndUpdate(id, { photo_url }).then((banner) => {
    return res.status(200).json(banner);
  });
};
exports.deleteBanner = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Banner id is required" });
  }
  Banner.findByIdAndDelete(id)
    .then((banner) => {
      res.json(banner);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error deleting banner" });
    });
};
exports.addMenu = (req, res) => {
  const { name, photo_url, description, price, category_id } = req.body;
  console.log(name, photo_url, description, price, category_id);
  if (!name || !photo_url || !description || !price || !category_id) {
    return res.status(400).json({
      message:
        "Menu name, photo_url, description, price, category_id is required",
    });
  }
  const newMenu = new Menu({
    name,
    photo_url,
    description,
    price,
    category_id,
  });
  newMenu
    .save()
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error creating new menu" });
    });
};
exports.getMenus = (req, res) => {
  Menu.find().then((menus) => {
    res.json({menus});
  });
};
exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Menu id is required" });
  }
  Menu.findByIdAndDelete(id)
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error deleting menu" });
    });
};
exports.getCatalogMenus = (req, res) => {
  const {id} = req.params;
  if (!id) {
    return res.status(400).json({ message: "Catalog id is required" });
  }
  Menu.find({category_id: id})
  .then((menus) => {
      res.json({menus});
    })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error retrieving menus" });
    });
}
exports.getMenuById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Menu id is required" });
  }
  Menu.findById(id)
  .then((menu) => {
      res.json({menu});
    })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error retrieving menu" });
    });
}