module.exports = {
  get: (req, res) => {
    const db = req.app.get('db');
    db.get_outreach().then(item => res.status(200).send(item))
    .catch(error => console.log('Error in retrieving items', error))
  },

  post: (req, res) => {
    console.log(req.body)
    const db = req.app.get('db');
    const {name, date, location, time, description} = req.body.outreachInput
    db.create_outreach([name, date, location, time, description])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in posting item', error))
  },

  update: (req, res) => {
    const db = req.app.get('db');
    const {params, body} = req;
    const {name, date, location, time, description} = req.body
    db.update_outreach([params.id, name, date, location, time, description])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in updating item', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db');
    const {params} = req;
    db.delete_outreach([params.id])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in deleting item', error))
  }
}
