param(
  [string]$Message = "chore: ship",
  [switch]$NoBuild
)

Write-Host "➤ staging changes…"
git add -A

# Check if anything is staged
$staged = (git diff --cached --name-only)
if ([string]::IsNullOrWhiteSpace($staged)) {
  Write-Host "ℹ no changes staged; creating an empty commit to trigger deploy"
  git commit --allow-empty -m "chore: trigger build" | Out-Null
} else {
  Write-Host "➤ commit: $Message"
  git commit -m $Message
}

function Invoke-LocalBuild {
  if ($NoBuild) {
    Write-Host "↷ skipping local build (--NoBuild)"
    return $true
  }

  # Try to find npm
  $npm = (Get-Command npm -ErrorAction SilentlyContinue)
  if (-not $npm) {
    $npm = (Get-Command "C:\Program Files\nodejs\npm.cmd" -ErrorAction SilentlyContinue)
  }

  if (-not $npm) {
    Write-Warning "npm not found on PATH; skipping local build sanity check"
    return $true
  }

  Write-Host "➤ quick build sanity (next build)…"
  & $npm.Source run -s build
  if ($LASTEXITCODE -ne 0) {
    Write-Error "✖ build failed — fix errors before pushing"
    return $false
  }
  return $true
}

if (-not (Invoke-LocalBuild)) {
  exit 1
}

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "➤ pushing to $branch…"
git push origin $branch

Write-Host "✓ done. Cloudflare Pages will deploy automatically."

