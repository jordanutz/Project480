module.exports = {
  get: (req, res) => {
    const db = req.app.get('db');
    db.get_worship().then(member => res.status(200).send(member))
    .catch(error => console.log(error))
  },

  post: (req, res) => {
    const db = req.app.get('db');
    const {name, university, graduation, major, instrument, image, admin_id} = req.body.worshipInput
    db.create_worship([name, university, graduation, major, instrument, image, admin_id])
    .then( res => res.status(200).send(res))
    .catch( error => console.log(error))
  },

  update: (req, res) => {
    const db = req.app.get('db');
    const {name, university, graduation, major, instrument, image} = req.body
    const {params, body} = req;
    db.update_worship([params.id, name, university, graduation, major, instrument, image])
    .then( res => res.status(200).send(res))
    .catch(error => console.log(error))
  },

  delete: (req, res) => {
    const db = req.app.get('db');
    const {params} = req;
    console.log('PARAMS======================', params);
    db.delete_worship([params.id])
    .then( res => res.status(200).send(res))
    .catch(error => console.log(error))
  }
}
