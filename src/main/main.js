const express = require("express");
const router = express.Router();
const {
  postCardapio,
  todosOsCardpio,
  dropCollection,
  updateCardapio,
} = require("../databases/querys");

const { getAllCardapio } = require("../cardapio/getCardapio");

router.get("/", async (req, res) => {
  res.send("ok");
});

router.post("/new", async (req, res) => {
  main();
  res.send("ok");
});

router.get("/api", async (req, res) => {
  const resolute = await todosOsCardpio((doc) => doc);
  if (resolute.length > 6) {
    await dropCollection((e) => {
      if (e) {
        main();
        return;
      }
    });
  }
  res.json(resolute);
});

router.post("/drop", async (req, res) => {
  await dropCollection((e) => {
    if (e) {
      main();
      return res.send(e);
    } else {
      res.send(e);
    }
  });
});

router.post("/update", async (req, res) => {
  await update((callback) => {
    //console.log(callback);
  });
  res.send("ok");
});

async function update(callback) {
  await getAllCardapio(async (next) => {
    updateCardapio(await next, (e) => {
      //console.log(e);
      return callback(e);
    });
  });
}

function main() {
  getAllCardapio(async (next) => {
    postCardapio(await next, (e) => {
      // console.log("writing cardapio no database");
    });
  });
}

module.exports = { main, router };
