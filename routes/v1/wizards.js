const router = require('express').Router()

//GET & POST
router.route('/')
.get( (req, res) => {
  const wizards = [ 
    {
      id: 1,
      name: 'Harry Potter'
    },
    {
      id: 2,
      name: 'Hermione Grander'
    }
  ]
  res.status(200).json( { data: wizards } )
})
.post((req, res) => {
  res.status(201).json( {message: 'Resource successfully created', data: req.body})
})

//PUT & DELETE
router.route('/:id')
.put((req, res) => {
  res.status(200).json( {message: 'Resource updated', data: 
    {
      id: +req.params.id, //converted to a number
      name: req.body.name
    }
    })
})
.delete((req, res) => {
  res.status(204).send()
})
module.exports = router