import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell grid min-h-[50vh] place-items-center py-20 text-center">
          <div>
            <p className="eyebrow">Something went wrong</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">We hit a snag loading this page.</h1>
            <p className="mt-3 text-sm leading-6 text-muted">Please refresh, or head back to the homepage.</p>
            <a href="/" className="primary-button mt-6 inline-flex">Back to home</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
