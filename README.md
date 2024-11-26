# Text Message Simulator

A modern web application for creating and simulating mobile messaging interfaces with advanced editing capabilities.

## Features

- 📱 High-fidelity mobile device simulation
- 💬 Rich messaging interface editor
- 📸 Screenshot and image manipulation tools
- 🎨 Modern, responsive UI with dark mode support
- 🔄 Real-time preview and editing
- 🎯 Customizable contact and system message options

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:**
  - Radix UI
  - shadcn/ui
  - React Aria Components
- **State Management:** Zustand
- **Date/Time:** Luxon
- **Animation:** Motion
- **Notifications:** Sonner

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # React components
│   ├── app/      # App-wide components
│   ├── editor/   # Message editor components
│   ├── phone/    # Device simulation components
│   └── ui/       # Reusable UI components
└── lib/          # Utilities and types
```

## License

See [LICENSE](LICENSE) file for details.
