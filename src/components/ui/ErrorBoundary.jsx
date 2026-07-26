import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/30 text-4xl">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-[#222222] dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-[#717171] dark:text-slate-400 mb-6">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-[#2068a2] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#174d78] transition cursor-pointer"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.assign('/')}
                className="rounded-lg border border-[#dddddd] dark:border-slate-700 px-6 py-2.5 text-sm font-semibold text-[#222222] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Go to homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
