import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, Music, Code, Palette, Trophy, Gamepad2, Volume2, Check, X, BrainCircuit, BookOpen, RefreshCcw, Settings, Plus, BookText } from 'lucide-react';
import { movieCategories, sportsCategories } from '@/assets/vocab-data';

const ManabiyaPrototype = () => {
  const [currentPage, setCurrentPage] = useState('interests');
  const [isStartLoading, setIsStartLoading] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedMovieCategory, setSelectedMovieCategory] = useState('');
  const [selectedSportCategory, setSelectedSportCategory] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('');
  const [isPersonalizingLoading, setIsPersonalizingLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Sound effects initialization
  const [correctSound] = useState(() => 
    typeof Audio !== 'undefined' 
      ? new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dam9yYmBhcHR3dHJzi5KLhIeEhot+eXyEkpWYmI+RkZOQi4yTm6Wqq6yrp6mnqaaqrLO3tbCnnJeYmZyZlJGUkpOVlZKUkpCBaF1kaGt0fH+BfHx+gIKFiIuMjoqEg4aJi42LiYiHjZWYm5mVk5KRlpmbnZ2Yl5KKf3l9enl5fYGAf4GFjJWXl5WZm52RiYF+gH99gIWKi4yIhYOEhIKBf4GFiYyLiomHh4iHjJCVlJWTkY+RkpGOiYqJjY+PjYuKjI2Mi4mHhcR9c3WEhX9yeHp/hYuGgYB/gYSGioyMkZWZm5ycmpqcm52bmpmamZqanJqYlZSYmZeUkpCSkpCNi4qLioiHhoeGhYSCgYCBgoKBgYB/f4CAgICAgH9+f39/f39+f39/gICAf35/gIGCg4KBgoOEhYWEgYB/f4CBgoGAgICBg4aIiYiHh4iKi4uJh4WDg4SEg4GAgYOFhoWEg4OEhYWEg4KCgoKBgIB/f4CAgICAgYGBgYGAgICAgIGBgoKBgYGCg4SEg4OCgoOEhYSDgoKDhISEg4KCg4WGh4aFhIWGh4eGhIOChISEg4KBgoSFhoWEg4OEhYaGhYSDg4SEhIOCgYKDg4OCgYGBgoODgoGAgYGCgoKBgICAgYGBgIB/gICAgIB/f39/gICAgH9/f4CAgICAf3+AgIGBgYCAgIGCgoKBgICAgYKCgoGAgIGCg4ODgoGBgoODg4KBgYGCgoKCgYGBgoKCgoGBgYGCgoKCgYGBgYKCgoGBgYGBgoKBgYGBgYGBgYGAgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYCBgYGBgYGBgICBgYGBgICAgIGBgYGAgICAgYGBgYCAgICBgYGBgICAgIGBgYGAgICAgYGBgYCAgICAgYGBgICAgIGBgYGAgICAgYGBgYCAgICBgYGBgICAgIGBgYGAgICAgYGBgYCAgICBgYGBgICAgIGBgYGAgICAgYGBgYCAgICAgYGBgICAgICBgYGAgICAgIGBgYCAgICAgYGBgICAgICAgYGAgICAgICBgYCAgICAgIGBgICAgICAgYGAgICAgICBgYCAgICAgIGBgICAgICAgYGAgICAgICAgYGAgICAgICBgYCAgICAgIGBgICAgICAgIGAgICAgICAgYCAgICAgICBgICAgICAgIGAgICAgICAgYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIB+h4SEhBwXHDM1PDs+RUhCRUE/R0dLR0lJR0A+PkhLTEVAPz0/Q0VGQT04OT5EQz84ODc7QkVCPzo5PEBAPz05ODxAQkE/PDg5PUFDQj85OD1CQ0A8ODpARUdEQD07PUBAPz07PD5DRkVCP0JFRkVIRkRBPz5DQj89PD5BR0pIRkRBQEFAP0A/PkBERUVEQUE/P0BAQEA+PUFFR0RGREA+PkFCQT8+P0JGR0VDQD8/QURAPD4/QkZHRkRBPjxBQ0I/Pj9DRkhGQ0A+P0FCQkA/P0FDR0ZGREA/P0BCQkA/P0FERkdFQ0A/P0FCQkA/P0FDRkdGREE/P0BBQkFAP0BCRUdGRUE/PkBBQkFAPz9CR0hHRUE+PkBBQkE/Pz9CR0hHRUI/PkBBQUFAPz9BRUdHRkNAPj9BQUE/Pz9BRUdHRkRAPj5AQUE/Pz9AQ0ZHRUNAPD5BQUE/Pz8/Q0ZIRUNAPD1AQUEZ')
      : null
  );

  const [wrongSound] = useState(() => 
    typeof Audio !== 'undefined'
      ? new Audio('data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAABy0nXSeM94w3eoep58q4C2hMOIz4zZkOSU8Jj7nAShDqUbqSitNbFCs0+3XLtos3W4gr2PwpzHqczA0dPW5tv53w3kH+gy7UXyWPdt/IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==')
      : null
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStartLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTransition = (nextPage) => {
    setIsPersonalizingLoading(true);
    setTimeout(() => {
      setIsPersonalizingLoading(false);
      setCurrentPage(nextPage);
    }, 5000);
  };

  const StartLoadingScreen = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1 
        className="text-5xl md:text-5xl font-bold text-blue-500 mb-4"
        style={{ fontFamily: 'Montserrat, sans-serif', marginTop: '-25%' }}
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

  const PersonalizingLoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    
    const loadingSteps = [
      {
        text: "Finding the perfect words for you...",
        icon: "✨"
      },
      {
        text: "Crafting personalized examples...",
        icon: "📝"
      },
      {
        text: "Preparing your study path...",
        icon: "🗺️"
      },
      {
        text: "Almost ready for your journey!",
        icon: "🚀"
      }
    ];
  
    useEffect(() => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
  
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % loadingSteps.length);
      }, 2000);
  
      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }, []);
  
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <h1
          className="text-3xl text-blue-500 font-bold mb-12"
          style={{ fontFamily: 'Montserrat, sans-serif', marginTop: '-20%' }}
        >
          manabiya
        </h1>
  
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center mb-3 space-x-2">
            <span className="text-2xl">{loadingSteps[currentStep].icon}</span>
            <p 
              className="text-lg text-gray-700 animate-fade-in"
              key={currentStep} // Forces re-render of animation
            >
              {loadingSteps[currentStep].text}
            </p>
          </div>
          <p className="text-sm text-gray-500">{progress}%</p>
        </div>
  
        {/* Main progress bar */}
        <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
            }} 
          />
        </div>
  
        {/* Progress indicators */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                step === currentStep 
                  ? 'bg-blue-500 scale-125' 
                  : step < currentStep 
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
  
        {/* Add some animated decorative elements */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );
  };

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
            onClick={() => setCurrentPage('learn')}
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
            onClick={() => setCurrentPage('articles')}
            className="w-full p-6 flex items-center space-x-4"
          >
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookText className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-xl text-gray-900">Articles</h2>
              <p className="text-sm text-gray-600">Read about your interests</p>
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
        className="absolute bottom-16 right-3 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-colors border border-gray-200"
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
      <div className="fixed inset-0 w-[360px] h-[640px] mx-auto bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="w-11/12 max-h-96">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="text-base font-medium mb-2">Study Mode</h3>
              <div className="space-y-2">
                {Object.entries(modes).map(([mode, description]) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center text-sm
                      ${selectedMode === mode 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="capitalize">{mode}</span>
                    <span className="text-gray-500">{description}</span>
                  </button>
                ))}
              </div>
            </div>
  
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const interests = [
    { id: 'tech', icon: Code, label: 'Technology' },
    { id: 'art', icon: Palette, label: 'Art' },
    { id: 'games', icon: Gamepad2, label: 'Gaming' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'movies', icon: Clapperboard, label: 'Movies' },
    { id: 'sports', icon: Trophy, label: 'Sports' }
  ];

  useEffect(() => {
    if (currentPage === 'learn') {
      setCategoryProgress(categoryProgress);
    }
  }, [currentPage]);

  const [mockLessons, setMockLessons] = useState({
    Advanced: []
  });

  useEffect(() => {
    if (selectedMovieCategory) {
      const selectedMovieWords = movieCategories.find(genre => genre.id === selectedMovieCategory)?.words || [];
      setMockLessons({
        Advanced: selectedMovieWords
      });
    } else if (selectedSportCategory) {
      const selectedSportWords = sportsCategories.find(category => category.id === selectedSportCategory)?.words || [];
      setMockLessons({
        Advanced: selectedSportWords
      });
    }
  }, [selectedMovieCategory, selectedSportCategory]);

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
        <div className="space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <h3 className="text-base font-medium mb-4 text-gray-600">
              Choose an interest to start with.
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
  
          {selectedInterests.includes('movies') && (
            <div>
              <h3 className="text-base font-medium mb-4 text-gray-600">
                Choose a movie genre.
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {movieCategories.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMovieCategory(id)}
                    className={`p-4 rounded-lg flex items-center space-x-3 transition-colors
                      ${selectedMovieCategory === id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedInterests.includes('sports') && (
            <div>
              <h3 className="text-base font-medium mb-4 text-gray-600">
                Choose a sports category.
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {sportsCategories.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedSportCategory(id)}
                    className={`p-4 rounded-lg flex items-center space-x-3 transition-colors
                      ${selectedSportCategory === id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
  
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
  
          {selectedInterests.length > 0 && 
            ((!selectedInterests.includes('movies') && !selectedInterests.includes('sports')) || 
              (selectedInterests.includes('movies') && selectedMovieCategory) ||
              (selectedInterests.includes('sports') && selectedSportCategory)) && 
            proficiencyLevel && (
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
  )  

  const LearnScreen = () => {
    const interest = selectedInterests[0];
    const category = selectedMovieCategory || selectedSportCategory;
    const handleReturn = () => setCurrentPage('home');
    
    const getInterestIcon = () => {
      if (interest === 'movies') {
        const movieObj = movieCategories.find(m => m.id === category);
        return movieObj?.icon || '🎬';
      }
      if (interest === 'sports') {
        const sportsObj = sportsCategories.find(s => s.id === category);
        return sportsObj?.icon || '🏆';
      }
      const interestObj = interests.find(i => i.id === interest);
      const Icon = interestObj?.icon;
      return Icon ? <Icon className="w-6 h-6 text-gray-600" /> : null;
    };

    const getInterestDisplay = () => {
      const interestObj = interests.find(i => i.id === interest);
      if (interest === 'movies') {
        const movieObj = movieCategories.find(m => m.id === category);
        return `${interestObj.label} > ${movieObj?.label}`;
      }
      if (interest === 'sports') {
        const sportsObj = sportsCategories.find(s => s.id === category);
        return `${interestObj.label} > ${sportsObj?.label}`;
      }
      return interestObj?.label || '';
    };
  
    return (
      <div className="min-h-screen bg-white p-4 relative">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Course</h1>
          <p className="text-sm text-gray-500">Master vocabulary in context</p>
        </div>

        <button 
          onClick={() => setCurrentPage('lesson')}
          className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                {getInterestIcon()}
              </div>
              <div className="flex-grow">
                <h2 className="font-semibold text-gray-900">{getInterestDisplay()}</h2>
                <p className="text-sm text-gray-500">Tap to continue learning</p>
              </div>
              <span className="text-lg font-semibold text-blue-500">{categoryProgress}%</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-5">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Progress</span>
              <span>{categoryProgress}/100</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-700 ease-in-out"
                style={{ 
                  width: `${categoryProgress}%`,
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
                }}
              />
            </div>
          </div>
        </button>

        <button 
          className="absolute bottom-20 right-3 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-200"
          aria-label="Add"
        >
          <Plus className="w-6 h-6 text-blue-500" />
        </button>

        <button 
          onClick={handleReturn}
          className="fixed bottom-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-colors border border-gray-200"
          style={{ 
            left: '50%',
            transform: 'translateX(calc(-50% - 130px))',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Return"
        >
          <svg 
            className="w-6 h-6 text-gray-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
      </div>
    );
  };

  const renderLesson = () => (
    <Card className="mb-8 relative pb-16">
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
  
      <button 
        onClick={() => setCurrentPage('learn')}
        className="fixed bottom-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-colors border border-gray-200"
        style={{ 
          left: '50%',
          transform: 'translateX(calc(-50% - 130px))',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Return"
      >
        <svg 
          className="w-6 h-6 text-gray-600"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
      </button>
    </Card>
  );

  const playSound = (isCorrect) => {
    if (isCorrect) {
      correctSound?.play().catch(e => console.log('Audio play failed:', e));
    } else {
      wrongSound?.play().catch(e => console.log('Audio play failed:', e));
    }
  };
  
  const renderQuiz = () => {
    const correctAnswer = mockLesson.word;
    
    const handleAnswerSelect = (answer) => {
      const isCorrect = answer === correctAnswer;
      playSound(isCorrect);
      setSelectedAnswer(answer);
      setShowFeedback(true);
    };
  
    const isCorrect = selectedAnswer === correctAnswer;
  
    return (
      <Card className="mb-8 relative pb-16">
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
  
        <button 
          onClick={() => setCurrentPage('learn')}
          className="fixed bottom-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-colors border border-gray-200"
          style={{ 
            left: '50%',
            transform: 'translateX(calc(-50% - 130px))',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Return"
        >
          <svg 
            className="w-6 h-6 text-gray-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
      </Card>
    );
  };

  const handleQuizCompletion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCategoryProgress(prev => Math.min(prev + 2, 100));
    
    if (currentWordIndex < mockLessons.Advanced.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentPage('lesson');
    } else {
      // All words completed
      setCurrentWordIndex(0);
      setCurrentPage('learn');
    }
  };

  const ArticlesScreen = () => {
    const handleReturn = () => setCurrentPage('home');
  
    const articles = [
      {
        id: 1,
        title: "Fantasy Movie IP Dominates 2025 Box Office",
        source: "CNBC",
        date: "Oct 6, 2024",
        url: "https://www.cnbc.com/2024/10/06/box-office-2025-movies-existing-intellectual-property.html",
        summary: "Analysis of upcoming fantasy franchises and their box office predictions",
        level: "Advanced"
      },
      {
        id: 2,
        title: "Avatar: Fire and Ash - Everything We Know",
        source: "CBR",
        date: "2024",
        url: "https://www.cbr.com/everything-we-know-about-avatar-fire-and-ash/",
        summary: "Latest updates on the next Avatar installment",
        level: "Intermediate"
      },
      {
        id: 3,
        title: "How to Train Your Dragon Live-Action Details",
        source: "Collider",
        date: "2024",
        url: "https://collider.com/how-to-train-your-dragon-live-action-release-date-director-plot/",
        summary: "Cast, plot, and release date for the upcoming adaptation",
        level: "Beginner"
      }
    ];
  
    return (
      <div className="min-h-screen bg-white p-4 pb-24 relative overflow-y-auto" style={{ maxHeight: "640px" }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Weekly News Feed</h1>
          <p className="text-sm text-gray-500">Read about your interests in English!</p>
        </div>
  
        <div className="space-y-4">
          {articles.map(article => (
            <Card key={article.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">{article.title}</h2>
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                    {article.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.source}</span>
                  <span>{article.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
  
        <button 
          onClick={handleReturn}
          className="fixed bottom-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 transition-colors border border-gray-200"
          style={{ 
            left: '50%',
            transform: 'translateX(calc(-50% - 130px))',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Return"
        >
          <svg 
            className="w-6 h-6 text-gray-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen">
      {isStartLoading ? (
        <StartLoadingScreen />
      ) : isPersonalizingLoading ? (
        <PersonalizingLoadingScreen />
      ) : currentPage === 'interests' ? (
        renderInterestsSelection()
      ) : currentPage === 'home' ? (
        <HomeScreen />
      ) : currentPage === 'learn' ? (
        <LearnScreen />
      ) : currentPage === 'lesson' ? (
        renderLesson()
      ) : currentPage === 'quiz' ? (
        renderQuiz()
      ) : currentPage === 'review' ? (
        <HomeScreen />
      ) : currentPage === 'articles' ? (
        <ArticlesScreen />
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
