import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const sections = [
  { title: "1. Booking & Payment", content: "All bookings are subject to seat availability. Payments are processed securely via Paystack in GHS. Reserved seats must be paid for within 5 days or the reservation will be automatically released." },
  { title: "2. Cancellation Policy", content: "Cancellations made at least 24 hours before departure are eligible for a full refund. Cancellations within 24 hours of departure may be subject to a cancellation fee of up to 30% of the ticket price." },
  { title: "3. Luggage", content: "Each passenger is entitled to one standard luggage item free of charge. Additional or oversized items (furniture, appliances, etc.) can be added during or after booking at the published rates." },
  { title: "4. Passenger Conduct", content: "All passengers must follow the instructions of the bus driver and crew. WinTransport reserves the right to refuse service to passengers who are disruptive or pose a safety risk." },
  { title: "5. Liability", content: "WinTransport is not liable for delays caused by force majeure events (weather, road conditions, etc.). We will make every reasonable effort to operate on schedule and notify passengers of any changes." },
  { title: "6. Privacy", content: "We collect and process personal data in accordance with our privacy policy. Your booking information, contact details, and payment data are secured and never shared with unauthorized third parties." },
  { title: "7. Changes to Terms", content: "WinTransport reserves the right to modify these terms at any time. Continued use of the service constitutes acceptance of any changes." },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl font-black mb-3">
              Terms of <span className="text-gradient-orange">Service</span>
            </h1>
            <p className="text-muted">Last updated: January 2025</p>
          </div>

          <div className="space-y-6">
            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-6 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <h2 className="font-bold text-lg mb-2">{s.title}</h2>
                <p className="text-sm text-muted leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
