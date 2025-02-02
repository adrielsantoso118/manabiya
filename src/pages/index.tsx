import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, Music, Code, Palette, Trophy, Gamepad2, Volume2, Check, X, BrainCircuit } from 'lucide-react';

const ManabiyaPrototype = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState('interests');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [proficiencyLevel, setProficiencyLevel] = useState('');
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setStep('lesson'); // Go to lessons page after the transition
    }, 3000); // Transition screen for 3 seconds
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
      <h1 className="text-4xl text-blue-500 mb-4 font-serif text-center max-w-3xl px-4">
        Creating Your Personalized Experience
      </h1>
      <div className="w-64 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: isTransitioning ? '100%' : '0%' }} />
      </div>
      <p className="mt-4 text-lg text-gray-600 font-sans">Please wait...</p>
    </div>
  );

  const mockLessons = {
    Beginner: {
      word: "computer",
      meaning: "コンピューター",
      sentence: "I use my computer every day.",
      translation: "私は毎日コンピューターを使います。"
    },
    Intermediate: {
      word: "technology",
      meaning: "テクノロジー",
      sentence: "New technology helps us learn English.",
      translation: "新しいテクノロジーは英語学習に役立ちます。"
    },
    Advanced: {
      word: "innovation",
      meaning: "革新",
      sentence: "Recent technological innovations have changed the way we live.",
      translation: "最近の技術革新は私たちの生活様式を変えました。"
    }
  };

  const interests = [
    { id: 'tech', icon: Code, label: 'Technology' },
    { id: 'art', icon: Palette, label: 'Art' },
    { id: 'games', icon: Gamepad2, label: 'Gaming' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'movies', icon: Clapperboard, label: 'Movies' },
    { id: 'sports', icon: Trophy, label: 'Sports' }
  ];

  const mockLesson = mockLessons[proficiencyLevel || 'Beginner'];

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
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      }
      if (prev.length < 3) {
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const startLesson = () => {
    if (selectedInterests.length && proficiencyLevel) {
      handleTransition(); // Show the transition screen before moving to the lessons
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
              Choose 2-3 interests to start—don't worry, you can discover more later!
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
        <CardTitle className="text-blue-500">Today's Lesson</CardTitle>
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
            onClick={() => setStep('quiz')}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuiz = () => {
    const correctAnswer = 'computer';
    
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
            <p className="text-gray-700">I use my ________ every day.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {['computer', 'phone', 'tablet', 'laptop'].map((option) => (
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
                    ? '正解です！Great job!' 
                    : `残念！The correct answer is "${correctAnswer}". Try again!`}
                </p>
              </div>
            )}

            {showFeedback && (
              <button
                onClick={() => {
                  setSelectedAnswer(null);
                  setShowFeedback(false);
                  setStep('lesson');
                }}
                className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next Lesson
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen">
      {isLoading ? (
        <LoadingScreen />
      ) : isTransitioning ? (
        <TransitionScreen />
      ) : step === 'interests' ? (
        renderInterestsSelection()
      ) : step === 'lesson' ? (
        renderLesson()
      ) : (
        renderQuiz()
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="w-[360px] h-[640px] mx-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <ManabiyaPrototype />
    </div>
  );
}
