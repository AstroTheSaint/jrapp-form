# JRapp Form

A modern, animated contact form component built with React, Next.js, and Framer Motion. Features a sleek design with real-time validation and email notifications.

## Features

- Modern, minimalist design
- Animated interactions using Framer Motion
- Real-time form validation
- Multiple contact method options (Email, Phone, WhatsApp)
- Email notifications for form submissions
- Fully responsive
- Dark mode optimized
- Accessibility-friendly

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jrapp-form.git
cd jrapp-form
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=your-from-email
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000` to see the form in action.

## Component Usage

```tsx
import { ContactForm } from '@/components/ContactForm';

export default function Page() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
```

## Customization

The form uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind config
2. Adjusting the component's className props
3. Updating the color variables in the CSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern web trends
- Built with React and Next.js
- Animations powered by Framer Motion 