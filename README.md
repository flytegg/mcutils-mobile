# MC Utils Mobile

**MC Utils Mobile** is the official mobile version of MC Utils, a collection of Minecraft utilities designed for developers, builders, and players. The app offers a set of tools optimized for mobile devices, with a modern and intuitive interface.

The project is powered by the [Flyte](https://flyte.gg) team and our generous contributors.

For support or to chat with the team, join our [Discord](https://discord.gg/flyte)

## 📝 Contributing

### Prerequisites
- Bun 1.0 or higher
- Expo CLI
- A code editor

If you're using VS Code, we recommend installing these extensions:
- React Native Tools
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### Setup
1. Clone the GitHub repository to your machine
2. Open terminal in the project folder
3. Run `bun install`
4. Run `bun run start` to launch the app
5. Download `Expo Go` on your phone (ensure both devices are on the same network)
6. Scan the QR code displayed in the console

And you're all set!

### Technologies
We use:
- React Native with Expo
- NativeWind (TailwindCSS for React Native)
- TypeScript

### Component System

#### Reusable Components
We maintain a library of reusable components to ensure consistent styling across the app:

- `Button`: Custom button component with various styles and states
- `Card`: Flexible card component for content organization
- `Input`: Custom input component with consistent styling
- `Logo`: App logo component with customizable properties
- `Text`: Typography component for consistent text styling
- `ThemeProvider`: Context provider for app-wide theme management

### Adding a New Util

1. Create a new component in the `app/tools` directory
2. Create the default export for your component
3. Add your utility to `index.tsx` following the existing pattern
4. Add your utility icon to `icons.tsx`
