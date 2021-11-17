class FotoController {
  /** Store */
  async store(req, res) {
    res.json(req.file);
  }
}

export default new FotoController();
