class HomeController {
  index(req, res) {
    res.json({
      msg: 'Ola bem ?',
    });
  }
}

export default new HomeController();
