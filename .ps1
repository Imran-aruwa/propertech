# Propertech Frontend File Verification Script
# Run this in your project root directory

Write-Host "=== Propertech Frontend File Verification ===" -ForegroundColor Cyan
Write-Host ""

# Define expected file structure based on the dashboard specs
$expectedFiles = @{
    # Core App Files
    "app/App.jsx" = "Main application component"
    "app/main.jsx" = "Application entry point"
    "app/index.css" = "Global styles"
    
    # Routing
    "app/router/index.jsx" = "Application routes"
    
    # Owner Portal Components
    "app/pages/owner/OwnerDashboard.jsx" = "Owner main dashboard"
    "app/pages/owner/GlobalRentTracking.jsx" = "Global rent tracking view"
    "app/pages/owner/PropertyFinancialDetail.jsx" = "Individual property financial detail"
    "app/pages/owner/FinancialAnalytics.jsx" = "Financial analytics & reports"
    "app/pages/owner/TenantManagement.jsx" = "Tenant & payment management"
    
    # Agent Portal Components
    "app/pages/agent/AgentDashboard.jsx" = "Agent main dashboard"
    "app/pages/agent/AgentEarnings.jsx" = "Agent earnings & commissions"
    "app/pages/agent/PropertyManagement.jsx" = "Agent property management"
    "app/pages/agent/RentCollection.jsx" = "Agent rent collection tracking"
    
    # Tenant Portal Components
    "app/pages/tenant/TenantDashboard.jsx" = "Tenant main dashboard"
    "app/pages/tenant/PaymentTracking.jsx" = "Tenant payment history"
    "app/pages/tenant/MaintenanceRequests.jsx" = "Tenant maintenance requests"
    
    # Head Security Portal Components
    "app/pages/security/SecurityDashboard.jsx" = "Head security dashboard"
    "app/pages/security/IncidentManagement.jsx" = "Security incident management"
    "app/pages/security/StaffAttendance.jsx" = "Security staff attendance"
    "app/pages/security/PerformanceTracking.jsx" = "Security performance tracking"
    
    # Head Gardener Portal Components
    "app/pages/gardener/GardenerDashboard.jsx" = "Head gardener dashboard"
    "app/pages/gardener/WorkAssignments.jsx" = "Gardening work assignments"
    "app/pages/gardener/EquipmentMaintenance.jsx" = "Equipment & maintenance tracking"
    
    # Caretaker Portal Components
    "app/pages/caretaker/CaretakerDashboard.jsx" = "Caretaker main dashboard"
    "app/pages/caretaker/RentTracking.jsx" = "Rent management & tracking"
    "app/pages/caretaker/OutstandingPayments.jsx" = "Outstanding payments alert view"
    "app/pages/caretaker/MeterReadings.jsx" = "Meter readings management"
    "app/pages/caretaker/MaintenanceManagement.jsx" = "Maintenance requests management"
    "app/pages/caretaker/TenantManagement.jsx" = "Tenant information & management"
    "app/pages/caretaker/MonthlyReport.jsx" = "Monthly rent collection report"
    
    # Shared Components
    "app/components/layout/Navbar.jsx" = "Navigation bar"
    "app/components/layout/Sidebar.jsx" = "Sidebar navigation"
    "app/components/layout/Footer.jsx" = "Footer component"
    
    "app/components/common/StatCard.jsx" = "Statistics card component"
    "app/components/common/Chart.jsx" = "Chart wrapper component"
    "app/components/common/Table.jsx" = "Table component"
    "app/components/common/Button.jsx" = "Button component"
    "app/components/common/Modal.jsx" = "Modal component"
    "app/components/common/LoadingSpinner.jsx" = "Loading spinner"
    
    # Feature-specific Components
    "app/components/payments/PaymentCard.jsx" = "Payment status card"
    "app/components/payments/PaymentHistory.jsx" = "Payment history table"
    "app/components/properties/PropertyCard.jsx" = "Property summary card"
    "app/components/staff/StaffGrid.jsx" = "Staff status grid"
    "app/components/incidents/IncidentForm.jsx" = "Incident report form"
    
    # Utils
    "app/utils/formatters.js" = "Data formatting utilities"
    "app/utils/constants.js" = "Application constants"
    "app/utils/api.js" = "API utilities"
    
    # Config
    "vite.config.js" = "Vite configuration"
    "package.json" = "NPM package configuration"
    "tailwind.config.js" = "Tailwind CSS configuration"
    ".env.example" = "Environment variables template"
}

# Check which files exist
$missingFiles = @()
$existingFiles = @()

Write-Host "Checking files..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $expectedFiles.Keys) {
    if (Test-Path $file) {
        $existingFiles += $file
        Write-Host "[✓] $file" -ForegroundColor Green
    } else {
        $missingFiles += $file
        Write-Host "[✗] $file - MISSING" -ForegroundColor Red
    }
}

# Summary
Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total Expected Files: $($expectedFiles.Count)" -ForegroundColor White
Write-Host "Existing Files: $($existingFiles.Count)" -ForegroundColor Green
Write-Host "Missing Files: $($missingFiles.Count)" -ForegroundColor Red
Write-Host ""

# Display missing files with descriptions
if ($missingFiles.Count -gt 0) {
    Write-Host "=== MISSING FILES ===" -ForegroundColor Red
    Write-Host ""
    foreach ($file in $missingFiles) {
        Write-Host "  • $file" -ForegroundColor Yellow
        Write-Host "    Description: $($expectedFiles[$file])" -ForegroundColor Gray
        Write-Host ""
    }
    
    # Export missing files list
    $missingFiles | Out-File "missing-files.txt"
    Write-Host "Missing files list saved to: missing-files.txt" -ForegroundColor Cyan
} else {
    Write-Host "✓ All required files are present!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== NEXT STEPS ===" -ForegroundColor Cyan
Write-Host "1. Share the 'missing-files.txt' file" -ForegroundColor White
Write-Host "2. I'll generate the complete files for you" -ForegroundColor White
Write-Host "3. Share any existing files you want me to review" -ForegroundColor White