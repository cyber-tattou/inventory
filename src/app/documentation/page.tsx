"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic'

const MermaidDiagram = dynamic(
  () => import('@/components/mermaid-diagram').then((mod) => mod.MermaidDiagram),
  { ssr: false }
)

export default function DocumentationPage() {
  // States for all diagrams
  const [showClassDiagram, setShowClassDiagram] = useState(false)
  const [showInventoryUseCases, setShowInventoryUseCases] = useState(false)
  const [showReportingUseCases, setShowReportingUseCases] = useState(false)
  const [showSystemArchitecture, setShowSystemArchitecture] = useState(false)
  const [showDataFlowArchitecture, setShowDataFlowArchitecture] = useState(false)
  
  // Sequence diagram states
  const [showLoginSequence, setShowLoginSequence] = useState(false)
  const [showProductSequence, setShowProductSequence] = useState(false)
  const [showStockSequence, setShowStockSequence] = useState(false)
  const [showSupplierSequence, setShowSupplierSequence] = useState(false)
  const [showInvoiceSequence, setShowInvoiceSequence] = useState(false)
  const [showRegistrationSequence, setShowRegistrationSequence] = useState(false)
  const [showPasswordResetSequence, setShowPasswordResetSequence] = useState(false)
  const [showBulkImportSequence, setShowBulkImportSequence] = useState(false)
  const [showAnalyticsSequence, setShowAnalyticsSequence] = useState(false)
  const [showOrderUseCases, setShowOrderUseCases] = useState(false)
  const [showAnalyticsUseCases, setShowAnalyticsUseCases] = useState(false)
  const [showOrderSequence, setShowOrderSequence] = useState(false)
  const [showAuditSequence, setShowAuditSequence] = useState(false)
  const [showLowStockSequence, setShowLowStockSequence] = useState(false)
  const [showReportWorkflowSequence, setShowReportWorkflowSequence] = useState(false)
  const [showInventorySequence, setShowInventorySequence] = useState(false)
  const [showReportingSequence, setShowReportingSequence] = useState(false)

  // Update the class diagram string
  const classDiagram = `classDiagram
    direction TB
    class Product {
        +int id
        +string name
        +string description
        +float price
        +int stock
        +object barcode
        +createProduct()
        +updateStock()
        +generateBarcode()
    }

    class StockMovement {
        +int id
        +date date
        +string type
        +string itemName
        +int quantity
        +string fromLocation
        +string toLocation
        +string reference
        +string status
        +string handledBy
        +recordMovement()
        +updateStatus()
    }

    class Supplier {
        +int id
        +string name
        +string contact
        +string email
        +string phone
        +string address
        +string status
        +date lastOrder
        +addSupplier()
        +updateSupplier()
        +updateStatus()
    }

    class Invoice {
        +int id
        +string invoiceNumber
        +string customerName
        +float amount
        +string status
        +date date
        +createInvoice()
        +updateStatus()
        +generatePDF()
    }

    class UserActivity {
        +int id
        +string userId
        +string action
        +timestamp timestamp
        +logActivity()
        +getActivityHistory()
    }

    class User {
        +int id
        +string username
        +string password
        +string role
        +login()
        +logout()
        +updateProfile()
    }

    Product "1" -- "*" StockMovement : triggers
    Supplier "1" -- "*" Product : supplies
    Product "1" -- "*" Invoice : contains
    User "1" -- "*" UserActivity : performs
    User "1" -- "*" StockMovement : handles
    User "1" -- "*" Invoice : manages`

  // Add this new diagram style
  const systemArchitectureDiagram = `graph TB
    %% Styling
    classDef container fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef component fill:#fff,stroke:#0d47a1,stroke-width:1px
    classDef database fill:#eceff1,stroke:#455a64,stroke-width:2px
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

    subgraph Frontend[Frontend Layer]
        UI[User Interface]
        Auth[Auth Provider]
        State[State Management]
    end

    subgraph Backend[Backend Services]
        API[API Gateway]
        Auth_Service[Auth Service]
        Stock_Service[Stock Service]
        Report_Service[Report Service]
    end

    subgraph Data[Data Layer]
        DB[(Database)]
        Cache[(Cache)]
    end

    subgraph External[External Services]
        Email[Email Service]
        Payment[Payment Gateway]
    end

    %% Connections
    UI --> API
    UI --> Auth
    Auth --> Auth_Service
    API --> Stock_Service
    API --> Report_Service
    Stock_Service --> DB
    Report_Service --> Cache
    Auth_Service --> DB
    API --> External

    %% Apply styles
    class Frontend,Backend,Data,External container
    class UI,Auth,State,API,Auth_Service,Stock_Service,Report_Service component
    class DB,Cache database
    class Email,Payment external`

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">System Documentation</h1>
      
      <div className="grid gap-8">
        {/* Database Schema Class Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
            <CardDescription>Complete entity relationships and data structure</CardDescription>
          </CardHeader>
          <CardContent>
            <button 
              onClick={() => setShowClassDiagram(!showClassDiagram)}
              className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              {showClassDiagram ? 'Hide' : 'Show'} Class Diagram
            </button>
            {showClassDiagram && (
              <MermaidDiagram chart={classDiagram} />
            )}
          </CardContent>
        </Card>

        {/* Use Case Diagrams */}
        <Card>
          <CardHeader>
            <CardTitle>System Use Cases</CardTitle>
            <CardDescription>User interactions and system capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Inventory Use Cases */}
            <div className="mb-8">
            <button 
              onClick={() => setShowInventoryUseCases(!showInventoryUseCases)}
              className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
                {showInventoryUseCases ? 'Hide' : 'Show'} Inventory Use Cases
            </button>
            {showInventoryUseCases && (
              <MermaidDiagram chart={`graph TD
    classDef actor fill:#f9f,stroke:#333,stroke-width:2px,shape:circle
    classDef useCase fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,rx:10
    
    subgraph Inventory Management
        IM1[("Add/Edit Products")]:::useCase
        IM2[("Manage Stock")]:::useCase
        IM3[("Handle Returns")]:::useCase
        IM4[("Process Orders")]:::useCase
        IM5[("Track Shipments")]:::useCase
    end

    subgraph Actors
        A1["👤 Admin"]:::actor
        A2["👤 Manager"]:::actor
        A3["👤 Warehouse"]:::actor
    end

    A1 -->|manages| IM1 & IM2 & IM3 & IM4 & IM5
    A2 -->|oversees| IM2 & IM3 & IM4
    A3 -->|handles| IM2 & IM3

    style IM1 fill:#bbdefb,stroke:#1976d2
    style IM2 fill:#bbdefb,stroke:#1976d2
    linkStyle default stroke:#2196f3,stroke-width:2px`} />
              )}
            </div>

            {/* Reporting Use Cases */}
            <div className="mb-8">
            <button 
                onClick={() => setShowReportingUseCases(!showReportingUseCases)}
              className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
                {showReportingUseCases ? 'Hide' : 'Show'} Reporting Use Cases
            </button>
              {showReportingUseCases && (
              <MermaidDiagram chart={`graph TD
    classDef actor fill:#f9f,stroke:#333,stroke-width:2px,shape:circle
    classDef useCase fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,rx:10
    
    subgraph Reporting System
        R1[("Generate Reports")]:::useCase
        R2[("View Analytics")]:::useCase
        R3[("Export Data")]:::useCase
        R4[("Schedule Reports")]:::useCase
        R5[("Custom Queries")]:::useCase
    end

    subgraph Actors
        A1["👤 Admin"]:::actor
        A2["👤 Manager"]:::actor
        A3["📊 System"]:::actor
    end

    A1 -->|access| R1 & R2 & R3 & R4 & R5
    A2 -->|access| R1 & R2 & R3
    A3 -->|generates| R1
    A3 -->|schedules| R4

    style R1 fill:#bbdefb,stroke:#1976d2
    style R2 fill:#bbdefb,stroke:#1976d2
    linkStyle default stroke:#2196f3,stroke-width:2px`} />
              )}
            </div>

            {/* Order Management Use Cases */}
            <div className="mb-8">
              <button 
                onClick={() => setShowOrderUseCases(!showOrderUseCases)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showOrderUseCases ? 'Hide' : 'Show'} Order Management Use Cases
              </button>
              {showOrderUseCases && (
                <MermaidDiagram chart={`graph TD
    classDef actor fill:#f9f,stroke:#333,stroke-width:2px,shape:circle
    classDef useCase fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,rx:10
    
    subgraph Order Processing
        O1[("Create Purchase Order")]:::useCase
        O2[("Approve Orders")]:::useCase
        O3[("Track Deliveries")]:::useCase
        O4[("Manage Returns")]:::useCase
        O5[("Generate Invoices")]:::useCase
    end

    subgraph Actors
        A1["👤 Admin"]:::actor
        A2["👤 Manager"]:::actor
        A3["📦 System"]:::actor
    end

    A1 -->|manages| O1 & O2 & O3 & O4 & O5
    A2 -->|handles| O1 & O3 & O4
    A3 -->|automates| O5

    style O1 fill:#bbdefb,stroke:#1976d2
    style O2 fill:#bbdefb,stroke:#1976d2
    linkStyle default stroke:#2196f3,stroke-width:2px,stroke-dasharray: 5 5`} />
              )}
            </div>

            {/* Analytics Use Cases */}
            <div className="mb-8">
              <button 
                onClick={() => setShowAnalyticsUseCases(!showAnalyticsUseCases)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showAnalyticsUseCases ? 'Hide' : 'Show'} Analytics Use Cases
              </button>
              {showAnalyticsUseCases && (
                <MermaidDiagram chart={`graph TD
    classDef actor fill:#f9f,stroke:#333,stroke-width:2px,shape:circle
    classDef useCase fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,rx:10
    
    subgraph Analytics & Reporting
        A1[("View Dashboard")]:::useCase
        A2[("Generate Reports")]:::useCase
        A3[("Export Data")]:::useCase
        A4[("Monitor KPIs")]:::useCase
        A5[("Forecast Demand")]:::useCase
    end

    subgraph Users
        U1["👤 Admin"]:::actor
        U2["👤 Manager"]:::actor
        U3["📊 System"]:::actor
    end

    U1 -->|accesses| A1 & A2 & A3 & A4 & A5
    U2 -->|views| A1 & A2 & A4
    U3 -->|updates| A4 & A5

    style A1 fill:#bbdefb,stroke:#1976d2
    linkStyle default stroke:#2196f3,stroke-width:2px`} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Architecture Diagrams */}
        <Card>
          <CardHeader>
            <CardTitle>System Architecture</CardTitle>
            <CardDescription>Technical architecture and data flow</CardDescription>
          </CardHeader>
          <CardContent>
            {/* System Architecture */}
            <div className="mb-8">
              <button 
                onClick={() => setShowSystemArchitecture(!showSystemArchitecture)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showSystemArchitecture ? 'Hide' : 'Show'} System Architecture
              </button>
              {showSystemArchitecture && (
                <div className="max-w-4xl mx-auto">
                  <MermaidDiagram chart={systemArchitectureDiagram} />
                </div>
              )}
            </div>

            {/* Data Flow Architecture */}
            <div className="mb-8">
              <button 
                onClick={() => setShowDataFlowArchitecture(!showDataFlowArchitecture)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showDataFlowArchitecture ? 'Hide' : 'Show'} Data Flow Architecture
              </button>
              {showDataFlowArchitecture && (
                <MermaidDiagram chart={`graph LR
    classDef input fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,rx:8
    classDef process fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,rx:8
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,rx:8
    classDef storage fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,rx:8
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,rx:8

    subgraph Input["Input Layer"]
        I[User Input]:::input
        F[File Upload]:::input
        S[System Events]:::input
    end

    subgraph Processing["Processing Layer"]
        V[Validation]:::process
        P[Business Logic]:::process
        T[Data Transform]:::process
    end

    subgraph Storage["Storage Layer"]
        DB[(Database)]:::storage
        C[Cache]:::storage
        FS[File Storage]:::storage
    end

    subgraph Output["Output Layer"]
        R[API Response]:::output
        N[Notifications]:::output
        U[UI Update]:::output
    end

    subgraph ErrorHandling["Error Handling"]
        E[Error Handler]:::error
        L[Error Logs]:::error
    end

    I & F & S --> V
    V --> P
    P --> T
    T --> DB & C & FS
    DB & C --> R
    R --> U & N
    
    V -- Error --> E
    P -- Error --> E
    T -- Error --> E
    E --> L
    E -.-> U

    %% Styling
    linkStyle default stroke:#666,stroke-width:2px,fill:none
    style Input fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px
    style Processing fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px
    style Storage fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px
    style Output fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px
    style ErrorHandling fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px`} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sequence Diagrams Section */}
        <Card>
          <CardHeader>
            <CardTitle>System Sequences</CardTitle>
            <CardDescription>Detailed operation flows</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add all sequence diagrams here */}
            {/* Password Reset Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowPasswordResetSequence(!showPasswordResetSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showPasswordResetSequence ? 'Hide' : 'Show'} Password Reset Flow
              </button>
              {showPasswordResetSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant D as Database
    participant E as Email Service
    participant T as Token Service

    U->>+F: Request password reset
    F->>+API: Submit email
    API->>+D: Verify email exists
    D-->>-API: User found
    API->>+T: Generate reset token
    T-->>-API: Token created
    API->>+E: Send reset email
    E-->>-API: Email sent
    API-->>-F: Success response
    F-->>-U: Check email message

    Note over U,E: User clicks reset link
    U->>+F: Submit new password
    F->>+API: Reset password
    API->>+T: Verify token
    T-->>-API: Token valid
    API->>+D: Update password
    D-->>-API: Password updated
    API-->>-F: Success
    F-->>-U: Password reset complete`} />
              )}
            </div>

            {/* Bulk Import Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowBulkImportSequence(!showBulkImportSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showBulkImportSequence ? 'Hide' : 'Show'} Bulk Import Process
              </button>
              {showBulkImportSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant V as Validator
    participant D as Database
    participant Q as Queue

    U->>+F: Upload CSV file
    F->>+API: Send file
    API->>+V: Validate format
    V-->>-API: Format valid
    API->>+Q: Queue import job
    Q-->>-API: Job queued
    API-->>F: Processing started
    
    loop For each record
        Q->>+API: Process record
        API->>+D: Insert/Update
        D-->>-API: Confirm
        API->>-Q: Record complete
    end

    Q->>+API: All complete
    API-->>-F: Import finished
    F-->>-U: Show results`} />
              )}
            </div>

            {/* Analytics Generation Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowAnalyticsSequence(!showAnalyticsSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showAnalyticsSequence ? 'Hide' : 'Show'} Analytics Generation
              </button>
              {showAnalyticsSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant C as Cache
    participant D as Database
    participant A as Analytics Engine

    U->>+F: Request analytics
    F->>+API: Get dashboard data
    API->>+C: Check cache
    
    alt Cache hit
        C-->>API: Return cached data
    else Cache miss
        C-->>API: Cache miss
        API->>+D: Fetch raw data
        D-->>-API: Return data
        API->>+A: Process data
        A-->>-API: Analytics results
        API->>C: Cache results
    end
    
    API-->>-F: Return analytics
    F-->>-U: Display dashboard`} />
              )}
            </div>

            {/* Product Management Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowProductSequence(!showProductSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showProductSequence ? 'Hide' : 'Show'} Product Management Flow
              </button>
              {showProductSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant V as Validator
    participant D as Database
    participant B as Barcode Service

    U->>+F: Create/Edit Product
    F->>+V: Validate Input
    V-->>-F: Validation Result
    
    alt Valid Input
        F->>+API: Submit Product Data
        API->>+B: Generate Barcode
        B-->>-API: Barcode Generated
        API->>+D: Store Product
        D-->>-API: Confirmation
        API-->>-F: Success Response
        F-->>-U: Show Success
    else Invalid Input
        F-->>U: Show Validation Errors
    end`} />
              )}
            </div>

            {/* Login Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowLoginSequence(!showLoginSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showLoginSequence ? 'Hide' : 'Show'} Login Process
              </button>
              {showLoginSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as Auth API
    participant D as Database
    participant T as Token Service

    U->>+F: Enter credentials
    F->>+API: Submit login request
    API->>+D: Validate credentials
    D-->>-API: User data
    
    alt Valid Credentials
        API->>+T: Generate JWT
        T-->>-API: Access token
        API-->>F: Return token & user data
        F->>F: Store token
        F-->>-U: Redirect to dashboard
    else Invalid Credentials
        API-->>F: Auth error
        F-->>U: Show error message
    end`} />
              )}
            </div>

            {/* Registration Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowRegistrationSequence(!showRegistrationSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showRegistrationSequence ? 'Hide' : 'Show'} Registration Process
              </button>
              {showRegistrationSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant V as Validator
    participant D as Database
    participant E as Email Service

    U->>+F: Submit registration form
    F->>+V: Validate input
    V-->>-F: Validation result
    
    alt Valid Input
        F->>+API: Create account
        API->>+D: Check existing user
        D-->>-API: User status
        
        alt New User
            API->>+D: Store user data
            D-->>-API: Confirmation
            API->>+E: Send welcome email
            E-->>-API: Email sent
            API-->>F: Success response
            F-->>U: Show confirmation
        else Existing User
            API-->>F: User exists error
            F-->>U: Show error message
        end
    else Invalid Input
        F-->>U: Show validation errors
    end`} />
              )}
            </div>

            {/* Stock Movement Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowStockSequence(!showStockSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showStockSequence ? 'Hide' : 'Show'} Stock Movement Process
              </button>
              {showStockSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant V as Validator
    participant D as Database
    participant N as Notification

    U->>+F: Initiate stock movement
    F->>+V: Validate quantities
    V-->>-F: Validation result
    
    alt Valid Movement
        F->>+API: Submit movement
        API->>+D: Check current stock
        D-->>-API: Stock levels
        
        alt Sufficient Stock
            API->>+D: Update stock
            D-->>-API: Confirmation
            API->>+N: Notify stakeholders
            N-->>-API: Notification sent
            API-->>F: Success response
            F-->>U: Show confirmation
        else Insufficient Stock
            API-->>F: Stock error
            F-->>U: Show error message
        end
    else Invalid Input
        F-->>U: Show validation errors
    end

    Note over U,N: Automated inventory alerts if stock below threshold`} />
              )}
            </div>

            {/* Supplier Management Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowSupplierSequence(!showSupplierSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showSupplierSequence ? 'Hide' : 'Show'} Supplier Management Process
              </button>
              {showSupplierSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant V as Validator
    participant D as Database
    participant E as Email
    participant P as PDF

    U->>+F: Create/Update supplier
    F->>+V: Validate details
    V-->>-F: Validation result
    
    alt Valid Details
        F->>+API: Submit supplier data
        API->>+D: Store supplier
        D-->>-API: Confirmation
        
        par Generate Documents
            API->>+P: Generate contract
            P-->>-API: Contract PDF
        and Send Notifications
            API->>+E: Send welcome email
            E-->>-API: Email sent
        end
        
        API-->>F: Success response
        F-->>U: Show confirmation
    else Invalid Input
        F-->>U: Show validation errors
    end

    Note over U,P: Additional documents generated based on supplier type`} />
              )}
            </div>

            {/* Inventory Management Sequence */}
            <div className="mb-8">
              <button 
                onClick={() => setShowInventorySequence(!showInventorySequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showInventorySequence ? 'Hide' : 'Show'} Inventory Management Process
              </button>
              {showInventorySequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth
    participant API as API
    participant DB as Database
    participant N as Notifications

    U->>+F: Update inventory item
    F->>+A: Check permissions
    A-->>-F: Validate access

    alt Authorized
        F->>+API: Send update request
        API->>+DB: Check current stock
        DB-->>-API: Current levels
        
        alt Valid Update
            API->>+DB: Update inventory
            DB-->>-API: Success
            API->>+N: Check stock thresholds
            
            alt Below Threshold
                N->>N: Generate alert
                N-->>F: Send low stock alert
            end
            
            API-->>F: Update confirmed
            F-->>U: Show success message
        else Invalid Update
            API-->>F: Error response
            F-->>U: Show error message
        end
    else Unauthorized
        F-->>U: Show access denied
    end`} />
              )}
            </div>

            {/* Supplier Order Process */}
            <div className="mb-8">
              <button 
                onClick={() => setShowSupplierSequence(!showSupplierSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showSupplierSequence ? 'Hide' : 'Show'} Supplier Order Process
              </button>
              {showSupplierSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant M as Manager
    participant F as Frontend
    participant API as API
    participant S as Supplier
    participant DB as Database
    participant I as Invoice

    M->>+F: Create purchase order
    F->>+API: Submit order details
    API->>+DB: Check budget/limits
    DB-->>-API: Validation result
    
    alt Within Budget
        API->>+S: Send order request
        S-->>-API: Order confirmation
        API->>+DB: Store order details
        DB-->>-API: Confirmation
        API->>+I: Generate invoice
        I-->>-API: Invoice created
        API-->>F: Order processed
        F-->>M: Show confirmation
    else Over Budget
        API-->>F: Budget exceeded
        F-->>M: Show budget warning
    end`} />
              )}
            </div>

            {/* Analytics and Reporting */}
            <div className="mb-8">
              <button 
                onClick={() => setShowReportingSequence(!showReportingSequence)}
                className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {showReportingSequence ? 'Hide' : 'Show'} Analytics & Reporting Process
              </button>
              {showReportingSequence && (
                <MermaidDiagram chart={`sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API
    participant DB as Database
    participant A as Analytics
    participant C as Cache

    U->>+F: Request report
    F->>+C: Check cached data
    
    alt Cache Hit
        C-->>F: Return cached data
        F-->>U: Display report
    else Cache Miss
        C-->>F: No cache
        F->>+API: Request data
        API->>+DB: Query data
        DB-->>-API: Raw data
        API->>+A: Process data
        A->>A: Calculate metrics
        A->>A: Generate visualizations
        A-->>-API: Processed results
        API-->>F: Report data
        F->>C: Cache results
        F-->>U: Display report
    end`} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Technology Stack UI */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack & Infrastructure</CardTitle>
            <CardDescription>System architecture and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Frontend Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Frontend</CardTitle>
                  <CardDescription>User interface and interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Core Technologies</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Next.js 15.1.3</li>
                        <li>React 18</li>
                        <li>TypeScript</li>
                </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">UI Framework</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Tailwind CSS with JIT</li>
                        <li>shadcn/ui components</li>
                        <li>Radix UI primitives</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Server/Client components</li>
                        <li>Dynamic routing</li>
                        <li>API integration</li>
                </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend Card */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Backend</CardTitle>
                  <CardDescription>Server and database infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Database</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>SQLite database</li>
                  <li>Prisma ORM</li>
                        <li>Type-safe queries</li>
                        <li>Automated migrations</li>
                </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">API Layer</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>RESTful endpoints</li>
                        <li>JWT authentication</li>
                        <li>Role-based access</li>
                        <li>Request validation</li>
                </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security & DevOps Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Security & DevOps</CardTitle>
                  <CardDescription>Security and deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Security</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>JWT authentication</li>
                        <li>RBAC implementation</li>
                        <li>Input validation</li>
                        <li>XSS protection</li>
                </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">DevOps</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>GitHub Actions CI/CD</li>
                        <li>Docker containers</li>
                        <li>Vercel deployment</li>
                        <li>Environment management</li>
                </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack section remains the same */}
      </div>
    </div>
  )
}
