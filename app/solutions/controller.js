const model = require('./model');

/**
 * Solutions Controllers
 */
const getAllSolutions = async (req, res) => {
  try {
    const solutions = await model.getAllSolutions();
    return res.status(200).json(solutions);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching solutions', error: error.message });
  }
};

const getSolutionsByBusinessLine = async (req, res) => {
  try {
    const businessLine = req.params.businessLine;
    const solutions = await model.getSolutionsByBusinessLine(businessLine);
    return res.status(200).json(solutions);
  } catch (error) {
    console.error('Error fetching solutions by business line:', error);
    return res.status(500).json({
      message: 'Error fetching solutions by business line',
      error: error.message,
    });
  }
};

const getSolutionById = async (req, res) => {
  try {
    const id = req.params.id;
    const solution = await model.getSolutionById(id);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    // Get solution products for this solution
    const products = await model.getProductsBySolutionId(id);

    // Return solution with its products
    return res.status(200).json({
      ...solution,
      products,
    });
  } catch (error) {
    console.error('Error fetching solution:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching solution', error: error.message });
  }
};

const createSolution = async (req, res) => {
  try {
    const newSolution = await model.createSolution(req.body);
    return res.status(201).json(newSolution);
  } catch (error) {
    console.error('Error creating solution:', error);
    return res
      .status(500)
      .json({ message: 'Error creating solution', error: error.message });
  }
};

const updateSolution = async (req, res) => {
  try {
    const id = req.params.id;
    const solution = await model.getSolutionById(id);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    const updatedSolution = await model.updateSolution(id, req.body);
    return res.status(200).json(updatedSolution);
  } catch (error) {
    console.error('Error updating solution:', error);
    return res
      .status(500)
      .json({ message: 'Error updating solution', error: error.message });
  }
};

const deleteSolution = async (req, res) => {
  try {
    const id = req.params.id;
    const solution = await model.getSolutionById(id);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    const deleted = await model.deleteSolution(id);

    if (deleted) {
      return res.status(200).json({ message: 'Solution deleted successfully' });
    } else {
      return res.status(500).json({ message: 'Error deleting solution' });
    }
  } catch (error) {
    console.error('Error deleting solution:', error);
    return res
      .status(500)
      .json({ message: 'Error deleting solution', error: error.message });
  }
};

/**
 * Solution Products Controllers
 */
const getProductsBySolutionId = async (req, res) => {
  try {
    const solutionId = req.params.solutionId;
    const solution = await model.getSolutionById(solutionId);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    const products = await model.getProductsBySolutionId(solutionId);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching solution products by solution id:', error);
    return res.status(500).json({
      message: 'Error fetching solution products by solution id',
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await model.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Solution product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching solution product:', error);
    return res.status(500).json({
      message: 'Error fetching solution product',
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { solution_id } = req.body;
    const solution = await model.getSolutionById(solution_id);

    if (!solution) {
      return res
        .status(400)
        .json({ message: 'Invalid solution_id - solution not found' });
    }

    const newProduct = await model.createProduct(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating solution product:', error);
    return res.status(500).json({
      message: 'Error creating solution product',
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await model.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Solution product not found' });
    }

    // If solution_id is being updated, verify it exists
    if (req.body.solution_id && req.body.solution_id !== product.solution_id) {
      const solution = await model.getSolutionById(req.body.solution_id);
      if (!solution) {
        return res
          .status(400)
          .json({ message: 'Invalid solution_id - solution not found' });
      }
    }

    const updatedProduct = await model.updateProduct(id, req.body);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating solution product:', error);
    return res.status(500).json({
      message: 'Error updating solution product',
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await model.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Solution product not found' });
    }

    const deleted = await model.deleteProduct(id);

    if (deleted) {
      return res
        .status(200)
        .json({ message: 'Solution product deleted successfully' });
    } else {
      return res
        .status(500)
        .json({ message: 'Error deleting solution product' });
    }
  } catch (error) {
    console.error('Error deleting solution product:', error);
    return res.status(500).json({
      message: 'Error deleting solution product',
      error: error.message,
    });
  }
};

/**
 * Complete Data Controller
 */
const getCompleteSolutionsData = async (req, res) => {
  try {
    const completeData = await model.getCompleteSolutionsData();
    return res.status(200).json(completeData);
  } catch (error) {
    console.error('Error fetching complete solutions data:', error);
    return res.status(500).json({
      message: 'Error fetching complete solutions data',
      error: error.message,
    });
  }
};

module.exports = {
  // Solutions
  getAllSolutions,
  getSolutionsByBusinessLine,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution,

  // Solution Products
  getProductsBySolutionId,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  // Complete Data
  getCompleteSolutionsData,
};
