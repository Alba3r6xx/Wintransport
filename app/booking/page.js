'use client';
import { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeatMap from '@/components/SeatMap';
import { useAuth } from '@/components/AuthContext';
import styles from './page.module.css';

const PRICE_PER_SEAT = 170;

const SPECIAL_ITEMS = [
  { name: 'Air Condition (AC unit and Outlet Unit)', price: 250 },
  { name: 'Fridge (Double Door)', price: 150 },
  { name: 'Fridge (Table top - One Door)', price: 100 },
  { name: 'Television', price: 150 },
  { name: 'Study Table and Chair', price: 200 },
  { name: 'Sound System', price: 100 },
  { name: 'Standing Fan', price: 70 },
  { name: 'Microwave Oven', price: 50 },
  { name: 'Gas Cylinder', price: 40 },
  { name: 'Plastics', price: 40 },
  { name: 'Gas Stove', price: 30 },
];

export default function BookingPage() {
  const { user } = useAuth();
  const [paystackReady, setPaystackReady] = useState(false);
  const [formData, setFormData] = useState({
    direction: 'knust-to-takoradi',
    date: '',
    time: '',
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    notes: '',
    paymentType: 'pay-now',
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Luggage state
  const [showLuggage, setShowLuggage] = useState(false);
  const [luggageCount, setLuggageCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const checkPaystack = () => {
      if (typeof window !== 'undefined' && window.PaystackPop) {
        setPaystackReady(true);
      }
    };
    checkPaystack();
    const interval = setInterval(checkPaystack, 500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = selectedSeats.length * PRICE_PER_SEAT;

  const generateRef = () => {
    return 'WTR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handlePayment = useCallback(() => {
    if (!paystackReady) {
      alert('Payment system is still loading. Please wait a moment and try again.');
      return;
    }
    setIsProcessing(true);
    const ref = generateRef();
    try {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_a13dded3d9433b183f03de8d9bacd33df6e323a2',
        email: formData.email || `${formData.phone.replace(/\s/g, '')}@wintransport.com`,
        amount: totalAmount * 100,
        currency: 'GHS',
        ref: ref,
        metadata: {
          custom_fields: [
            { display_name: 'Passenger', variable_name: 'name', value: formData.name },
            { display_name: 'Phone', variable_name: 'phone', value: formData.phone },
            { display_name: 'Route', variable_name: 'route', value: formData.direction },
            { display_name: 'Seats', variable_name: 'seats', value: selectedSeats.join(', ') },
          ]
        },
        callback: function(response) {
          setPaymentRef(response.reference);
          setIsSubmitted(true);
          setIsProcessing(false);
        },
        onClose: function() {
          setIsProcessing(false);
        }
      });
      handler.openIframe();
    } catch (err) {
      console.error('Paystack error:', err);
      setIsProcessing(false);
      alert('Payment failed to open. Please try again.');
    }
  }, [formData, totalAmount, selectedSeats, paystackReady]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentType === 'pay-now') {
      handlePayment();
    } else {
      const ref = generateRef();
      setPaymentRef(ref);
      setIsSubmitted(true);
    }
  };

  const toggleSpecialItem = (itemName) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[itemName]) {
        delete next[itemName];
      } else {
        next[itemName] = true;
      }
      return next;
    });
  };

  const luggageTotalFee = SPECIAL_ITEMS.reduce((sum, item) => {
    return sum + (selectedItems[item.name] ? item.price : 0);
  }, 0);

  const routeLabel = formData.direction === 'knust-to-takoradi'
    ? 'KNUST → Cape Coast → Takoradi'
    : 'Takoradi → Cape Coast → KNUST';

  // ==================== LUGGAGE SCREEN ====================
  if (isSubmitted && showLuggage) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className="container">
            <div className={styles.header}>
              <span className="section-label">Luggage</span>
              <h1 className="section-title">Luggage Information</h1>
              <p className="section-subtitle">Please provide details about the luggage(s) you will be carrying on your trip.</p>
            </div>

            <div className={`glass-card ${styles.formCard} animate-fade-in`}>
              <div className={styles.luggageNotice}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <p>Each passenger is entitled to unlimited luggage. Total weight of all your baggage should sum up to <strong>25 kg</strong> for the Vacation Bus Ride Trips. Excess weight above the limit will incur a charge per kilogram.</p>
              </div>

              {/* Luggage count */}
              <div className={styles.luggageField}>
                <label htmlFor="luggageCount" className="form-label">How many luggage(s) will you be travelling with?</label>
                <input
                  id="luggageCount"
                  type="number"
                  min="0"
                  max="20"
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(parseInt(e.target.value) || 0)}
                  className="form-input"
                  placeholder="Type number of luggages"
                  aria-label="Number of luggages"
                  style={{ maxWidth: '200px' }}
                />
              </div>

              {/* Fees info */}
              <div className={styles.luggageFees}>
                <p>A luggage handling fee of <strong>GH₵ 0.00</strong> will be charged per passenger for tagging and packing of luggage.</p>
                <p>A Cargo Van Service fee of <strong>GH₵ 0.00</strong> will be charged per passenger to transport all luggage.</p>
              </div>

              {/* Special items */}
              <div className={styles.specialItems}>
                <h3 className={styles.specialTitle}>Indicate if you are bringing any of the following items. Additional charges may apply:</h3>
                <div className={styles.itemsGrid}>
                  {SPECIAL_ITEMS.map((item) => (
                    <label
                      key={item.name}
                      className={`${styles.itemCard} ${selectedItems[item.name] ? styles.itemSelected : ''}`}
                      htmlFor={`item-${item.name}`}
                    >
                      <input
                        id={`item-${item.name}`}
                        type="checkbox"
                        checked={!!selectedItems[item.name]}
                        onChange={() => toggleSpecialItem(item.name)}
                        className={styles.itemCheckbox}
                        aria-label={`${item.name} - GH₵ ${item.price.toFixed(2)}`}
                      />
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>GH₵ {item.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Luggage total */}
              {luggageTotalFee > 0 && (
                <div className={styles.luggageTotal}>
                  <span>Additional luggage charges:</span>
                  <strong>GH₵ {luggageTotalFee.toFixed(2)}</strong>
                </div>
              )}

              <div className={styles.formActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowLuggage(false)} aria-label="Go back to booking confirmation">
                  ← Go Back
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  alert(`Booking created! Luggage: ${luggageCount} bag(s). Special items total: GH₵ ${luggageTotalFee.toFixed(2)}`);
                }} aria-label="Create booking with luggage">
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ==================== SUCCESS SCREEN ====================
  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className={`container ${styles.successContainer}`}>
            <div className={styles.successCard}>
              <div className={styles.successIcon} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2>{formData.paymentType === 'reserve' ? 'Seat Reserved!' : 'Booking Confirmed!'}</h2>
              <p>{formData.paymentType === 'reserve' ? 'Your seat has been reserved. Pay before departure.' : 'Payment received — your seat is confirmed.'}</p>
              <div className={styles.successDetails}>
                <div className={styles.detailRow}><span>Ref</span><strong>{paymentRef}</strong></div>
                <div className={styles.detailRow}><span>Route</span><strong>{routeLabel}</strong></div>
                <div className={styles.detailRow}><span>Date</span><strong>{formData.date}</strong></div>
                <div className={styles.detailRow}><span>Time</span><strong>{formData.time}</strong></div>
                <div className={styles.detailRow}><span>Seat(s)</span><strong>{selectedSeats.join(', ')}</strong></div>
                <div className={styles.detailRow}><span>Total</span><strong>GH₵ {totalAmount.toFixed(2)}</strong></div>
                <div className={styles.detailRow}><span>Status</span><strong>{formData.paymentType === 'reserve' ? 'Reserved' : 'Paid ✓'}</strong></div>
              </div>
              <p className={styles.successNote}>
                A confirmation SMS will be sent to {formData.phone}
              </p>
              <div className={styles.successActions}>
                <button onClick={() => setShowLuggage(true)} className="btn btn-primary" aria-label="Add luggage to booking">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3"/></svg>
                  Add Luggage Info
                </button>
                <button onClick={() => { setIsSubmitted(false); setShowLuggage(false); setStep(1); setSelectedSeats([]); setPaymentRef(''); setSelectedItems({}); setLuggageCount(0); }} className="btn btn-secondary" aria-label="Book another trip">
                  Book Another Trip
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ==================== BOOKING FORM ====================
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <span className="section-label">Booking</span>
            <h1 className="section-title">Book Your Seat</h1>
            <p className="section-subtitle">Reserve your spot on the next trip.</p>
          </div>

          {/* Progress */}
          <nav className={styles.progress} aria-label="Booking steps">
            {['Trip', 'Seat', 'Info', 'Pay'].map((label, i) => (
              <div key={i} className={`${styles.progressStep} ${i + 1 <= step ? styles.progressActive : ''} ${i + 1 < step ? styles.progressDone : ''}`}>
                <div className={styles.progressDot} aria-current={i + 1 === step ? 'step' : undefined}>
                  {i + 1 < step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : i + 1}
                </div>
                <span className={styles.progressLabel}>{label}</span>
              </div>
            ))}
          </nav>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Step 1 — Trip */}
            {step === 1 && (
              <div className={`glass-card ${styles.formCard} animate-fade-in`}>
                <h2 className={styles.formTitle}>Trip Details</h2>
                <div className={styles.formGrid}>
                  <div className={`form-group ${styles.fullWidth}`}>
                    <label className="form-label" id="direction-label">Direction</label>
                    <div className={styles.directionPicker} role="radiogroup" aria-labelledby="direction-label">
                      <button type="button" role="radio" aria-checked={formData.direction === 'knust-to-takoradi'} className={`${styles.directionBtn} ${formData.direction === 'knust-to-takoradi' ? styles.directionActive : ''}`} onClick={() => setFormData({...formData, direction: 'knust-to-takoradi'})}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        KNUST → Takoradi
                      </button>
                      <button type="button" role="radio" aria-checked={formData.direction === 'takoradi-to-knust'} className={`${styles.directionBtn} ${formData.direction === 'takoradi-to-knust' ? styles.directionActive : ''}`} onClick={() => setFormData({...formData, direction: 'takoradi-to-knust'})}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        Takoradi → KNUST
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-date" className="form-label">Travel Date</label>
                    <input id="booking-date" type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-time" className="form-label">Departure Time</label>
                    <select id="booking-time" name="time" value={formData.time} onChange={handleChange} className="form-select" required>
                      <option value="">Select time</option>
                      <option value="06:00 AM">6:00 AM</option>
                      <option value="08:00 AM">8:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">2:00 PM</option>
                      <option value="04:00 PM">4:00 PM</option>
                    </select>
                  </div>

                  <div className={`form-group ${styles.fullWidth}`}>
                    <label htmlFor="booking-notes" className="form-label">Notes (optional)</label>
                    <input id="booking-notes" type="text" name="notes" value={formData.notes} onChange={handleChange} className="form-input" placeholder="e.g., I have a large box" />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                    Select Seat →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Seat */}
            {step === 2 && (
              <div className={`glass-card ${styles.formCard} animate-fade-in`}>
                <h2 className={styles.formTitle}>Select Your Seat</h2>
                <p className={styles.formSubtitle}>
                  Tap to select seats. Tap booked seats to see details.
                </p>

                <div className={styles.seatMapContainer}>
                  <SeatMap
                    selectedSeats={selectedSeats}
                    onSeatSelect={setSelectedSeats}
                    maxSeats={6}
                  />
                </div>

                {selectedSeats.length > 0 && (
                  <div className={styles.selectedInfo}>
                    <span>✓ Seat{selectedSeats.length > 1 ? 's' : ''}: <strong>{selectedSeats.join(', ')}</strong></span>
                    <span className={styles.priceTag}>GH₵ {(selectedSeats.length * PRICE_PER_SEAT).toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.formActions}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)} disabled={selectedSeats.length === 0}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Info */}
            {step === 3 && (
              <div className={`glass-card ${styles.formCard} animate-fade-in`}>
                <h2 className={styles.formTitle}>Your Information</h2>
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label htmlFor="booking-name" className="form-label">Full Name</label>
                    <input id="booking-name" type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Kwame Asante" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="booking-phone" className="form-label">Phone Number</label>
                    <input id="booking-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="024 XXX XXXX" required />
                  </div>
                  <div className={`form-group ${styles.fullWidth}`}>
                    <label htmlFor="booking-email" className="form-label">Email (optional)</label>
                    <input id="booking-email" type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="you@example.com" />
                  </div>

                  <div className={`form-group ${styles.fullWidth}`}>
                    <label className="form-label" id="payment-label">Payment</label>
                    <div className={styles.directionPicker} role="radiogroup" aria-labelledby="payment-label">
                      <button type="button" role="radio" aria-checked={formData.paymentType === 'pay-now'} className={`${styles.directionBtn} ${formData.paymentType === 'pay-now' ? styles.directionActive : ''}`} onClick={() => setFormData({...formData, paymentType: 'pay-now'})}>
                        Pay Now
                      </button>
                      <button type="button" role="radio" aria-checked={formData.paymentType === 'reserve'} className={`${styles.directionBtn} ${formData.paymentType === 'reserve' ? styles.directionActive : ''}`} onClick={() => setFormData({...formData, paymentType: 'reserve'})}>
                        Reserve
                      </button>
                    </div>
                    {formData.paymentType === 'reserve' && (
                      <p className={styles.reserveNote}>Seat held for 24 hours.</p>
                    )}
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>Review →</button>
                </div>
              </div>
            )}

            {/* Step 4 — Pay */}
            {step === 4 && (
              <div className={`glass-card ${styles.formCard} animate-fade-in`}>
                <h2 className={styles.formTitle}>Confirm & Pay</h2>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Route</span><span className={styles.reviewValue}>{routeLabel}</span></div>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Date</span><span className={styles.reviewValue}>{formData.date || '—'}</span></div>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Time</span><span className={styles.reviewValue}>{formData.time || '—'}</span></div>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Seat(s)</span><span className={styles.reviewValue}>{selectedSeats.join(', ')}</span></div>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Name</span><span className={styles.reviewValue}>{formData.name || '—'}</span></div>
                  <div className={styles.reviewItem}><span className={styles.reviewLabel}>Phone</span><span className={styles.reviewValue}>{formData.phone || '—'}</span></div>
                </div>

                <div className={styles.totalBanner}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue}>GH₵ {totalAmount.toFixed(2)}</span>
                  <span className={styles.totalBreak}>{selectedSeats.length} × GH₵ {PRICE_PER_SEAT}</span>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>← Back</button>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isProcessing} aria-label={isProcessing ? 'Processing payment' : 'Submit payment'}>
                    {isProcessing ? (
                      <span className={styles.processingBtn}>
                        <span className={styles.spinner} aria-hidden="true"></span>
                        Processing...
                      </span>
                    ) : (
                      formData.paymentType === 'reserve' ? 'Reserve Seat' : `Pay GH₵ ${totalAmount.toFixed(2)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
