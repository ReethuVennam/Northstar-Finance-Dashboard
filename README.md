# Northstar Finance Dashboard

A polished frontend-only finance dashboard built for the Zorvyn Frontend Developer Intern assignment.

## Overview

This project focuses on turning a simple finance tracking scenario into a clean, interactive, and reviewer-friendly dashboard. The goal was not to overbuild the app, but to show strong frontend thinking through layout, state management, component structure, interaction design, and attention to detail.

## Why this submission stands out

- Clear visual hierarchy with a distinctive, responsive design
- Custom-built SVG charts instead of relying on chart libraries
- Role-based UI demo with meaningful differences between `Viewer` and `Admin`
- Strong transaction workflow with add, edit, delete, filter, sort, and search
- Smart touches like dark mode, local persistence, CSV/JSON export, quick time filters, and sample-data restore
- Graceful empty states and reviewer-friendly demo behavior

## Features

### Dashboard overview
- Summary cards for net balance, income, expenses, and savings rate
- Hero metrics that surface visible net flow and key spending signals
- Budget pulse section with monthly budget tracking and highlighted focus cards

### Visualizations
- Time-based balance trend chart built with SVG
- Category spending breakdown donut chart built with SVG

### Transactions
- Search by title or category
- Filter by type, category, and quick time range
- Sort by date or amount
- Admin-only add, edit, and delete actions

### Role-based UI
- `Viewer`: read-only analytics and exports
- `Admin`: full transaction management plus seed-data restore

### Insights
- Highest spending category
- Month-over-month comparison
- Savings signal
- Recurring spending watchlist

### UX extras
- Dark mode with persisted preference
- Local storage persistence for transaction edits
- JSON and CSV export
- Toast feedback for key actions
- Reset filters and restore sample data controls

## Tech approach

This submission uses plain HTML, CSS, and JavaScript.

Why this approach:
- Keeps the setup lightweight and easy to run
- Demonstrates frontend fundamentals without hiding logic inside libraries
- Makes the state flow easy to review during evaluation

## State management

A single state object manages:
- transactions
- selected role
- theme
- filters
- editing state for the modal

Rendering is split into focused functions for:
- summary cards
- focus cards
- charts
- insights
- transactions table

## Project structure

- `index.html` - app layout and modal structure
- `styles.css` - visual design, responsive layout, theming
- `app.js` - state, rendering, filters, charts, persistence, exports, role logic
- `server.js` - lightweight local static server
- `package.json` - start script

## How to run

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Requirement mapping

### 1. Dashboard overview
- Summary cards are included
- Time-based chart is included
- Category-based chart is included

### 2. Transactions section
- Date, amount, category, and type are displayed
- Search, filtering, and sorting are implemented

### 3. Basic role-based UI
- Viewer and Admin modes are simulated on the frontend
- UI behavior changes based on selected role

### 4. Insights section
- Highest spending category
- Monthly comparison
- Useful spending observations

### 5. State management
- Centralized state for transactions, role, filters, and UI behavior

### 6. UI and UX expectations
- Responsive layout
- Clean readable design
- Empty-state handling

## Demo tips for reviewers

1. Switch between `Viewer` and `Admin` from the top-right control.
2. Use the quick time filters to watch the charts and summary cards update.
3. Add or edit a transaction in Admin mode to see live state updates.
4. Try dark mode and export actions to review the optional enhancements.
5. Use `Restore sample data` to reset the dashboard after testing.

## Notes

- Data is mock data only; no backend is required.
- Relative date filters are anchored to the latest available dataset so the dashboard remains meaningful during review.
- Clearing local storage resets the app back to the seeded sample data.
