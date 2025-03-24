const router = require('express').Router();
const wizardService = require('../services/wizardService.js')
const { validateToken, validateRole } = require('../middlewares/jwtMiddleware.js')

//GET & POST
router
  .route('/')
  .get(async (req, res) => { // Open for all
    const wizards = await wizardService.getAll();
    res.status(200).jsend.success( wizards )
  })
  .post(validateToken, async (req, res) => { // Requires JWT Token
    const { name, gender, ancestry, patronus, isDarkWizard, HouseId } = req.body;

    try {
      const createdWizard = await wizardService.create(name, gender, ancestry, patronus, isDarkWizard, HouseId );
      return res
        .status(201)
        .jsend.success( createdWizard )
    } catch (err) {
      return res.status(400).jsend.fail({
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
  .put(validateRole, async (req, res) => { // Requires role based access
    const id = req.params.id;
    const { name, houseId } = req.body;

    try {
      const updatedWizard = await wizardService.update(id, name, houseId)
      return res.status(200).jsend.success( updatedWizard )
    } catch(err) {
      return res.status(404).jsend.error(err.message);
    }
  })
  .delete(validateRole, async (req, res) => {
    const id = req.params.id

    try {
      await wizardService.remove(id)
      return res.status(204).end()
    } catch(err) {
      return res.status(400).jsend.error(err.message)
    }
  });
  
module.exports = router;
