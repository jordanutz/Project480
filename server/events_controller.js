module.exports = {
  get: (req, res) => {
    const db = req.app.get('db');
    db.get_events()
    .then(event => res.status(200).send(event))
    .catch(error => console.log('Unexpected error in retrieving events', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    const {name, date, time} = req.body.eventInput;
    db.create_events([name, date, time])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in posting events', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    const {params, body} = req;
    db.update_events([params.id, body.name, body.date, body.time])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in updating events', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.delete_events([params.id])
    .then( (response) => res.status(200).send(response))
    .catch(error => console.log('Unexpected error in deleting events', error))
  }
}
