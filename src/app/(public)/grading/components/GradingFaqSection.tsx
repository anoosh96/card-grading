import Faqs from "@/components/Faqs";

const FAQS = [
  {
    question: "What is AI grading, and how does it work?",
    answer: `
      <ol class="list-decimal list-inside space-y-2">
        <li>
          <strong>High-Resolution Scanning</strong><br/>
          Every card is scanned using advanced, high-resolution equipment that captures even the tiniest details and imperfections.
        </li>
        <li>
          <strong>Advanced AI Analysis</strong><br/>
          Your card’s images are run through our powerful AI grading system, trained to evaluate centering, edges, corners, and surface quality with extreme precision.
        </li>
        <li>
          <strong>Transparent Grading Report</strong><br/>
          Our AI not only gives your card an accurate grade but also generates a detailed report explaining why it earned that grade.
        </li>
        <li>
          <strong>Human Quality Check</strong><br/>
          Before sealing, each card and its grade are reviewed by our team to ensure everything meets our high standards.
        </li>
        <li>
          <strong>Secure Sealing & Labeling</strong><br/>
          Once approved, your card is safely encased in a tamper-proof, protective case with a clear label showing its grade and grading details.
        </li>
        <li>
          <strong>Fast Return to You</strong><br/>
          Your graded card is carefully packaged and shipped back to you — quickly, securely, and ready to take pride of place in your collection.
        </li>
      </ol>
    `
  },
  {
    question: "How long does the grading process take?",
    answer: `
      <p>At Precision Grading, you choose the service level that suits your needs — whether you’re grading a single card or sending a whole collection. We combine speed, accuracy, and fair pricing to make grading easy for every collector.</p>
      <h3 class="text-lg font-semibold mt-4 mb-2">📈 Single Card Grading</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Level</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnaround Time</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Card</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Card Value</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Economy</td>
              <td class="px-6 py-4 whitespace-nowrap">10 days</td>
              <td class="px-6 py-4 whitespace-nowrap">£15</td>
              <td class="px-6 py-4 whitespace-nowrap">£250</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Standard</td>
              <td class="px-6 py-4 whitespace-nowrap">7 days</td>
              <td class="px-6 py-4 whitespace-nowrap">£20</td>
              <td class="px-6 py-4 whitespace-nowrap">£1,000</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Express</td>
              <td class="px-6 py-4 whitespace-nowrap">5 days</td>
              <td class="px-6 py-4 whitespace-nowrap">£40</td>
              <td class="px-6 py-4 whitespace-nowrap">£2,500</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Super Express</td>
              <td class="px-6 py-4 whitespace-nowrap">2 days</td>
              <td class="px-6 py-4 whitespace-nowrap">£80</td>
              <td class="px-6 py-4 whitespace-nowrap">£10,000</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Walkthrough</td>
              <td class="px-6 py-4 whitespace-nowrap">1 day</td>
              <td class="px-6 py-4 whitespace-nowrap">£150</td>
              <td class="px-6 py-4 whitespace-nowrap">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm mt-2">Note: Turnaround times are in calendar days from when your cards arrive at our facility</p>

      <h3 class="text-lg font-semibold mt-6 mb-2">🔢 Bulk Submissions</h3>
      <p>Save more when grading multiple cards. Bulk submissions include Economy-level turnaround and the same trusted grading quality:</p>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 mt-2">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Card</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnaround Time</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">10+ Cards</td>
              <td class="px-6 py-4 whitespace-nowrap">£13</td>
              <td class="px-6 py-4 whitespace-nowrap">10 days</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">25+ Cards</td>
              <td class="px-6 py-4 whitespace-nowrap">£12</td>
              <td class="px-6 py-4 whitespace-nowrap">10 days</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">50+ Cards</td>
              <td class="px-6 py-4 whitespace-nowrap">£10</td>
              <td class="px-6 py-4 whitespace-nowrap">10 days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 class="text-lg font-semibold mt-6 mb-2">📦 Shipping & Insurance</h3>
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Standard Shipping:</strong> £5.99 (tracked, insured up to £500)</li>
          <li><strong>Insured Shipping:</strong> £9.99 (tracked, insured up to £2,500)</li>
          <li><strong>Express Return Shipping:</strong> £14.99 (priority dispatch with tracking)</li>
        </ul>
      </div>
      <p class="mt-2">All orders are securely packed and fully tracked. You’ll get email updates every step of the way: received, grading, quality checked, sealed, and shipped.</p>
    `
  },
  {
    question: "How do I package my cards for submission?",
    answer: `
      <p class="mb-2">To keep your cards safe on their way to us, please follow these simple steps:</p>
      <ul class="list-none space-y-2">
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Use Semi-Rigid Holders:</strong>
          <p>Place each card in a <strong>semi-rigid card holder</strong> (like a Card Saver I or similar). This protects the card while allowing for easy removal during grading. Avoid top-loaders or screw-down cases, as they can damage cards or slow down processing. </p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Add a Soft Sleeve:</strong>
          <p>For extra protection, put each card in a soft penny sleeve <strong>before</strong> inserting it into the semi-rigid holder. This helps prevent scratches.</p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Pack Securely:</strong>
          <p>Bundle your sleeved, semi-rigid cards between two sturdy pieces of cardboard. Secure them with painter’s tape or rubber bands — not too tight, just enough to prevent movement.</p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Use a Strong Box:</strong>
          <p>Place your protected cards inside a strong, appropriately sized box with enough bubble wrap or packing paper to stop them from shifting during transit.</p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Include Your Submission Form:</strong>
          <p> Make sure to include your completed submission form or order confirmation inside the package. </p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Choose Tracked Shipping:</strong>
          <p> Always use a tracked, insured shipping service for peace of mind. </p>
        </li>
      </ul>
    `
  },
  {
    question: "What happens if my card is lost in transit?",
    answer: `
      <p>At Precision Grading, we know how valuable your cards are — both financially and sentimentally. That’s why we take every step to protect them throughout the entire grading process, including secure, tracked shipping and careful packaging.</p>
      <p class="mt-2">In the rare event that a card is lost or damaged while in our care or during return shipping, we’ve got you covered. We offer:</p>
      <ul class="list-none space-y-2 mt-2">
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Tracked and Insured Shipping:</strong>
          <p>Every shipment is fully tracked and insured to give you peace of mind.</p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Full Support:</strong>
          <p>If your card is lost in transit, we will work directly with the courier to locate it. If it cannot be recovered, we will compensate you for the card’s fair market value based on recent verified sales.</p>
        </li>
        <li>
          <span class="font-bold text-green-600 mr-2">✓</span> <strong>Clear Communication:</strong>
          <p>We’ll keep you updated every step of the way until the issue is resolved to your satisfaction.</p>
        </li>
      </ul>
      <p class="mt-2">Your trust means everything to us — and we’re committed to treating every card as if it were our own.</p>
    `
  },
  {
    question: "Can I submit non-Pokémon cards for grading?",
    answer: `
        <p>Yes!</p>
        <p>At Precision Grading, we grade all types of trading cards — not just Pokémon.</p>
        <p class="mt-2">You can submit:</p>
        <ul class="list-none space-y-2">
          <li><span class="font-bold text-green-600 mr-2">✓</span> Sports cards (football, basketball, baseball, etc.)</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Yu-Gi-Oh!</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Magic: The Gathering</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Digimon</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Dragon Ball Super</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Disney cards</li>
          <li><span class="font-bold text-green-600 mr-2">✓</span> Other collectible or trading card games</li>
        </ul>
        <p class="mt-2">If you’re unsure about a specific card or set, just <a href="/contact-us" class="text-blue-600 hover:underline">contact us</a> and we’ll be happy to help.</p>
      `
  }
]

export default function GradingFaqSection() {
  return (
    <section className="mt-14 p-10">
      <h2 className="heading-primary font-bold">FAQ&#39;s</h2>
      <p className="mt-2">Answers to Your Most Common Questions</p>

      <Faqs faqs={FAQS} />
    </section>
  )
}