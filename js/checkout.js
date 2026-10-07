document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form") || document.querySelector("form");

    if (!checkoutForm) {
        console.error("Checkout form not found on this page.");
        return;
    }

    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Retrieve cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Format cart items to match orders.php requirements
        const items = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            customization: item.customization || []
        }));

        // Collect form data
        const orderData = {
            customer_name: document.getElementById("customer_name")?.value || "",
            phone: document.getElementById("phone")?.value || "",
            email: document.getElementById("email")?.value || "",
            city: document.getElementById("city")?.value || "",
            address: document.getElementById("address")?.value || "",
            delivery_date: document.getElementById("delivery_date")?.value || "",
            payment_method: document.getElementById("payment_method")?.value || "Cash on Delivery",
            payment_reference: document.getElementById("payment_reference")?.value || "",
            custom_notes: document.getElementById("custom_notes")?.value || "",
            items: items
        };

        try {
            // Send order data to PHP backend
            const response = await fetch("php/orders.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                // Clear cart after successful order
                localStorage.removeItem("cart");
                window.location.href = "index.html";
            } else {
                alert("Order Error: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Could not connect to server. Ensure PHP local server is running.");
        }
    });
});