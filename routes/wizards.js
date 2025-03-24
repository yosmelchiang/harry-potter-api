const router = require('express').Router();
const wizardService = require(process.cwd() + '/services/wizardService');
const { validateToken } = require('../middlewares/jwtMiddleware.js')

//GET & POST
router
  .route('/')
  .get(async (req, res) => {
    const wizards = await wizardService.getAll();
    res.status(200).json({ data: wizards });
  })
  .post(validateToken, async (req, res) => {
    const { name, houseId } = req.body;

    try {
      const createdWizard = await wizardService.create(name, houseId);
      return res
        .status(201)
        .json({ message: 'Resource successfully created', data: createdWizard });
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors.map((e) => {
          return {
            message: e.message,
            path: e.path
          };
        })
      });
    }
  });

//PUT & DELETE
router
  .route('/:id')
  .put(async (req, res) => {
    const id = req.params.id;
    const { name, houseId } = req.body;

    try {
      const updatedWizard = await wizardService.update(id, name, houseId)
      return res.status(200).json({ data: updatedWizard})
    } catch(err) {
      return res.status(404).json({ error: err.message });
    }
  })
  .delete( async (req, res) => {
    const id = req.params.id

    try {
      await wizardService.remove(id)
      return res.status(204).end()
    } catch(err) {
      return res.status(400).json({error: err.message})
    }
  });
module.exports = router;
