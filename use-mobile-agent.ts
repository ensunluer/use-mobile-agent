import { useMemo, useState, useEffect } from 'react';

/**
 * A hook to determine if the application is running inside a WebView.
 * It detects both iOS and Android WebViews based on the user agent string.
 *
 * @returns {WebViewStatus} An object containing boolean values for `ios` and `android` and `combined` WebView checks.
 *
 * @example
 * import useMobileAgent from './useMobileAgent';
 *
 * const MyComponent = () => {
 *   const { ios, android, combined } = useMobileAgent();
 *
 *   return (
 *     <div>
 *       {combined && <p>You are in a WebView on both iOS and Android!</p>}
 *       {ios && <p>You are in an iOS WebView!</p>}
 *       {android && <p>You are in an Android WebView!</p>}
 *       {!ios && !android && <p>You are not in a WebView!</p>}
 *     </div>
 *   );
 * };
 */

type WebViewStatus = { ios: boolean; android: boolean; combined: boolean };

const useMobileAgent = (): WebViewStatus => {
  // State to store WebView detection status
  const [isWebView, setIsWebView] = useState<WebViewStatus>({
    ios: false,
    android: false,
    combined: false,
  });

  useEffect(() => {
    // User agent string for detection
    const userAgent = navigator.userAgent || navigator.vendor;

    // Detect Android WebView
    const isAndroidWebView = /wv/.test(userAgent) || /Version\/[\d.]+.*Chrome/.test(userAgent);

    // Detect iOS WebView (AppleWebKit without Safari)
    const isIOSWebView = /AppleWebKit/.test(userAgent) && !/Safari/.test(userAgent);

    setIsWebView({
      ios: isIOSWebView,
      android: isAndroidWebView,
      combined: isIOSWebView && isAndroidWebView,
    });
  }, []);

  return useMemo(() => isWebView, [isWebView]);
};

export default useMobileAgent;
