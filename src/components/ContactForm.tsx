import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactMethod {
  id: string;
  label: string;
  icon: JSX.Element;
  placeholder: string;
  type: string;
  validation: RegExp;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="w-4 h-4" />,
    placeholder: 'your@email.com',
    type: 'email',
    validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: <Phone className="w-4 h-4" />,
    placeholder: '+1 (555) 000-0000',
    type: 'tel',
    validation: /^\+?[\d\s-()]+$/
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <MessageCircle className="w-4 h-4" />,
    placeholder: '+1 (555) 000-0000',
    type: 'tel',
    validation: /^\+?[\d\s-()]+$/
  }
];

export function ContactForm() {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<string>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedMethod = contactMethods.find(method => method.id === contactMethod);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!contactInfo.trim()) {
      newErrors.contactInfo = `${selectedMethod?.label} is required`;
    } else if (selectedMethod?.validation && !selectedMethod.validation.test(contactInfo)) {
      newErrors.contactInfo = `Please enter a valid ${selectedMethod.label.toLowerCase()}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contactMethod,
          contactInfo,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      // Reset form
      setName('');
      setContactInfo('');
      setIsSubmitting(false);
      
      // Show success message
      alert('Thank you for your submission!');
    } catch (error) {
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-spektr-cyan-900/20 rounded-lg backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-spektr-cyan-50 mb-2">
            What is your name?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-spektr-cyan-900/40 border border-spektr-cyan-700 rounded-md text-spektr-cyan-50 focus:outline-none focus:ring-2 focus:ring-spektr-cyan-500"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Contact Method Selector */}
        <div>
          <label className="block text-sm font-medium text-spektr-cyan-50 mb-2">
            How can I best contact you?
          </label>
          <div className="flex justify-center space-x-4">
            {contactMethods.map((method) => (
              <motion.button
                key={method.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setContactMethod(method.id)}
                className={`p-3 rounded-full ${
                  contactMethod === method.id
                    ? 'bg-spektr-cyan-500 text-white'
                    : 'bg-spektr-cyan-900/40 text-spektr-cyan-200'
                }`}
              >
                {method.icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contact Information Input */}
        <div>
          <label className="block text-sm font-medium text-spektr-cyan-50 mb-2">
            {selectedMethod?.label} Information
          </label>
          <input
            type={selectedMethod?.type}
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full px-4 py-2 bg-spektr-cyan-900/40 border border-spektr-cyan-700 rounded-md text-spektr-cyan-50 focus:outline-none focus:ring-2 focus:ring-spektr-cyan-500"
            placeholder={selectedMethod?.placeholder}
          />
          {errors.contactInfo && (
            <p className="mt-1 text-sm text-red-400">{errors.contactInfo}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          <motion.div
            className="flex items-center justify-center"
            animate={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.div>
        </Button>
      </form>
    </motion.div>
  );
} 