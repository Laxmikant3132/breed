import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface UploadBoxProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUpload, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300",
            dragActive 
              ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/10 scale-[1.02]" 
              : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-premium mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-primary-600" />
            </div>
            <p className="mb-2 text-xl font-bold text-slate-700 dark:text-slate-200">
              <span className="text-primary-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Indian Cattle & Buffalo breeds (JPG, PNG, WEBP)
            </p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
          
          {dragActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary-500/10 rounded-[2rem] flex items-center justify-center pointer-events-none"
            >
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center gap-2">
                <CheckCircle2 className="text-primary-600" />
                <span className="font-bold dark:text-white">Drop to analyze</span>
              </div>
            </motion.div>
          )}
        </label>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium group"
        >
          <div className="relative aspect-video">
            <img 
              src={preview!} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            
            <button 
              onClick={clearFile}
              disabled={isAnalyzing}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <ImageIcon className="h-5 w-5 text-white" />
                  <span className="text-white font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                </div>
                
                <button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="btn-primary py-3 px-8 flex items-center gap-2 shadow-2xl"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing AI...
                    </>
                  ) : (
                    <>
                      Analyze Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-primary-600" />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Ensure the animal is clearly visible for 98%+ accuracy.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadBox;
