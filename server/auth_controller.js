module.exports = {
  postAdmin: (req, res) => {
    const db = req.app.get('db');
    db.create_admin().then(item => res.status(200).send(item))
    .catch(error => console.log(error));
  },
  postLogin: (req, res) => {
    const db = req.app.get('db');
    db.create_admin()
    .then(item => res.status(200).send(item))
    .catch(error => console.log(error))
  }
}
