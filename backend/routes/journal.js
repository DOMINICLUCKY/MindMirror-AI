const express = require('express');
const router = express.Router();

// In-memory storage
let journals = [];

// GET: Get all journals
router.get('/', (req, res) => {
  res.json({ success: true, journals });
});

// POST: Create a new journal entry
router.post('/', (req, res) => {
  try {
    const { title, content, mood, date = new Date().toISOString() } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const journal = {
      id: journals.length + 1,
      title: title || `Journal Entry ${journals.length + 1}`,
      content,
      mood,
      date,
      createdAt: new Date()
    };

    journals.push(journal);
    res.json({ success: true, journal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// GET: Get a specific journal
router.get('/:id', (req, res) => {
  try {
    const journal = journals.find(j => j.id === parseInt(req.params.id));
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    res.json({ success: true, journal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal' });
  }
});

// DELETE: Delete a journal entry
router.delete('/:id', (req, res) => {
  try {
    const index = journals.findIndex(j => j.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    journals.splice(index, 1);
    res.json({ success: true, message: 'Journal deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete journal' });
  }
});

module.exports = router;
