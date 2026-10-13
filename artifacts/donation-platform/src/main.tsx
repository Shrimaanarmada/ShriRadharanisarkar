import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

setAuthTokenGetter(() => localStorage.getItem("auth_token"));

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main
          style={{
            fontFamily: "system-ui, sans-serif",
            padding: 24,
            color: "#222",
            background: "#fff",
            minHeight: "100vh",
            overflowWrap: "anywhere",
          }}
        >
          <h1 style={{ color: "#b91c1c" }}>
            Website Runtime Error
          </h1>
          <p>इस त्रुटि का स्क्रीनशॉट भेजें:</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error.message}
          </pre>
          <details>
            <summary>Technical details</summary>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error.stack}
            </pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Website
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  );
} else {
  document.body.innerHTML =
    "<h1>Website startup error: #root element not found.</h1>";
}