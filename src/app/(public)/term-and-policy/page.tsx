"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function TermsAndPolicyPage() {
  // Create state to track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Function to toggle section open state
  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-yellow-500 to-red-500 py-6 px-4 text-center shadow-md">
        <h1 className="text-2xl font-bold text-white">Terms and Policy</h1>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Terms of Service
          </h2>

          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["acceptance"]}
            onToggle={() => toggleSection("acceptance")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>1. Acceptance of Terms</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["acceptance"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                By accessing or using our service, you agree to be bound by
                these Terms. If you disagree with any part of the Terms, then
                you do not have permission to access the service.
              </p>
            </div>
          </details>

          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["conduct"]}
            onToggle={() => toggleSection("conduct")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>2. User Conduct</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["conduct"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                Users are expected to behave responsibly when using our
                services. Prohibited activities include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Violating laws or regulations</li>
                <li>Posting unauthorized commercial communications</li>
                <li>Engaging in unlawful multi-level marketing</li>
                <li>Transmitting viruses or malicious code</li>
                <li>Harassment or bullying of other users</li>
              </ul>
            </div>
          </details>

          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["intellectual"]}
            onToggle={() => toggleSection("intellectual")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>3. Intellectual Property Rights</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["intellectual"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                Our service and its original content, features, and
                functionality are owned by us and are protected by international
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>
          </details>

          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["liability"]}
            onToggle={() => toggleSection("liability")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>4. Limitation of Liability</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["liability"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                In no event shall we be liable for any indirect, incidental,
                special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or
                inability to access or use the service.
              </p>
            </div>
          </details>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Privacy Policy
          </h2>
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["privacy"]}
            onToggle={() => toggleSection("privacy")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>Privacy Policy</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["privacy"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                We respect your privacy and are committed to protecting your
                personal data. Our Privacy Policy explains how we collect, use,
                and safeguard your information when you use our service.
              </p>
            </div>
          </details>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Refund Policy
          </h2>
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["refund"]}
            onToggle={() => toggleSection("refund")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>Refund Policy</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["refund"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                We offer refunds within 30 days of purchase if you are not
                satisfied with our service. To request a refund, please contact
                our support team with your order details.
              </p>
            </div>
          </details>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Use of Services
          </h2>
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["services"]}
            onToggle={() => toggleSection("services")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>Use of Services</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["services"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                Our services are provided as is without warranties of any kind.
                We reserve the right to modify, suspend, or discontinue any part
                of our service without notice at any time.
              </p>
            </div>
          </details>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Contact Us
          </h2>
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["contact"]}
            onToggle={() => toggleSection("contact")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>Contact Us</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                    openSections["contact"] ? "rotate-180" : ""
                  }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="mt-2">Email: support@example.com</p>
              <p className="mt-1">Phone: (123) 456-7890</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
