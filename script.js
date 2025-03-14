import { rentals } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const rentalList = document.getElementById("rental-list");

    rentals.forEach((rental) => {
        const rentalItem = document.createElement("div");
        rentalItem.classList.add("rental-item");

        rentalItem.innerHTML = `
            <img src="${rental.image}" alt="${rental.title}">
            <h3>${rental.title}</h3>
        `;

        // Add a click event to each rental item
        rentalItem.addEventListener("click", () => {
            // Store the rental data in localStorage
            localStorage.setItem("selectedRental", JSON.stringify(rental));

            // Open rental details page in a new tab
            window.open("rental-details.html", "_blank");
        });

        rentalList.appendChild(rentalItem);
    });
});
