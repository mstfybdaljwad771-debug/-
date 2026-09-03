import React, { ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React component tree:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          id="error-boundary-fallback"
          className="min-h-screen bg-[#05020a] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-['Cairo',sans-serif]"
          dir="rtl"
        >
          <div className="max-w-md p-8 rounded-3xl bg-slate-900/90 border border-pink-500/30 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">حدث خطأ بسيط في المعاينة</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              تم رصد المشكلة، يمكنك الضغط على الزر أدناه لإعادة تشغيل الصفحة فوراً بكل سلاسة.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة تشغيل الصفحة الآن</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
