'use client';
import { useState } from 'react';
import styles from './SeatMap.module.css';

// 45+1 layout: 10 rows × 4 + back row of 5
const generateSeatLayout = () => {
  const rows = [];
  let seatNum = 1;
  for (let r = 0; r < 10; r++) {
    rows.push({
      type: 'standard',
      seats: [
        { id: seatNum++, pos: 'wl' },
        { id: seatNum++, pos: 'al' },
        { id: seatNum++, pos: 'ar' },
        { id: seatNum++, pos: 'wr' },
      ],
    });
  }
  rows.push({
    type: 'back',
    seats: [
      { id: seatNum++, pos: 'wl' },
      { id: seatNum++, pos: 'ml' },
      { id: seatNum++, pos: 'c' },
      { id: seatNum++, pos: 'mr' },
      { id: seatNum++, pos: 'wr' },
    ],
  });
  return rows;
};

const SEAT_LAYOUT = generateSeatLayout();

const MOCK_BOOKINGS = {
  3: { status: 'booked', name: 'Ama Mensah', ticketId: 'WTR-248' },
  7: { status: 'booked', name: 'Kwesi Boateng', ticketId: 'WTR-247' },
  12: { status: 'reserved', name: 'Abena Owusu', ticketId: 'WTR-246', expiresIn: '2h' },
  18: { status: 'booked', name: 'Yaw Sarpong', ticketId: 'WTR-245' },
  25: { status: 'reserved', name: 'Akosua Darko', ticketId: 'WTR-244', expiresIn: '5h' },
  33: { status: 'booked', name: 'Kofi Adu', ticketId: 'WTR-243' },
  41: { status: 'booked', name: 'Efya Mensah', ticketId: 'WTR-242' },
};

export default function SeatMap({ onSeatSelect, selectedSeats = [], maxSeats = 4, readOnly = false }) {
  const [activeSeat, setActiveSeat] = useState(null);

  const getSeatStatus = (seatId) => {
    if (MOCK_BOOKINGS[seatId]) return MOCK_BOOKINGS[seatId].status;
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (seatId) => {
    const status = getSeatStatus(seatId);

    // Show inline details for booked/reserved
    if (status === 'booked' || status === 'reserved') {
      setActiveSeat(activeSeat === seatId ? null : seatId);
      return;
    }

    if (readOnly) return;

    // Toggle selection
    if (selectedSeats.includes(seatId)) {
      onSeatSelect?.(selectedSeats.filter(s => s !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect?.([...selectedSeats, seatId]);
    }
    setActiveSeat(null);
  };

  const renderSeat = (seat) => {
    const status = getSeatStatus(seat.id);
    const isActive = activeSeat === seat.id;
    const isWindow = seat.pos === 'wl' || seat.pos === 'wr';

    return (
      <div key={seat.id} className={styles.seatCell}>
        <button
          type="button"
          className={`${styles.seat} ${styles[status]} ${isActive ? styles.active : ''}`}
          onClick={() => handleSeatClick(seat.id)}
          title={`Seat ${seat.id}`}
          aria-label={`Seat ${seat.id}, ${status}`}
          id={`seat-${seat.id}`}
        >
          <span className={styles.seatNum}>{seat.id}</span>
          {status === 'selected' && (
            <span className={styles.checkmark}>✓</span>
          )}
          {(status === 'booked' || status === 'reserved') && (
            <span className={styles.statusDot}></span>
          )}
        </button>

        {/* Inline HUD detail — shown when tapped */}
        {isActive && MOCK_BOOKINGS[seat.id] && (
          <div className={`${styles.hud} ${status === 'booked' ? styles.hudBooked : styles.hudReserved}`}>
            <div className={styles.hudArrow}></div>
            <div className={styles.hudContent}>
              <div className={styles.hudHeader}>
                <span className={styles.hudBadge}>
                  {status === 'booked' ? '● BOOKED' : '◐ RESERVED'}
                </span>
                <span className={styles.hudSeatId}>#{seat.id}</span>
              </div>
              <div className={styles.hudInfo}>
                <span className={styles.hudName}>{MOCK_BOOKINGS[seat.id].name}</span>
                <span className={styles.hudTicket}>{MOCK_BOOKINGS[seat.id].ticketId}</span>
              </div>
              {MOCK_BOOKINGS[seat.id].expiresIn && (
                <span className={styles.hudExpiry}>Expires in {MOCK_BOOKINGS[seat.id].expiresIn}</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotAvail}`}></span>Available
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotSelected}`}></span>Selected
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotReserved}`}></span>Reserved
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotBooked}`}></span>Booked
        </span>
      </div>

      {/* Compact Bus Interior */}
      <div className={styles.busFrame}>
        {/* Front */}
        <div className={styles.front}>
          <span className={styles.driverIcon}>◎</span>
          <span className={styles.frontText}>FRONT</span>
          <span className={styles.doorIcon}>▯</span>
        </div>

        {/* Column headers */}
        <div className={styles.colHeaders}>
          <span>A</span><span>B</span>
          <span className={styles.aisleHead}></span>
          <span>C</span><span>D</span>
        </div>

        {/* Rows */}
        <div className={styles.rows}>
          {SEAT_LAYOUT.filter(r => r.type === 'standard').map((row, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.pair}>
                {renderSeat(row.seats[0])}
                {renderSeat(row.seats[1])}
              </div>
              <div className={styles.aisle}></div>
              <div className={styles.pair}>
                {renderSeat(row.seats[2])}
                {renderSeat(row.seats[3])}
              </div>
            </div>
          ))}

          {/* Back row divider */}
          <div className={styles.backDivider}></div>

          {/* Back row (5 seats) */}
          {SEAT_LAYOUT.filter(r => r.type === 'back').map((row, i) => (
            <div key={`b${i}`} className={styles.backRow}>
              {row.seats.map(seat => renderSeat(seat))}
            </div>
          ))}
        </div>

        {/* Rear */}
        <div className={styles.rear}>
          <span>REAR</span>
        </div>
      </div>

      {/* Info strip */}
      <div className={styles.infoStrip}>
        <span><strong>45</strong> total</span>
        <span className={styles.infoDivider}>|</span>
        <span><strong>{45 - Object.keys(MOCK_BOOKINGS).length - selectedSeats.length}</strong> free</span>
        <span className={styles.infoDivider}>|</span>
        <span className={styles.infoAccent}><strong>{selectedSeats.length}</strong> selected</span>
      </div>
    </div>
  );
}
