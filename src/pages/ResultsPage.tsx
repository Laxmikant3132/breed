import React, { useRef, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  Share2, 
  ChevronLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get data from navigation state or use mock as fallback
  const analysisResult = location.state?.analysisResult;
  const imagePreview = location.state?.imagePreview;
  const isFromCatalog = analysisResult?.confidence === 100 && !imagePreview;

  // Helper for dynamic data translation
  const translateData = (text: string) => {
    const dataTranslations: any = {
      'en': {},
      'hi': {
        'Heat tolerant': 'गर्मी सहनशील',
        'High fat (4.5%)': 'उच्च वसा (4.5%)',
        'Disease resistant': 'रोग प्रतिरोधी',
        'Slow milking': 'धीमी दुहाई',
        'Late maturity': 'देर से परिपक्वता',
        'Hardy': 'मज़बूत',
        'Adaptable': 'अनुकूलनशील',
        'Moderate milk yield': 'मध्यम दूध उपज',
        'Tick resistant': 'टिक प्रतिरोधी',
        'Calm temperament': 'शांत स्वभाव',
        'Requires good fodder': 'अच्छे चारे की आवश्यकता है',
        'Average fat %': 'औसत वसा %',
        'Drought resistant': 'सूखा प्रतिरोधी',
        'Low maintenance': 'कम रखरखाव',
        'Nervous temperament': 'घबराहट वाला स्वभाव',
        'Excellent heat tolerance': 'उत्कृष्ट गर्मी सहनशीलता',
        'Powerful draft animal': 'शक्तिशाली ड्राफ्ट पशु',
        'Large horns require care': 'बड़े सींगों को देखभाल की आवश्यकता होती है',
        'High milk fat': 'उच्च दूध वसा',
        'Calm': 'शांत',
        'World-renowned': 'विश्व प्रसिद्ध',
        'Requires cooling in peak summer': 'भीषण गर्मी में ठंडक की आवश्यकता',
        'Fast breeder': 'तेज़ प्रजनक',
        'Lower milk production': 'कम दूध उत्पादन',
        'Heavy body': 'भारी शरीर',
        'Good for meat & milk': 'मांस और दूध के लिए अच्छा',
        'Massive horns': 'विशाल सींग',
        'Requires huge amount of feed': 'भारी मात्रा में चारे की आवश्यकता',
        'Efficient feed converter': 'कुशल फ़ीड कनवर्टर',
        'Compact size': 'कॉम्पैक्ट आकार',
        'Lower absolute milk yield': 'कम पूर्ण दूध उपज',
        'Good lactation length': 'अच्छा स्तनपान अवधि',
        'Regular breeder': 'नियमित प्रजनक',
        'Mixed traits (Murrah-Surti cross)': 'मिश्रित लक्षण (मुर्रा-सुरती क्रॉस)',
        'Cattle': 'मवेशी',
        'Buffalo': 'भैंस',
        'Dog': 'कुत्ता',
        'Foot and Mouth Disease': 'खुरपका और मुंहपका रोग',
        'Mastitis': 'थनैला',
        'Brucellosis': 'ब्रुसेलोसिस',
        'Loyal': 'वफादार',
        'Intelligent': 'बुद्धिमान',
        'Protective': 'सुरक्षात्मक',
        'Germany': 'जर्मनी',
        'Gujarat': 'गुजरात',
        'Punjab': 'पंजाब',
        'Haryana': 'हरियाणा',
        'Rajasthan': 'राजस्थान',
        'Karnataka': 'कर्नाटक',
        'Maharashtra': 'महाराष्ट्र',
        'Punjab/Haryana': 'पंजाब/हरियाणा',
        'Gujarat (Saurashtra)': 'गुजरात (सौराष्ट्र)',
        'Friendly': 'मिलनसार',
        'Active': 'सक्रिय',
        'Playful': 'चंचल',
        'Strong': 'बलवान',
        'High shedding': 'अधिक बाल झड़ना',
        'Requires training': 'प्रशिक्षण की आवश्यकता है',
        'Late maturity compared to crossbreeds': 'क्रॉसब्रीड्स की तुलना में देर से परिपक्वता',
        'Specific dietary requirements for peak production': 'पीक उत्पादन के लिए विशिष्ट आहार आवश्यकताएं',
        'Requires spacious housing': 'बड़े आवास की आवश्यकता है',
        'Healthy': 'स्वस्थ',
        'At Risk': 'जोखिम में'
      },
      'kn': {
        'Heat tolerant': 'ಶಾಖ ಸಹಿಷ್ಣು',
        'High fat (4.5%)': 'ಹೆಚ್ಚಿನ ಕೊಬ್ಬು (4.5%)',
        'Disease resistant': 'ರೋಗ ನಿರೋಧಕ',
        'Slow milking': 'ನಿಧಾನವಾಗಿ ಹಾಲುಕರೆಯುವುದು',
        'Late maturity': 'ತಡವಾದ ಪ್ರಬುದ್ಧತೆ',
        'Hardy': 'ಬಲಶಾಲಿ',
        'Adaptable': 'ಹೊಂದಿಕೊಳ್ಳಬಲ್ಲ',
        'Moderate milk yield': 'ಮಧ್ಯಮ ಹಾಲಿನ ಇಳುವರಿ',
        'Tick resistant': 'ಉಣ್ಣೆ ನಿರೋಧಕ',
        'Calm temperament': 'ಶಾಂತ ಸ್ವಭಾವ',
        'Requires good fodder': 'ಉತ್ತಮ ಮೇವು ಬೇಕು',
        'Average fat %': 'ಸರಾಸರಿ ಕೊಬ್ಬು %',
        'Drought resistant': 'ಬರ ನಿರೋಧಕ',
        'Low maintenance': 'ಕಡಿಮೆ ನಿರ್ವಹಣೆ',
        'Nervous temperament': 'ಗಾಬರಿಯ ಸ್ವಭಾವ',
        'Excellent heat tolerance': 'ಅತ್ಯುತ್ತಮ ಶಾಖ ಸಹಿಷ್ಣುತೆ',
        'Powerful draft animal': 'ಶಕ್ತಿಶಾಲಿ ಕರಡು ಪ್ರಾಣಿ',
        'Large horns require care': 'ದೊಡ್ಡ ಕೊಂಬುಗಳಿಗೆ ಆರೈಕೆ ಬೇಕು',
        'High milk fat': 'ಹೆಚ್ಚಿನ ಹಾಲಿನ ಕೊಬ್ಬು',
        'Calm': 'ಶಾಂತ',
        'World-renowned': 'ವಿಶ್ವವಿಖ್ಯಾತ',
        'Requires cooling in peak summer': 'ಬೇಸಿಗೆಯಲ್ಲಿ ತಂಪಾಗಿಸುವಿಕೆ ಅಗತ್ಯವಿದೆ',
        'Fast breeder': 'ವೇಗದ ತಳಿಗಾರ',
        'Lower milk production': 'ಕಡಿಮೆ ಹಾಲು ಉತ್ಪಾದನೆ',
        'Heavy body': 'ಭಾರೀ ದೇಹ',
        'Good for meat & milk': 'ಮಾಂಸ ಮತ್ತು ಹಾಲಿಗೆ ಒಳ್ಳೆಯದು',
        'Massive horns': 'ಬೃಹತ್ ಕೊಂಬುಗಳು',
        'Requires huge amount of feed': 'ಬೃಹತ್ ಪ್ರಮಾಣದ ಮೇವು ಅಗತ್ಯವಿದೆ',
        'Efficient feed converter': 'ಸಮರ್ಥ ಫೀಡ್ ಪರಿವರ್ತಕ',
        'Compact size': 'ಕಾಂಪ್ಯಾಕ್ಟ್ ಗಾತ್ರ',
        'Lower absolute milk yield': 'ಕಡಿಮೆ ಸಂಪೂರ್ಣ ಹಾಲಿನ ಇಳುವರಿ',
        'Good lactation length': 'ಉತ್ತಮ ಹಾಲುಣಿಸುವ ಉದ್ದ',
        'Regular breeder': 'ನಿಯಮಿತ ತಳಿಗಾರ',
        'Mixed traits (Murrah-Surti cross)': 'ಮಿಶ್ರ ಗುಣಲಕ್ಷಣಗಳು',
        'Cattle': 'ಹಸು',
        'Buffalo': 'ಎಮ್ಮೆ',
        'Dog': 'ನಾಯಿ',
        'Foot and Mouth Disease': 'ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ',
        'Mastitis': 'ಕೆಚ್ಚಲು ಬಾವು',
        'Brucellosis': 'ಬ್ರೂಸೆಲೋಸಿಸ್',
        'Loyal': 'ನಿಷ್ಠಾವಂತ',
        'Intelligent': 'ಬುದ್ಧಿವಂತ',
        'Protective': 'ರಕ್ಷಣಾತ್ಮಕ',
        'Germany': 'ಜರ್ಮನಿ',
        'Gujarat': 'ಗುಜರಾತ್',
        'Punjab': 'ಪಂಜಾಬ್',
        'Haryana': 'ಹರಿಯಾಣ',
        'Rajasthan': 'ರಾಜಸ್ಥಾನ',
        'Karnataka': 'ಕರ್ನಾಟಕ',
        'Maharashtra': 'ಮಹಾರಾಷ್ಟ್ರ',
        'Punjab/Haryana': 'ಪಂಜಾಬ್/ಹರಿಯಾಣ',
        'Gujarat (Saurashtra)': 'ಗುಜರಾತ್ (ಸೌರಾಷ್ಟ್ರ)',
        'Friendly': 'ಸ್ನೇಹಪರ',
        'Active': 'ಸಕ್ರಿಯ',
        'Playful': 'ಚಟುವಟಿಕೆಯುಳ್ಳ',
        'Strong': 'ಬಲವಾದ',
        'High shedding': 'ಹೆಚ್ಚಿನ ಕೂದಲು ಉದುರುವಿಕೆ',
        'Requires training': 'ತರಬೇತಿಯ ಅಗತ್ಯವಿದೆ',
        'Late maturity compared to crossbreeds': 'ಅಡ್ಡತಳಿಗಳಿಗೆ ಹೋಲಿಸಿದರೆ ತಡವಾದ ಪ್ರಬುದ್ಧತೆ',
        'Specific dietary requirements for peak production': 'ಗರಿಷ್ಠ ಉತ್ಪಾದನೆಗಾಗಿ ನಿರ್ದಿಷ್ಟ ಆಹಾರದ ಅವಶ್ಯಕತೆಗಳು',
        'Requires spacious housing': 'ವಿಶಾಲವಾದ ವಸತಿ ಅಗತ್ಯವಿದೆ',
        'Healthy': 'ಆರೋಗ್ಯಕರ',
        'At Risk': 'ಅಪಾಯದಲ್ಲಿದೆ'
      }
    };
    
    // Handle dynamic parts like units
    let translatedText = text;
    if (language === 'hi') {
      translatedText = translatedText.replace('L/day', 'लीटर/दिन');
      translatedText = translatedText.replace('kg/lactation', 'किग्रा/स्तनपान');
    } else if (language === 'kn') {
      translatedText = translatedText.replace('L/day', 'ಲೀಟರ್/ದಿನ');
      translatedText = translatedText.replace('kg/lactation', 'ಕೆಜಿ/ಹಾಲುಣಿಸುವಿಕೆ');
    }

    // For exact matches
    if (dataTranslations[language] && dataTranslations[language][translatedText]) {
      return dataTranslations[language][translatedText];
    }
    
    return translatedText; // Fallback to modified or original text
  };

  const result = analysisResult || {
    breedName: "Gir Cattle",
    confidence: 98.7,
    category: "Cattle",
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    breedDetails: {
      price: "₹72k-185k",
      milkYield: "12-18 L/day",
      state: "Gujarat",
      advantages: [
        "High milk yield (1500-2500 kg per lactation)",
        "Excellent heat tolerance",
        "Resistance to common tropical diseases",
        "Gentle temperament"
      ],
      disadvantages: [
        "Late maturity compared to crossbreeds",
        "Specific dietary requirements for peak production",
        "Requires spacious housing"
      ]
    },
    diseases: [
      { name: "Foot and Mouth Disease", probability: 15, severity: "High" },
      { name: "Mastitis", probability: 8, severity: "Medium" },
      { name: "Brucellosis", probability: 3, severity: "Low" }
    ]
  };

  // Map backend structure to local structure if needed
  const displayData = {
    name: result.breed || result.breedName,
    confidence: result.confidence,
    category: result.category || "Cattle",
    price: result.breedDetails?.price || "N/A",
    milk: result.breedDetails?.milkYield || "N/A",
    advantages: result.breedDetails?.advantages || [],
    disadvantages: result.breedDetails?.disadvantages || [],
    diseases: result.diseases || [
      { name: "Foot and Mouth Disease", probability: 15, severity: "High" },
      { name: "Mastitis", probability: 8, severity: "Medium" },
      { name: "Brucellosis", probability: 3, severity: "Low" }
    ]
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `BreedAI Report: ${displayData.name}`,
          text: `Check out this AI-generated breed report for ${displayData.name} on BreedAI.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      setIsDownloading(true);
      const element = reportRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`BreedAI_Report_${displayData.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="no-print">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-10 no-print">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-semibold"
          >
            <ChevronLeft className="h-5 w-5" />
            {isFromCatalog ? t('analyze.back_to_home') : t('results.back_to_dashboard')}
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              {t('results.share_report')}
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/20 text-sm font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className={cn("h-4 w-4", isDownloading && "animate-bounce")} />
              {isDownloading ? "Generating..." : t('results.download_pdf')}
            </button>
          </div>
        </header>

        <div ref={reportRef} className="p-4 rounded-[3rem]">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Image & Health */}
          <div className="xl:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-premium border border-slate-100 dark:border-slate-800"
            >
              <div className="relative aspect-square">
                <img src={imagePreview || result.imageUrl} alt={result.breedName} className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6">
                  <div className="glass-card px-4 py-2 flex items-center gap-2 text-white border-white/40">
                    <ShieldCheck className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-bold">{t('results.verified_result')}</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-bold dark:text-white">
                     {isFromCatalog ? t('results.verified_result') : t('results.analysis_confidence')}
                   </h3>
                   <span className="text-3xl font-black text-primary-600">
                     {isFromCatalog ? "100%" : `${displayData.confidence}%`}
                   </span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${displayData.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-agriculture-gradient rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Price Estimate Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{t('results.price_estimate')}</h3>
                  <p className="text-sm text-slate-500">{t('results.price_desc')}</p>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {translateData(displayData.price)}
                </span>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                  {t('results.price_disclaimer')}
                </p>
              </div>
            </motion.div>

            {/* Disease Prediction Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{t('results.health_predictions')}</h3>
                  <p className="text-sm text-slate-500">{t('results.health_desc')}</p>
                </div>
              </div>

              <div className="space-y-6">
                {displayData.diseases.map((disease: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{translateData(disease.name)}</span>
                      <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-md",
                        disease.severity === 'High' ? "bg-red-100 text-red-600" : 
                        disease.severity === 'Medium' ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
                      )}>
                        {disease.severity} {t('results.risk')}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full",
                        disease.severity === 'High' ? "bg-red-500" : 
                        disease.severity === 'Medium' ? "bg-amber-500" : "bg-green-500"
                      )} style={{ width: `${disease.probability}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Information */}
          <div className="xl:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2">{t('results.identification_result')}</p>
                  <h2 className="text-5xl font-black dark:text-white mb-4 italic">{t(`breeds.${displayData.name}`)}</h2>
                  <div className="flex gap-3">
                    <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">{translateData(displayData.category)}</span>
                    <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">{t('results.indian_origin')}</span>
                  </div>
                </div>
                <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800/50 flex flex-col items-center">
                  <span className="text-xs font-bold text-primary-700 dark:text-primary-400 uppercase mb-1">{t('results.engine')}</span>
                  <span className="text-lg font-black text-primary-600 truncate max-w-[120px]">{result.engine || "Standard"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <h4 className="text-xl font-bold dark:text-white">{t('results.advantages')}</h4>
                  </div>
                  <ul className="space-y-4">
                    {displayData.advantages.map((adv: string, i: number) => (
                      <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {translateData(adv)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    <h4 className="text-xl font-bold dark:text-white">{t('results.considerations')}</h4>
                  </div>
                  <ul className="space-y-4">
                    {displayData.disadvantages.map((dis: string, i: number) => (
                      <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        {translateData(dis)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {!isFromCatalog && (
                <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                      <HelpCircle className="h-8 w-8" />
                    </div>
                    <div>
                      <h5 className="font-bold dark:text-white">{t('results.need_more')}</h5>
                      <p className="text-sm text-slate-500">{t('results.explore')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard/catalog')}
                    className="btn-secondary py-3 px-8 flex items-center gap-2 dark:bg-slate-800 dark:text-white dark:border-slate-700 w-full md:w-auto"
                  >
                    {t('results.learn_more')} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-primary-600 uppercase mb-3 tracking-widest">{t('results.feeding_tip')}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t('results.feeding_desc')}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-amber-600 uppercase mb-3 tracking-widest">{t('results.care_insight')}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t('results.care_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default ResultsPage;
