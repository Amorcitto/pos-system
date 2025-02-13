import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

// Temporary Error Boundary to catch issues
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong! Check console logs.</h1>;
    }
    return this.props.children;
  }
}

export default App;
