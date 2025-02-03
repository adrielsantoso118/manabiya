import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, Music, Code, Palette, Trophy, Gamepad2, Volume2, Check, X, BrainCircuit, BookOpen, RefreshCcw, LineChart, Settings } from 'lucide-react';

const ManabiyaPrototype = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('interests');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [proficiencyLevel, setProficiencyLevel] = useState('');
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const bgColor = 'bg-white';
  const textColor = 'text-gray-900';
  const textColorSecondary = 'text-gray-600';
  const cardBg = 'bg-white';
  const cardHoverBg = 'hover:bg-gray-50';
  const borderColor = 'border-gray-200';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTransition = (nextPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentPage(nextPage);
    }, 3000);
  };

  const LoadingScreen = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1 
        className="text-5xl md:text-5xl font-bold text-blue-500 mb-4"
        style={{ fontFamily: 'Montserrat, sans-serif', marginTop: '-20%' }}
      >
        manabiya
      </h1>
      <div className="absolute bottom-16 flex items-center space-x-2 text-gray-500">
        <span>Powered by</span>
        <BrainCircuit className="w-5 h-5" />
        <span>DeepSeek</span>
      </div>
    </div>
  );

  const TransitionScreen = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1
        className="text-2xl text-blue-500 mb-4 font-serif text-center max-w-3xl px-4"
        style={{ fontFamily: 'Montserrat, sans-serif', marginTop: '-20%' }}
      >
        Creating Your Personalized Experience
      </h1>
      <div className="w-64 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: isTransitioning ? '100%' : '0%' }} />
      </div>
      <p className="mt-4 text-lg text-gray-600 font-sans">Please wait...</p>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-white p-4 relative" style={{ marginTop: '-5%' }}>
      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <h1 
          className="font-bold text-blue-500 text-3xl"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          manabiya
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          Your personalized English learning journey
        </p>
      </div>
  
      {/* Main Menu */}
      <div className="max-w-md mx-auto space-y-4">
        <Card className="bg-white hover:bg-gray-50 transition-colors border border-gray-200">
          <button 
            onClick={() => setCurrentPage('lesson')}
            className="w-full p-6 flex items-center space-x-4"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-xl text-gray-900">Learn</h2>
              <p className="text-sm text-gray-600">Start your daily lesson</p>
            </div>
          </button>
        </Card>
  
        <Card className="bg-white hover:bg-gray-50 transition-colors border border-gray-200">
          <button 
            onClick={() => setCurrentPage('review')}
            className="w-full p-6 flex items-center space-x-4"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <RefreshCcw className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-xl text-gray-900">Review</h2>
              <p className="text-sm text-gray-600">Practice previous lessons</p>
            </div>
          </button>
        </Card>
  
        <Card className="bg-white hover:bg-gray-50 transition-colors border border-gray-200">
          <button 
            onClick={() => setCurrentPage('progress')}
            className="w-full p-6 flex items-center space-x-4"
          >
            <div className="bg-purple-100 p-3 rounded-lg">
              <LineChart className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-xl text-gray-900">Progress</h2>
              <p className="text-sm text-gray-600">Track your learning journey</p>
            </div>
          </button>
        </Card>
  
        {/* Study Streak Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 border border-gray-200">
          <div className="text-center">
            <p className="text-gray-300 mb-2 text-sm">Current Study Streak</p>
            <div className="font-bold text-white text-2xl">1 Day 🔥</div>
          </div>
        </Card>
      </div>
  
      {/* Settings Button */}
      <button 
        onClick={() => setShowSettings(true)}
        className="absolute bottom-16 right-2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Settings"
      >
        <Settings className="w-6 h-6 text-gray-600" />
      </button>
  
      {/* Settings Modal */}
      {showSettings && <SettingsMenu />}
    </div>
  );
  
  const SettingsMenu = () => {
    const [selectedMode, setSelectedMode] = useState('casual');
  
    const modes = {
      casual: '5 words per day',
      serious: '10 words per day',
      hardcore: '15 words per day'
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">Study Mode</h3>
              <div className="space-y-2">
                {Object.entries(modes).map(([mode, description]) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`w-full p-4 rounded-lg text-left transition-colors flex justify-between items-center
                      ${selectedMode === mode 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="capitalize">{mode}</span>
                    <span className="text-sm text-gray-500">{description}</span>
                  </button>
                ))}
              </div>
            </div>
  
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Done
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const mockLessons = {
    Advanced: [
      {
        word: "reckon",
        meaning: "考える、推測する",
        sentence: "I reckon this movie will win an Oscar next year.",
        translation: "この映画は来年アカデミー賞を取ると思います。"
      },
      {
        word: "plot",
        meaning: "筋書き、物語",
        sentence: "The plot of this thriller kept me on the edge of my seat.",
        translation: "このスリラー映画の筋書きは、私をハラハラさせ続けました。"
      },
      {
        word: "sequel",
        meaning: "続編",
        sentence: "They're making a sequel to that popular superhero movie.",
        translation: "彼らはあの人気のあるスーパーヒーロー映画の続編を作っています。"
      },
      {
        word: "cast",
        meaning: "出演者",
        sentence: "The cast of this film includes several famous actors.",
        translation: "この映画の出演者には何人かの有名な俳優が含まれています。"
      },
      {
        word: "premiere",
        meaning: "初演、初公開",
        sentence: "We're going to the premiere of the new sci-fi movie tonight.",
        translation: "私たちは今夜、新しいSF映画の初公開に行きます。"
      }
    ]
  };

  const interests = [
    { id: 'tech', icon: Code, label: 'Technology' },
    { id: 'art', icon: Palette, label: 'Art' },
    { id: 'games', icon: Gamepad2, label: 'Gaming' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'movies', icon: Clapperboard, label: 'Movies' },
    { id: 'sports', icon: Trophy, label: 'Sports' }
  ];

  const mockLesson = mockLessons.Advanced[currentWordIndex];
  
  const speak = (text, rate = 1) => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const SpeakButton = ({ text, speed = 'normal' }) => (
    <button
      onClick={() => speak(text, speed === 'slow' ? 0.5 : 1)}
      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-blue-100 transition-colors"
      title={`Listen ${speed === 'slow' ? '(slow)' : ''}`}
    >
      <Volume2 size={20} className="text-blue-500" />
      {speed === 'slow' && <span className="ml-1 text-sm text-blue-500">0.5x</span>}
    </button>
  );

  const handleInterestClick = (interestId) => {
    setSelectedInterests(prev => (prev.includes(interestId) ? [] : [interestId]));
  };

  const startLesson = () => {
    if (selectedInterests.length && proficiencyLevel) {
      handleTransition('home');
    }
  };

  const proficiencyLevels = {
    Beginner: { label: '3級' },
    Intermediate: { label: '準2級' },
    Advanced: { label: '2級' }
  };

  const renderInterestsSelection = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-blue-500">Welcome to manabiya</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-h-[75vh] overflow-y-auto">  {/* This will allow scrolling */}
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-600">
              Choose an interest to start. Don't worry, you can add more later!
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => handleInterestClick(id)}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors
                    ${selectedInterests.includes(id) 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <Icon size={24} />
                  <span className="text-sm text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="text-lg font-medium mb-4">Select Your Level</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(proficiencyLevels).map(level => (
                <button
                  key={level}
                  onClick={() => setProficiencyLevel(level)}
                  className={`p-4 rounded-lg text-center transition-colors
                    ${proficiencyLevel === level 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  {proficiencyLevels[level].label}
                </button>
              ))}
            </div>
          </div>
  
          {selectedInterests.length > 0 && proficiencyLevel && (
            <button
              onClick={startLesson}
              className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Learning
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderLesson = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-blue-500 flex justify-between items-center">
          <span>Today's Lesson</span>
          <span className="text-sm text-gray-600">
            {currentWordIndex + 1}/{mockLessons.Advanced.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <h2 className="text-2xl font-bold">{mockLesson.word}</h2>
              <div className="ml-4 space-x-2">
                <SpeakButton text={mockLesson.word} />
                <SpeakButton text={mockLesson.word} speed="slow" />
              </div>
            </div>
            <p className="text-lg mb-4">{mockLesson.meaning}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="text-gray-700">{mockLesson.sentence}</p>
                <div className="ml-4 space-x-2">
                  <SpeakButton text={mockLesson.sentence} />
                  <SpeakButton text={mockLesson.sentence} speed="slow" />
                </div>
              </div>
              <p className="text-gray-600">{mockLesson.translation}</p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentPage('quiz')}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuiz = () => {
    const correctAnswer = mockLesson.word;
    
    const handleAnswerSelect = (answer) => {
      setSelectedAnswer(answer);
      setShowFeedback(true);
    };

    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-blue-500">Quick Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg">Complete the sentence:</p>
            <p className="text-gray-700">{mockLesson.sentence.replace(mockLesson.word, '________')}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {[mockLesson.word, 'movie', 'film', 'scene'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg transition-colors flex justify-between items-center
                    ${selectedAnswer === option 
                      ? (option === correctAnswer 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700')
                      : 'bg-gray-50 hover:bg-blue-100'}`}
                  disabled={showFeedback}
                >
                  <span>{option}</span>
                  {showFeedback && selectedAnswer === option && (
                    option === correctAnswer 
                      ? <Check className="text-green-500" size={20} />
                      : <X className="text-red-500" size={20} />
                  )}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect 
                    ? '正解！Great job! Keep it up! 🎉' 
                    : `惜しい！"${correctAnswer}"だよ。Try again later! 💪`}
                </p>
              </div>
            )}

            {showFeedback && (
              <button
                onClick={handleQuizCompletion}
                className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {currentWordIndex < mockLessons.Advanced.length - 1 ? 'Next Word' : 'Finish'}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const handleQuizCompletion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentWordIndex < mockLessons.Advanced.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentPage('lesson');
    } else {
      // All words completed
      setCurrentWordIndex(0);
      setCurrentPage('home');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen">
      {isLoading ? (
        <LoadingScreen />
      ) : isTransitioning ? (
        <TransitionScreen />
      ) : currentPage === 'interests' ? (
        renderInterestsSelection()
      ) : currentPage === 'home' ? (
        <HomeScreen />
      ) : currentPage === 'lesson' ? (
        renderLesson()
      ) : currentPage === 'quiz' ? (
        renderQuiz()
      ) : null}
    </div>
  );
};

export default function App() {
  return (
    <div className="w-[360px] h-[640px] mx-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden relative">
      <ManabiyaPrototype />
    </div>
  );
}
