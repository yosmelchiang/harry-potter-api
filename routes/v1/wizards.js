const router = require('express').Router()

//GET
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
  // console.log(req.body)
  res.status(201).json( {message: 'Resource successfully created', data: req.body})
})

router.route('/:id')
.put((req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  res.status(200).json( {message: 'Resource updated', data: 
    {
      id: req.params.id,
      name: req.body.name
    }
    })
})
.delete((req, res) => {
  console.log('Resource deleted')
  res.status(204).send()
})
module.exports = router