"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  inquiryType: string
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  })

  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !formData.inquiryType) {
      setFormState({
        status: 'error',
        message: 'Please fill in all required fields.'
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormState({
        status: 'error',
        message: 'Please enter a valid email address.'
      })
      return
    }

    setFormState({ status: 'loading', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormState({
          status: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.'
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      })
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Send us a Message
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="border-border/50 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="border-border/50 focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-sm font-medium text-foreground">
              Inquiry Type *
            </Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
              <SelectTrigger className="border-border/50 focus:border-primary">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="media">Media & Press</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief subject of your message"
              className="border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us more about your inquiry..."
              className="min-h-[120px] border-border/50 focus:border-primary resize-none"
              required
            />
          </div>

          {/* Status Message */}
          {formState.message && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              formState.status === 'success' 
                ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                : formState.status === 'error'
                ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                : ''
            }`}>
              {formState.status === 'success' && <CheckCircle className="w-4 h-4" />}
              {formState.status === 'error' && <AlertCircle className="w-4 h-4" />}
              <span className="text-sm">{formState.message}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={formState.status === 'loading'}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {formState.status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
