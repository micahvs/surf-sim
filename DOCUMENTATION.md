# Groovy Surf Documentation

## Overview

Groovy Surf is a psychedelic surfing simulator web application built with Next.js. It provides an immersive, visually stunning experience where users can interact with various wave parameters, observe a 3D surfing simulation, and explore different wave presets.

## Project Structure

The application follows a standard Next.js App Router structure:

- `app/`: Contains the application pages and routes
  - `page.tsx`: Homepage with links to main features
  - `layout.tsx`: Root layout with theme provider
  - `simulator/`: 3D surfing simulator page
  - `dashboard/`: Wave model control dashboard
  - `brand/`: Brand styleguide and design system
  - `mcp/`: Model Control Protocol documentation

- `components/`: Reusable UI components
  - `ui/`: Shadcn UI components (buttons, sliders, tabs, etc.)
  - `surfing-simulator.tsx`: 3D surfing visualization using Three.js
  - `wave-model-provider.tsx`: Context provider for wave model state
  - Other specialized components for different areas of the app

## Core Features

### 1. Surfing Simulator

A 3D visualization built with React Three Fiber that allows users to:
- Watch a surfboard riding waves in a psychedelic environment
- Adjust wave intensity and psychedelic effects in real-time
- Toggle pause/play and mute/unmute
- Experience an immersive visual environment

### 2. Wave Model Dashboard

A detailed control panel that lets users:
- Configure up to three different swells (primary, secondary, tertiary)
- Adjust wave direction, height, and period
- Configure sandbar formations
- Apply preset wave conditions
- Visualize wave parameters

### 3. Brand Guidelines

A comprehensive design system showcasing:
- Color palette
- Typography
- Logo and visual assets
- Brand personality and vision

### 4. Model Control Protocol (MCP)

Technical documentation for the wave model system:
- Parameter specifications
- API integration guidelines
- Terminology and explanations
- AI assistant instructions

## Technical Implementation

### Technologies Used

- **Next.js 15**: App Router structure, fast rendering
- **React 19**: Component-based UI architecture
- **Three.js/React Three Fiber**: 3D graphics rendering
- **TailwindCSS**: Utility-first styling
- **Shadcn UI**: Component library (buttons, sliders, etc.)
- **Radix UI**: Accessible UI primitives
- **Lucide React**: Icon library

### State Management

The application uses React Context API for state management:
- `WaveModelProvider`: Manages wave parameters and presets
- Supports multiple swells and sandbar configurations
- Provides methods for applying presets and updating parameters

### 3D Rendering

The 3D surfing simulator is built with:
- React Three Fiber for React integration with Three.js
- Custom wave simulation using sine wave mathematics
- Dynamic psychedelic elements that respond to user settings
- Orbit controls and camera positioning

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pages and Navigation

- **Home**: Landing page with links to main features
- **Simulator**: 3D surfing experience with adjustable parameters
- **Dashboard**: Technical wave model control panel
- **Brand**: Design system and brand guidelines
- **MCP**: Technical documentation for wave model protocol

## Troubleshooting

Common issues and solutions:

1. **Missing font error**: The surfing simulator tries to load a font from `/public/fonts/Geist_Bold.json`. If you encounter errors, either:
   - Create this file with a valid font JSON, or
   - Remove the font parameter from the Text component in surfing-simulator.tsx

2. **Theme-related errors**: If encountering issues with theme settings:
   - Ensure next-themes is installed: `npm install next-themes`
   - Check that the ThemeProvider is properly configured in app/layout.tsx

3. **3D rendering performance**: If experiencing poor performance:
   - Reduce the number of psychedelic objects in the scene
   - Lower the complexity of the ocean wave geometry
   - Use the pause button to freeze animations

## Customization

The application supports various customization options:

1. **Wave Presets**: Add new presets in wave-model-provider.tsx
2. **Color Schemes**: Modify the TailwindCSS theme in tailwind.config.ts
3. **3D Elements**: Add or modify objects in the surfing-simulator.tsx file

## Design Principles

The application follows these design principles:

1. **Psychedelic Aesthetics**: Vibrant colors, flowing animations, and mind-expanding visuals
2. **Technical Precision**: Accurate wave modeling parameters and controls
3. **Responsive Design**: Works across various device sizes
4. **Immersive Experience**: Engaging 3D visuals and intuitive controls