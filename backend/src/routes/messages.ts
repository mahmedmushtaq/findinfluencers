import { Router } from "express";
import axios from "axios";
import { getMessageServerUrl } from "../utils/utils";

const router = Router();

router.get("/*", async (req, res) => {
  // const response = await axios.get()
  console.log("get request is = ", req.headers);
  const url = getMessageServerUrl(req);

  try {
    const response = await axios.get(url, {
      headers: { authorization: req.headers.authorization },
    });
    console.log("response is ", response);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

router.post("/*", async (req, res) => {
  // const response = await axios.get()
  const url = getMessageServerUrl(req);

  try {
    const response = await axios.post(
      url,
      JSON.parse(JSON.stringify(req.body)),
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );
    console.log("response is ", response.data);
    res.send(response.data);
  } catch (err) {
    console.log("err is occured ", err);
    res.status(500).send(err);
  }
});
router.put("/*", async (req, res) => {
  // const response = await axios.get()
  const url = getMessageServerUrl(req);

  try {
    const response = await axios.put(url, req.body, {
      headers: {
        authorization: req.headers.authorization,
      },
    });
    console.log("response is ", response);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/*", async (req, res) => {
  // const response = await axios.get()
  const url = getMessageServerUrl(req);

  try {
    const response = await axios.patch(url, req.body, {
      headers: {
        authorization: req.headers.authorization,
      },
    });
    console.log("response is ", response);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete("/*", async (req, res) => {
  // const response = await axios.get()
  const url = getMessageServerUrl(req);

  try {
    const response = await axios.delete(url, {
      headers: {
        authorization: req.headers.authorization,
      },
    });
    console.log("response is ", response);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
