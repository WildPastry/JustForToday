import * as WebBrowser from 'expo-web-browser';
import { Link } from 'expo-router';
import { Platform } from 'react-native';
import React from 'react';

export function ExternalLink(props: React.ComponentProps<typeof Link>) {
  return (
    <Link
      hrefAttrs={{
        // On web, launch the link in a new tab.
        target: '_blank'
      }}
      {...props}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    />
  );
}