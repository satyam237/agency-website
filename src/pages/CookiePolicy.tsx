import React from 'react';
import { ArrowLeft, Cookie, Settings, BarChart3, Target, Shield, Info } from 'lucide-react';

const CookiePolicy = () => {
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
              <Cookie className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
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
                This is a template cookie policy for demonstration purposes only. Before using this policy, 
                you must customize it to reflect your actual cookie usage and have it reviewed by a 
                qualified legal professional to ensure compliance with applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Info className="h-6 w-6 text-gray-600" />
              <span>What Are Cookies?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They 
              help us provide you with a better experience by remembering your preferences, analyzing how 
              you use our site, and improving our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, 
              and how you can control your cookie preferences.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            {/* Essential Cookies */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Essential Cookies</span>
              </h3>
              <p className="text-blue-800 leading-relaxed mb-3">
                These cookies are necessary for our website to function properly and cannot be disabled. 
                They enable core functionality such as security, network management, and accessibility.
              </p>
              <div className="text-sm text-blue-700">
                <strong>Examples:</strong> Session management, security tokens, load balancing
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Analytics Cookies</span>
              </h3>
              <p className="text-green-800 leading-relaxed mb-3">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously. This helps us improve our website's performance 
                and user experience.
              </p>
              <div className="text-sm text-green-700">
                <strong>Examples:</strong> Google Analytics, page views, bounce rate, traffic sources
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-600" />
                <span>Functional Cookies</span>
              </h3>
              <p className="text-purple-800 leading-relaxed mb-3">
                These cookies enable enhanced functionality and personalization. They may be set by us 
                or by third-party providers whose services we have added to our pages.
              </p>
              <div className="text-sm text-purple-700">
                <strong>Examples:</strong> Language preferences, chat widgets, video players
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                <Target className="h-5 w-5 text-orange-600" />
                <span>Marketing Cookies</span>
              </h3>
              <p className="text-orange-800 leading-relaxed mb-3">
                These cookies track your online activity to help advertisers deliver more relevant 
                advertising or to limit how many times you see an ad. They may also be used to measure 
                the effectiveness of advertising campaigns.
              </p>
              <div className="text-sm text-orange-700">
                <strong>Examples:</strong> Retargeting pixels, conversion tracking, social media plugins
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Some cookies on our website are placed by third-party services. We use the following 
              third-party services that may place cookies:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Google Fonts:</strong> For web font delivery</li>
              <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
              <li><strong>Customer Support Tools:</strong> For live chat and support features</li>
              <li><strong>Content Delivery Networks:</strong> For faster content delivery</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              These third parties have their own privacy policies and cookie policies, which we encourage 
              you to review.
            </p>
          </section>

          {/* Cookie Management */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>View what cookies are stored on your device</li>
              <li>Delete cookies individually or all at once</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies from being set</li>
              <li>Set preferences for first-party and third-party cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser-Specific Instructions</h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                  <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies and other site data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                  <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                  <p className="text-sm text-gray-600">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                  <p className="text-sm text-gray-600">Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Opt-Out Tools</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can also use these tools to opt out of certain types of cookies:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
              <li><strong>Advertising Cookies:</strong> Visit the Digital Advertising Alliance opt-out page</li>
              <li><strong>Social Media:</strong> Adjust privacy settings on individual social media platforms</li>
            </ul>
          </section>

          {/* Impact of Disabling Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Please note that disabling certain cookies may impact your experience on our website:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Some features may not work properly or at all</li>
              <li>You may need to re-enter information more frequently</li>
              <li>Personalized content and recommendations may not be available</li>
              <li>We may not be able to remember your preferences</li>
              <li>Website performance analytics may be affected</li>
            </ul>
          </section>

          {/* Updates to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Cookie Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or 
              for other operational, legal, or regulatory reasons. We will notify you of any material 
              changes by posting the updated policy on our website.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-900">Email:</strong>
                  <span className="text-gray-600 ml-2">privacy@brightlabs.in</span>
                </div>
                <div>
                  <strong className="text-gray-900">Address:</strong>
                  <span className="text-gray-600 ml-2">Bright Labs Office, Pune, India</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;