import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, Shield, Clock } from 'lucide-react';

const TermsOfService = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-amber-600 text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Important Legal Notice</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This is a template terms of service for demonstration purposes only. Before using these terms, 
                you must customize them to reflect your actual business practices and have them reviewed by a 
                qualified legal professional to ensure compliance with applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-gray-600" />
              <span>Agreement to Terms</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of brightLabs' website and services. By accessing 
              or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, 
              please do not use our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
              posting on our website. Your continued use of our services after any changes constitutes acceptance 
              of the new Terms.
            </p>
          </section>

          {/* Services Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              brightLabs provides artificial intelligence automation services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Custom AI agent development and deployment</li>
              <li>AI-powered website creation and optimization</li>
              <li>Natural language processing solutions</li>
              <li>Workflow automation implementation</li>
              <li>AI consulting and strategic guidance</li>
              <li>Custom AI solution development</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time 
              without prior notice.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="h-6 w-6 text-gray-600" />
              <span>User Responsibilities</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By using our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Uses</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may not use our services to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Engage in fraudulent activities</li>
              <li>Harass or harm others</li>
              <li>Distribute spam or unsolicited communications</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-gray-600" />
              <span>Intellectual Property Rights</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content, features, and functionality of our services, including but not limited to text, 
              graphics, logos, software, and AI models, are owned by brightLabs or our licensors and are 
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Data and Custom Solutions</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You retain ownership of any data you provide to us. Custom AI solutions developed specifically 
              for your business will be owned by you upon full payment, unless otherwise agreed in writing. 
              We may retain the right to use general methodologies and know-how developed during the project.
            </p>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Payment terms will be specified in your service agreement. Generally:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Payments are due according to the agreed schedule</li>
              <li>Late payments may incur additional fees</li>
              <li>All fees are non-refundable unless otherwise specified</li>
              <li>Prices are subject to change with 30 days' notice</li>
              <li>You are responsible for all applicable taxes</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-gray-600" />
              <span>Disclaimers and Limitations</span>
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we strive for high availability, our services are provided "as is" and "as available." 
              We do not guarantee uninterrupted or error-free service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Performance</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI systems are probabilistic and may not always produce perfect results. We make no warranties 
              about the accuracy, completeness, or reliability of AI-generated outputs.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, AI Agency shall not be liable for any indirect, 
              To the maximum extent permitted by law, brightLabs shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to loss 
              of profits, data, or business opportunities.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-gray-600" />
              <span>Termination</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Either party may terminate the service agreement with appropriate notice as specified in the 
              individual service contract. We reserve the right to suspend or terminate your access to our 
              services immediately if you violate these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Upon termination, your right to use our services will cease immediately. Provisions that by 
              their nature should survive termination will remain in effect.
            </p>
          </section>

          {/* Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your 
              use of our services, to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of 
              California, without regard to its conflict of law provisions. Any disputes arising from these 
              Terms or your use of our services shall be resolved through binding arbitration in San Francisco, California.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will 
              be limited or eliminated to the minimum extent necessary so that these Terms will otherwise 
              remain in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-900">Email:</strong>
                  <span className="text-gray-600 ml-2">legal@brightlabs.in</span>
                </div>
                <div>
                  <strong className="text-gray-900">Phone:</strong>
                  <span className="text-gray-600 ml-2">+1 (555) 123-4567</span>
                </div>
                <div>
                  <strong className="text-gray-900">Address:</strong>
                  <span className="text-gray-600 ml-2">Bright Labs Office, India</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;