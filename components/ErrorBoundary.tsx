import React, { Component } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Unhandled UI error:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-[60vh] flex items-center justify-center bg-background text-foreground">
          <div className="border border-border bg-paper p-8 text-center max-w-md">
            <p className="section-caption mb-3">SYSTEM ALERT</p>
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted mb-6">
              An unexpected error occurred. Please reload the experience.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px] bg-primary text-background hover:bg-signal border border-transparent rounded-none shadow-hard-sm hover:shadow-hard px-6 py-3 text-sm"
            >
              RETRY
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
