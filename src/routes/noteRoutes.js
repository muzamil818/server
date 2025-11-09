const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user });
    res.json(note);
  } catch (err) {
    console.error(err);
  }
});
// create note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, pinned } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = new Note({
      user: req.user,
      title,
      content,
      pinned: !!pinned,
    });

    await note.save();

    res.status(201).json(note);
  } catch (err) {
    console.error("🔥 POST /api/note error:", err); // 👈 log the actual error
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// updating the note
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user)
      return res.status(403).json({ messsage: "No Authorization" });

    const { title, content, pinned } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (pinned !== undefined) note.pinned = pinned;

    await note.save();
    res.status(200).json({message:"note saved ", note})
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});
//deleting the created note
router.delete("/:id", auth, async (req, res) => {
    try{
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user)
    return res.status(403).json({ messsage: "No Authorization" });

 await note.deleteOne()
 res.send("note deleted")
}catch (err) {
      console.error("🔥 POST /api/note error:", err);

    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router