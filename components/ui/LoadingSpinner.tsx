import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', text, fullScreen = false }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 animate-fade-in-up">
      <div className={`${sizes[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="text-sm text-blue-300 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded w-full animate-shimmer"
        />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-fade-in-up">
      <div className="h-10 bg-gradient-to-r from-slate-700 to-slate-800 rounded mb-2 animate-shimmer" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 mb-2">
          {Array.from({ length: cols }).map((_, j) => (
            <div 
              key={j} 
              className="h-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded flex-1 animate-shimmer" 
              style={{ animationDelay: `${(i * cols + j) * 0.05}s` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-slate-800/50 backdrop-blur-md border border-blue-500/30 rounded-lg p-6 space-y-3">
      <div className="h-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded w-1/3 animate-shimmer" />
      <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded w-2/3 animate-shimmer" style={{ animationDelay: '0.1s' }} />
      <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded w-1/2 animate-shimmer" style={{ animationDelay: '0.2s' }} />
    </div>
  );
}