# 🧠 MindMirror AI - Emotional Pattern Analyzer & Early Burnout Predictor

An AI-powered web application that analyzes daily journal entries to detect emotional patterns, predict burnout risk, and provide personalized psychological recommendations.

## 📋 Project Overview

**MindMirror AI** transforms journaling into actionable mental health insights using Natural Language Processing and emotional pattern analysis. The application helps students, professionals, and remote workers identify emotional trends before they escalate to burnout.

### Key Features

✅ **Real-Time Emotion Detection** - Analyzes sentiment and emotional categories (anxiety, stress, sadness, happiness, anger, fatigue)
✅ **Burnout Risk Scoring** - Multi-factor burnout probability assessment with risk levels (Low/Moderate/High/Critical)
✅ **Interactive Dashboard** - Visual analytics with mood trends, emotional distribution graphs, and weekly breakdowns
✅ **AI Recommendations** - Personalized coping strategies based on detected emotions
✅ **Psychological Summaries** - Detailed analysis of emotional state and key themes
✅ **Historical Tracking** - Monitor emotional patterns over time with trend analysis

## 🏗 Project Structure

```
MindMirrorAI/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   ├── routes/
│   │   ├── analysis.js          # Analysis endpoints
│   │   └── journal.js           # Journal management endpoints
│   └── utils/
│       ├── emotionDetector.js   # Emotion detection algorithms
│       ├── burnoutCalculator.js # Burnout scoring logic
│       └── aiRecommendations.js # AI recommendation engine
└── frontend/
    ├── src/
    │   ├── App.js               # Main app component
    │   ├── index.js             # React entry point
    │   ├── pages/
    │   │   ├── HomePage.js      # Journal entry page
    │   │   ├── AnalysisPage.js  # Results display page
    │   │   └── DashboardPage.js # Analytics dashboard
    │   └── styles/
    │       ├── index.css        # Global styles
    │       ├── App.css          # App container styles
    │       ├── HomePage.css     # Home page styles
    │       ├── AnalysisPage.css # Analysis page styles
    │       └── DashboardPage.css# Dashboard page styles
    ├── public/
    │   └── index.html           # HTML template
    └── package.json
```

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- Windows, macOS, or Linux

### Installation & Setup

#### 1. **Backend Setup**

```bash
# Navigate to backend folder
cd d:\MindMirrorAI\backend

# Install dependencies
npm install

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

#### 2. **Frontend Setup** (in a new terminal)

```bash
# Navigate to frontend folder
cd d:\MindMirrorAI\frontend

# Install dependencies
npm install

# Start the React application
npm start
```

The frontend will open at `http://localhost:3000`

### Accessing the Application

Point your browser to **http://localhost:3000** and you're ready to start!

## 💡 How to Use

### Step 1: Write Your Journal Entry
- Navigate to the Home page
- Write a detailed entry about your thoughts, feelings, and experiences
- Minimum 10 characters recommended for accurate analysis

### Step 2: View Analysis Results
- Click "✨ Analyze My Entry"
- Get instant results including:
  - **Burnout Risk Score** (0-100%)
  - **Detected Emotions** with percentages
  - **Overall Sentiment** (Positive/Negative/Neutral)
  - **Psychological Summary**
  - **Personalized Recommendations**
  - **Key Themes** from your entry

### Step 3: Track Your Progress
- Visit the Dashboard to see:
  - Total entries and average scores
  - Burnout trend graph
  - Sentiment trend over time
  - Emotion distribution
  - Weekly emotional breakdown
  - Insights and recommendations

## 🧬 Technical Details

### Emotion Detection Algorithm

The system analyzes text for:
- **Emotional keywords** mapped to 6 categories
- **Sentiment polarity** using positive/negative word detection
- **Stress indicators** and fatigue markers
- **Recurring patterns** over multiple entries

### Burnout Score Calculation

**Formula:** Weighted multi-factor assessment

- **40%** - Negative sentiment frequency
- **30%** - Stress & anxiety indicators
- **20%** - Fatigue levels
- **10%** - Pattern analysis over time

**Risk Levels:**
- 🟢 **Low** (0-25%): Maintain healthy habits
- 🟡 **Moderate** (25-50%): Consider breaks and stress management
- 🔴 **High** (50-75%): Seek support and prioritize self-care
- 🔴 **Critical** (75-100%): Reach out to mental health professionals

### Recommendations Engine

The AI recommends:
- **Immediate actions** - Grounding techniques, breathing exercises
- **Daily practices** - Mindfulness, meditation, physical activity
- **Long-term strategies** - Sleep hygiene, work-life balance, professional help

## 📊 API Endpoints

### Analysis Routes (`/api/analysis`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Analyze a journal entry |
| GET | `/entries` | Get all journal entries |
| GET | `/entries/:id` | Get specific entry details |
| GET | `/dashboard` | Get dashboard summary data |

### Journal Routes (`/api/journal`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all journals |
| POST | `/` | Create new journal entry |
| GET | `/:id` | Get specific journal |
| DELETE | `/:id` | Delete journal entry |

## 🎨 UI/UX Features

✨ **Modern Gradient Design** - Purple-blue gradient color scheme
📱 **Responsive Layout** - Works on desktop, tablet, and mobile
📈 **Interactive Charts** - Chart.js integration for data visualization
🎯 **User-Friendly Navigation** - Smooth page transitions and clear CTAs
🔔 **Real-Time Feedback** - Loading states and error handling

## 🔄 Data Flow

```
User Input (Journal Text)
    ↓
Emotion Detection (Text Analysis)
    ↓
Sentiment Scoring (Polarity Analysis)
    ↓
Keyword Extraction (Theme Detection)
    ↓
Burnout Score Calculation (Multi-factor)
    ↓
Psychological Analysis (Pattern Recognition)
    ↓
Recommendation Generation (AI Engine)
    ↓
Dashboard Display & Storage
```

## 🛠 Technologies Used

### Frontend
- **React 18** - UI framework
- **Chart.js + React-ChartJS-2** - Data visualization
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **CORS** - Cross-origin resource sharing

### AI/ML
- **Custom NLP Algorithms** - Text analysis
- **Emotion Classification** - Keyword-based detection
- **Pattern Recognition** - Trend analysis

## 📈 Future Enhancements

- 🔐 User authentication & secure sessions
- 💾 MongoDB/Firebase integration for persistent storage
- 🤖 Integration with OpenAI/Gemini API for advanced NLP
- 🎙️ Voice journaling feature
- ⌚ Wearable device integration (sleep, heart rate)
- 🌐 Multilingual support
- 📱 Mobile app (React Native)
- 🏢 Corporate wellness dashboard
- 📊 Advanced data export (PDF, CSV)

## 🧪 Testing the Application

### Test Journal Entry

```
Today was extremely overwhelming. I couldn't sleep well last night, waking up at 3 AM 
with anxiety about the upcoming deadline. I feel exhausted and can barely focus on work. 
My stomach has been tense all day, and I snapped at my colleague over a small mistake. 
Everything feels like too much right now, and I'm worried I'm burning out. I haven't 
had time for myself in weeks. The stress is unbearable, but I need to push through.
```

**Expected Analysis:**
- High anxiety and stress detection
- Negative sentiment score (-60 to -40)
- Moderate-to-High burnout score (60-75%)
- Keywords: deadline, anxiety, exhausted, stress, burnout
- Recommendations: breathing exercises, take breaks, seek support

## 📝 System Requirements

- **OS:** Windows 10+, macOS 10.14+, or Ubuntu 18.04+
- **RAM:** Minimum 4GB
- **Disk Space:** 500MB for project dependencies
- **Browser:** Modern browser (Chrome, Firefox, Safari, Edge)
- **Internet:** Required for initial setup (npm packages)

## 🚨 Troubleshooting

### Backend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm start
```

### Frontend connection error
- Check if backend is running on port 5000
- Verify CORS is enabled in backend
- Check proxy setting in `frontend/package.json`

### Charts not displaying
- Ensure Chart.js and react-chartjs-2 are installed
- Clear browser cache (Ctrl+Shift+Delete)
- Restart npm dev server

## 📞 Support & Contribution

For issues, feature requests, or contributions:
1. Document the issue clearly
2. Provide test cases/examples
3. Submit pull requests with improvements

## ⚖️ Legal Notice

**MindMirror AI is NOT a substitute for professional mental health care.**

This application:
- ✅ Helps identify emotional patterns and stress indicators
- ✅ Provides general wellness recommendations
- ⚠️ Should NOT be used as a diagnostic tool
- ⚠️ Does NOT replace therapy or professional medical advice

**If experiencing mental health crisis, please contact:**
- Emergency Services (911 in US)
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741

## 📄 License

This project is open-source and available under the MIT License.

## 🎉 Get Started Now!

1. Clone/Download the project
2. Follow the Quick Start Guide
3. Write your first journal entry
4. Get instant emotional insights
5. Track your mental health journey

---

**Created with ❤️ for mental health awareness and early burnout prevention**

*MindMirror AI © 2026*
