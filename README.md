<p align="center">
  <img src="app/assets/stardeos-logo.png" alt="Stardeos" width="120" />
</p>

<h1 align="center">Stardeos</h1>

<p align="center">
  A video streaming platform built for <strong>Dalas Review</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo_SDK-51-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?logo=apple&logoColor=white" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.28-ff5093" alt="Version" />
</p>

---

A cross-platform mobile streaming application built for **Dalas Review** — one of the largest Spanish-speaking YouTubers. Stardeos is a fully independent video platform where creators upload content, interact with their audience through live streams, and build communities outside of traditional social media.

This repository contains the **React Native mobile client** powering the iOS and Android apps.

## Overview

Stardeos gives creators and viewers a platform free from the constraints of mainstream video hosting. The app features video browsing, live streaming with real-time chat, a virtual currency system (Stardust), channel subscriptions, and a full social layer with comments, likes, and shares.

## Features

- **Video Feed** — Infinite-scroll feed with randomized and chronological sorting
- **Video Player** — Full playback with landscape/fullscreen support
- **Live Streaming** — Real-time streams with WebSocket-powered live chat
- **Stardust Economy** — Virtual currency for tipping creators and engaging with content
- **Channel Subscriptions** — Follow creators and receive push notifications for new uploads
- **Comments & Interactions** — Like, dislike, comment, share, and report content
- **Creator Profiles** — Dedicated profile pages with subscriber counts and video catalogs
- **Search** — Full-text video search across the platform
- **Notifications** — Real-time notification system for follows, replies, and donations
- **Discord Integration** — Link accounts with Discord for cross-platform identity
- **Monetization** — Ad integration via Google AdMob with banner placements

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.74 + Expo SDK 51 |
| Navigation | React Navigation 6 (Stack, Bottom Tabs, Material Top Tabs) |
| Networking | Axios / Apisauce |
| Real-time | Socket.io Client |
| Auth | JWT with Expo Secure Store |
| Video | expo-av, react-native-video |
| Forms | Formik + Yup |
| Animations | Lottie |
| Ads | react-native-google-mobile-ads |
| UI | Expo Linear Gradient, React Native SVG, Material Icons |

## Project Structure

```
app/
├── api/              # API service layer (auth, videos, streams, subscriptions, etc.)
├── auth/             # Authentication context and secure token storage
├── assets/           # Images, icons, and Lottie animations
├── components/
│   ├── forms/        # Reusable Formik form components
│   ├── navigation/   # Navigator configs, header, route constants
│   └── ...           # Shared UI components (modals, buttons, cards, etc.)
├── config/           # Colors and global styles
├── hooks/            # Custom hooks (API calls, formatting, subscriptions)
└── screens/          # All application screens
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
git clone https://github.com/Harkor421/Stardeos-Frontend-RN.git
cd Stardeos-Frontend-RN
npm install
```

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

> The app uses `expo-dev-client` and requires a development build. Run `npx expo prebuild` before the first launch on a physical device or emulator.

## Architecture

The app follows a straightforward React Native architecture:

- **Auth flow** — JWT tokens stored in `expo-secure-store`, managed via React Context. All API requests inject the bearer token automatically through an Axios interceptor.
- **Navigation** — Conditional rendering between `AuthNavigator` (login) and `AppNavigator` (main app) based on auth state. The main app uses bottom tabs with nested stack navigators.
- **API layer** — Centralized Axios client with per-domain service modules. A custom `useApi` hook handles loading and error states for all network calls.
- **Real-time** — Live stream chat runs over Socket.io with event-based message handling.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Samir Gonzalez
