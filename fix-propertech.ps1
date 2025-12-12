# =======================================================
# PROPERTECH FRONTEND AUTO-FIX SCRIPT (SAFE VERSION)
# Zero backticks. Zero nested quotes. 100% PowerShell-safe.
# =======================================================

Write-Host "Running PROPERTECH Frontend Fix Script..." -ForegroundColor Cyan

$root = "C:\Users\Administrator\Desktop\PROPERTECH-Frontend"
$files = Get-ChildItem -Path $root -Recurse -Include *.tsx

$validTrends = @("up","down","neutral")

foreach ($file in $files) {

    Write-Host "Processing $($file.FullName)..."

    $text = Get-Content $file.FullName -Raw
    $orig = $text

    # ---------------------------------------------
    # 1. FIX TREND VALUES
    # ---------------------------------------------
    $text = [regex]::Replace($text,
        'trend\s*:\s*"([^"]+)"',
        {
            param($match)

            $value = $match.Groups[1].Value.ToLower()

            if ($value -match 'up|increase|positive|rise') {
                return 'trend: "up"'
            }
            elseif ($value -match 'down|decrease|negative|drop') {
                return 'trend: "down"'
            }
            elseif ($value -match 'neutral|flat|stable') {
                return 'trend: "neutral"'
            }
            else {
                return 'trend: "neutral"'
            }
        })

    # ---------------------------------------------
    # 2. FIX ALL STATS ARRAYS
    # ---------------------------------------------
    $text = [regex]::Replace($text,
        'trend\s*:\s*"(.*?)"',
        {
            param($match)

            $value = $match.Groups[1].Value.ToLower()

            if ($validTrends -contains $value) {
                return $match.Value
            }

            if ($value -match 'up|increase|positive') {
                return 'trend: "up"'
            }
            elseif ($value -match 'down|decrease') {
                return 'trend: "down"'
            }
            else {
                return 'trend: "neutral"'
            }
        })

    # ---------------------------------------------
    # 3. FIX StatCard.tsx NOT A MODULE
    # ---------------------------------------------
    if ($file.Name -eq "StatCard.tsx") {
        if ($text -notmatch "export default") {
            Write-Host "Adding 'export default StatCard' to StatCard.tsx" -ForegroundColor Yellow
            $text = $text + "`r`nexport default StatCard;"
        }
    }

    # ---------------------------------------------
    # SAVE CHANGES
    # ---------------------------------------------
    if ($text -ne $orig) {
        Set-Content -Path $file.FullName -Value $text -Encoding UTF8
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
    }
    else {
        Write-Host "No changes needed." -ForegroundColor DarkGray
    }
}

Write-Host "All fixes complete." -ForegroundColor Green
