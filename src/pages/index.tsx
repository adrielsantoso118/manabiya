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
  const [selectedGenre, setSelectedGenre] = useState('');

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
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTransition = (nextPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentPage(nextPage);
    }, 5000);
  };

  const LoadingScreen = () => (
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

  const TransitionScreen = () => {
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

  const interests = [
    { id: 'tech', icon: Code, label: 'Technology' },
    { id: 'art', icon: Palette, label: 'Art' },
    { id: 'games', icon: Gamepad2, label: 'Gaming' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'movies', icon: Clapperboard, label: 'Movies' },
    { id: 'sports', icon: Trophy, label: 'Sports' }
  ];

  const movieGenres = [
    { id: 'drama', icon: "🎭", label: 'Drama', words: [
      { word: "complicated", meaning: "複雑な", sentence: "The character's past is so complicated that it affects his present life.", translation: "そのキャラクターの過去はとても複雑で、現在の生活に影響を与えています。" },
      { word: "emotion", meaning: "感情", sentence: "The actress expressed deep emotion in the final scene.", translation: "その女優は最後のシーンで深い感情を表現しました。" },
      { word: "inspire", meaning: "奮起させる、感動させる", sentence: "This true story will inspire many people around the world.", translation: "この実話は世界中の多くの人を奮起させるでしょう。" },
      { word: "realistic", meaning: "現実的な", sentence: "The film's realistic dialogue makes the story feel authentic.", translation: "その映画の現実的なセリフは物語を本物のように感じさせます。" },
      { word: "portray", meaning: "描写する", sentence: "The actor perfectly portrayed the struggles of a single father.", translation: "その俳優はシングルファーザーの苦悩を完璧に描写しました。" }
    ]},
    { id: 'comedy', icon: "😂", label: 'Comedy', words: [
      { word: "laughter", meaning: "笑い", sentence: "The entire audience burst into laughter at the comedian's joke.", translation: "観客全員がコメディアンのジョークに笑いを爆発させました。" },
      { word: "humorous", meaning: "ユーモラスな", sentence: "The movie was full of humorous situations that made me laugh.", translation: "その映画はユーモラスな場面が満載で、笑いが止まりませんでした。" },
      { word: "entertain", meaning: "楽しませる", sentence: "His performance really entertained the crowd.", translation: "彼のパフォーマンスは観客を本当に楽しませました。" },
      { word: "sarcastic", meaning: "皮肉な", sentence: "The main character often makes sarcastic comments about his boss.", translation: "主人公は上司についてよく皮肉なコメントを言います。" },
      { word: "silly", meaning: "ばかげた", sentence: "The story was silly, but it was fun to watch.", translation: "ストーリーはばかげていましたが、見ていて楽しかったです。" }
    ]},
    { id: 'horror', icon: "😱", label: 'Horror', words: [
      { word: "terrify", meaning: "恐れさせる", sentence: "The haunted house scene will terrify even the bravest viewers.", translation: "そのお化け屋敷のシーンは、最も勇敢な観客さえも恐れさせるでしょう。" },
      { word: "mystery", meaning: "謎、ミステリー", sentence: "The film's mystery kept the audience guessing until the end.", translation: "その映画の謎は観客を最後まで考えさせました。" },
      { word: "scream", meaning: "悲鳴を上げる", sentence: "She let out a loud scream when she saw the ghost.", translation: "彼女は幽霊を見て大きな悲鳴を上げました。" },
      { word: "creepy", meaning: "気味の悪い", sentence: "The old house had a creepy atmosphere.", translation: "その古い家には気味の悪い雰囲気がありました。" },
      { word: "supernatural", meaning: "超自然的な", sentence: "The movie is about a detective solving supernatural cases.", translation: "その映画は超自然的な事件を解決する探偵の話です。" }
    ]},
    { id: 'scifi', icon: "🤖", label: 'Sci-Fi', words: [
      { word: "artificial", meaning: "人工の", sentence: "The story takes place in a world where artificial intelligence controls everything.", translation: "その物語は、人工知能がすべてを支配する世界が舞台です。" },
      { word: "explore", meaning: "探検する、探求する", sentence: "The astronauts explore a distant planet in search of life.", translation: "宇宙飛行士たちは生命を探すために遠い惑星を探検する。" },
      { word: "advanced", meaning: "先進的な", sentence: "The movie features advanced technology beyond our imagination.", translation: "その映画には私たちの想像を超える先進的な技術が登場します。" },
      { word: "predict", meaning: "予測する", sentence: "Scientists in the film try to predict the future using data.", translation: "その映画の科学者たちはデータを使って未来を予測しようとします。" },
      { word: "alien", meaning: "異星人、異質な", sentence: "The team discovers an alien spaceship hidden under the ice.", translation: "チームは氷の下に隠された異星人の宇宙船を発見します。" }
    ]},
    { id: 'action', icon: "🔥", label: 'Action', words: [
      { word: "chase", meaning: "追跡する", sentence: "The police were in a high-speed chase with the criminal.", translation: "警察は犯人と高速追跡をしていました。" },
      { word: "dangerous", meaning: "危険な", sentence: "This mission is extremely dangerous and requires great skill.", translation: "この任務は非常に危険で、高い技術が必要です。" },
      { word: "explosion", meaning: "爆発", sentence: "There was a huge explosion in the middle of the city.", translation: "街の真ん中で大きな爆発が起こりました。" },
      { word: "rescue", meaning: "救助する", sentence: "The hero risked his life to rescue the hostages.", translation: "ヒーローは人質を救助するために命をかけました。" },
      { word: "weapon", meaning: "武器", sentence: "The villain had a powerful weapon that could destroy a city.", translation: "悪役は都市を破壊できる強力な武器を持っていました。" }
    ]},
    { id: 'fantasy', icon: "🏰", label: 'Fantasy', words: [
      { word: "legend", meaning: "伝説", sentence: "The movie is based on an ancient legend of a lost kingdom.", translation: "その映画は失われた王国の古代の伝説に基づいています。" },
      { word: "magic", meaning: "魔法", sentence: "The young wizard learns how to use magic to defeat evil.", translation: "若い魔法使いは悪を倒すための魔法を学びます。" },
      { word: "creature", meaning: "生き物", sentence: "A mysterious creature appears in the enchanted forest.", translation: "謎の生き物が魔法の森に現れました。" },
      { word: "adventure", meaning: "冒険", sentence: "The story follows a group of heroes on an epic adventure.", translation: "その物語は英雄たちの壮大な冒険を描いています。" },
      { word: "enchanted", meaning: "魔法にかけられた", sentence: "The castle was enchanted by an ancient spell.", translation: "その城は古代の呪文で魔法にかけられていました。" }
    ]}
  ];

  const [mockLessons, setMockLessons] = useState({
    Advanced: []
  });

  useEffect(() => {
    if (selectedGenre) {
      const selectedGenreWords = movieGenres.find(genre => genre.id === selectedGenre)?.words || [];
      setMockLessons({
        Advanced: selectedGenreWords
      });
    }
  }, [selectedGenre]);

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
                {movieGenres.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedGenre(id)}
                    className={`p-4 rounded-lg flex items-center space-x-3 transition-colors
                      ${selectedGenre === id 
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
           (!selectedInterests.includes('movies') || selectedGenre) && 
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
      setCurrentPage('learn');
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
      ) : currentPage === 'learn' ? (
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
