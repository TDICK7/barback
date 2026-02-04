# BarBack - Bar Inventory Management System

A Next.js-based inventory management system for bars and coffee shops, designed for future Clover POS integration.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### Manager Dashboard (`/`)
- **Inventory Health Score** - Real-time gauge showing overall inventory status (0-100)
- **Active Alerts Panel** - Color-coded alerts for critical, warning, and info items
- **Variance Trend Chart** - 12-week visualization of inventory variance
- **Quick Actions** - Sync POS, generate checklist, export reports
- **Activity Feed** - Recent inventory actions and changes

### Brewer Daily Alerts (`/alerts`)
- **Morning Report Summary** - At-a-glance view of critical, low stock, and healthy items
- **Stock Level Cards** - Detailed cards for each item needing attention
- **Consumption Analysis** - Yesterday's usage vs. 7-day average

### Weekly Checklist (`/checklist`)
- **Smart Recommendations** - AI-driven order quantity suggestions
- **Priority Grouping** - Critical, High, Medium, Low priority sections
- **Variance Alerts** - Flag items with unusual consumption patterns
- **Interactive Checkboxes** - Track completion status
- **Notes Field** - Add context to each item

### Inventory View (`/inventory`)
- **Category-based Table** - All items organized by category
- **Stock Status Badges** - Visual indicators for Critical/Low/OK
- **Value Calculation** - Total inventory value

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Charts**: Recharts
- **Architecture**: Service Layer with Provider Pattern (future-ready for Clover API)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Manager Dashboard
│   ├── alerts/            # Brewer Daily Alerts
│   ├── checklist/         # Weekly Checklist
│   └── inventory/         # Inventory Management
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── dashboard/         # Dashboard widgets
│   ├── alerts/            # Alert components
│   ├── checklist/         # Checklist components
│   └── layout/            # Sidebar, Header
├── lib/
│   ├── services/          # Business logic (InventoryService)
│   ├── providers/         # Data providers (MockProvider, future CloverProvider)
│   ├── types/             # TypeScript interfaces
│   └── utils.ts           # Utility functions
└── data/
    └── mock/              # Mock data for demo
```

## Architecture

The application uses a **Provider Pattern** for data access, making it easy to swap between:
- **MockProvider** (current) - Static mock data for demos
- **CloverProvider** (future) - Real Clover POS API integration

```typescript
// Easy to swap providers
const service = InventoryService.getInstance();
service.setProvider(new CloverProvider(apiKey)); // When ready
```

## Future Roadmap

1. **Phase 2 - Clover Integration**
   - OAuth 2.0 authentication
   - Real-time sales data sync
   - Webhook support for instant updates

2. **Phase 3 - Advanced Features**
   - Mobile PWA
   - Barcode scanning
   - Multi-location support
   - QuickBooks integration

## Design System

- **Theme**: Dark mode optimized for bar environments
- **Colors**: 
  - Background: Deep charcoal (#0a0a0a)
  - Cards: Slate gray (#141419)
  - Accent: Amber/Gold (#f59e0b)
  - Status: Red/Yellow/Green for critical/warning/success
- **Typography**: Plus Jakarta Sans (UI), JetBrains Mono (data)

## License

MIT
