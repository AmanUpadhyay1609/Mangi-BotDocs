
import React, { useRef, useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle, Phone, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    feedbackType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Add form reference

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(`formData: ${JSON.stringify(formData)}, envs: ${JSON.stringify(import.meta.env)}`);

    try {
      if (!formRef.current) {
        throw new Error("Form not found");
      }

      // await emailjs.sendForm(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // MUST have template ID
      //   formRef.current, // Use form reference instead of e.currentTarget
      //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      // );
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          feedbackType: formData.feedbackType
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Feedback Sent!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        feedbackType: 'general'
      });
    } catch (error) {
      console.error("Email sending email:", error);
      toast({
        title: "Sending Failed",
        description: `Couldn't send your message: ${(error as Error).message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactStats = [
    { icon: Star, label: "Happy Users", value: "10,000+" },
    { icon: Clock, label: "Response Time", value: "< 24h" },
    { icon: MessageSquare, label: "Messages Sent", value: "50,000+" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl transform -skew-y-1"></div>
        <div className="py-16 px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or need support? We'd love to hear from you!
            Our team is here to help you succeed with the Mangi TG Bot SDK.
          </p>
        </div>
      </div>

      {/* Contact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {contactStats.map((stat, index) => (
          <Card key={index} className="text-center hover-scale border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="hover-scale border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>Get technical help</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Our support team typically responds within 24 hours to help you with any technical questions.
              </p>
              <a
                href="mailto:aman.upadhyay@thewasserstoff.com"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                aman.upadhyay@thewasserstoff.com
                <Send className="h-4 w-4 ml-2" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover-scale border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Documentation</CardTitle>
                  <CardDescription>Improve our docs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Found an issue in our documentation? Help us make it better for everyone by letting us know.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Community</CardTitle>
                  <CardDescription>Join our community</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with other developers, share your projects, and get community support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Send us a message
              </CardTitle>
              <CardDescription className="text-base">
                Fill out the form below and we'll get back to you as soon as possible. We read every message!
              </CardDescription>
              <Separator className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add formRef here */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="h-12 border-0 shadow-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="h-12 border-0 shadow-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feedbackType" className="text-sm font-semibold">What can we help you with?</Label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className="flex h-12 w-full rounded-md border-0 shadow-sm bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="general">💬 General Feedback</option>
                    <option value="bug">🐛 Bug Report</option>
                    <option value="feature">✨ Feature Request</option>
                    <option value="documentation">📚 Documentation Issue</option>
                    <option value="support">🛠️ Technical Support</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-sm font-semibold">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of your message"
                    className="h-12 border-0 shadow-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please provide as much detail as possible. Include any error messages, steps to reproduce issues, or specific features you'd like to see..."
                    className="min-h-[140px] border-0 shadow-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
