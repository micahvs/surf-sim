# Groovy Surf - Visual Guide

Since you're having trouble running the application locally, here's a visual guide to what the application should look like and what it does.

## Home Page

The home page features a psychedelic wavy background with a large "Groovy Surf" title. There are three buttons:
- Start Surfing - Takes you to the 3D surfing simulator
- Wave Dashboard - Opens the wave control panel
- Brand Specs - Shows the brand design system

## Surfing Simulator

The simulator page shows a 3D ocean scene with:
- A surfboard riding waves
- Psychedelic background elements that change color and shape
- Controls at the bottom to adjust:
  - Wave Intensity (affects the height and movement of waves)
  - Psychedelic Level (affects the color and animation intensity)
- Buttons for pause/play, mute/unmute, reset, home, and settings

## Wave Dashboard

The dashboard has three main sections:
1. **Swell Controls** - Tabs for Primary, Secondary, and Tertiary swells with:
   - Direction compass (drag to change wave direction)
   - Wave height slider (0-10m)
   - Wave period slider (5-20s)
   - Enable/disable toggle for each swell

2. **Sandbar Configuration** - Controls for:
   - Sandbar count (1-5)
   - Spacing between sandbars (10-100m)
   - Sandbar height (0-3m)
   - Angle of sandbars (0-90°)

3. **Visualization Panel** - Shows a simplified visualization of:
   - Current wave patterns
   - Wave presets (Perfect Point, Big Day, Beach Break, Reef Break, Psychedelic Dream)
   - Current parameter JSON output

## Brand Specs

The brand page shows design guidelines with tabs for:
1. **Overview** - Brand vision, personality, and target audience
2. **Colors** - Color palette with primary and secondary colors
3. **Typography** - Text styles using the Geist font
4. **Assets** - Logo variations and design elements

## MCP (Model Control Protocol)

Technical documentation explaining:
1. **Overview** - System architecture and components
2. **Parameters** - Detailed specs of all wave parameters
3. **Integration** - How to integrate with physical modeling systems
4. **AI Instructions** - Guidelines for AI systems to interact with the wave model

## Testing the App

You have these options to view the application:

1. **Browser File Viewer** - Open the `open-files.html` file directly in your browser
2. **Terminal Menu** - Run `./view-app.sh` in your terminal to access a menu that will open each page
3. **Documentation** - Read the `DOCUMENTATION.md` file for technical details

The files in the `/out` directory are static HTML exports of the application. Due to browser security restrictions, some features may not work when viewing as local files, and navigation between pages will be limited.