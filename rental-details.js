document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the rental data from localStorage
    const rental = JSON.parse(localStorage.getItem("selectedRental"));

    if (rental) {
        const rentalDetailDiv = document.getElementById("rental-detail");

        // Create the HTML structure for the rental details
        rentalDetailDiv.innerHTML = `
            <h2>${rental.title}</h2>
            <img src="${rental.image}" alt="${rental.title}" class="rental-image">
            
            <div class="amenities">
                <h3>Amenities</h3>
                <ul>
                    ${rental.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                </ul>
            </div>
            
            <div class="description-price">
                <div class="description">
                    <h3>Description</h3>
                    <p>${rental.description}</p>
                </div>
                
                <div class="price">
                    <h3>Price per Night</h3>
                    <div class="price-details">
                        <span class="price-value">${rental.pricePerNight}</span>
                        <span class="currency">£</span>
                    </div>
                </div>
            </div>

            <div class="reserve-your-stay">
                <h3>Reserve Your Stay</h3>

                <!-- Check-In and Check-Out Dates -->
                <div class="date-selection">
                    <label for="checkin-date">Check-In</label>
                    <input type="date" id="checkin-date" />

                    <label for="checkout-date">Check-Out</label>
                    <input type="date" id="checkout-date" />
                </div>

                <!-- Total Price & Number of Nights -->
                <div class="total-price">
                    <h3>Total Price</h3>
                    <span class="total-price-value">£0</span> <!-- Total price will be displayed here -->
                </div>

                <div class="number-of-nights">
                    <h3>Number of Nights</h3>
                    <span class="nights-value">0</span> <!-- Number of nights will be displayed here -->
                </div>

                <button id="payButton">Reserve</button>
            </div>
        `;

        // Handle price calculation when dates are selected
        const checkinDate = document.getElementById('checkin-date');
        const checkoutDate = document.getElementById('checkout-date');
        const totalPriceValue = document.querySelector('.total-price-value');
        const nightsValue = document.querySelector('.nights-value');
        const payButton = document.getElementById('payButton');

        // Function to calculate the number of nights
        function calculateNights() {
            const checkin = new Date(checkinDate.value);
            const checkout = new Date(checkoutDate.value);

            if (checkin && checkout && checkout > checkin) {
                const differenceInTime = checkout.getTime() - checkin.getTime();
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                
                // Update number of nights
                nightsValue.textContent = differenceInDays;

                // Update total price
                updatePrice(differenceInDays);
            }
        }

        // Function to update total price based on the number of nights
        function updatePrice(nights) {
            const totalPrice = rental.pricePerNight * nights;
            totalPriceValue.textContent = `£${totalPrice}`;  // Update the displayed total price
        }

        // Event listeners for date changes
        checkinDate.addEventListener('change', calculateNights);
        checkoutDate.addEventListener('change', calculateNights);

        // Handle payment button click
        payButton.addEventListener('click', () => {
            const nights = nightsValue.textContent;
            const totalPrice = rental.pricePerNight * nights;
            alert(`You will pay ${totalPrice}£ for ${nights} night(s).`);  // Simulate payment
            // For real payment, you could redirect like:
            // window.location.href = "paymentPage.html"; 
        });

        // Initialize the calendar after rental details
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth', // Show calendar in monthly view
            events: [] // Empty array of events to start with
        });

        // Render the calendar
        calendar.render();
    } else {
        // If no rental data is found, redirect back to the main page
        window.location.href = "index.html";
    }
});
