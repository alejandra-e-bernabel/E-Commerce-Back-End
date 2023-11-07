const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    try {
        const categoryResult = await Category.findAll({ include: [Product] });
        res.json(categoryResult);
    } catch (err) {
        res.status(500).json(err);
    }
    // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    try{ const categoryResult = await Category.findOne(
        {
            where: {
                id: req.params.id
            }, 
            include: [Product]
        }
)

    res.json(categoryResult)
    // be sure to include its associated Products
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    // create a new category
   try { const categoryData = Category.create ({
        category_name: req.body.category_name
    })

    res.json(categoryData);
    } catch(err) {
        res.status(500).json(err)
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(
        {
            category_name: req.body.category_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then((updatedbook)=> {
        res.json(updatedbook);
    })
    .catch((err)=> {
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id : req.params.id
        },
    })
    .then((deletedCategory)=> {
        res.json(deletedCategory)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
});

module.exports = router;