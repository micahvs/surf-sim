# Groovy Surf - Development Commands

## Project Setup and Installation

```bash
# Install dependencies
npm install

# Install additional packages if needed
npm install next-themes
```

## Development Commands

```bash
# Start development server
npm run dev

# Build the application
npm run build

# Start the built application
npm run start

# Run linting
npm run lint
```

## Code Style Preferences

- Use TailwindCSS for styling
- Use functional components with hooks
- Use TypeScript for type safety
- Follow the existing component architecture
- Use the shadcn/ui component library

## Important Files to Check When Troubleshooting

- Theme issues: `/components/theme-provider.tsx` and `/app/layout.tsx`
- Wave model issues: `/components/wave-model-provider.tsx`
- 3D rendering issues: `/components/surfing-simulator.tsx`
- Font issues: Check for font in `/public/fonts/`

## Codebase Structure

- `/app/*`: Page routes and layouts
- `/components/*`: Reusable components 
- `/components/ui/*`: UI components from shadcn
- `/lib/*`: Utility functions and shared code