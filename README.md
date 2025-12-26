# ShopSimple | Full-Stack Stripe Integration

A robust, production-ready e-commerce checkout implementation using **React**, **Node.js**, and the **Stripe Payment Element API**.

This project demonstrates a secure, PCI-compliant payment flow where sensitive card data is handled directly by Stripe, while business logic (pricing, inventory) remains protected on the backend.

## 🏗 System Architecture

The application follows a decoupled client-server architecture:

* **Frontend (Client):** Built with **React + Vite**. It utilizes the `@stripe/react-stripe-js` library to mount the secure `PaymentElement` iframe. It communicates with the backend via a proxy to fetch `clientSecrets`.
* **Backend (Server):** Built with **Node.js + Express**. It acts as the source of truth for pricing. It communicates with the **Stripe API** to generate `PaymentIntents` and hands the secure session token back to the client.

## 🚀 Key Features

* **Secure Payment Element:** Implemented Stripe's modern UI component which automatically handles input validation, formatting, and 3D Secure (SCA) authentication.
* **Server-Side Price Validation:** To prevent fraud, all price calculations happen on the server. The client only sends item IDs, and the backend looks up the price in the database before requesting payment.
* **Environment Isolation:** Sensitive credentials (API Keys) are managed via `.env` files, ensuring no secrets are exposed in the client-side bundle.
* **Proxy Configuration:** configured Vite proxy to avoid CORS issues during development, streamlining the API communication layer.

## 🛠 Tech Stack

* **Frontend:** React 18, Vite, Stripe.js
* **Backend:** Node.js, Express, REST API
* **Payments:** Stripe Payment Intents API
* **State Management:** React Hooks (`useState`, `useEffect`)

## ⚙️ Local Setup Guide

This project is set up to run in "Demo Mode" out of the box. To process real test transactions, you will need your own Stripe API Keys.

### 1. Clone the Repository
```bash
git clone [https://github.com/ParvMalik10/shop-simple.git](https://github.com/ParvMalik10/shop-simple.git)
cd shop-simple
