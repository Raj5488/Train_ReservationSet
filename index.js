const coach = document.querySelector('.coach');
const numSeatsInput = document.getElementById('num_seats');

// Initialize the coach with 80 seats (7 rows of 7 seats each + 1 row of 3 seats)
const totalRows = 8;
const seatsPerRow = [7, 7, 7, 7, 7, 7, 7, 3];
let seatStatus = new Array(totalRows).fill(0).map(() => new Array(7).fill(false));

// Function to generate seat layout dynamically
function generateSeatLayout() {
    coach.innerHTML = '';

    for (let row = 0; row < totalRows; row++) {
        for (let seat = 0; seat < seatsPerRow[row]; seat++) {
            let seatElement = document.createElement('div');
            seatElement.classList.add('seat');

            if (seatStatus[row][seat]) {
                seatElement.classList.add('booked');
            } else {
                seatElement.addEventListener('click', () => toggleSeatSelection(row, seat));
            }

            seatElement.textContent = `${row + 1}${seat + 1}`;
            coach.appendChild(seatElement);
        }
    }
}

// Function to toggle seat selection
function toggleSeatSelection(row, seat) {
    const seatElement = coach.children[row * 7 + seat];

    if (!seatElement.classList.contains('selected')) {
        seatElement.classList.add('selected');
    } else {
        seatElement.classList.remove('selected');
    }
}

// Function to reserve seats
function reserveSeats() {
    const numSeats = parseInt(numSeatsInput.value);
    const selectedSeats = coach.querySelectorAll('.seat.selected');

    if (numSeats > 0 && numSeats <= 7 && selectedSeats.length >= numSeats) {
        let bookedSeats = [];
        selectedSeats.forEach(seatElement => {
            const row = Math.floor(Array.prototype.indexOf.call(coach.children, seatElement) / 7);
            const seat = Array.prototype.indexOf.call(coach.children, seatElement) % 7;
            seatStatus[row][seat] = true;
            seatElement.classList.remove('selected');
            seatElement.classList.add('booked');
            bookedSeats.push(`R${row + 1}S${seat + 1}`);
        });
        alert(`Seats booked successfully: ${bookedSeats.join(', ')}`);
    } else {
        alert('Invalid selection. Please select at least 1 and up to 7 available seats.');
    }
}

// Initial seat layout generation
generateSeatLayout();
