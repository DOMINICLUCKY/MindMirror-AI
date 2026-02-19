# MindMirror AI - Startup Guide

## 🚀 Quick Start (2 Minutes)

### Terminal 1 - Backend
```bash
cd d:\MindMirrorAI\backend
npm install
npm start
```
Wait for: "✨ MindMirror AI Server running on http://localhost:5000"

### Terminal 2 - Frontend  
```bash
cd d:\MindMirrorAI\frontend
npm install
npm start
```
Wait for browser to open at http://localhost:3000

## ✅ You're Ready!

1. **Home Page** - Write a journal entry (50+ words recommended)
2. **Analysis Page** - View emotions, burnout score, and AI recommendations
3. **Dashboard** - See trends and patterns across all entries

## 📝 Example Entry

```
I've been working 12-hour days for the past two weeks. My sleep is terrible, 
and I feel constantly anxious about deadlines. I haven't exercised or seen 
friends in ages. Everything feels heavy right now. I'm questioning if I can 
keep this pace up. My body keeps telling me something is wrong, but I just 
push through. I feel exhausted and unmotivated, even though I need to finish 
this project. I'm worried about my health and burnt out.
```

## 🛠 Troubleshooting

**Backend not starting?**
- Check if port 5000 is available: `netstat -ano | findstr :5000`
- Try: `cd backend && npm install && npm start`

**Frontend shows "Cannot GET"?**
- Make sure backend is running first
- Check proxy in `frontend/package.json`

**Charts not showing?**
- Clear browser cache
- Restart frontend: Press Ctrl+C and `npm start` again

## 🎯 Features to Test

1. **Emotion Detection** - Different emotions show in analysis
2. **Burnout Scoring** - Score changes based on entry negativity
3. **Recommendations** - Different advice for different emotions
4. **Dashboard** - Multiple entries show trends over time
5. **Persistent Storage** - Entries remain during session

## 📊 Test Scores

| Sentiment | Emotions | Burnout Score | Risk Level |
|-----------|----------|---------------|------------|
| Very Negative | High stress/anxiety | 75-100 | Critical |
| Negative | Moderate stress | 50-75 | High |
| Neutral | Mixed emotions | 25-50 | Moderate |
| Positive | Happiness/Gratitude | 0-25 | Low |

Happy analyzing! 🧠✨
