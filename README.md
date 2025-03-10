# User Profile Management Application

A modern web-based application for managing user profiles built with React, TypeScript, and Material Design components.

## Features

- Create and manage user profiles with detailed information
- Upload profile pictures
- Toggle favorite status for profiles
- Enable/disable notifications
- Responsive design with mobile-first approach
- Material Design UI components

## Tech Stack

- React with TypeScript
- Material Design components (shadcn/ui)
- React Query for state management
- React Hook Form for form handling
- Zod for validation
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd user-profile-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                  # Backend API
├── shared/                  # Shared types and schemas
└── documentation.md        # Detailed documentation
```

## Features Documentation

### User Profile Management

- Create new profiles with detailed information
- Edit existing profiles
- Delete profiles
- Toggle favorite status
- Enable/disable notifications
- Upload profile pictures

### Form Validation

- Name: minimum 2 characters
- Email: valid email format
- Phone: valid phone number format
- Age: minimum 13 years
- Required fields validation
- Image upload support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
