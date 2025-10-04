// Mock compatibility logic
exports.getCompatibility = async (req, res) => {
  try {
    const { brandId, influencerId } = req.params;

    // ⚡ Later, you’ll fetch brand + influencer from DB
    // and calculate score based on demographics, niche, etc.

    // For now, mock logic:
    const score = Math.floor(Math.random() * 41) + 60; // random between 60–100
    let message = "";

    if (score > 80) message = "🔥 Strong brand-influencer alignment!";
    else if (score > 70) message = "✅ Good fit, worth testing.";
    else message = "⚠️ Weak alignment, proceed cautiously.";

    res.json({
      brandId,
      influencerId,
      score,
      message,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
