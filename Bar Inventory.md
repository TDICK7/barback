# Product Requirements Document (PRD)
## Bar Inventory Management System

**Version:** 1.0  
**Date:** February 4, 2026  
**Author:** Product Team  
**Status:** Draft

---

## Executive Summary

### Problem Statement
Bar operations currently rely on manual inventory tracking processes that are time-intensive, error-prone, and fail to prevent common issues like spoilage, over-ordering, under-ordering, and theft. The Brewer role spends significant time each morning manually collecting stock information, while the Bar Manager conducts weekly inventory counts. This creates inefficiencies, delays in identifying issues, and potential revenue loss.

### Solution Overview
A POS-integrated inventory management system that automates daily inventory alerts for Brewers and generates intelligent checklists for Bar Managers. The system maintains human oversight for ordering decisions while eliminating manual data collection and providing actionable insights.

### Success Metrics
- Reduce Brewer's morning inventory collection time by 80%
- Decrease spoilage-related waste by 30% within 3 months
- Identify ordering anomalies within 24 hours vs. current weekly cycle
- Manager checklist completion time under 15 minutes
- 95% data accuracy vs. physical counts

---

## User Personas

### Primary Users

#### 1. The Brewer
**Role:** Opens the bar, manages morning prep, checks inventory  
**Pain Points:**
- Spends 45-60 minutes manually checking what's in stock
- Must physically count coffee supplies, bottled beverages
- Prone to missing items or recording errors
- Can't easily identify trends or upcoming shortages

**Goals:**
- Quick visibility into current stock levels
- Automated alerts for low inventory
- Minimal time spent on inventory tasks

#### 2. The Bar Manager
**Role:** Oversees operations, places orders, conducts weekly inventory  
**Pain Points:**
- Weekly inventory is time-consuming (2-3 hours)
- Reactive ordering often leads to stockouts or over-ordering
- Difficult to identify theft or unusual consumption patterns
- Manual checklist creation based on gut feel

**Goals:**
- Data-driven ordering recommendations
- Early warning system for anomalies
- Streamlined inventory verification process
- Audit trail for accountability

### Secondary Users

#### 3. Bar Owner/Corporate
**Role:** Oversight, financial performance, multiple location management (potential)  
**Needs:**
- High-level visibility into inventory health
- Cost control and waste reduction metrics
- Consistency across shifts/locations

---

## Product Requirements

### 1. POS Integration (Clover)

#### 1.1 Core Integration
**Priority:** P0 (Must Have)

**Requirements:**
- Connect to Clover POS API (both sandbox and production environments)
- Pull real-time sales transaction data
- Access current inventory levels from Clover inventory system
- Sync item master data (SKUs, categories, pricing)
- Handle API authentication and token refresh automatically

**Technical Specs:**
- Use Clover REST API v3
- OAuth 2.0 authentication
- Webhook support for real-time updates (future enhancement)
- Rate limiting compliance (1000 requests/hour)

**Acceptance Criteria:**
- Successfully authenticate with Clover sandbox
- Retrieve item catalog within 2 seconds
- Pull previous day's sales data
- Handle API errors gracefully with user-friendly messages

#### 1.2 Data Synchronization
**Priority:** P0

**Requirements:**
- Nightly sync of sales data (runs at 3 AM)
- Update inventory counts based on sales
- Flag discrepancies between POS and system records
- Manual sync option for managers

**Acceptance Criteria:**
- Sync completes in under 5 minutes for 200 items
- 99.9% data accuracy compared to Clover source
- Failed syncs trigger alert notifications
- Sync logs available for troubleshooting

---

### 2. Automated Daily Alerts (Brewer Feature)

#### 2.1 Morning Inventory Report
**Priority:** P0

**Requirements:**
- Generate daily inventory snapshot by 6 AM
- Display current stock levels for all items
- Highlight low-stock items (configurable thresholds)
- Show yesterday's consumption vs. historical average
- Accessible via mobile device and web interface

**Categories to Track:**
- Coffee supplies (beans, syrups, milk, etc.)
- Bottled beverages (water, soda, juice, energy drinks, etc.)
- Consumables (cups, lids, straws, napkins)

**Alert Format:**
```
DAILY INVENTORY ALERT - February 4, 2026

🔴 CRITICAL (Order Today)
- Whole Milk: 2 gallons remaining (Target: 5)
- Cold Brew Concentrate: 1 keg remaining (Target: 2)

🟡 LOW STOCK (Order Soon)
- Vanilla Syrup: 3 bottles remaining (Target: 6)
- Bottled Water (16oz): 24 units remaining (Target: 48)

✅ WELL STOCKED
- Espresso Beans: 15 lbs remaining
- Sodas: All varieties above target

Yesterday's Consumption:
- Lattes: 45 (Avg: 42, +7%)
- Cold Brew: 28 (Avg: 32, -13%)
```

**Acceptance Criteria:**
- Report generated automatically by 6 AM daily
- Email and/or SMS notification to Brewer
- Mobile-responsive display
- Historical data visible for 30 days
- Configurable alert thresholds per item

#### 2.2 Smart Alerts
**Priority:** P1 (Should Have)

**Requirements:**
- Anomaly detection for unusual consumption patterns
- Spoilage warnings based on shelf life tracking
- Equipment maintenance reminders (e.g., "Clean espresso machine")
- Weather-based consumption predictions (future)

**Acceptance Criteria:**
- Alert when item usage exceeds 150% of 7-day average
- Flag items approaching expiration dates
- Configurable alert sensitivity settings

---

### 3. Manager Checklist System

#### 3.1 Intelligent Weekly Checklist
**Priority:** P0

**Requirements:**
- Auto-generate weekly checklist based on consumption trends
- Prioritize items by urgency (critical, high, medium, low)
- Show recommended order quantities
- Include variance analysis (expected vs. actual usage)
- Support manual adjustments and notes

**Checklist Format:**
```
WEEKLY INVENTORY CHECKLIST - Week of Feb 4-10, 2026

🔴 CRITICAL - Order Immediately
[ ] Whole Milk - Rec. Order: 20 gallons
    Current: 2 gallons | Weekly avg: 18 gallons
    Last order: Jan 28 (7 days ago)
    
[ ] Cold Brew Concentrate - Rec. Order: 3 kegs
    Current: 1 keg | Weekly avg: 2.5 kegs
    Variance: -15% (possible theft/waste)

🟡 HIGH PRIORITY - Order This Week
[ ] Vanilla Syrup - Rec. Order: 12 bottles
    Current: 3 bottles | Weekly avg: 10 bottles
    
⚠️ VARIANCE ALERTS
[ ] Investigate: Bottled Water
    Expected usage: 200 bottles | Actual: 245 bottles
    Variance: +22.5% (check for unrecorded sales?)

📊 TRENDS TO WATCH
- Latte sales up 15% vs. last month
- Cold Brew down 8% (seasonal?)
```

**Acceptance Criteria:**
- Checklist available by Monday 6 AM
- Email notification to Manager
- Mobile and web access
- Checkboxes for completion tracking
- Notes field for each item
- Export to PDF option

#### 3.2 Variance Detection
**Priority:** P0

**Requirements:**
- Compare expected usage (based on sales) vs. actual inventory depletion
- Flag items with >15% variance
- Highlight potential theft, spoilage, or data entry errors
- Provide drill-down to daily transaction details

**Variance Calculation:**
```
Expected Usage = (Sales Qty × Recipe Multiplier) + Waste Factor
Actual Usage = Opening Inventory - Closing Inventory - Received Orders
Variance % = ((Actual - Expected) / Expected) × 100
```

**Acceptance Criteria:**
- Calculate variance for all tracked items weekly
- Red flag variance >20%, yellow flag >15%
- Historical variance trend chart (12 weeks)
- Drill-down to daily/hourly sales data

#### 3.3 Order Recommendations
**Priority:** P1

**Requirements:**
- Machine learning-based order quantity suggestions
- Factor in: historical sales, day of week, seasonality, lead times
- Adjustable safety stock levels
- Vendor integration for direct ordering (future)

**Acceptance Criteria:**
- Order recommendations within ±10% of optimal quantity
- Manager can override with notes
- Track recommendation accuracy over time

---

### 4. Inventory Categories & Items

#### 4.1 Coffee-Based Drinks
**Items to Track:**
- Espresso beans (lbs)
- Cold Brew concentrate (kegs/bottles)
- Milk (whole, 2%, oat, almond) (gallons)
- Syrups (vanilla, caramel, hazelnut, sugar-free) (bottles)
- Coffee equipment supplies

**Recipe Multipliers:**
```
Espresso: 1 shot = 0.07 oz beans
Latte: 1 drink = 2 shots espresso + 8 oz milk + 1 oz syrup (optional)
Cappuccino: 1 drink = 2 shots espresso + 6 oz milk
Cold Brew: 1 drink = 8 oz concentrate + ice
```

#### 4.2 Bottled Beverages
**Items to Track:**
- Bottled Water (12oz, 16oz, 1L)
- Sodas (Coke, Diet Coke, Sprite, etc.)
- Juices (orange, apple, cranberry)
- Energy Drinks (Red Bull, Monster, etc.)
- Iced Tea (bottles)

**Unit of Measure:** Individual bottles/cans

---

### 5. User Interface & Experience

#### 5.1 Dashboard (Manager View)
**Priority:** P0

**Components:**
- Inventory health score (0-100)
- Critical alerts panel
- Variance chart (weekly trends)
- Quick actions: Run sync, Generate checklist, Export reports
- Recent activity log

**Design Principles:**
- Mobile-first responsive design
- Maximum 3 clicks to any feature
- High contrast for readability in bar environment
- Offline mode for physical inventory counts

#### 5.2 Mobile App (Brewer View)
**Priority:** P1

**Features:**
- Daily alert dashboard
- Barcode scanner for quick counts (future)
- Push notifications
- Quick mark as "counted" or "ordered"
- Photo upload for damaged/expired items

**Platform:** Progressive Web App (PWA) initially, native iOS/Android later

#### 5.3 Notifications
**Priority:** P0

**Channels:**
- Email (primary)
- SMS (critical alerts only)
- In-app notifications
- Slack integration (future)

**User Preferences:**
- Configurable notification types
- Quiet hours setting
- Escalation rules for unacknowledged alerts

---

### 6. Reporting & Analytics

#### 6.1 Standard Reports
**Priority:** P1

**Reports:**
- Weekly Inventory Summary
- Variance Analysis Report
- Spoilage & Waste Report
- Order History & Spend
- Consumption Trends (by day/week/month)

**Formats:** PDF, Excel, CSV

#### 6.2 Custom Dashboards
**Priority:** P2 (Nice to Have)

**Features:**
- Drag-and-drop widget builder
- Saved custom views
- Scheduled email delivery
- KPI tracking (spoilage %, variance %, etc.)

---

### 7. Data & Security

#### 7.1 Data Storage
**Requirements:**
- Store 2 years of historical data
- Daily automated backups
- 99.9% uptime SLA
- GDPR/CCPA compliance for user data

**Database Schema:**
```
Tables:
- items (id, name, category, unit, par_level, reorder_point)
- inventory_snapshots (id, item_id, quantity, timestamp)
- sales_transactions (id, item_id, quantity, timestamp, transaction_id)
- variance_logs (id, item_id, expected, actual, variance_pct, date)
- alerts (id, type, item_id, message, status, created_at)
- users (id, name, role, email, phone, preferences)
```

#### 7.2 Security
**Requirements:**
- Role-based access control (Brewer, Manager, Owner)
- Encrypted data in transit (TLS 1.3) and at rest (AES-256)
- Audit logs for all data modifications
- Two-factor authentication for manager accounts

**Roles & Permissions:**
```
Brewer:
- View daily alerts
- Mark items as counted
- Add notes

Manager:
- All Brewer permissions
- Generate checklists
- Configure alert thresholds
- Run reports
- Modify inventory counts

Owner:
- All Manager permissions
- User management
- System configuration
- Billing & subscription
```

---

### 8. Technical Architecture

#### 8.1 System Components
**Stack Recommendation:**
```
Frontend:
- React.js (web app)
- React Native or PWA (mobile)
- Tailwind CSS (styling)
- Chart.js (visualizations)

Backend:
- Node.js + Express (API server)
- PostgreSQL (database)
- Redis (caching, job queue)
- Docker (containerization)

Integration:
- Clover REST API
- SendGrid (email)
- Twilio (SMS)

Infrastructure:
- AWS or Google Cloud
- CloudWatch/Stackdriver (monitoring)
- GitHub Actions (CI/CD)
```

#### 8.2 API Endpoints (Internal)
```
Authentication:
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh

Inventory:
GET /api/inventory/current
GET /api/inventory/history?start_date&end_date
POST /api/inventory/sync
PUT /api/inventory/items/:id

Alerts:
GET /api/alerts/daily
GET /api/alerts/checklist
POST /api/alerts/:id/acknowledge

Reports:
GET /api/reports/variance?week
GET /api/reports/consumption?item_id&period
POST /api/reports/export

Clover Integration:
GET /api/clover/items
GET /api/clover/orders?date
POST /api/clover/sync
```

#### 8.3 Performance Requirements
- Page load time: < 2 seconds
- API response time: < 500ms (95th percentile)
- Support 10,000 items per location
- Handle 50 concurrent users
- Mobile app works offline for basic viewing

---

### 9. Implementation Plan

#### Phase 1 - MVP (4-6 weeks)
**Goals:** Core functionality for single location

**Features:**
- Clover sandbox integration
- Daily inventory alerts (email)
- Basic weekly checklist
- Simple variance calculation
- Web-only interface

**Deliverables:**
- Working prototype
- Demo environment
- Basic user documentation

#### Phase 2 - Beta (6-8 weeks)
**Goals:** Production-ready for pilot users

**Features:**
- Production Clover integration
- Mobile-responsive interface
- Enhanced variance detection
- PDF export
- User roles & permissions

**Deliverables:**
- Beta release to 3-5 pilot bars
- User training materials
- Feedback collection system

#### Phase 3 - V1.0 (8-10 weeks)
**Goals:** Public launch

**Features:**
- Mobile app (PWA)
- Advanced reporting
- Multi-location support (if needed)
- Integrations (QuickBooks, etc.)
- Customer support portal

**Deliverables:**
- Production launch
- Marketing site
- Customer onboarding flow
- Help center

---

### 10. Open Questions & Decisions Needed

#### Technical Decisions
- [ ] Self-hosted vs. cloud-hosted SaaS?
- [ ] Build native mobile apps or start with PWA?
- [ ] Which payment processor for subscription billing?
- [ ] Should we support Square/Toast in addition to Clover?

#### Business Decisions
- [ ] Pricing model: per-location, per-user, or tiered?
- [ ] Free trial duration?
- [ ] Target market: independent bars, chains, or both?
- [ ] Partnership strategy with Clover?

#### Product Decisions
- [ ] How to handle recipe complexity (e.g., seasonal drinks)?
- [ ] Should barcode scanning be in MVP or Phase 2?
- [ ] Integration with existing accounting software?
- [ ] Support for multiple vendors/suppliers?

---

### 11. Success Criteria & KPIs

#### Product Metrics
- **Adoption:** 80% of Brewers use daily alerts within 2 weeks
- **Engagement:** Manager completes checklist 90% of weeks
- **Accuracy:** Variance detection identifies 95% of true anomalies
- **Efficiency:** Inventory tasks reduced from 3.5 hours/week to <1 hour/week

#### Business Metrics
- **Revenue Impact:** Reduce spoilage costs by $500/month per location
- **Customer Satisfaction:** NPS > 40 within 3 months
- **Retention:** 85% month-over-month retention after 6 months
- **Growth:** 20 paying locations within 12 months

---

### 12. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Clover API changes break integration | High | Medium | Build abstraction layer, monitor API changelog, automated tests |
| Poor data quality from manual entry | High | High | Validation rules, anomaly detection, training materials |
| User adoption resistance | Medium | Medium | Simple UX, clear ROI demonstration, hands-on training |
| Competitor launches similar product | Medium | Low | Fast execution, superior UX, strong customer relationships |
| Scaling issues with multi-location | Medium | Low | Design for scale from day 1, load testing |

---

### 13. Appendix

#### A. Glossary
- **Par Level:** Target inventory quantity for an item
- **Reorder Point:** Inventory level that triggers ordering
- **Variance:** Difference between expected and actual usage
- **Recipe Multiplier:** Quantity of ingredient per finished drink
- **Shrinkage:** Inventory loss due to theft, spoilage, or waste

#### B. Reference Documents
- Clover API Documentation: https://docs.clover.com/
- User Research Findings: [Link to research]
- Competitive Analysis: [Link to analysis]
- Technical Design Doc: [To be created]

#### C. Change Log
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 4, 2026 | Product Team | Initial draft |

---

## Next Steps

1. **Stakeholder Review:** Share PRD with bar manager and owner for feedback (Due: Feb 11)
2. **Technical Feasibility:** Engineering team reviews architecture (Due: Feb 11)
3. **Design Kickoff:** Create wireframes and user flows (Due: Feb 18)
4. **Development Sprint Planning:** Break down Phase 1 into 2-week sprints (Due: Feb 18)
5. **Clover Sandbox Setup:** Obtain API credentials and test environment (Due: Feb 15)

---

**Document Status:** Ready for Review  
**Feedback Deadline:** February 11, 2026  
**Contact:** [Your contact info]
