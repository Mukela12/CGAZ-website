'use client'

import { useState } from 'react'
import { Hero } from '@/components/shared/Hero'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/shared/Button'
import { Send, Upload, Check } from 'lucide-react'
import { submitCourseRegistration, uploadPaymentReceipt } from '../actions'
import { toast } from 'sonner'
import { PaymentMethods } from './PaymentMethods'

export default function TrainingRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    courseName: '',
    preferredDate: '',
    farmingExperience: '',
    paymentMethod: '',
    paymentAmount: '',
    additionalNotes: '',
  })
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptUploadStatus, setReceiptUploadStatus] = useState<{
    uploading: boolean
    success: boolean
    message: string
    mediaId?: string
  }>({ uploading: false, success: false, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0])
      setReceiptUploadStatus({ uploading: false, success: false, message: '' })
    }
  }

  const handleUploadReceipt = async () => {
    if (!receiptFile) {
      setReceiptUploadStatus({
        uploading: false,
        success: false,
        message: 'Please select a file first.',
      })
      return
    }

    setReceiptUploadStatus({ uploading: true, success: false, message: '' })

    const uploadFormData = new FormData()
    uploadFormData.append('file', receiptFile)

    const result = await uploadPaymentReceipt(uploadFormData)

    setReceiptUploadStatus({
      uploading: false,
      success: result.success,
      message: result.message,
      mediaId: result.mediaId,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await submitCourseRegistration({
      ...formData,
      paymentReceiptId: receiptUploadStatus.mediaId,
    })

    setIsSubmitting(false)

    if (result.success) {
      toast.success(result.message)
      setFormData({
        name: '',
        email: '',
        phone: '',
        district: '',
        courseName: '',
        preferredDate: '',
        farmingExperience: '',
        paymentMethod: '',
        paymentAmount: '',
        additionalNotes: '',
      })
      setReceiptFile(null)
      setReceiptUploadStatus({ uploading: false, success: false, message: '' })
    } else {
      toast.error(result.message)
    }
  }

  const courses = [
    { value: 'membership', label: 'CGAZ Annual Membership (ZMW 70)' },
    { value: 'foundation', label: 'Foundation Course - Cashew Cultivation Basics' },
    { value: 'pest-management', label: 'Integrated Pest Management' },
    { value: 'pruning', label: 'Pruning & Tree Management' },
    { value: 'post-harvest', label: 'Post-Harvest Handling' },
    { value: 'advanced-processing', label: 'Advanced Processing Techniques' },
    { value: 'quality-control', label: 'Quality Control & Certification' },
    { value: 'business-marketing', label: 'Business & Marketing Skills' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Register for Training"
        subtitle="Join our comprehensive training programs and enhance your cashew farming skills"
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379303/TrainingInGraftingTechniquesDuringTheFarmerTrainingWorkshopAtNamushakendeFarmerTrainingInstituteInMongu12_yv0rix.jpg"
        objectPosition="center 35%"
      />

      {/* Registration Form */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-earth-beige/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Course Registration Form
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fill in your details below to register for a training course. Our team will review
              your application and get back to you within 2-3 business days.
            </p>
          </div>

          <GlassCard variant="white" className="p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cashew-green text-white flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="johndoe@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-neutral-700 mb-2">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="e.g., Mongu, Senanga"
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cashew-green text-white flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Course Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-neutral-700 mb-2">
                      Select Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                    >
                      <option value="">Choose a training program...</option>
                      {courses.map((course) => (
                        <option key={course.value} value={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-neutral-700 mb-2">
                      Preferred Training Date/Month
                    </label>
                    <input
                      type="text"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="e.g., January 2026 or Next available"
                    />
                  </div>

                  <div>
                    <label htmlFor="farmingExperience" className="block text-sm font-medium text-neutral-700 mb-2">
                      Cashew Farming Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="farmingExperience"
                      name="farmingExperience"
                      value={formData.farmingExperience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                    >
                      <option value="">Select your experience level...</option>
                      <option value="none">Not yet started</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (3-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cashew-green text-white flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Payment Information
                </h3>
                <div className="space-y-6">
                  <PaymentMethods />

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-neutral-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                    >
                      <option value="">Select payment method...</option>
                      <option value="mtn-mobile-money">MTN Mobile Money</option>
                      <option value="airtel-money">Airtel Money</option>
                      <option value="zamtel-kwacha">Zamtel Kwacha</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="cash">Cash (In Person)</option>
                      <option value="pending">Will Pay Later</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="paymentAmount" className="block text-sm font-medium text-neutral-700 mb-2">
                      Payment Amount (ZMW)
                    </label>
                    <input
                      type="text"
                      id="paymentAmount"
                      name="paymentAmount"
                      value={formData.paymentAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent"
                      placeholder="e.g., 500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Payment Receipt/Screenshot (Optional)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cashew-green/10 file:text-cashew-green hover:file:bg-cashew-green/20"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handleUploadReceipt}
                        disabled={!receiptFile || receiptUploadStatus.uploading}
                        iconBefore={
                          receiptUploadStatus.success ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Upload className="w-5 h-5" />
                          )
                        }
                        className="whitespace-nowrap"
                      >
                        {receiptUploadStatus.uploading
                          ? 'Uploading...'
                          : receiptUploadStatus.success
                          ? 'Uploaded'
                          : 'Upload'}
                      </Button>
                    </div>
                    {receiptUploadStatus.message && (
                      <p
                        className={`text-sm mt-2 ${
                          receiptUploadStatus.success ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {receiptUploadStatus.message}
                      </p>
                    )}
                    <p className="text-xs text-neutral-500 mt-2">
                      Accepted formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cashew-green text-white flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Additional Information
                </h3>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-neutral-700 mb-2">
                    Additional Notes/Questions (Optional)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-cashew-green focus:border-transparent resize-none"
                    placeholder="Any special requirements or questions you have about the training..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  iconAfter={<Send className="w-5 h-5" />}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </div>

              <p className="text-sm text-neutral-600 text-center">
                By submitting this form, you agree to receive communications from CGAZ regarding your
                training registration.
              </p>
            </form>
          </GlassCard>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">
              Need help with registration? Contact us at{' '}
              <a href="mailto:info@cgaz.org.zm" className="text-cashew-green font-semibold hover:underline">
                info@cgaz.org.zm
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
