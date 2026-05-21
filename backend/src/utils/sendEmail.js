const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

const sendOrderConfirmation = async (user, order) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Confirmation</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for your order! Here are your order details:</p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      </div>

      <h3>Order Items:</h3>
      <ul>
        ${order.orderItems.map((item) => `<li>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</li>`).join("")}
      </ul>

      <h3>Shipping Address:</h3>
      <p>
        ${order.shippingAddress?.street}<br/>
        ${order.shippingAddress?.city}, ${order.shippingAddress?.state} ${order.shippingAddress?.zipCode}<br/>
        ${order.shippingAddress?.country}
      </p>

      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        Track your order at: <a href="${process.env.FRONTEND_URL}/track-orders">Click here</a>
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order Confirmation - HYPERFIT (Order #${String(order._id).slice(-8).toUpperCase()})`,
    html,
  });
};

const sendOrderStatusUpdate = async (user, order, newStatus) => {
  const statusMessages = {
    Processing: "Your order is being processed and will be shipped soon.",
    Shipped:
      "Your order has been shipped! Track your package using the link below.",
    Delivered:
      "Your order has been delivered. Thank you for shopping with HYPERFIT!",
    Cancelled: "Your order has been cancelled.",
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Status Update</h2>
      <p>Hi ${user.name},</p>
      <p>${statusMessages[newStatus]}</p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Status:</strong> <span style="color: #4CAF50; font-weight: bold;">${newStatus}</span></p>
      </div>

      <p style="margin-top: 30px;">
        <a href="${process.env.FRONTEND_URL}/track-orders" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Track Your Order
        </a>
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order Status Update: ${newStatus} (Order #${String(order._id).slice(-8).toUpperCase()})`,
    html,
  });
};

module.exports = { sendEmail, sendOrderConfirmation, sendOrderStatusUpdate };
