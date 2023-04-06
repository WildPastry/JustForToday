import * as WebBrowser from 'expo-web-browser';
import { IExternalLink } from '../types/component.types';
import { Link } from 'expo-router';
import { Platform } from 'react-native';
import React from 'react';

const ExternalLink: React.FC<IExternalLink> = (
  props: IExternalLink
): JSX.Element => {
  return (
    <Link
      hrefAttrs={{
        // On web launch the link in a new tab
        target: '_blank'
      }}
      {...props}
      onPress={(e: { preventDefault: () => void }) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native
          e.preventDefault();
          // Open the link in an in-app browser
          WebBrowser.openBrowserAsync(props.href);
        }
      }}
    />
  );
};

export default ExternalLink;
