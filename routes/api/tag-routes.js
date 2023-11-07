const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagResults = await Tag.findAll({ include: [{ model: Product, through: ProductTag, }] })
    res.json(tagResults);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagResults = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, through: ProductTag, }]
    });

    res.json(tagResults);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = Tag.create({
      tag_name: req.body.category_name
    })

    res.json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((updatedTag)=> {
    res.json(updatedTag);
  }) 
  .catch((err)=> {
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;