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

          {/* 1. Terms of Service */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["terms-of-service"]}
            onToggle={() => toggleSection("terms-of-service")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>1. Terms of Service</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["terms-of-service"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                By using Precision Grading’s services, you agree to abide by these terms and policies. We may update them at any time; updated versions will be posted on our website.
              </p>
            </div>
          </details>

          {/* 2. Submission Policy */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["submission-policy"]}
            onToggle={() => toggleSection("submission-policy")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>2. Submission Policy</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["submission-policy"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All cards must be clean, authentic, and your legal property.</li>
                <li>Cards should be packed safely in semi-rigid holders with soft sleeves.</li>
                <li>A completed submission form must be included in your package.</li>
                <li>Precision Grading reserves the right to reject cards that are counterfeit, altered, or pose a risk to staff or equipment.</li>
              </ul>
            </div>
          </details>

          {/* 3. Grading Process */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["grading-process"]}
            onToggle={() => toggleSection("grading-process")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>3. Grading Process</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["grading-process"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Grading turnaround times are approximate and start from the day we receive and log your cards.</li>
                <li>Our AI and human review process ensures accurate and consistent grades.</li>
                <li>Grading is subjective; by submitting, you accept that grades are final.</li>
              </ul>
            </div>
          </details>

          {/* 4. Shipping & Insurance */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["shipping-insurance"]}
            onToggle={() => toggleSection("shipping-insurance")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>4. Shipping & Insurance</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["shipping-insurance"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Customers are responsible for safe shipping to our facility.</li>
                <li>Return shipping is tracked and insured based on the service selected at checkout.</li>
                <li>Precision Grading is not liable for loss or damage during shipping if insurance is not selected.</li>
              </ul>
            </div>
          </details>

          {/* 5. Lost or Damaged Cards */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["lost-damaged-cards"]}
            onToggle={() => toggleSection("lost-damaged-cards")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>5. Lost or Damaged Cards</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["lost-damaged-cards"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>In the rare event of loss or damage while cards are in our care or during insured return shipping, Precision Grading will compensate the customer up to the maximum declared or insured value.</li>
                <li>For claims, proof of value may be required.</li>
              </ul>
            </div>
          </details>

          {/* 6. Returns & Refunds */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["returns-refunds"]}
            onToggle={() => toggleSection("returns-refunds")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>6. Returns & Refunds</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["returns-refunds"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Grading fees are non-refundable once grading has begun.</li>
                <li>Refunds may be considered if an order is cancelled before grading starts.</li>
                <li>Cases and labels are non-refundable unless faulty.</li>
              </ul>
            </div>
          </details>

          {/* 7. Privacy Policy */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["privacy-policy"]}
            onToggle={() => toggleSection("privacy-policy")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>7. Privacy Policy</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["privacy-policy"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <p>
                We respect your privacy. Personal details collected during submissions are used solely to process orders and communicate with you.
                We do not sell or share your information with third parties, except where required by law.
              </p>
            </div>
          </details>

          {/* 8. Limitation of Liability */}
          <details
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            open={openSections["limitation-of-liability"]}
            onToggle={() => toggleSection("limitation-of-liability")}
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium bg-white">
              <span>8. Limitation of Liability</span>
              <div className="flex items-center">
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${openSections["limitation-of-liability"] ? "rotate-180" : ""
                    }`}
                />
              </div>
            </summary>
            <div className="p-4 border-t border-gray-200 text-gray-600">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Precision Grading is not liable for indirect or consequential losses resulting from grading decisions, shipping delays, or third-party courier services.</li>
                <li>Maximum liability is limited to the declared value of the card and applicable refund of service fees.</li>
              </ul>
            </div>
          </details>


          <div className="mt-8 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
            <p className="text-gray-600">
              Questions? Please reach out to us <a href="mailto:accounts@precisiongrading.co.uk" className="text-blue-600 hover:underline">accounts@precisiongrading.co.uk</a>, we’re always here to help.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}