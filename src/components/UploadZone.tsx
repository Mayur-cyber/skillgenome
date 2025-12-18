import { useState, useCallback } from "react";
import { Upload, FileText, Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  onGithubConnect: (url: string) => void;
}

const UploadZone = ({ onFileUpload, onGithubConnect }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer",
          "rounded-2xl border-2 border-dashed transition-all duration-500",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-glass-border hover:border-primary/50 bg-card/20",
          "backdrop-blur-xl"
        )}
      >
        {/* Scanning Animation Overlay */}
        {isScanning && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="scan-line absolute inset-0" />
          </div>
        )}

        <label className="block p-12 cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-6">
            {/* Scanner Icon */}
            <div className={cn(
              "relative w-24 h-24 rounded-2xl",
              "bg-gradient-to-br from-primary/20 to-secondary/20",
              "flex items-center justify-center",
              "transition-all duration-500 group-hover:scale-110",
              isDragging && "scale-110"
            )}>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-glow-pulse" />
              
              {/* Icon */}
              {uploadedFile ? (
                <FileText className="w-10 h-10 text-primary relative z-10" />
              ) : (
                <Upload className="w-10 h-10 text-primary relative z-10" />
              )}
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {uploadedFile ? uploadedFile.name : "Upload Resume/CV (PDF)"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {uploadedFile
                  ? "File ready for genome analysis"
                  : "Drag and drop or click to browse"}
              </p>
            </div>

            {/* Status Indicator */}
            {uploadedFile && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-accent">READY FOR SCAN</span>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Optional</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
      </div>

      {/* GitHub Connect */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <Github className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Connect GitHub Profile
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="username"
                className={cn(
                  "w-full h-11 pl-28 pr-4 rounded-lg",
                  "bg-muted/50 border border-border",
                  "text-foreground font-mono text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                  "transition-all duration-300",
                  "placeholder:text-muted-foreground/50"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
