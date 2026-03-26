# 🚀 Apollo Federation with NestJS

A microservices architecture demo using **Apollo Federation** and **NestJS**, featuring multiple GraphQL services composed through a single gateway.

![Node](https://img.shields.io/badge/Node-%3E%3D16.0.0-green)
![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red)
![GraphQL](https://img.shields.io/badge/GraphQL-16.8.0-pink)
![License](https://img.shields.io/badge/License-ISC-blue)

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Services](#-services)
- [Features](#-features)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [GraphQL Queries](#-graphql-queries)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Author](#-author)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Apollo Gateway (Port 4000)                  │
│         http://localhost:4000/graphql                  │
│  Composes schema from all subgraph services             │
└──────────┬──────────────┬───────────────┬───────────────┘
           │              │               │
    ┌──────▼────┐  ┌────▼─────┐  ┌──────▼──────┐
    │ Products  │  │ Reviews  │  │   Orders   │
    │  :3001    │  │  :3002   │  │   :3003    │
    └───────────┘  └──────────┘  └────────────┘
```

## 🎯 Services

### Gateway Service (Port 4000)
- **Role:** Composes federated schema from all subgraphs
- **Technology:** Apollo Gateway + NestJS
- **Endpoint:** `http://localhost:4000/graphql`

### Products Service (Port 3001)
- **Role:** Manages product catalog
- **Entity:** `Product` (id, name, price)
- **Features:** Product listing, entity resolution

### Orders Service (Port 3003)
- **Role:** Manages customer orders
- **Entity:** `Order` (id, productId, quantity)
- **Features:** Order listing, product association

### Reviews Service (Port 3002)
- **Role:** Manages product reviews
- **Entity:** `Review` (id, productId, rating, comment)
- **Features:** Review listing by product

## ✨ Features

- ✅ **Federated Architecture** - Each service owns its domain
- ✅ **Code-First GraphQL** - Using NestJS GraphQL decorators
- ✅ **Type-Safe** - TypeScript throughout
- ✅ **Hot Reload** - Development mode with watch
- ✅ **Apollo Studio** - Interactive GraphQL IDE at `/graphql`
- ✅ **Clean Separation** - Services are independently deployable

## 📦 Installation

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn

### Install Dependencies

Each service has its own `package.json`:

```bash
# Gateway
cd gateway && npm install

# Products
cd products && npm install

# Orders
cd orders && npm install

# Reviews
cd reviews && npm install
```

## 🚀 Running the Project

### Option 1: Run All Services (Recommended)

Start services in order (gateway last):

```bash
# Terminal 1 - Products
cd products && npm run start

# Terminal 2 - Reviews
cd reviews && npm run start

# Terminal 3 - Orders
cd orders && npm run start

# Terminal 4 - Gateway (start last)
cd gateway && npm run start
```

### Option 2: Development Mode with Hot Reload

```bash
npm run start:dev
```

### Option 3: Using Docker (Optional)

```dockerfile
# Docker Compose support coming soon
```

## 🔥 GraphQL Queries

### Explore the API
Open **Apollo Studio** at: `http://localhost:4000/graphql`

### Sample Queries

#### 1. Get Orders with Products
```graphql
query GetOrderDetails {
  ordersWithProducts {
    id
    quantity
    product {
      id
      name
      price
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "ordersWithProducts": [
      {
        "id": "1",
        "quantity": 2,
        "product": {
          "id": "1",
          "name": "iPhone",
          "price": 1000
        }
      }
    ]
  }
}
```

#### 2. Get All Products
```graphql
query GetProducts {
  products {
    id
    name
    price
  }
}
```

#### 3. Get All Orders
```graphql
query GetOrders {
  orders {
    id
    quantity
    productId
  }
}
```

#### 4. Get All Reviews
```graphql
query GetReviews {
  reviews {
    id
    productId
    rating
    comment
  }
}
```

#### 5. Get All Data at Once
```graphql
query GetAllData {
  orders { id productId quantity }
  products { id name price }
  reviews { id productId rating comment }
}
```

## 🌐 API Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| **Gateway** | `http://localhost:4000/graphql` | Unified GraphQL endpoint |
| **Products** | `http://localhost:3001/graphql` | Products subgraph |
| **Reviews** | `http://localhost:3002/graphql` | Reviews subgraph |
| **Orders** | `http://localhost:3003/graphql` | Orders subgraph |

## 📁 Project Structure

```
nestjs-federation-project/
├── gateway/                 # Apollo Gateway
│   ├── app.module.ts
│   ├── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── products/                # Products Service
│   ├── products.resolver.ts
│   ├── app.module.ts
│   ├── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── orders/                  # Orders Service
│   ├── orders.resolver.ts
│   ├── app.module.ts
│   ├── main.ts
│   ├── package.json
│   └── tsconfig.json
│
└── reviews/                 # Reviews Service
    ├── reviews.resolver.ts
    ├── app.module.ts
    ├── main.ts
    ├── package.json
    └── tsconfig.json
```

## 🛠️ Technologies

### Core Framework
- **NestJS** - Node.js framework
- **Apollo Federation** - GraphQL federation
- **TypeScript** - Type safety

### GraphQL Stack
- **@nestjs/graphql** v12.0.0
- **@apollo/gateway** v2.8.0
- **@apollo/subgraph** v2.0.0
- **graphql** v16.8.0

### Development Tools
- **ts-node** - TypeScript execution
- **@nestjs/platform-express** - HTTP adapter

## 📝 Key Concepts

### Federation Benefits
- **Domain Separation** - Each service owns its data
- **Independent Deployments** - Deploy services independently
- **Team Autonomy** - Different teams can own different services
- **Scalability** - Scale services based on demand

### How It Works
1. Client queries the Gateway
2. Gateway splits query into sub-queries
3. Each subgraph handles its part
4. Gateway combines results
5. Client receives complete data

## 🚧 Known Limitations

- Using Apollo Federation v1 compatibility mode (@apollo/subgraph@2.0.0)
- Type extensions require client-side matching or custom queries
- For production, consider upgrading to Federation v2

## 🔜 Future Enhancements

- [ ] Add authentication
- [ ] Implement DataLoader for batching
- [ ] Add error handling & logging
- [ ] Implement caching
- [ ] Add database integration
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Write unit tests

## 📄 License

ISC

## 👤 Author

**Revathi**
[GitHub](https://github.com/revathi-stalin) | [Email](mailto:revathisammu2897@gmail.com)

---

**Note:** This is a learning project demonstrating Apollo Federation concepts with NestJS.
